define(function(require) {
	/** 
	 * 用户
	 *
	 * @create 2017-7-8
	 ^ @author deatil
	 */
	var User = { 
		template: '#user',
		data: function() {
			return {
				title: '我的信息',
				user: {},
			}
		},
		methods: {
			/** 返回 */
			back: function() {
				this.$router.back();
			},
			getUserInfo: function() {
				var thiz = this;
				this.$http.get('api/user.json')
					.then(function(response) {
						var data = eval('(' + response.data + ')');
						if (data['status'] == 1) {
							thiz.user = data['info'];
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
			this.getUserInfo();
		},
		watch: {
			'$route': function(to, from) {
				// 对路由变化作出响应...
				const toDepth = to.path.split('/').length
				const fromDepth = from.path.split('/').length
				this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
			}
		},
	}
	
	return User;
});
