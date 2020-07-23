define(function(require) {
	/** 
	 * 主页 - 热门音乐 
	 *
	 * @create 2017-7-12
	 ^ @author deatil
	 */
	var musicHot = { 
		template: '#music-hot', 
		data: function() {
			return {
				title: '热门音乐',
				musics: [],
			};
		},
		computed: {
			addMusic: {
				get: function() {
					return this.$store.state.player.musicList;
				},
				set: function(music) {
					this.$store.dispatch('isShow', true);
					this.$store.dispatch('music', music);
					this.$store.dispatch('addToMusic', music);
				}				
			},
		},
		methods: {
			/** 返回 */
			back: function() {
				this.$router.back();
			},
			getHotMusics: function() {
				var useThis = this;
				this.$http.get('api/hot.json')
					.then(function(response) {
						var data = eval('(' + response.data + ')');
						if (data['status'] == 1) {
							useThis.musics = data['info']['musics'];
						} else {
							console.log('request fail.');
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			openPlayer: function(id) {
				var thiz = this;
				var url = 'api/music' + id + '.json';
				this.$http.get(url)
					.then(function(response) {
						var data = eval('(' + response.data + ')');
						if (data['status'] == 1) {
							thiz.addMusic = data['info'];
						} else {
							console.log('request fail.');
						}
					})
					.catch(function(err) {
						console.log(err);
					});
			},
		},
		created: function() {
			this.getHotMusics();
			this.$nextTick(function() {
				this.$parent.initScroll();
			});
		},
	}
	
	return musicHot;
});
