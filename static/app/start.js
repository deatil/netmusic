/** 
 * require 配置
 *
 * @create 2017-7-8
 ^ @author deatil
 */
require.config({
	baseUrl: "./static",
	paths: {
		vue: './js/netmusic/vue.min',
		vueRouter: './js/netmusic/vue-router.min',
		vuex: './js/netmusic/vuex.min',
		axios: './js/netmusic/axios.min',
		bscroll: './js/netmusic/bscroll',
		debug: './js/netmusic/eruda.min',

		domReady: './js/netmusic/require/domReady',
		text: './js/netmusic/require/text',
	},
	shim: {
		vueRouter: ['vue'],
		vuex: ['vue'],
	},
	packages: [
		{
			name: 'components',
			location: 'app/component',
			main: 'components',
		},
	],
});

require(['./app/netmusic']);
