
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
	var c1 = $('#logtable');
	function getRecentAlarmList(arg, callbackfnc) {
	    $.ajax({
			url: '/api/getWidgetDataAPI/'+arg,
			dataType: 'text',
			method: 'get',
	        success: function(data) {
	        	callbackfnc(JSON.parse(data));
	        }
	    });
	}
	getRecentAlarmList("RecentAlarmList", callbackAPI);
	function sleep(ms) {
		  return new Promise(resolve => setTimeout(resolve, ms));
		}
	function displayLine(item){
				var d = new Date(item.modtime);
				var n = d.toLocaleString();
				var rows = $('<tr><td class="tdlog text-center number" style="">'+item.severity+'</td>'+ 
						'<td class="tdlog text-center ipaddress">'+item.source+'</td>'+ 
						'<td class="tdlog entity">'+item.entity+'</td>'+ '<td class="tdlog long">'+item.mmessage+'</td>'+ 
						'<td class="tdlog date" >'+n+'</td>'+'</tr>');
			    rows.hide();
			    $('tr:first-child').before(rows);
			    rows.animate({
			        opacity: "show"
			    }, 2500);
			    $('tr:nth-child(5)').animate({
			        opacity: "hide"},1000);	
				var tdArr=$(".number");
				var txt;
				$.each(tdArr,function(i,val){
					txt = $(val).text();
					if (txt=="1" || txt=="Critical")$(this).addClass("badge bg-red").text('Critical');
					else if (txt=="2"|| txt=="Major")$(this).addClass("badge bg-orange").text('Major');
					else if (txt=="3"|| txt=="Minor")$(this).addClass("badge bg-yellow").text('Minor');
					else $(this).addClass("badge bg-blue").text();
					});
			    
	}
	async function callbackAPI(data){
		var list = data.list;
		var arrayLength = list.length;
		for(var i=0; i<arrayLength;i++){
			displayLine(list[i]);
			await sleep(6000);
		}
	}	
		setInterval(function() {

			getRecentAlarmList("RecentAlarmList", callbackAPI);		

	  	}, 40000);
		
})(jQuery);

});