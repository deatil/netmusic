define(function(require) {
	/** 
	 * 状态管理器 - app描述
	 *
	 * @create 2017-7-15
	 ^ @author deatil
	 */
	var app = {

		state: {
			name: '网页云音乐',
			keywords: '网页云音乐,vue,reuqire',
			description: '网页云音乐，基于vue全家桶开发。',
			author: 'deatil',
			ver: '0.2.1',
	
			/* 调试 */
			debug: false,
		},
		
		mutations: {
			setName: function(state, value) {
				state.app.name = value;
			},
			setKeywords: function(state, value) {
				state.app.keywords = value;
			},
			setDescription: function(state, value) {
				state.app.description = value;
			},
			setAuthor: function(state, value) {
				state.app.author = value;
			},
			setVer: function(state, value) {
				state.app.ver = value;
			},
			setDebug: function(state, value) {
				state.app.debug = value;
			},
		},
		
		actions: {
			onName: function({ state, commit, rootState }, value) {
				commit('setName', value)
			},	
			onKeywords: function({ state, commit, rootState }, value) {
				commit('setKeywords', value)
			},	
			onDescription: function({ state, commit, rootState }, value) {
				commit('setDescription', value)
			},	
			onAuthor: function({ state, commit, rootState }, value) {
				commit('setAuthor', value)
			},	
			onVer: function({ state, commit, rootState }, value) {
				commit('setVer', value)
			},	
			onDebug: function({ state, commit, rootState }, value) {
				commit('setDebug', value)
			},	
		},
		
		getters: {
			name: function(state) {
				return state.name;
			},			
			keywords: function(state) {
				return state.keywords;
			},			
			description: function(state) {
				return state.description;
			},			
			author: function(state) {
				return state.author;
			},			
			ver: function(state) {
				return state.ver;
			},			
			debug: function(state) {
				return state.debug;
			},			
		}
	};
	
	return app;
});
