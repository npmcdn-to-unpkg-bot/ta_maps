import * as React from 'react'
import * as ReactDOM from 'react-dom'
import marked from 'marked';

let data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {data: []};
    }

    loadCommentsFromServer() {
        fetch(this.props.url, {
            dataType: 'json',
            cache: false
        })
            .then(response => response.json())
            .then(data => {
                this.setState({data});
            })
            .catch(error => {
                console.error(this.props.url, error);
            });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    }

    handleCommentSubmit(comment) {
        var comments = this.state.data;
        // Optimistically set an id on the new comment. It will be replaced by an
        // id generated by the server. In a production application you would likely
        // not use Date.now() for this and would have a more robust system in place.
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        fetch(this.props.url, {
            method: 'POST',
            body: comment
        })
            .then(response => response.json())
            .then(data => {
                this.setState({data});
            })
            .catch(error => {
                this.setState({data: comments});
                console.error(this.props.url, error);
            });
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
            </div>
        );
    }
}

class CommentList extends React.Component {
    render() {
        let commentNodes = this.props.data.map(c => {
            return (
                <Comment author={c.author} key={c.id}>
                    {c.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

class CommentForm extends React.Component {
    constructor() {
        super();
        this.state = {author: '', text: ''};
    }

    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let author = this.state.author.trim(),
            text = this.state.text.trim();
        if (!text || !author) {
            return;
        }

        this.props.onCommentSubmit({author, text});
        this.setState({author: '', text: ''});
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange.bind(this)}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange.bind(this)}
                />
                <input type="submit" value="Post"/>
            </form>
        );
    }
}

class Comment extends React.Component {
    rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    }

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
}

ReactDOM.render(
    <CommentBox url="/comments.json" pollInterval={2000}/>,
    document.getElementById('content')
);