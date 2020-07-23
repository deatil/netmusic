define(function(require) {
	/** 
	 * 音乐列表
	 *
	 * @create 2017-7-8
	 ^ @author deatil
	 */
	var musicList = { 
		template: '#music-album',
		data: function() {
			return {
				title: '推荐歌单',
				musics: [],
			};
		},
		methods: {
			getMusics: function() {
				var useThis = this;
				this.$http.get('api/albums.json')
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
		},
		created: function() {
			this.getMusics();
		},
	}
	
	return musicList;
});
