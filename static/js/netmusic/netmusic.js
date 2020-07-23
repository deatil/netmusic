
/**
 * 应用拖动
 * 
 * @create 2017-7-8
 * @author deatil
 */
function croller_run() {
	var iscroller_id;
	function loaded() {
		setTimeout(function() {
			iscroller_id = new iScroll("iscroller", {
				bounce: true,
				checkDOMChanges: true,
				onBeforeScrollStart: function (e) {
					var target = e.target;
					while (target.nodeType != 1) {
						target = target.parentNode;
					}

					if (target.tagName != 'SELECT' 
						&& target.tagName != 'INPUT' 
						&& target.tagName != 'TEXTAREA'
					) {
						e.preventDefault();
					}
				},
			});
		}, 100);
	}

	document.addEventListener('touchmove', function (e) { 
		e.preventDefault(); 
	}, false);
	document.addEventListener('DOMContentLoaded', function () { 
		setTimeout(loaded, 200); 
	}, false);
	
}


