
document.addEventListener('DOMContentLoaded',function(){
$(document).on('mouseenter', '.ct-slice-donut', function () {
    $(this).css({
        'opacity': '0.8',
        'stroke-width' : '55',
        
    });
    var index = $(this).attr('id').slice(-1);
    $(".ct-label-pie").css({
        'display' : 'none'
    });
    $("#ct-label-pie-"+index).css({
        'display' : 'block'
    });
});

$(document).on('mouseleave', '.ct-slice-donut', function () {
    $(this).css({
        'opacity': '1',
        'width':'120px',
        'stroke-width':'55'
    });
});


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
getWidgetDataAPI("NFATopApp", callbackAPIInit);

function callbackAPIInit(data){
	var series = [];
	var labels = [];
	
	var topApps = JSON.parse(data.list).topApp;
	var topSrcs = JSON.parse(data.list).topSrc;
	
	for(var x in topApps){
		series.push(topApps[x][2]);
		labels.push(topApps[x][0]);
	}
	for(var x in topSrcs){
		series.push(topSrcs[x][2]);
		labels.push(topSrcs[x][0]);
	}		
	chart = new Chartist.Pie('#ct-chart', {
		  series: series,
		  labels: labels
		}, {
		  donut: true,
		    donutWidth: 55,
		    labelInterpolationFnc: function(value,index) {
		        var total = chart.data.series.reduce(function(pv, cv) { return pv + cv; }, 0);
		        return value+"\n"+ Math.round(chart.data.series[index]/total*100)+"%"
		    },
		           showLabel: true,
		  
		});
		chart.on('draw', function(data) {
		  if(data.type === 'slice') {
		    // Get the total path length in order to use for dash array animation
		    var pathLength = data.element._node.getTotalLength();

		    // Set a dasharray that matches the path length as prerequisite to animate dashoffset
		    data.element.attr({
		      'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
		    });

		    // Create animation definition while also assigning an ID to the animation for later sync usage
		    var animationDefinition = {
		      'stroke-dashoffset': {
		        id: 'anim' + data.index,
		        dur: 1000,
		        from: -pathLength + 'px',
		        to:  '0px',
		        easing: Chartist.Svg.Easing.easeOutQuint,
		        // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
		        fill: 'freeze'
		      }
		    };

		    // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
		    if(data.index !== 0) {
		      animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
		    }

		    // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
		    data.element.attr({
		      'stroke-dashoffset': -pathLength + 'px'
		    });

		    // We can't use guided mode as the animations need to rely on setting begin manually
		    // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
		    data.element.animate(animationDefinition, false);

		    data.element.attr({
		      'id': "ct-slice-pie-" + data.index
		    });

		  }else if(data.type === 'label') {
		    data.element.addClass("ct-label-pie");
		    data.element.attr({
		      dx: data.element.root().width()/2,
		      dy: data.element.root().height()/2,
		      "id": "ct-label-pie-" + data.index
		    });

		   {   
		     }
		  }
		});
		var leng = labels.length;
		var $li = $("<li><i class="+'fa fa-circle-o critical"></i>'+labels[i]+'</li>'); 
		 for(var i=0;i<leng;i++){
			 	$("#legendList").append('<li class="legend"><i class="fa fa-circle-o color'+[i]+'"></i> '+labels[i]+'</li></br>');
			  };
		// For the sake of the example we update the chart every time it's created with a delay of 8 seconds
		chart.on('created', function() {
		  if(window.__anim21278907124) {
		    clearTimeout(window.__anim21278907124);
		    window.__anim21278907124 = null;
		  }
		  
		  window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);

		});	
};



/*
var chart = new Chartist.Pie('.ct-chart', {
  series: [{
    name: 'done',
    className: 'ct-done',
    value: 10
  }, {
    name: 'outstanding',
    className: 'ct-outstanding',
    value: 5
  }]
}, {
  donut: true,
  labelInterpolationFnc: function(value) {
    var total = chart.data.series.reduce(function(prev, series) {
      return prev + series.value;
    }, 0);
    
    return Math.round(value / total * 100) + '%';
  }
});

chart.on('draw', function(ctx) {
  if(ctx.type === 'label') {
    
    if(ctx.index === 0) {
      ctx.element.attr({
        dx: ctx.element.root().width() / 2,
        dy: ctx.element.root().height() / 2
      });
    } else {
      ctx.element.remove();
    }
  }
});*/

});