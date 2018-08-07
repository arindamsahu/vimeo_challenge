import React, { Component } from 'react';
import Player from '@vimeo/player';
import './App.css';

const vimeoConfig = require('./VimeoConfig.js');
let count = 1;

class VideoList extends Component{
	constructor(props){
		super(props);
		this.state = {
			videoList: [],
			loading: true
		};
		this.handleClick = this.handleClick.bind(this);
		this.showMore = this.showMore.bind(this);
	}

	async componentDidMount(){

		let data;
		await vimeoConfig.generateClient();
		await vimeoConfig.getClientRequest(1,10).then(response => {
			data = response.data;
		});

		this.setState(state => ({videoList: vimeoConfig.getVideosList(data), loading: false}));
		this.props.handlerFromParant(this.state.videoList);
	}

	handleClick(event){
		let iframe = document.querySelector('iframe');
		iframe.src = "https://player.vimeo.com/video/"+event.target.alt;
		new Player(iframe);
		this.props.handlerFromParant(this.state.videoList, event.target.alt);
	}
	async showMore(event){
		count++;
		await vimeoConfig.getClientRequest(count,10).then(response => {
			let more_data = vimeoConfig.getVideosList(response.data);
			let nextState = this.state.videoList.concat(more_data);
			this.setState({videoList: nextState, loading: false});

		});
	}

	render(){
		const isLoading = this.state.loading;
		if(isLoading){
			return (<div><img src = {require('./loading.gif')}/></div>);
		}
		let array = [];
		this.state.videoList.forEach(each => {
			let list;
			list = <img src={each.image} id="img_each" key={each.uri} alt={each.uri} 
			onClick={this.handleClick}/>
			array.push(list);
		});
		array.push(React.createElement('button', {id: "more", onClick: this.showMore, key: 'more'}, "Show More"));

		return (
		<aside id="videos-list" ref="videos_list">
		{array}
		</aside>
		)
	}
}

export default VideoList;