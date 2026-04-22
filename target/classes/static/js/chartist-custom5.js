
document.addEventListener('DOMContentLoaded',function(){
	/*	function times(n) {
		  return Array.apply(null, new Array(n));
		}

		function seq(e, i) {
		  return i + 1;
		}

		function random() {
		  return Math.ceil(Math.random() * 100);
		}

		var seriesCount = 30;
*/
		
		function getWidgetDataAPI(arg, option, callbackfnc) {
		    $.ajax({
				url: '/api/getWidgetDataAPI/'+arg+'?device_name='+option,
				dataType: 'text',
				method: 'get',
		        success: function(data) {
		        	callbackfnc(JSON.parse(data));
		        }
		    });
		}		  
		getWidgetDataAPI("InterfaceTrafficInPeriod", "192.168.0.50", callbackAPIInit);
		var series = [];
		
		function callbackAPIInit(data){
			var list = data.traffic;

			var map = new Object(); // or var map = {};
			var mapsize = 0;
			for (var x in list){
				if(map[list[x].dispname]== undefined){
					map[list[x].dispname] = [];
					series.push(map[list[x].dispname]);
					mapsize++;
				}
				map[list[x].dispname].push(list[x].g);	
			}
			
			var seriesCount = list.length/mapsize;
			var label = Array.apply(null, Array(seriesCount)).map(function (x, i) { return i+1 });
			var chart = new Chartist.Line('.ct-dotchart', {
			  labels: label,
			  series: series
			    /*times(seriesCount).map(random),
			    times(seriesCount).map(random),
			    times(seriesCount).map(random),
			    times(seriesCount).map(random)*/
			  
			}, {
			  showLine: false,
			  axisX: {
			    showLabel: false,
			    offset: 0
			  },
			  axisY: {
			    showLabel: false,
			    offset: 0
			  }
			});

			var seq = 0;

			chart.on('created', function() {
			  seq = 0;
			});

			chart.on('draw', function(data) {
			  if(data.type === 'point') {
			    seq++;
			    
			    data.element.animate({
			      x1: {
			        from: data.x - 50,
			        to: data.x,
			        begin: seq * 50,
			        dur: 800,
			        easing: Chartist.Svg.Easing.easeOutQuint
			      },
			      opacity: {
			        from: 0,
			        to: 1,
			        begin: seq * 50,
			        dur: 300,
			      }
			    });
			  }
			});

			setInterval(function() {
			  chart.update();
			}, 60000);
			
		}	
		

});