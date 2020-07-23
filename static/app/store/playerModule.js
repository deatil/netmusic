define(function(require) {
	/** 
	 * 状态管理器 - 音乐播放器
	 *
	 * @create 2017-7-8
	 ^ @author deatil
	 */
	var player = {

		state: {
			isShow: false,
			musicIndex: 0,
			musicList: [],

			music: {
				id: 0, 
				name: '暂无播放',
				singer: '歌手',
				album: '',
				extension: '',
				file: '',
				avatar:'static/img/music/no.png',
				lrc: ''
			},
		},
		
		mutations: {
			isShow: function(state, status) {
				state.isShow = status ? true : false;
			},
			musicIndex: function(state, index) {
				state.musicIndex = index;
			},
			addToMusic: function(state, music) {
				var hasMusic = false;
				state.musicList.forEach(function(item, index) {
					if (music.id === item.id) {
						hasMusic = true;
						state.musicIndex = index;
					}
				});
				
				if (!hasMusic) {
					state.musicList.push(music);
					state.musicIndex = state.musicList.length - 1;
				}
			},			
			removeMusic: function(state, index) {
				if (state.musicIndex != index && state.musicList.length > 1) {
					state.musicList.splice(index, 1);
				} else if (state.musicList.length == 1) {
					state.musicList = [];
					state.musicIndex = 0;
					state.music = {
						id: 0, 
						name: '暂无播放',
						singer: '歌手',
						album: '',
						extension: '',
						file: '',
						avatar:'static/img/music/no.png',
						lrc: ''
					};
				}
			},
			clearMusicList: function(state) {
				state.musicList = [];
			},
			music: function(state, music) {
				state.music = music;
			},
		},
		
		actions: {
			isShow: function({ state, commit }, status) {
				commit('isShow', status)
			},			
			musicIndex: function({ state, commit }, index) {
				commit('musicIndex', index)
			},
			addToMusic: function({ state, commit, rootState }, music) {
				commit('addToMusic', music)
			},	
			removeMusic: function({ state, commit, rootState }, index) {
				commit('removeMusic', index)
			},
			clearMusicList: function({ state, commit, rootState }) {
				commit('clearMusicList')
			},
			music: function({ state, commit, rootState }, music) {
				commit('music', music)
			},
		},
		
		getters: {
			isShow: function(state) {
				return state.isShow;
			},			
			musicIndex: function(state) {
				return state.musicIndex;
			},
			musicList: function(state) {
				return state.musicList;
			},			
			music: function(state) {
				return state.music;
			},			
		}
	};
	
	return player;
});
