import React, { Component } from 'react';
import './App.css';
import Player from '@vimeo/player';
import VideoList from './VideoList';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      videoList: null,
      clickedNode: null
    };
    this.handleData = this.handleData.bind(this);
  }

  handleData(data, node) {
    this.setState(state => ({
      videoList: data,
      clickedNode: node
    }));
  }

  render() {

    let title, description;
    if(this.state.videoList != null){
      new Player(this.refs.handstick, {
        id: "https://vimeo.com/"+this.state.videoList[0].uri,
        height: 350,
        width: 1015
      });

      let node = this.state.videoList.find(x => x.uri === this.state.clickedNode);
      if(node !== undefined){
        title = <h4 className="title">{node.title}</h4>;
        description = <div className="description">{node.description}</div>;
      }
      else{
        title = <h4 className="title">{this.state.videoList[0].title}</h4>;
        description = <div className="description">{this.state.videoList[0].description}</div>;
      }
    }

    return (
      <div>
      <div className="App">

      <section id="handstick" ref="handstick"></section>
      <VideoList handlerFromParant={this.handleData}></VideoList>
      </div>
      {title}
      {description}
      </div>
      );
    }
  }

  export default App;
