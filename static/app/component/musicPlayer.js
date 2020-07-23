define(function(require) {
	/** 
	 * 音乐播放器 
	 *
	 * @create 2017-7-8
	 ^ @author deatil
	 */
	const musicPlayer = { 
		/** 播放器模板 */
		template: '#music-player',
		
		/** 播放器数据 */
		data: function() {
			return {				
				isPlaying: true,

				timeSize: '00:00',
				timeTotal: '00:00',
				timeline: 'width:0%',
				timeInterval: '',
				isTimelineFlag: false,
				
				volumeSize: '0',
				volumeTotal: '10',
				volumeStyle: 'height:0%',
				isVolumeFlag: false,
				
				lrc: '暂无歌词~', 
				lrcParsed: {}, 
				isLrcParsed: false, 
				currentTime: 0, 
				marginTop: 0, 
				isShowLrc: false, 
				
				isShowList: false,
				isShowOption: false,
	
				// 'one' => 单曲循环，'list' => 列表循环，false => 不循环
				isLoop: false, 
				loopIndex: 0, 
				isShowLoop: false, 
			};
		},
		
		computed: {
			isShow: {
				get: function() {
					return this.$store.state.player.isShow;
				},
				set: function(value) {
					this.$store.commit('isShow', value)
				}				
			},
			// 歌曲列表定位
			musicIndex: {
				get: function() {
					return this.$store.state.player.musicIndex;
				},
				set: function(index) {
					this.$store.commit('musicIndex', index)
				}	
			},
			musicList: {
				get: function() {
					return this.$store.state.player.musicList;
				},
				set: function(music) {
					this.$store.commit('addToMusic', music)
				}				
			},
			music: {
				get: function() {
					return this.$store.state.player.music;
				},
				set: function(music) {
					this.$store.commit('music', music);
				}				
			},
			removeMusicFromList: {
				get: function() {
					return true;
				},
				set: function(index) {
					this.$store.commit('removeMusic', index);
				}				
			},
			lrcs: {
				get: function() {
					if (this.$store.state.player.music.lrc !== '') {
						return this.parseLrc(this.$store.state.player.music.lrc) || null;
					} else {
						return null;
					}
				},
				set: function(index) {
					return true;
				}				
			},
			loopBtn: {
				get: function() {
					var $btnName = '不循环';
					if (this.isLoop == false) {
						$btnName = '不循环';
					} else if (this.isLoop == 'one') {
						$btnName = '单曲循环';
					} else if (this.isLoop == 'list') {
						$btnName = '列表循环';
					}
					
					return $btnName;
				}
			},
			
			isShowBar: function() {
				if (this.$store.state.player.musicList.length > 0
					&& !this.$store.state.player.isShow
				) {
					return true;
				} else {
					return false;
				}
			},
		},

		methods: {			
			/** 创建基础歌曲信息 */
			createMusic: function() {
				if (this.musicList.length < 1) {
					return ;
				}
				
				var music = this.musicList[this.musicIndex];
				if (music) {
					this.music = music;
					this.resetParsedLrc();
				}
			},
			
			/** 删除列表歌曲 */
			removeMusic: function(index) {
				this.removeMusicFromList = index;
			},
			
			/** 添加单曲到列表 */
			addToList: function(music) {
				var hasMusic = false;
				this.musicList.forEach(function(item, index) {
					if (music.id === item.id) {
						hasMusic = true;
						this.musicIndex = index;
					}
				});
				
				if (!hasMusic) {
					this.musicList.push(music);
					this.musicIndex = this.musicList.length - 1;
				}
				
				return this;
			},
		
			/** 返回 */
			back: function() {
				this.isShow = false;
			},
		
			/** 设置 */
			option: function() {
				this.isShowOption = !this.isShowOption;
			},
			
			/** 文件播放部分 */
			play: function() {
				if (!this.isPlaying) {
					this.isPlaying = true;
					this.$refs.audioMusic.play();
					
					this.startTime();
				} else {
					this.isPlaying = false;
					this.$refs.audioMusic.pause();
				
					this.stopTime();
				}
			},
			
			/** 播放上一首 */
			playPrev: function() {
				this.musicIndex --;
				if (this.musicIndex < 0) {
					this.musicIndex = this.musicList.length - 1;
				}
				
				this.music = this.musicList[this.musicIndex];
			},
			
			/** 播放下一首 */
			playNext: function() {
				this.musicIndex ++;
				if (this.musicIndex > this.musicList.length - 1) {
					this.musicIndex = 0;
				}

				this.music = this.musicList[this.musicIndex];
			},
			
			/** 开始时间 */
			startTime: function() {
				this.setInterval();
			},
			
			/** 结束时间 */
			stopTime: function() {
				clearInterval(this.timeInterval);
			},
			
			/** 显示时间 */
			setInterval: function() {
				var thiz = this;
				this.timeInterval = setInterval(function () {
					/**
					if (!thiz.$refs.hasOwnProperty('audioMusic')) {
					*/
					if (typeof(thiz.$refs.audioMusic) == 'undefined') {
						thiz.clearInterval();
					} else {
						var currentTime = thiz.$refs.audioMusic.currentTime;
						thiz.setTimeShow(currentTime);
						thiz.showLrc(currentTime);
					}
				}, 1000);
			},
			
			/** 设置播放时间 */
			setTimeShow: function(t) {
				t = Math.floor(t);
				var playTime = this.secondToMin(this.$refs.audioMusic.currentTime);
				this.timeSize = playTime;
				if (this.$refs.audioMusic.duration) {
					this.timeTotal = this.secondToMin(this.$refs.audioMusic.duration);
					this.timeline = 'width:' + (t/this.$refs.audioMusic.duration).toFixed(4)*100 + "%";
				} else {
					this.timeTotal = this.secondToMin(0);
					this.timeline = "width: 0%";
				}
			},
			
			/** 格式化时间 */
			secondToMin: function(s) {
				var MM = Math.floor(s / 60);
				var SS = s % 60;
				if (MM < 10) {
					MM = "0" + MM;
				}
				if (SS < 10) {
					SS = "0" + SS;
				}
				var min = MM + ":" + SS;
				return min.split('.')[0];
			},
			
			/** 取消时间显示 */
			clearInterval: function() {
				clearInterval(this.timeInterval);
			},
			
			/** 显示歌词 */
			showLrc: function(currentTime) {
				var textTemp;
				var userCurrentTime = Math.round(currentTime);
				let lrc = this.lrcParsed[userCurrentTime];
				if (lrc) {
					let text = lrc.text;
					if (text != textTemp) {
						this.lrc = text;
						textTemp = text;
						
						this.currentTime = userCurrentTime;
				
						let top = Math.min(0, -lrc.top);
						this.marginTop = top;
					}
				}
			},
			
			/** 循环音乐 */
			loopMusic: function() {
				var thiz = this;
				this.$refs.audioMusic.removeEventListener('ended', function() {});
				if (this.isLoop == false) {
					this.$refs.audioMusic.loop = false;
					this.$refs.audioMusic.addEventListener('ended', function() {
						thiz.isPlaying = false;
					});
				} else if (this.isLoop == 'one') {
					this.$refs.audioMusic.loop = true;
				} else if (this.isLoop == 'list') {
					if (this.musicList.length < 2) {
						this.$refs.audioMusic.loop = true;
					} else {
						this.$refs.audioMusic.loop = false;
						this.$refs.audioMusic.addEventListener('ended', function() {
							thiz.playNext();
							thiz.$refs.audioMusic.currentTime = 0;
						});
					}
				} 
			},
			
			/** 循环切换 */
			changeLoop: function() {
				var thiz = this;
				this.isShowLoop = true;
				setTimeout(function() {
					thiz.isShowLoop = false;
				}, 1000);
				
				this.loopIndex ++;
				if (this.loopIndex > 2) {
					this.loopIndex = 0;
				}
				if (this.loopIndex == 0) {
					this.isLoop = false;
				} else if (this.loopIndex == 1) {
					this.isLoop = 'one';
				} else if (this.loopIndex == 2) {
					this.isLoop = 'list';
				}
				
				this.loopMusic();
			},
			
			/** 面板切换 */
			showPanel: function() {
				this.isShowLrc = !this.isShowLrc
			},
			
			/** 歌曲改变时 */
			changeMusic: function() {
				this.resetParsedLrc();
			},
			
			/** 更改时重设歌词 */
			resetParsedLrc: function() {
				this.lrc = this.music['name'] + ' - ' + this.music['singer'];
				
				if (this.music['lrc']) {
					var lrcParsed = this.parseLrc(this.music['lrc']);
					this.lrcParsed = this.getParsedLrc(lrcParsed);
				}
			},
			
			/** 拖动时间条 */
			timelineMouseDown: function() {
				this.isTimelineFlag = true;
			},
			timelineMouseUp: function() {
				this.isTimelineFlag = false;
			},
			timelineMouseMove: function(e) {
				if (this.musicList.length < 1) {
					return ;
				}
				
				var thiz = this.$refs.timeline;
				if (e.changedTouches) {
					var x = e.changedTouches[0].clientX - thiz.offsetLeft;
				} else {
					var x = e.clientX - thiz.offsetLeft;
					if (!this.isTimelineFlag) {
						return false;
					}
				}
				var X = x < 0 ? 0 : x ;
				var W = thiz.offsetWidth;
				var place = X > W ? W : X;
		
				this.$refs.audioMusic.currentTime = (place/W).toFixed(2) * this.$refs.audioMusic.duration;
				this.timeline = 'width:' + (place/W).toFixed(2)*100 + "%";
			},
			
			/** 改变音量 */
			volumeMouseDown: function(e) {
				this.isVolumeFlag = true;
			},
			volumeMouseUp: function() {
				this.isVolumeFlag = false;
			},
			volumeMouseMove: function(e) {
				/* volume音量在0-1之间 */
				var thiz = this.$refs.volume;
				if (e.changedTouches) {
					var y = e.changedTouches[0].clientY - this.getOffsetPosition(thiz).top;
				} else {
					var y = e.clientY - this.getOffsetPosition(thiz).top;
					if (!this.isVolumeFlag) {
						return false;
					}
				}
				var Y = y < 0 ? 0 : y ;
				var H = thiz.offsetHeight;
				var place = Y > H ? H : Y;

				this.$refs.audioMusic.volume = ((H - place)/H).toFixed(2);
				
				this.volumeSize = Math.floor(((H - place)/H).toFixed(2) * 10);
				this.volumeStyle = 'height:' + (1 - (place/H).toFixed(2)) * 100 + "%";
			},
			resetVolume: function() {
				this.volumeSize = this.$refs.audioMusic.volume * 10;
				this.volumeStyle = 'height:' + this.$refs.audioMusic.volume*100 + "%";
			},
			
			/** 获取最终位置 */
			getOffsetPosition: function(element) {
				var posTop = 0, 
					posLeft = 0;
				do {
					posTop += element.offsetTop;
					posLeft += element.offsetLeft;
					element = element.offsetParent;
				} while(element);
				
				return {
					top: posTop,
					left: posLeft,
				};
			},
			
			/** 解析歌词 */
			parseLrc: function(lrc) {
				var lrcs = lrc.split("\n");
				var lrcObj = {};
				for (var i = 0; i < lrcs.length; i++) {
					var lrc = decodeURIComponent(lrcs[i]);
					var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
					var timeRegExpArr = lrc.match(timeReg);
					if (!timeRegExpArr) {
						continue;
					}
					var clause = lrc.replace(timeReg, '');
					for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
						var t = timeRegExpArr[k];
						var min = Number(String(t.match(/\[\d*/i)).slice(1)),
						sec = Number(String(t.match(/\:\d*/i)).slice(1));
						var time = min * 60 + sec;
						lrcObj[time] = clause;
					}
				}
				return lrcObj;
			},
			
			/** 保存歌词索引内容偏移位置 */
			getParsedLrc: function(lrc) {
				let i = 0
				if (lrc.length <= 0) {
					return
				}

				//用数组保存lyric的键并排序
				var arr = []
				for (let k in lrc) {
					arr.push(parseInt(k))
				}
				
				var parsed = [];

				//循环数组来为parsed赋值
				arr.sort(function(a, b) {
					return (a - b);
				}).forEach(function(v, i) {
					parsed[v] = {
						index: i++,
						text: lrc[v],
						top: (i * 25) * 1
					}
				});
				
				return parsed;
			},
			
			/** 歌单 */
			showList: function() {
				this.isShowList = !this.isShowList;
			},
			selectMusic: function(id) {
				this.music = this.musicList[id];
				this.isShowList = false;
				this.musicIndex = id;
			},
			
			/** 关闭底部bar */
			closeMusicBar: function() {
				this.isShow = true;
			},
		},
		created: function() {
			/*
			this.addToList({
				id:21, 
				name:'刃心',
				singer:'刃心者',
				album:'刃心集',
				extension:'mp3',
				file:'musics/music/12.mp3',
				avatar:'musics/avatar/12.jpg',
				lrc:''
			});
			*/
	
			this.createMusic();

			this.$nextTick(function() {
				this.startTime();
				this.resetVolume();
				this.loopMusic();
			});
		},
		beforeRouteLeave: function(to, from, next) {
			this.clearInterval();
			next();
		},
		watch: {
			music: function() {
				this.isPlaying = true;
				this.changeMusic();
			},
		},
	}
	
	return musicPlayer;
});
