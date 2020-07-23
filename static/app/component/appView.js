define(function(require) {
	/** 
	 * 音乐播放器 
	 *
	 * @create 2017-7-15
	 ^ @author deatil
	 */
	const appView = { 
		template: '<div id="view"></div>',
		data: function() {
			return {				
				viewUrl: 'app/view/netmusic.html',
			};
		},
		methods: {
			/**
			 * 获取html数据
			 *
			 * @create 2017-7-15
			 * @author deatil
			 */
			getText: function(url) {
				var thiz = this;
				require(['text!' + url], function(source) {
					document.getElementById('view').innerHTML = source;
				});
			},
			
			/**
			 * 字符串转dom
			 *
			 * @create 2017-7-15
			 * @author deatil
			 */
			parseStringToDom: function(string) {
				var objectElemment = document.createElement('div');
				objectElemment.innerHTML = string;
				return objectElemment.childNodes;
			},
		},
		created: function() {
			this.getText(this.viewUrl);
		},
	}
	
	return appView;
});
