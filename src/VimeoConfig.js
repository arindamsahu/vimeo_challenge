import { Vimeo } from 'vimeo/index';

const config = require('./config.js');
const client = new Vimeo(config.client_id, config.client_secret);


export function generateClient (){
	client.generateClientCredentials('public', function (err, response) {
		if (err) {
			throw err;
		}
		console.log(response);
	})
}

export  function getVideosList(data){
	let nextList = [];
		data.map(each => {
			let list = {};
			list.image = each.pictures.sizes[2].link_with_play_button;
			list.uri = each.uri.split("/")[2];
			list.description = each.description;
			list.title = each.name;
			nextList.push(list);
		});
		return nextList;
}

export async function getClientRequest(start, perPage){
	let data;
	let promise = new Promise((resolve, reject) => {
		client.request({
			path: '/channels/animation/videos',
			query: {
				page: start,
				per_page: perPage,
				fields: 'uri,name,description,duration,pictures,headers'
			}
		},function (error, body, status_code, headers) {
			if (error) {
				console.log('error');
				console.log(error);
			} else {
				data =  body;
				resolve();
			}
		});
	});
	await promise;
	return data;
}