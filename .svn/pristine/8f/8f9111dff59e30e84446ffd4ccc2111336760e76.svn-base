
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
	var c1 = $('.circle');
	var c2 = $('.circle2');
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
	getWidgetDataAPI("rackIPUsage", callbackAPIInit);

	
	function callbackAPI(data){
		var x = data.xrate/100;
		var y = data.yrate/100;
		  c1.circleProgress('value', x).on('circle-animation-progress', function(event, progress) {
			  if(x!=1){$(this).find('strong').html(parseInt(100* x)+'%')}
			    });
		  c2.circleProgress('value', y).on('circle-animation-progress', function(event, progress) {
			  if(y!=1){$(this).find('strong').html(parseInt(100* y)+'%')}
			    });
	}
	
	function callbackAPIInit(data){
		var x = data.xrate/100;
		var y = data.yrate/100;
		var a = 100*x;
		var b = 100*y;
		  c1.circleProgress({			  
				value: x, 
				size: 100,
				fill: { gradient: ['#00A0B0', '#ffa84c'] }
				}).on('circle-animation-progress', function(event, progress) {    //라벨을 넣어줍니다.
				$(this).find('strong').html(parseInt(100* x)+'%');
				});			
		  c2.circleProgress({
				value: y, 
				size: 100,
				fill: { gradient: ['#64D4F9', '#7573bc'] }
				}).on('circle-animation-progress', function(event, progress) {    //라벨을 넣어줍니다.
				$(this).find('strong').html(parseInt(100* y)+'%');
				});	
		  
			if(a<60){c1.circleProgress({fill:'#2cdc09'});}
			else if (a< 80){c1.circleProgress({fill:{gradient:['#81f968','#ff952b']}});}
			else {c1.circleProgress({fill:{gradient:['#ff952b','#ff2b2b']}});}
			
			if(b<60){c2.circleProgress({fill:'#2cdc09'});}
			else if (b < 80){c2.circleProgress({fill:{gradient:['#81f968','#ff952b']}});}
			else {c2.circleProgress({fill:{gradient:['#ff952b','#ff2b2b']}});}
  
	};
	  
		setInterval(function() {
			var data={};
			data.xrate =100;
			data.yrate=100;
			callbackAPI(data);
			setTimeout(function(){
				getWidgetDataAPI("rackIPUsage", callbackAPI);
			}, 1000);			

	  	}, 10000);

})(jQuery);
});