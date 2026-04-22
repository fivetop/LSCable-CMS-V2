
document.addEventListener('DOMContentLoaded',function(){/* Examples */
(function($) {
  /*
   * Example 1:
   *
   * - no animation
   * - custom gradient
   *
   * By the way - you may specify more than 2 colors for the gradient
   */
/*  $('.first.circle').circleProgress({
    value: 0.35,
    animation: false,
    fill: {gradient: ['#ff1e41', '#ff5f43']}
  });*/
	var c3 = $('.circle3');
	var c4 = $('.circle4');
	function getWidgetDataAPI(arg, callbackfnc) {
	    $.ajax({
			url: '/api/getWidgetDataAPI/'+arg,
			dataType: 'text',
			method: 'get',
	        success: function(data) {
	        	callbackfnc(JSON.parse(data));
	        }
	    });
	}		  
	getWidgetDataAPI("PatchPanelPortUsage", callbackAPIInit);

	
	function callbackAPI(data){
		var x = data.xrate/100;
		var y = data.yrate/100;
		  c3.circleProgress('value', x).on('circle-animation-progress', function(event, progress) {
			  if(x!=1){$(this).find('strong').html(parseInt(100* x)+'%')}
			    });
		  c4.circleProgress('value', y).on('circle-animation-progress', function(event, progress) {
			  if(y!=1){$(this).find('strong').html(parseInt(100* y)+'%')}
			    });
	}
	
	function callbackAPIInit(data){
		var x = data.xrate/100;
		var y = data.yrate/100;
		var a = 100*x;
		var b = 100*y;
		c3.circleProgress({			  
			value: x, 
			size: 100,
			fill: { gradient: ['#F6B57B', '#EB6F6F'] }
			}).on('circle-animation-progress', function(event, progress) {    //라벨을 넣어줍니다.
			$(this).find('strong').html(parseInt(100* x)+'%');
			});
		  c4.circleProgress({
				value: y, 
				size: 100,
				fill: { gradient: ['#F6B57B', '#EB6F6F'] }
				}).on('circle-animation-progress', function(event, progress) {    //라벨을 넣어줍니다.
				$(this).find('strong').html(parseInt(100* y)+'%');
				});	
		  
			if(a<60){c3.circleProgress({fill:'#2cdc09'});}
			else if (a< 80){c3.circleProgress({fill:{gradient:['#81f968','#ff952b']}});}
			else {c3.circleProgress({fill:{gradient:['#ff952b','#ff2b2b']}});}
			
			if(b<60){c4.circleProgress({fill:'#2cdc09'});}
			else if (b < 80){c4.circleProgress({fill:{gradient:['#81f968','#ff952b']}});}
			else {c4.circleProgress({fill:{gradient:['#ff952b','#ff2b2b']}});}

	};

		setInterval(function() {
			var data={};
			data.xrate =100;
			data.yrate=100;
			callbackAPI(data);
			setTimeout(function(){
				getWidgetDataAPI("PatchPanelPortUsage", callbackAPI);
			}, 1000);
	  	}, 10000);

})(jQuery);
});