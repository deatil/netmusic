define(function(require) {
	/** 
	 * 主页
	 *
	 * @create 2017-7-8
	 ^ @author deatil
	 */
	var BScroll = require('bscroll');

	var musicHome = { 

		template: '#music-home',
		
		data: function() {
			return {
				scroller: '',
			};
		},
		
		computed: {
			name: {
				get: function() {
					return this.$store.state.app.name;
				},
				set: function(value) {
					this.$store.commit('setName', value)
				}				
			},
			keywords: {
				get: function() {
					return this.$store.state.app.keywords;
				},
				set: function(value) {
					this.$store.commit('setKeywords', value)
				}				
			},
			description: {
				get: function() {
					return this.$store.state.app.description;
				},
				set: function(value) {
					this.$store.commit('setDescription', value)
				}				
			},
			author: {
				get: function() {
					return this.$store.state.app.author;
				},
				set: function(value) {
					this.$store.commit('setAuthor', value)
				}				
			},
			ver: {
				get: function() {
					return this.$store.state.app.ver;
				},
				set: function(value) {
					this.$store.commit('setVer', value)
				}				
			},
			debug: {
				get: function() {
					return this.$store.state.app.debug;
				},
				set: function(value) {
					this.$store.commit('setDebug', value)
				}				
			},
		},
		
		methods: {
			createApp: function() {
				document.title = this.name;
				
				var meta = document.getElementsByTagName('meta');
				meta['keywords'].setAttribute('content', this.keywords);
				meta['description'].setAttribute('content', this.description);
				meta['author'].setAttribute('content', this.author);
				meta['ver'].setAttribute('content', this.ver);
				
				if (this.debug) {
					var debug = require('debug');
					
					/** 开启调试 */
					debug.init();
				}
			},
			getTitle: function(data) {
				this.title = data;
			},
			initScroll: function() {
				this.scroller = new BScroll(this.$refs.scrollWrapper, {
					scrollY: true, //滚动方向为 Y 轴
					resizePolling: true,
					click: true,
					resizePolling: 20,
				});
			},
		},
		
		created: function() {
			this.createApp();
		},
	}
	
	return musicHome;
});
