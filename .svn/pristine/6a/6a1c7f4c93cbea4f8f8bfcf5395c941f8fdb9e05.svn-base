
document.addEventListener('DOMContentLoaded',function(){
	function times(n) {
		  return Array.apply(null, new Array(n));
		}

		function seq(e, i) {
		  return i + 1;
		}

		function random() {
		  return Math.ceil(Math.random() * 100);
		}

		var seriesCount = 30;

		var chart = new Chartist.Line('.ct-chart', {
		  labels: times(seriesCount).map(seq),
		  series: [
		    times(seriesCount).map(random),
		    times(seriesCount).map(random),
		    times(seriesCount).map(random),
		    times(seriesCount).map(random)
		  ]
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
		}, 10000);	
});