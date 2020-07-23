define(function(require) {
	/** 引入组件 */
	var musicHome = require('app/component/musicHome');
	var musicAlbum = require('app/component/musicAlbum');
	var musicAlbumDetail = require('app/component/musicAlbumDetail');
	var musicHot = require('app/component/musicHot');
	var user = require('app/component/user');
	
	/** 
	 * 路由 
	 *
	 * @create 2017-7-8
	 ^ @author deatil
	 */
	var routes = [
		/** 默认路由 */
		{ 
			path: '/', 
			component: musicHome,
			children: [
				/** 主页 */
				{
					path: '/',
					component: musicAlbum,
				},
				
				/** 热门音乐 */
				{
					path: '/hot',
					component: musicHot,
				},
		
				/** 用户信息 */
				{ 
					path: '/user', 
					name: 'user', 
					component: user 
				},
		
				/** 专辑 */
				{ 
					path: '/album/:id', 
					name: 'album', 
					component: musicAlbumDetail 
				},
			]
		},
	];
	
	return routes;
});
