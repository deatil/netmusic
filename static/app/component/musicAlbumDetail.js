define(function(require) {
	/** 
	 * 音乐信息
	 *
	 * @create 2017-7-15
	 ^ @author deatil
	 */
	const musicInfo = { 
		template: '#music-album-detail',
		data: function() {
			return {
				title: '歌单详情',
				album: {},
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
			getAlbum: function() {
				var thiz = this;
				var id = this.$route.params.id;
				this.$http.get('api/album.json')
					.then(function(response) {
						var data = eval('(' + response.data + ')');
						if (data['status'] == 1) {
							thiz.musics = data['info']['musics'];
							thiz.album = data['info']['album'];
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
			this.getAlbum();
		},
		beforeRouteLeave: function(to, from, next) {
			next();
		}
	}
	
	return musicInfo;
});
