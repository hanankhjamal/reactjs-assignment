import React, { Component } from 'react';
import App from './App'
import './posts.css';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: {}, comments: [], tags: [], uid: props.uid };
    }

    componentDidMount() {
        this.getPosts();
        this.getComments();
    }

    getPosts = () => {
        fetch(`https://n161.tech/api/dummyapi/post/${this.state.uid}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    postId: result.id,
                    postImage: result.image,
                    postMsg: result.message,
                    ownerName: result.owner.firstName + ' ' + result.owner.lastName,
                    ownerImage: result.owner.image,
                    tags: result.tags
                })
            }
            )
            .catch((error) => console.log(error))
    }

    getComments = () => {
        fetch('https://n161.tech/api/dummyapi/post/1/comment?limit=5&page=1.', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    comments: result.data,
                })
            }
            )
            .catch((error) => console.log(error))
    }

    render() {
        return (
            <div className="Posts" >
                <header>
                    <h1>Ihrjobs Posts</h1>
                    <p></p>
                </header>
                <section>
                    <div className="container">
                        <div className="box update">
                            <div className="box-header">
                                <h3><a href=""><img src={this.state.ownerImage} alt="" /><span className="float-left">{this.state.ownerName}</span></a>
                                </h3>
                            </div>
                            <div className="box-content">
                                <div className="content">
                                    <p>{this.state.postMsg}</p>
                                    <div className="img"><img src={this.state.postImage} alt="" /></div>
                                </div>
                            </div>
                            <div className="box-likes">
                                <div className="row">
                                    {this.state.comments.map((item, index) =>
                                        index < 3 && < span > <a href="#"><img src={item.owner.image} alt="" /></a></span>
                                    )}
                                    <span><a href="#">+99</a></span>
                                    <span>Like this</span>
                                </div>
                                <div className="row">
                                    <span>{this.state.tags.length} Tags</span>
                                </div>
                            </div>
                            <div className="box-buttons">
                                <div className="row">
                                    {this.state.tags.map((item, index) => (
                                        index < 3 && <button><span>{item}</span></button>
                                    ))}
                                </div>
                            </div>
                            <div className="box-click"><span><i class="ion-chatbox-working"></i> View {this.state.comments.length} more comments</span></div>
                            {this.state.comments.map((item) =>
                                <div className="box-comments">
                                    <div className="comment"><img src={item.owner.image} alt="" />
                                        <div className="content">
                                            <h3><a href="">{item.owner.nameTitle + ' ' + item.owner.firstName + ' ' + item.owner.lastName}</a><span><time> 1 hr - </time><a href="#">Like</a></span></h3>
                                            <p>{item.message}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <footer>
                    <h4>Thank You</h4>
                    <p>Made <a href="https://www.linkedin.com/in/hananabuafefah/" target="_blank">@Hanan Jamal</a> </p>
                </footer>
            </div >
        );
    }
}

export default Posts;
