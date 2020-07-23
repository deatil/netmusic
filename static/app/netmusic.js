/** 
 * 系统主文件
 *
 * @create 2017-7-8
 ^ @author deatil
 */
define(function(require) {
	/** 引入核心文件 */
	var vue = require('vue');
	var vuex = require('vuex');
	var vueRouter = require('vueRouter');
	var axios = require('axios');
	
	/** 引入路由配置 */
	var routes = require('app/router/router');

	/** 定义路由 */
	const router = new vueRouter({
		//mode: 'history',
		routes
	});

	/** 添加ajax原型 */
	vue.prototype.$http = axios.create({
		baseURL: '/netmusic/',
		timeout: 1000,
		headers: {
			/*
			'Referer': 'http://music.163.com',
			'Cookie': 'appver=1.5.6',
			*/
			'Content-Type': 'application/x-www-form-urlencoded',
			'responseType': 'json',
		},
	});
	
	/** 引入核心组件 */
	vue.use(router);
	vue.use(vuex);
	vue.use(vueRouter);
	
	/** 状态管理器 */
	const store = new vuex.Store({
		modules: {
			app: require('app/store/appModule'),
			player: require('app/store/playerModule'),
		}
	});

	//var appView = require('app/component/appView');
	var musicPlayer = require('app/component/musicPlayer');

	/** app初始化 */
	const app = new vue({
		router,
		store,
		components: { 
			'netmusic-player': musicPlayer, 
		},
	});
	app.$mount('#netmusic');

});
