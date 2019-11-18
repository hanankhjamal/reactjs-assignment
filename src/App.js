import React, { Component } from 'react';
import './App.css';
import Posts from './posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    fetch('https://n161.tech/api/dummyapi/user?limit=5&page=1.', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {

        this.setState({
          users: result.data
        })
      }
      )
      .catch((error) => console.log(error))
  }


  render() {
    return (
      <div className="App" >
        {this.state.flagPost ? <Posts uid={this.state.uid} />
          : <div className="container blog-page">
            <div className="row clearfix">
              {this.state.users.map((item) => (
                <div className="col-lg-4 col-md-12">
                  <div className="card single_post">
                    <div className="header">
                      <h2><strong>{item.nameTitle}</strong> </h2>
                    </div>
                    <div className="body">
                      <h3 className="m-t-0 m-b-5"><a href="blog-details.html">{item.firstName + ' ' + item.lastName}</a></h3>
                    </div>
                    <div className="body">
                      <div className="img-post m-b-15">
                        <img src={item.image} alt="Awesome Image" />
                        <div className="social_share">
                          <button className="btn btn-primary btn-icon btn-icon-mini btn-round"><i className="zmdi zmdi-facebook"></i></button>
                          <button className="btn btn-primary btn-icon btn-icon-mini btn-round"><i className="zmdi zmdi-twitter"></i></button>
                          <button className="btn btn-primary btn-icon btn-icon-mini btn-round"><i className="zmdi zmdi-instagram"></i></button>
                        </div>
                      </div>
                      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                      <button href="blog-details.html" title="read more" onClick={() => {
                        this.setState({ flagPost: true, uid: item.id })

                      }} className="btn btn-round btn-info">Read More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}
      </div>
    );
  }
}

export default App;
