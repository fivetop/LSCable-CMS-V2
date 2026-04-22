(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function __$styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var s = ht.Default.setImage;
s('ifBoard', {
    "dataBindings": [{
        "attr": "rxRate",
        "valueType": "String"
    }, {
        "attr": "txRate",
        "valueType": "String"
    }, {
        "attr": "mainColorRx",
        "valueType": "Color"
    }, {
        "attr": "mainColorTx",
        "valueType": "Color"
    }, {
        "attr": "mainFontSize",
        "valueType": "PositiveNumber"
    }, {
        "attr": "mainFontBold",
        "valueType": "String"
    }, {
        "attr": "mainFontFamily",
        "valueType": "String"
    }, {
        "attr": "mainFontColor",
        "valueType": "Color"
    }, {
        "attr": "boxWidth",
        "valueType": "PositiveNumber"
    }, {
        "attr": "boxHeight",
        "valueType": "PositiveNumber"
    }],
    "width": 100,
    "height": 20,
    /*"height": {
    	func: function (data) {
    		return data.a('usize') ? data.a('usize') * (U_HEIGHT+U_GAP) + 86 : data._height;
    	}
    },*/
    "fitSize": true,
    "comps": [{
        "type": "components/ifBoard.json",
        "rect": [0, 0, 240, 500],
        "rxRate": {
            "func": "attr@rxRate",
            "value": "11.3 M"
        },
        "txRate": {
            "func": "attr@txRate",
            "value": "1 G"
        },
        "boxWidth": {
            "func": "attr@boxWidth",
            "value": 120
        },
        "boxHeight": {
            "func": "attr@boxHeight",
            "value": 60
        },
        "mainColorRx": {
            "func": "attr@mainColorRx",
            "value": "rgb(128,201,174,1)"
        },
        "mainColorTx": {
            "func": "attr@mainColorTx",
            "value": "rgb(128,201,174,1)"
        },
        "mainFontSize": {
            "func": "attr@mainFontSize",
            "value": 14
        },
        "mainFontBold": {
            "func": "attr@mainFontBold",
            "value": ""
        },
        "mainFontFamily": {
            "func": "attr@mainFontFamily",
            "value": "sans-serif"
        },
        "mainFontColor": {
            "func": "attr@mainFontColor",
            "value": "#ffffff"
        }
    }]
});
/*
s('portBoard', {
	  "dataBindings": [
	    {
	      "attr": "displayURL",
	      "valueType": "URL",
	      "defaultValue": "displays/basic/PortStatus.json"
	    }
	  ],
	  "snapshotURL": "symbols/basic/snapshot_display.json",
	  "renderHTML": {
			func: function (data, gv, cache) {
				{    if (!cache.graphView) {        var graphView = cache.graphView = new ht.graph.GraphView();        graphView.setScrollBarVisible(false);        graphView.layoutHTML = function() {            gv.layoutHTML(data, graphView, true);            var rect = data.getRect();            if (cache.lastWidth !== graphView.getWidth() ||                cache.lastHeight !== graphView.getHeight() ||               cache.lastZoom !== graphView.getZoom()) {                cache.lastWidth = graphView.getWidth();                cache.lastHeight = graphView.getHeight();                cache.lastZoom = graphView.getZoom();               setTimeout(function() {                    graphView.fitContent(false);                }, 500);            }        };    }    var displayURL = data.a('displayURL');    if (cache.graphView.displayURL !== displayURL) {        cache.graphView.dm().clear();        cache.graphView.displayURL = displayURL;        if (displayURL) {            ht.Default.xhrLoad(displayURL, function(json) {                cache.graphView.dm().deserialize(json);                setTimeout(function() {                   cache.graphView.fitContent(true);                }, 500);           });        }    }   return cache.graphView;
			}
			}
	  },
		  //"__ht__function(data, gv, cache) {    if (!cache.graphView) {\n        var graphView = cache.graphView = new ht.graph.GraphView();\n        graphView.setScrollBarVisible(false);\n        graphView.layoutHTML = function() {\n            gv.layoutHTML(data, graphView, true);\n            var rect = data.getRect();\n            if (cache.lastWidth !== graphView.getWidth() ||\n                cache.lastHeight !== graphView.getHeight() ||\n                cache.lastZoom !== graphView.getZoom()) {\n                cache.lastWidth = graphView.getWidth();\n                cache.lastHeight = graphView.getHeight();\n                cache.lastZoom = graphView.getZoom();\n                setTimeout(function() {\n                    graphView.fitContent(false);\n                }, 500);\n            }\n        };\n    }\n    var displayURL = data.a('displayURL');\n    if (cache.graphView.displayURL !== displayURL) {\n        cache.graphView.dm().clear();\n        cache.graphView.displayURL = displayURL;\n        if (displayURL) {\n            ht.Default.xhrLoad(displayURL, function(json) {\n                cache.graphView.dm().deserialize(json);\n                setTimeout(function() {\n                    cache.graphView.fitContent(true);\n                }, 500);\n            });\n        }\n    }\n    return cache.graphView;\n}",
	  "width": 200,
	  "height": 120,
	  "scrollable": true,
	  "interactive": true,
	  "pixelPerfect": false,
	  "attachStyle": "close",
	  "comps": []
	});*/
s("bus", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADuUlEQVR4Xu2XS2hcVRzGf+ec+8hMnaRJbNQkJVRIfZS0ahobRKHu+rIPROtK1AqSLmyrVhBcZKWb1EYXBdGF+NioEVqirlSM4itiKImVoNWpj5a2ah5tJ5nk3vN3LvfOIpQJc1dZmA+++z/nu/P9z8c5ZxZXiQhLCQ38vwMsB1gOoCJ2vTi02ck1fmpFEAEBkIW/UqTTtaqw3OylJ7493P06YAGciMH83D1rG33aGzMABFYIS5TYgtEqImEK3TMKrRRCAgFBODE6dwB4C5ghQaaj95O3j49NyrwVufXIqFyZF/lnRuRiIa7R/JaU+vr+Mdn3Xl4eeTcvj5XqXcdOiRWRpwb/kFXde5pJoAFH1VzT2ZhzuVwExzFcmoWpGVtiGNVojjEp9CIorenf3caRnW0c3dXG2qYV/PJvwN1r6mjd/fQLgFMO4OJlb26p9fj+7CwZX1MMKVEW1Jo0egCeq5megcmCMF2IA41fKHLn6hzZuoYHgZpyAANCa63DlTlLjWcIQ7BWlRjXIArgaoIq9cif8Q1zIYSR38b+/NQcjobN7Q2Zdc8ObAOUAyiNwgLnLs+T812UAqM1WgSlVImQq0mp+y77P8wjAq6JL2vWLUbh2NiaY7Cx5UnguAKaNvaPnn9oU3PpCApopeJ/gQhlGKXQCqxQlR71AHhnTysTBXj5u7/JTxVxtWJXez23NWe4/40xRg51rHQAMAa0Jus7gCCACAugVFmrTrciPDp4FgEcFd8JgA9OT+L7LmgD4DkABT/HrPHwvYD113rU+hpRigUQIQ2EhX5FfDyf/Rkw8BcUsg2U7wAjB1bT+7XgukV+mghAa0SXUwI2BBvEVQAqhVGgiH1X+xEB4+d47aLD9CGoA5xyO6vB91w0IGHI9GAf8+fGAXBvuInaHQdRno/YsPJuKIXSpqJfHBetDZwCASgHWPfKBfZqMNkVaKM4/2YvG1pX0r33GQC++WKIkyeOct3DvUgQIhUCqCiAYxb1GwuHHxDeb5mEffVxgOfsADIUNQZtHMbzP9Kx8yB9fS8B0NPTw+df9rPpq1exYbDYDlThD0Epnjeax8s7MH46DwgQNTAEVijMzOK6HkA0jjR+PvM7NlxsB6rzl9ciedYDa5IK4GzdtuNYV1fXjRtuvwOAkyM/MDw8/OvHHw3uBwIqIKV/AvgNwEtCNCVsA7q3bNl6Zvv2+yRiNI605F1TBab11wMeVwMXuB7oBO5N2JloLhWQyl9lkzpgVcK6FOY0/qXH8qfZkgdYDvAftC1Oc+4ypOMAAAAASUVORK5CYII=");
s('editor.edit', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(51,153,255)",
        "shadowColor": "#1ABC9C",
        "rotation": 5.49779,
        "closePath": true,
        "points": [6, -0.83884, 0.5, 13.16116, 6.04966, 10.58206, 11.5, 13.16116, 6, -0.83884]
    }]
});
s('editor.preview', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "points": [1.9869, 6.489, 2, 2, 14, 8, 1.9869, 14, 2, 9.555]
    }]
});
s('editor.edge', {
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(61,61,61)",
        "borderJoin": "miter",
        "rect": [2, 2, 2.68327, 2.5555]
    }, {
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(61,61,61)",
        "borderJoin": "miter",
        "rect": [11.31673, 11.4445, 2.68327, 2.5555]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(61,61,61)",
        "points": [3.38484, 4.62436, 3.52786, 13.01496, 10.86963, 12.96728]
    }]
});

s('devece.alarm', {
    "width": 100,
    "height": 100,
    "blendMode": "override",
    "comps": [{
        "type": "oval",
        "background": "rgb(245,245,245)",
        "gradient": "radial.center",
        "rect": [0, 0, 100, 100]
    }]
});
s('editor.redo', {
    "background": "rgb(191,191,191)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "scaleX": -1,
        "points": [9.9945, 5.006, 6.0345, 5.006, 6.0345, 3.527, 6.0345, 3.336, 5.9255, 3.162, 5.7545, 3.078, 5.5825, 2.994, 5.3785, 3.015, 5.2275, 3.132, 2.4795, 5.264, 2.3575, 5.359, 2.2865, 5.505, 2.2865, 5.659, 2.2865, 5.813, 2.3575, 5.959, 2.4795, 6.054, 5.2275, 8.186, 5.3175, 8.256, 5.4255, 8.292, 5.5345, 8.292, 5.6095, 8.292, 5.6845, 8.275, 5.7545, 8.241, 5.9255, 8.157, 6.0345, 7.983, 6.0345, 7.792, 6.0345, 6.006, 9.9945, 6.006, 11.5445, 6.006, 12.7135, 7.296, 12.7135, 9.006, 12.7135, 10.689, 11.4815, 12.006, 9.9085, 12.006, 5.0345, 12.006, 4.7585, 12.006, 4.5345, 12.23, 4.5345, 12.506, 4.5345, 12.782, 4.7585, 13.006, 5.0345, 13.006, 9.9085, 13.006, 12.0425, 13.006, 13.7135, 11.249, 13.7135, 9.006, 13.7135, 6.763, 12.0795, 5.006, 9.9945, 5.006, 9.9945, 5.006],
        "segments": [1, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 4, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2]
    }]
});

s('editor.undo', {
    "background": "rgb(191,191,191)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "points": [9.9945, 5.006, 6.0345, 5.006, 6.0345, 3.527, 6.0345, 3.336, 5.9255, 3.162, 5.7545, 3.078, 5.5825, 2.994, 5.3785, 3.015, 5.2275, 3.132, 2.4795, 5.264, 2.3575, 5.359, 2.2865, 5.505, 2.2865, 5.659, 2.2865, 5.813, 2.3575, 5.959, 2.4795, 6.054, 5.2275, 8.186, 5.3175, 8.256, 5.4255, 8.292, 5.5345, 8.292, 5.6095, 8.292, 5.6845, 8.275, 5.7545, 8.241, 5.9255, 8.157, 6.0345, 7.983, 6.0345, 7.792, 6.0345, 6.006, 9.9945, 6.006, 11.5445, 6.006, 12.7135, 7.296, 12.7135, 9.006, 12.7135, 10.689, 11.4815, 12.006, 9.9085, 12.006, 5.0345, 12.006, 4.7585, 12.006, 4.5345, 12.23, 4.5345, 12.506, 4.5345, 12.782, 4.7585, 13.006, 5.0345, 13.006, 9.9085, 13.006, 12.0425, 13.006, 13.7135, 11.249, 13.7135, 9.006, 13.7135, 6.763, 12.0795, 5.006, 9.9945, 5.006, 9.9945, 5.006],
        "segments": [1, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 4, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2]
    }]
});
s("arrow", "data:image/png;base64,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");
s('flow-arrow', {
    "width": 75,
    "height": 45,
    "comps": [{
        "type": "triangle",
        "background": "rgb(38,226,255)",
        "borderColor": "#979797",
        "shadow": true,
        "shadowColor": "rgb(38,226,255)",
        "shadowBlur": 20,
        "shadowOffsetX": 0,
        "shadowOffsetY": 0,
        "rotation": 1.5708,
        "rect": [41.15315, 10, 30, 25]
    }, {
        "type": "rect",
        "background": "rgb(38,226,255)",
        "borderColor": "#979797",
        "rotation": 1.5708,
        "rect": [33.60473, 17.5, 10, 10]
    }, {
        "type": "rect",
        "background": "rgb(38,226,255)",
        "borderColor": "#979797",
        "rotation": 1.5708,
        "rect": [16.79364, 17.5, 10, 10]
    }, {
        "type": "rect",
        "background": "rgb(38,226,255)",
        "borderColor": "#979797",
        "rotation": 1.5708,
        "rect": [-0.01745, 17.5, 10, 10]
    }]
});
s('drop-water', {
    "width": 52,
    "height": 52,
    "comps": [{
        "type": "shape",
        "background": "rgb(0,153,255)",
        "fillRule": "evenodd",
        "shadowColor": "#1ABC9C",
        "rotation": 3.92548,
        "points": [47.76549, 9.00116, 47.75736, 9.20463, 43.83625, 26.12885, 42.28308, 30.8093, 39.58372, 38.94376, 34.47482, 46.08573, 25.78318, 46.08573, 25.78318, 46.08573, 16.6436, 46.08573, 9.23451, 38.65803, 9.23451, 29.53706, 9.23451, 29.53706, 9.23451, 20.65929, 16.61153, 15.55431, 25.00368, 13.0065, 31.39346, 11.0666, 47.76549, 9.00116, 47.76549, 9.00116],
        "segments": [1, 4, 4, 2, 4, 2, 4, 4]
    }, {
        "type": "shape",
        "background": "rgba(255,255,255,0.7)",
        "fillRule": "evenodd",
        "shadowColor": "#1ABC9C",
        "rotation": 4.02533,
        "points": [23.58481, 33.25229, 21.36937, 39.04895, 27.21875, 45.91448, 23.58481, 45.91448, 23.58481, 45.91448, 19.94346, 45.91448, 16.99156, 43.07283, 16.99156, 39.58338, 16.99156, 39.58338, 16.99156, 36.08681, 19.95087, 33.25229, 23.58481, 33.25229],
        "segments": [1, 4, 2, 4, 2, 4]
    }]
});

s('treeicon-directory', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "rgb(255,204,153)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [14.5, 14.5, 0.5, 14.5, 0.5, 1.50001, 6.5, 1.50001, 7.5, 3.50001, 14.5, 3.50001, 14.5, 14.5]
    }, {
        "type": "shape",
        "background": "rgb(255,227,199)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [0.5, 5.50001, 14.5, 5.50001, 14.5, 14.50001, 0.5, 14.50001, 0.5, 5.50001]
    }]
});
s('dir.expanded', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "rgb(255,255,255)",
        "borderWidth": 1,
        "borderColor": "rgb(51,153,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [2.35891, 10.47175, 3.3125, 6.30284, 15.5, 6.30284, 13.625, 14.5, 0.5, 14.5, 0.5, 1.5, 6.125, 1.5, 7.0625, 3.2289, 12.6875, 3.2289, 12.6875, 6.30284]
    }]
});

s('tree.icon86', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [7.99427, 3.36181, 9.02491, 3.36181, 9.86465, 4.20155, 9.86465, 5.22072, 9.86465, 6.25515, 9.02491, 7.09489, 7.99427, 7.09489, 6.96749, 7.09489, 6.12775, 6.25515, 6.12775, 5.22072, 6.12775, 4.20155, 6.97131, 3.36181, 7.99427, 3.36181, 7.99427, 3.36181, 7.99427, 3.36181, 3.93293, 7.03383, 3.93293, 7.03383, 3.68865, 6.47653, 3.54743, 5.86961, 3.54743, 5.22455, 3.54743, 4.00309, 4.05126, 2.89232, 4.85283, 2.09072, 5.65444, 1.28915, 6.76521, 0.79291, 7.99049, 0.79291, 9.21573, 0.79291, 10.32649, 1.28915, 11.13192, 2.09072, 11.93349, 2.89232, 12.42972, 4.00687, 12.42972, 5.22455, 12.42972, 5.87343, 12.29228, 6.47653, 12.04801, 7.03383, 13.59773, 7.03383, 13.7733, 7.03383, 13.92599, 7.16741, 13.94127, 7.33916, 15.32302, 14.59157, 15.36119, 14.78243, 15.23143, 14.95422, 15.04439, 14.99622, 15.02529, 14.99622, 15.0024, 15, 14.98712, 15, 0.99382, 15, 0.79531, 15, 0.63881, 14.84353, 0.63881, 14.64885, 0.63881, 14.61832, 0.64263, 14.59157, 0.65027, 14.54962, 2.03206, 7.31245, 2.07023, 7.14834, 2.21527, 7.03001, 2.37557, 7.03001, 3.93293, 7.03001, 3.93293, 7.03383, 3.93293, 7.03383, 4.32229, 7.73617, 4.32229, 7.73617, 2.99199, 7.73617, 1.76, 14, 14.26, 14, 12.98415, 7.73617, 11.67011, 7.73617, 11.59376, 7.84304, 11.07846, 8.54538, 10.36084, 9.08739, 9.54403, 9.38894, 8.46379, 10.79361, 8.26529, 11.04935, 7.90268, 11.09899, 7.65076, 10.90813, 7.60495, 10.86996, 7.56678, 10.82797, 7.54389, 10.79361, 6.46747, 9.38894, 5.63916, 9.08739, 4.92154, 8.54538, 4.40624, 7.84304, 4.32229, 7.73617, 4.32229, 7.73617, 4.32229, 7.73617, 10.31507, 2.90757, 10.31507, 2.90757, 9.7196, 2.3121, 8.89511, 1.94567, 7.99427, 1.94567, 7.08965, 1.94567, 6.26897, 2.3121, 5.67351, 2.90757, 5.08186, 3.49921, 4.70779, 4.32371, 4.70779, 5.22072, 4.70779, 5.94977, 4.94446, 6.61012, 5.34142, 7.15595, 5.73839, 7.70181, 6.31479, 8.13313, 6.97895, 8.34688, 7.08965, 8.38123, 7.19652, 8.44993, 7.27286, 8.5492, 7.99427, 9.48435, 8.71189, 8.5492, 8.71953, 8.5492, 8.78059, 8.45757, 8.87986, 8.38505, 8.99816, 8.3507, 9.66997, 8.14077, 10.24637, 7.70181, 10.64715, 7.15595, 11.04029, 6.61012, 11.27314, 5.94977, 11.27314, 5.22072, 11.26932, 4.32371, 10.90289, 3.49921, 10.31507, 2.90757, 10.31507, 2.90757, 10.31507, 2.90757, 7.99427, 4.0565, 7.99427, 4.0565, 7.35303, 4.0565, 6.82244, 4.58327, 6.82244, 5.22455, 6.82244, 5.87343, 7.35303, 6.40019, 7.99427, 6.40019, 8.64319, 6.40019, 9.15849, 5.87343, 9.15849, 5.22455, 9.16231, 4.58709, 8.63555, 4.0565, 7.99427, 4.0565, 7.99427, 4.0565, 7.99427, 4.0565],
        "segments": [1, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 4, 4, 2, 4, 2, 4, 4, 2, 4, 4, 2, 4, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 2, 4, 2, 2, 2, 1, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 2]
    }]
});
s('tree.icon87', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [12.42266, 8.84948, 12.42266, 8.51451, 12.69847, 8.23606, 13.03419, 8.23606, 13.37798, 8.23606, 13.64577, 8.51047, 13.64577, 8.84948, 13.64577, 14.8785, 13.64577, 15.22958, 13.37798, 15.5, 13.03419, 15.5, 13.01824, 15.5, 2.96976, 15.5, 2.63002, 15.5, 2.35823, 15.22958, 2.35823, 14.8785, 2.35823, 14.86642, 2.35823, 8.84948, 2.35823, 8.51451, 2.63002, 8.23606, 2.96976, 8.23606, 3.3095, 8.23606, 3.58129, 8.51047, 3.58129, 8.84948, 3.58129, 14.26511, 5.54384, 14.26511, 5.54384, 8.18762, 5.54384, 7.9778, 5.71169, 7.81233, 5.91154, 7.81233, 5.91955, 7.81233, 10.09241, 7.81233, 10.30026, 7.81233, 10.46415, 7.9778, 10.46415, 8.18762, 10.46415, 8.1957, 10.46415, 14.26511, 12.42266, 14.26511, 12.42266, 8.84948, 12.42266, 8.84948, 12.42266, 8.84948, 6.27529, 14.26511, 6.27529, 14.26511, 9.73271, 14.26511, 9.73271, 8.55083, 6.27529, 8.55083, 6.27529, 14.26511, 6.27529, 14.26511, 6.27529, 14.26511, 1.11115, 9.01086, 1.11115, 9.01086, 0.86733, 9.26512, 0.48761, 9.26512, 0.23983, 9.01086, 0, 8.78084, 0, 8.38133, 0.23983, 8.14327, 7.5703, 0.75421, 7.81413, 0.5, 8.19383, 0.5, 8.43766, 0.75421, 8.44166, 0.76229, 15.76417, 8.14327, 16, 8.38133, 16, 8.77681, 15.76417, 9.01086, 15.52034, 9.26512, 15.13263, 9.26512, 14.8928, 9.01086, 8.00198, 2.05366, 1.11115, 9.01086, 1.11115, 9.01086, 1.11115, 9.01086],
        "segments": [1, 4, 4, 2, 4, 2, 2, 4, 2, 2, 4, 4, 2, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 4, 4, 2, 4, 2, 2, 4, 4, 2, 2, 2, 2]
    }]
});
s('tree.icon88', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [13.32204, 2.99924, 6.50532, 2.99924, 6.24577, 2.99924, 6.02946, 2.77646, 6.02946, 2.49799, 6.02946, 2.21952, 6.24267, 2.00002, 6.50532, 2.00002, 13.79172, 2.00002, 14.05437, 2.00002, 14.2645, 2.21952, 14.2645, 2.49799, 14.2645, 2.51111, 14.2645, 14.49873, 14.2645, 14.78048, 14.05437, 14.99998, 13.79172, 14.99998, 13.78244, 14.99998, 2.47588, 14.99998, 2.21014, 14.99998, 2.00002, 14.78048, 2.00002, 14.49873, 2.00002, 14.48565, 2.00002, 2.49799, 2.00002, 2.21952, 2.21014, 2.00002, 2.47588, 2.00002, 2.48823, 2.00002, 4.10743, 2.00002, 4.36392, 2.00002, 4.58329, 2.21952, 4.58329, 2.49799, 4.58329, 2.77646, 4.36392, 2.99924, 4.10743, 2.99924, 2.94247, 2.99924, 2.94247, 6.69482, 4.49062, 6.69482, 4.6451, 6.69482, 4.7687, 6.82587, 4.7687, 6.99621, 4.7687, 7.16003, 4.6451, 7.29764, 4.49062, 7.29764, 2.94247, 7.29764, 2.94247, 14.00076, 7.8495, 14.00076, 7.8495, 7.29764, 6.30448, 7.29764, 6.14688, 7.29764, 6.02327, 7.16003, 6.02327, 6.99621, 6.02327, 6.82587, 6.14688, 6.69482, 6.30448, 6.69482, 8.11218, 6.69482, 8.13071, 6.69482, 8.15233, 6.69482, 9.96003, 6.69482, 10.11454, 6.69482, 10.23815, 6.82587, 10.23815, 6.99621, 10.23815, 7.16003, 10.11454, 7.29764, 9.96003, 7.29764, 8.41501, 7.29764, 8.41501, 14.00076, 13.32204, 14.00076, 13.32204, 7.29764, 11.77699, 7.29764, 11.62248, 7.29764, 11.49581, 7.16003, 11.49581, 6.99621, 11.49581, 6.82587, 11.62248, 6.69482, 11.77699, 6.69482, 13.32204, 6.69482],
        "segments": [1, 2, 4, 4, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 4, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 4, 4, 2]
    }]
});
s('tree.icon89', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [12.5208, 9.29892, 14.34309, 10.29658, 14.59294, 10.4264, 14.68292, 10.74759, 14.55632, 11.0004, 14.503, 11.09607, 14.4297, 11.17466, 14.34309, 11.21567, 8.23985, 14.57759, 8.08327, 14.65961, 7.90339, 14.65619, 7.76012, 14.57759, 1.65688, 11.21567, 1.40703, 11.08581, 1.31705, 10.76465, 1.44368, 10.50842, 1.49363, 10.41618, 1.57027, 10.34442, 1.65688, 10.29658, 3.47587, 9.29892, 1.65688, 8.29104, 1.40703, 8.15437, 1.31705, 7.84003, 1.44368, 7.58037, 1.49363, 7.49155, 1.57027, 7.42664, 1.65688, 7.37198, 3.47587, 6.37091, 1.65688, 5.363, 1.40703, 5.22975, 1.31705, 4.91202, 1.44368, 4.66601, 1.49363, 4.57035, 1.57027, 4.49517, 1.65688, 4.44736, 7.76012, 1.08198, 7.91336, 1, 8.09328, 1, 8.23985, 1.08198, 14.34309, 4.44736, 14.59294, 4.58403, 14.68292, 4.89834, 14.55632, 5.15119, 14.503, 5.24343, 14.4297, 5.31518, 14.34309, 5.363, 12.5208, 6.37091, 14.34309, 7.37198, 14.59294, 7.51204, 14.68292, 7.81954, 14.55632, 8.07578, 14.503, 8.16805, 14.4297, 8.24319, 14.34309, 8.29104, 12.5208, 9.29892, 12.5208, 9.29892, 12.5208, 9.29892, 13.03384, 10.75439, 13.03384, 10.75439, 11.45473, 9.88318, 8.24318, 11.64955, 8.18989, 11.68371, 8.13323, 11.69739, 8.07994, 11.70423, 8.06993, 11.70765, 8.02331, 11.70765, 8.01331, 11.70765, 7.99667, 11.70765, 7.98666, 11.70765, 7.94334, 11.70765, 7.93003, 11.70423, 7.88004, 11.69739, 7.82342, 11.68029, 7.76679, 11.64955, 4.55524, 9.88318, 2.97613, 10.75439, 8.00664, 13.52186, 13.03384, 10.75439, 13.03384, 10.75439, 13.03384, 10.75439, 7.99667, 10.60066, 7.99667, 10.60066, 9.67572, 9.67818, 11.35812, 8.7557, 13.03051, 7.82638, 11.45139, 6.95514, 8.23985, 8.72153, 8.18655, 8.7557, 8.12993, 8.77277, 8.0766, 8.77961, 8.0666, 8.77961, 8.01998, 8.78645, 8.00997, 8.78645, 7.99333, 8.78645, 7.98333, 8.78645, 7.94001, 8.77961, 7.9267, 8.77961, 7.87671, 8.77277, 7.82008, 8.75228, 7.76346, 8.72153, 4.55191, 6.95514, 2.9728, 7.82638, 4.64188, 8.75912, 6.32758, 9.6816, 7.99667, 10.60066, 7.99667, 10.60066, 7.99667, 10.60066, 7.99667, 7.68629, 7.99667, 7.68629, 9.67572, 6.75698, 11.35812, 5.8345, 13.03051, 4.91202, 7.99667, 2.14455, 2.96613, 4.91202, 4.64188, 5.8345, 6.32758, 6.75698, 7.99667, 7.68629, 7.99667, 7.68629, 7.99667, 7.68629],
        "segments": [1, 2, 4, 4, 2, 4, 2, 4, 4, 2, 2, 4, 4, 2, 2, 4, 4, 2, 4, 2, 4, 4, 2, 2, 4, 4, 2, 2, 2, 1, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 1, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 2, 2, 1, 2, 4, 2, 2, 4, 2, 2]
    }]
});
s('tree.icon90', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [2.65556, 8.45092, 4.3722, 8.45092, 4.53616, 8.45092, 4.66797, 8.32, 4.66797, 8.15635, 4.66797, 7.9927, 4.53616, 7.85523, 4.3722, 7.85523, 2.65556, 7.85523, 2.48841, 7.85523, 2.36304, 7.9927, 2.36304, 8.15635, 2.36304, 8.32, 2.48841, 8.45092, 2.65556, 8.45092, 2.65556, 8.45092, 2.65556, 8.45092, 2.65556, 7.3512, 2.65556, 7.3512, 4.3722, 7.3512, 4.53616, 7.3512, 4.66797, 7.22028, 4.66797, 7.05666, 4.66797, 6.88646, 4.53616, 6.75554, 4.3722, 6.75554, 2.65556, 6.75554, 2.48841, 6.75554, 2.36304, 6.88646, 2.36304, 7.05666, 2.36304, 7.22028, 2.48841, 7.3512, 2.65556, 7.3512, 2.65556, 7.3512, 2.65556, 7.3512, 14.51136, 3.5219, 14.51136, 3.5219, 10.972, 3.5219, 10.972, 2.50402, 10.972, 2.23239, 10.75018, 2, 10.48012, 2, 5.52306, 2, 5.24982, 2, 5.03444, 2.22911, 5.03444, 2.50402, 5.03444, 3.5219, 1.49508, 3.5219, 1.2218, 3.5219, 1.00002, 3.74774, 1.00002, 4.02593, 1.00002, 13.7825, 1.00002, 14.05413, 1.2218, 14.27997, 1.49508, 14.27997, 5.03444, 14.27997, 5.03444, 14.49598, 5.03444, 14.76765, 5.24982, 15, 5.52306, 15, 10.48012, 15, 10.74696, 15, 10.972, 14.77092, 10.972, 14.49598, 10.972, 14.27997, 14.51136, 14.27997, 14.78138, 14.27997, 14.99998, 14.05741, 14.99998, 13.7825, 14.99998, 4.02593, 14.99998, 3.74774, 14.7846, 3.5219, 14.51136, 3.5219, 14.51136, 3.5219, 14.51136, 3.5219, 5.03766, 13.2752, 5.03766, 13.2752, 1.98692, 13.2752, 1.98692, 4.52016, 5.03766, 4.52016, 5.03766, 13.2752, 5.03766, 13.2752, 5.03766, 13.2752, 9.9915, 13.99523, 9.9915, 13.99523, 6.02137, 13.99523, 6.02137, 3.0015, 9.9915, 3.0015, 9.9915, 13.99523, 9.9915, 13.99523, 9.9915, 13.99523, 14.0163, 13.2752, 14.0163, 13.2752, 10.972, 13.2752, 10.972, 4.52016, 14.0163, 4.52016, 14.0163, 13.2752, 14.0163, 13.2752, 14.0163, 13.2752, 2.65556, 6.25151, 2.65556, 6.25151, 4.3722, 6.25151, 4.53616, 6.25151, 4.66797, 6.12059, 4.66797, 5.95694, 4.66797, 5.79005, 4.53616, 5.65585, 4.3722, 5.65585, 2.65556, 5.65585, 2.48841, 5.65585, 2.36304, 5.79005, 2.36304, 5.95694, 2.36304, 6.12059, 2.48841, 6.25151, 2.65556, 6.25151, 2.65556, 6.25151, 2.65556, 6.25151, 4.28863, 10.80087, 4.28863, 10.80087, 4.08931, 10.59466, 3.81607, 10.4703, 3.51068, 10.4703, 3.20851, 10.4703, 2.93205, 10.59466, 2.73594, 10.80087, 2.53662, 11.0005, 2.41446, 11.27545, 2.41446, 11.58309, 2.41446, 11.88421, 2.527, 12.1624, 2.71345, 12.35551, 2.73594, 12.37186, 2.93205, 12.57807, 3.20529, 12.70243, 3.51068, 12.70243, 3.81285, 12.70243, 4.08931, 12.57807, 4.28863, 12.37186, 4.48796, 12.1722, 4.61333, 11.89729, 4.61333, 11.57981, 4.61333, 11.27872, 4.49439, 11.0136, 4.30791, 10.81067, 4.28863, 10.80087, 4.28863, 10.80087, 4.28863, 10.80087, 3.87074, 11.95292, 3.87074, 11.95292, 3.78392, 12.04131, 3.65214, 12.10674, 3.51068, 12.10674, 3.36925, 12.10674, 3.24387, 12.04456, 3.15386, 11.95292, 3.13777, 11.94312, 3.0542, 11.84821, 3.00275, 11.73036, 3.00275, 11.58637, 3.00275, 11.44562, 3.05742, 11.32125, 3.14743, 11.21978, 3.15386, 11.22633, 3.24387, 11.12814, 3.36603, 11.06596, 3.51068, 11.06596, 3.64892, 11.06596, 3.7807, 11.12487, 3.87074, 11.22633, 3.88358, 11.23289, 3.96715, 11.32452, 4.01861, 11.44562, 4.01861, 11.58309, 4.02183, 11.73036, 3.96715, 11.86128, 3.87074, 11.95292, 3.87074, 11.95292, 3.87074, 11.95292, 11.6342, 7.3512, 11.6342, 7.3512, 13.35407, 7.3512, 13.52124, 7.3512, 13.64983, 7.22028, 13.64983, 7.05666, 13.64983, 6.88646, 13.52124, 6.75554, 13.35407, 6.75554, 11.6342, 6.75554, 11.46706, 6.75554, 11.33846, 6.88646, 11.33846, 7.05666, 11.33846, 7.22028, 11.46706, 7.3512, 11.6342, 7.3512, 11.6342, 7.3512, 11.6342, 7.3512, 11.6342, 8.45092, 11.6342, 8.45092, 13.35407, 8.45092, 13.52124, 8.45092, 13.64983, 8.32, 13.64983, 8.15635, 13.64983, 7.9927, 13.52124, 7.85523, 13.35407, 7.85523, 11.6342, 7.85523, 11.46706, 7.85523, 11.33846, 7.9927, 11.33846, 8.15635, 11.33846, 8.32, 11.46706, 8.45092, 11.6342, 8.45092, 11.6342, 8.45092, 11.6342, 8.45092, 11.6342, 6.25151, 11.6342, 6.25151, 13.35407, 6.25151, 13.52124, 6.25151, 13.64983, 6.12059, 13.64983, 5.95694, 13.64983, 5.79005, 13.52124, 5.65585, 13.35407, 5.65585, 11.6342, 5.65585, 11.46706, 5.65585, 11.33846, 5.79005, 11.33846, 5.95694, 11.33846, 6.12059, 11.46706, 6.25151, 11.6342, 6.25151, 11.6342, 6.25151, 11.6342, 6.25151, 6.94719, 7.87816, 6.94719, 7.87816, 9.06246, 7.87816, 9.22642, 7.87816, 9.35819, 7.74724, 9.35819, 7.57704, 9.35819, 7.41338, 9.22642, 7.27594, 9.06246, 7.27594, 6.94719, 7.27594, 6.78002, 7.27594, 6.65143, 7.41338, 6.65143, 7.57704, 6.65143, 7.74724, 6.78002, 7.87816, 6.94719, 7.87816, 6.94719, 7.87816, 6.94719, 7.87816, 13.27371, 10.80087, 13.27371, 10.80087, 13.07439, 10.59466, 12.80115, 10.4703, 12.49254, 10.4703, 12.19355, 10.4703, 11.91388, 10.59466, 11.72102, 10.80087, 11.52492, 11.0005, 11.39954, 11.27545, 11.39954, 11.58309, 11.39954, 11.88421, 11.51848, 12.1624, 11.70493, 12.35551, 11.7178, 12.37186, 11.91388, 12.57807, 12.19037, 12.70243, 12.48932, 12.70243, 12.79471, 12.70243, 13.07117, 12.57807, 13.27049, 12.37186, 13.4666, 12.1722, 13.59197, 11.89729, 13.59197, 11.57981, 13.59197, 11.27872, 13.47944, 11.0136, 13.28655, 10.81067, 13.27371, 10.80087, 13.27371, 10.80087, 13.27371, 10.80087, 12.85579, 11.95292, 12.85579, 11.95292, 12.76578, 12.04131, 12.64041, 12.10674, 12.49254, 12.10674, 12.36073, 12.10674, 12.22892, 12.04456, 12.13569, 11.95292, 12.12285, 11.94312, 12.03925, 11.84821, 11.98461, 11.73036, 11.98461, 11.58637, 11.98461, 11.44562, 12.03925, 11.32125, 12.13891, 11.21978, 12.13891, 11.22633, 12.22892, 11.12814, 12.36073, 11.06596, 12.49576, 11.06596, 12.64363, 11.06596, 12.769, 11.12487, 12.85901, 11.22633, 12.87188, 11.23289, 12.95545, 11.32452, 13.00688, 11.44562, 13.00688, 11.58309, 13.00366, 11.73036, 12.95223, 11.86128, 12.85579, 11.95292, 12.85579, 11.95292, 12.85579, 11.95292, 6.94719, 5.178, 6.94719, 5.178, 9.06246, 5.178, 9.22642, 5.178, 9.35819, 5.04708, 9.35819, 4.88016, 9.35819, 4.71323, 9.22642, 4.58234, 9.06246, 4.58234, 6.94719, 4.58234, 6.78002, 4.58234, 6.65143, 4.71323, 6.65143, 4.88016, 6.65143, 5.04708, 6.78002, 5.178, 6.94719, 5.178, 6.94719, 5.178, 6.94719, 5.178, 6.94719, 6.53298, 6.94719, 6.53298, 9.06246, 6.53298, 9.22642, 6.53298, 9.35819, 6.39551, 9.35819, 6.23189, 9.35819, 6.06496, 9.22642, 5.93732, 9.06246, 5.93732, 6.94719, 5.93732, 6.78002, 5.93732, 6.65143, 6.06496, 6.65143, 6.23189, 6.65143, 6.39226, 6.78002, 6.53298, 6.94719, 6.53298, 6.94719, 6.53298, 6.94719, 6.53298, 8.92421, 10.89579, 8.92421, 10.89579, 8.90816, 10.88596, 8.67347, 10.64378, 8.36164, 10.49975, 8.00483, 10.49975, 7.66085, 10.49975, 7.34259, 10.63722, 7.11434, 10.86306, 7.1015, 10.88596, 6.87003, 11.11179, 6.72538, 11.44234, 6.72538, 11.80892, 6.72538, 12.1722, 6.87324, 12.49622, 7.1015, 12.72534, 7.33294, 12.96752, 7.6512, 13.11155, 8.00805, 13.11155, 8.36164, 13.11155, 8.67668, 12.96424, 8.91137, 12.72534, 8.91137, 12.72534, 9.14603, 12.4995, 9.29071, 12.1722, 9.29071, 11.80892, 9.2875, 11.45217, 9.14925, 11.1347, 8.92421, 10.89579, 8.92421, 10.89579, 8.92421, 10.89579, 8.49345, 12.2966, 8.49345, 12.2966, 8.36808, 12.42749, 8.1945, 12.50933, 8.00483, 12.50933, 7.80872, 12.50933, 7.63514, 12.42749, 7.5162, 12.30312, 7.50977, 12.30312, 7.5162, 12.2966, 7.38761, 12.17548, 7.30723, 11.99875, 7.30723, 11.80565, 7.30723, 11.60599, 7.38761, 11.42927, 7.5162, 11.30818, 7.52261, 11.29507, 7.64798, 11.1707, 7.81838, 11.09541, 8.00161, 11.09541, 8.19771, 11.09541, 8.36486, 11.17725, 8.49023, 11.30818, 8.5031, 11.3147, 8.62204, 11.4391, 8.69277, 11.60927, 8.69277, 11.80565, 8.69599, 11.99875, 8.61882, 12.17548, 8.49345, 12.2966, 8.49345, 12.2966, 8.49345, 12.2966],
        "segments": [1, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 2, 4, 2, 4, 2, 2, 4, 2, 4, 2, 2, 4, 2, 4, 2, 2, 4, 2, 4, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 4, 4, 2, 4, 4, 2, 2, 1, 2, 4, 4, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 2]
    }]
});
s('tree.icon99', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [3.84623, 1.14709, 3.85667, 1.14709, 12.15377, 1.14709, 12.44672, 1.14709, 12.69086, 1.38079, 12.69086, 1.68422, 12.69086, 1.69117, 12.69086, 14.46986, 12.69086, 14.75586, 12.45021, 15, 12.15377, 15, 12.1398, 15, 3.84623, 15, 3.55674, 15, 3.30911, 14.75935, 3.30911, 14.46986, 3.30911, 14.45593, 3.30911, 1.68422, 3.30911, 1.38079, 3.55674, 1.14709, 3.84623, 1.14709, 3.84623, 1.14709, 3.84623, 1.14709, 6.25965, 11.9518, 6.25965, 11.9518, 6.5526, 11.9518, 6.79675, 12.18896, 6.79675, 12.4854, 6.79675, 12.7749, 6.55609, 13.02249, 6.25965, 13.02249, 5.96321, 13.02249, 5.72954, 12.77835, 5.72954, 12.4854, 5.73304, 12.18896, 5.9667, 11.9518, 6.25965, 11.9518, 6.25965, 11.9518, 6.25965, 11.9518, 6.25965, 9.55929, 6.25965, 9.55929, 6.5003, 9.55929, 6.72004, 9.65694, 6.88047, 9.80689, 7.03391, 9.97084, 7.13505, 10.19403, 7.13505, 10.4277, 7.13505, 10.66835, 7.0374, 10.88806, 6.88047, 11.04851, 6.7235, 11.20545, 6.5038, 11.30659, 6.25965, 11.30659, 6.019, 11.30659, 5.7993, 11.20894, 5.64582, 11.04851, 5.48191, 10.88806, 5.38426, 10.67185, 5.38426, 10.4277, 5.38426, 10.19403, 5.48191, 9.97084, 5.64582, 9.80689, 5.7993, 9.65694, 6.019, 9.55929, 6.25965, 9.55929, 6.25965, 9.55929, 6.25965, 9.55929, 6.42706, 10.2603, 6.42706, 10.2603, 6.3852, 10.22193, 6.32592, 10.19054, 6.25965, 10.19054, 6.19688, 10.19054, 6.13411, 10.22193, 6.09923, 10.2603, 6.05039, 10.30565, 6.02249, 10.35795, 6.02249, 10.4277, 6.02249, 10.49746, 6.05039, 10.55674, 6.09923, 10.59511, 6.13411, 10.63348, 6.19339, 10.66137, 6.25965, 10.66137, 6.32243, 10.66137, 6.3852, 10.62999, 6.42706, 10.59511, 6.46892, 10.55674, 6.49332, 10.49746, 6.49332, 10.4277, 6.49681, 10.36144, 6.46892, 10.30565, 6.42706, 10.2603, 6.42706, 10.2603, 6.42706, 10.2603, 5.7086, 8.10844, 5.7086, 8.10844, 5.53424, 8.10844, 5.38775, 7.95846, 5.38775, 7.78407, 5.38775, 7.60968, 5.53424, 7.46672, 5.7086, 7.46672, 10.29137, 7.46672, 10.46576, 7.46672, 10.61221, 7.60968, 10.61221, 7.78407, 10.61221, 7.95846, 10.46576, 8.10844, 10.29137, 8.10844, 5.7086, 8.10844, 5.7086, 8.10844, 5.7086, 8.10844, 5.7086, 5.98793, 5.7086, 5.98793, 5.53424, 5.98793, 5.38775, 5.84842, 5.38775, 5.66709, 5.38775, 5.4927, 5.53424, 5.34621, 5.7086, 5.34621, 10.29137, 5.34621, 10.46576, 5.34621, 10.61221, 5.4927, 10.61221, 5.66709, 10.61221, 5.84842, 10.46576, 5.98793, 10.29137, 5.98793, 5.7086, 5.98793, 5.7086, 5.98793, 5.7086, 5.98793, 5.7086, 3.86746, 5.7086, 3.86746, 5.53424, 3.86746, 5.38775, 3.72446, 5.38775, 3.55007, 5.38775, 3.36874, 5.53424, 3.23272, 5.7086, 3.23272, 10.29137, 3.23272, 10.46576, 3.23272, 10.61221, 3.36874, 10.61221, 3.55007, 10.61221, 3.72446, 10.46576, 3.86746, 10.29137, 3.86746, 5.7086, 3.86746, 5.7086, 3.86746, 5.7086, 3.86746, 11.62711, 2.21433, 11.62711, 2.21433, 4.37983, 2.21433, 4.37983, 13.93626, 11.62711, 13.93626, 11.62711, 2.21433, 11.62711, 2.21433, 11.62711, 2.21433],
        "segments": [1, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2]
    }]
});
s('tree.icon', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [3.46955, 11.05503, 3.29365, 11.05503, 3.14941, 11.19924, 3.14941, 11.37866, 3.14941, 13.10945, 3.14941, 13.29239, 3.29365, 13.44015, 3.46955, 13.44015, 3.64897, 13.44015, 3.7967, 13.29239, 3.7967, 13.10945, 3.7967, 11.37866, 3.80022, 11.19924, 3.64897, 11.05503, 3.46955, 11.05503, 3.46955, 11.05503, 3.46955, 11.05503, 14.95191, 10.50624, 14.95191, 10.50624, 14.95191, 10.47458, 14.95191, 10.44993, 14.94486, 10.42179, 13.74177, 3.05887, 13.69603, 2.78095, 13.56587, 2.51007, 13.38293, 2.32364, 13.17537, 2.12313, 12.91858, 1.99998, 12.59844, 1.99998, 3.35697, 1.99998, 3.04035, 1.99998, 2.7519, 2.12662, 2.54082, 2.33417, 2.5373, 2.33417, 2.34031, 2.54173, 2.21719, 2.81613, 2.21015, 3.11165, 1.01407, 10.37256, 1.0035, 10.42179, 0.99998, 10.46049, 0.99998, 10.50624, 0.99998, 13.60901, 1.03868, 14.16481, 1.39753, 14.65733, 1.97446, 14.80509, 1.9815, 14.8121, 1.98499, 14.8121, 1.99907, 14.8121, 2.00259, 14.8121, 2.01668, 14.81562, 2.03073, 14.81914, 2.03073, 14.81914, 2.04482, 14.82266, 2.04482, 14.82266, 2.05887, 14.82266, 2.06943, 14.82618, 2.087, 14.82971, 2.16793, 14.83675, 2.20311, 14.84027, 2.21719, 14.84027, 2.23124, 14.84379, 13.65733, 14.84379, 14.36793, 14.84379, 14.94486, 14.25982, 14.94486, 13.54921, 14.94486, 10.50624, 14.95191, 10.50624, 14.95191, 10.50624, 14.95191, 10.50624, 3.26199, 3.23829, 3.26199, 3.23829, 3.26904, 3.20663, 3.27256, 3.18198, 3.27256, 3.1468, 3.27256, 3.1468, 3.27256, 3.12923, 3.28309, 3.10813, 3.29717, 3.09757, 3.29717, 3.09757, 3.31126, 3.08348, 3.33587, 3.06591, 3.35345, 3.06591, 12.59492, 3.06591, 12.60196, 3.06591, 12.60901, 3.06591, 12.61605, 3.07996, 12.65123, 3.11514, 12.67232, 3.17145, 12.68289, 3.23477, 13.45681, 7.94169, 13.41811, 7.93465, 13.38645, 7.93465, 13.35832, 7.93465, 2.59361, 7.93465, 2.56195, 7.93465, 2.52325, 7.93465, 2.49508, 7.94169, 3.26199, 3.23829, 3.26199, 3.23829, 3.26199, 3.23829, 2.38253, 8.63821, 2.38253, 8.63821, 2.4388, 8.59955, 2.51973, 8.57842, 2.59709, 8.57842, 13.36184, 8.57842, 13.43924, 8.57842, 13.5096, 8.60307, 13.57644, 8.63821, 13.74529, 9.64082, 13.66789, 9.64082, 2.29456, 9.64082, 2.2242, 9.64082, 2.38253, 8.63821, 2.38253, 8.63821, 2.38253, 8.63821, 13.87897, 13.54921, 13.87897, 13.54921, 13.87897, 13.6688, 13.78047, 13.7673, 13.66085, 13.7673, 2.27699, 13.7673, 2.17145, 13.76026, 2.08, 13.6899, 2.06591, 13.57735, 2.06591, 13.57383, 2.06239, 13.57383, 2.06239, 10.92484, 2.06943, 10.80525, 2.16441, 10.71379, 2.28755, 10.71379, 13.66085, 10.71379, 13.72064, 10.71379, 13.77695, 10.73489, 13.81213, 10.77711, 13.81213, 10.77711, 13.81213, 10.77711, 13.85083, 10.81581, 13.87545, 10.86856, 13.87545, 10.92135, 13.87545, 13.54921, 13.87897, 13.54921, 13.87897, 13.54921, 11.75064, 11.1711, 11.75064, 11.1711, 11.15614, 11.1711, 10.67066, 11.65305, 10.67066, 12.24407, 10.67066, 12.83505, 11.15614, 13.32053, 11.75064, 13.32053, 12.33461, 13.32053, 12.82713, 12.83156, 12.82713, 12.24407, 12.82361, 11.65305, 12.33813, 11.1711, 11.75064, 11.1711, 11.75064, 11.1711, 11.75064, 11.1711, 11.75064, 12.66971, 11.75064, 12.66971, 11.5079, 12.66971, 11.31091, 12.47976, 11.31091, 12.24407, 11.31091, 12.00485, 11.50438, 11.81487, 11.75064, 11.81487, 11.98633, 11.81487, 12.17632, 12.00837, 12.17632, 12.24407, 12.17632, 12.47624, 11.98633, 12.66971, 11.75064, 12.66971, 11.75064, 12.66971, 11.75064, 12.66971, 5.84411, 11.05503, 5.84411, 11.05503, 5.66472, 11.05503, 5.52048, 11.19924, 5.52048, 11.37866, 5.52048, 13.10945, 5.52048, 13.29239, 5.66472, 13.44015, 5.84411, 13.44015, 6.02001, 13.44015, 6.16777, 13.29239, 6.16777, 13.10945, 6.16777, 11.37866, 6.17129, 11.19924, 6.02001, 11.05503, 5.84411, 11.05503, 5.84411, 11.05503, 5.84411, 11.05503, 4.66211, 11.05503, 4.66211, 11.05503, 4.48621, 11.05503, 4.34197, 11.19924, 4.34197, 11.37866, 4.34197, 13.10945, 4.34197, 13.29239, 4.48621, 13.44015, 4.66211, 13.44015, 4.83801, 13.44015, 4.98225, 13.29239, 4.98225, 13.10945, 4.98225, 11.37866, 4.98225, 11.19924, 4.83449, 11.05503, 4.66211, 11.05503, 4.66211, 11.05503, 4.66211, 11.05503],
        "segments": [1, 4, 2, 4, 4, 2, 4, 2, 2, 1, 2, 4, 2, 4, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 1, 2, 4, 2, 4, 2, 4, 2, 4, 4, 2, 4, 2, 4, 2, 2, 2, 1, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 1, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4, 2, 2, 4, 2, 2, 2, 1, 2, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 2, 1, 2, 4, 2, 4, 4, 2, 4, 2, 2, 1, 2, 4, 2, 4, 4, 2, 4, 2, 2]
    }]
});
s('toolbar.add.rack', {
    "background": "rgb(130,130,130)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [7.55205, 14.52911, 2.45927, 14.52911, 2.45927, 1.52086, 13.49363, 1.52086, 13.49363, 8.43478]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [8.54249, 12.50305, 14.54249, 12.50305, 11.54249, 12.50305, 11.54249, 9.50305, 11.54249, 15.50305]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 4.5, 9.50451, 4.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 7.5, 9.50451, 7.5]
    }]
});
s('toolbar.edit.rack', {
    "background": "rgb(128,128,128)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [4.97735, 14.52911, 2.45927, 14.52911, 2.45927, 1.52086, 13.49363, 1.52086, 13.49363, 3.97983, 13.49363, 13, 13.49363, 14.52911, 12.13999, 14.52911],
        "segments": [1, 2, 2, 2, 2, 1, 2, 2]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 4.5, 9.50451, 4.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 7.5, 9.50451, 7.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "closePath": true,
        "points": [13, 6, 15, 8, 9, 14.0442, 7, 14, 7, 12, 13, 6, 11.56, 7.56, 13.52, 9.48],
        "segments": [1, 2, 2, 2, 2, 2, 1, 2]
    }]
});
s('toolbar.delete', {
    "background": "rgb(89,89,89)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [5.5, 5.57173, 5.5, 12.45709]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [8.05685, 5.57173, 8.05685, 12.45709]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [10.5, 5.57173, 10.5, 12.45709]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [1, 3.18902, 15, 3.16996, 5.32652, 3.16021, 6.32652, 1.16021, 9.32652, 1.16021, 10.32652, 3.16021]
    }, {
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rect": [3.33333, 3.18902, 9.33334, 11.65078]
    }]
});

s('toolbar.file', {
    "background": "rgb(128,128,128)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rect": [0.5, 1.99999, 15, 11.91767]
    }, {
        "type": "circle",
        "background": "rgb(255,255,255)",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rect": [4.64115, 4.65804, 0.85454, 1.28473]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [1.89157, 9.10438, 5.93792, 9.10438, 7.64109, 10.37599, 9.4302, 13.65071, 9.62104, 14, 8.9583, 12.31629, 7.31819, 10.67389, 7.31819, 10.67389, 8.62615, 6.00103, 14.10843, 6.00103],
        "segments": [1, 4, 4, 4]
    }]
});
s('area.square', {
    "width": 100,
    "height": 100,
    "blendMode": "override",
    "comps": [{
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(0,166,255)",
        "rect": [1, 1, 98, 98]
    }]
});
s('area.squareView', {
    "width": 100,
    "height": 100,
    "blendMode": "override",
    "comps": [{
        "type": "rect",
        //"borderWidth": 1,
        //"borderColor": "rgb(0,166,255,0)",
        "rect": [1, 1, 98, 98]
    }]
});
s('port', {
    "dataBindings": [{
        "attr": "state.color",
        "valueType": "Color"
    }],
    "width": 24,
    "height": 20,
    "comps": [{
        "type": "rect",
        "background": "rgb(161,161,161)",
        "rect": [0, 0, 24, 20]
    }, {
        "type": "shape",
        "background": {
            "func": "attr@state.color",
            "value": "rgb(0,255,81)"
        },
        "borderColor": "rgb(150,150,150)",
        "closePath": true,
        "points": [6, 2, 6, 2, 5.52901, 3.18367, 4.52901, 4.43367, 3.52901, 5.68367, 2, 6, 2, 6, 2, 18, 22, 18, 22, 6, 22, 6, 20.59394, 5.43367, 19.59394, 4.43367, 18.59394, 3.43367, 18, 2, 18, 2],
        "segments": [1, 4, 4, 2, 2, 2, 4, 4]
    }]
});
s('port.icon', {
    "dataBindings": [{
        "attr": "device.name",
        "valueType": "String"
    }, {
        "attr": "device.port",
        "valueType": "String"
    }],
    "width": 50,
    "height": 28,
    "comps": [{
        "type": "shape",
        "background": "#727272",
        "borderWidth": 1,
        "borderColor": "#727272",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "closePath": true,
        "points": [9.29375, 6.15024, 9.29375, 20.79157, 40.70625, 20.79157, 40.70625, 6.15024, 34.03349, 6.15024, 34.03349, 4.09964, 32.07682, 4.09964, 32.07682, 1.34963, 18.59235, 1.34963, 18.59235, 4.09964, 16.64128, 4.09964, 16.64128, 6.15024]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [34.83896, 1.20218, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [31.5343, 1.20218, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [28.22963, 1.24845, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [24.92496, 1.2643, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [21.62028, 1.14005, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [18.31562, 1.14005, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [15.01095, 1.18633, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [11.70629, 1.20218, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [37.70629, 1.24845, 1.44935, 4.8815]
    }, {
        "type": "text",
        "text": {
            "func": "attr@device.port",
            "value": "1"
        },
        "align": "center",
        "color": "rgb(255,255,255)",
        "font": "10px arial, sans-serif",
        "shadow": true,
        "shadowColor": "rgb(0,58,125)",
        "shadowBlur": 2,
        "shadowOffsetX": 0,
        "shadowOffsetY": 0,
        "rect": [14, 4.14005, 21.6735, 16.15549]
    }, {
        "type": "text",
        "text": {
            "func": "attr@device.name",
            "value": "-"
        },
        "align": "center",
        "color": "#4A4A4A",
        "font": "10px arial, sans-serif",
        "scaleX": 0.75,
        "scaleY": 0.75,
        "rect": [-8.33333, 19.59022, 66.66667, 9.61117]
    }]
});
s('port.plug', {
    "width": 69,
    "height": 50,
    "comps": [{
        "type": "shape",
        "background": "rgb(89,117,194)",
        "shadowColor": "#1ABC9C",
        "points": [9.90656, 21.23659, 9.90656, 26.52803, 9.90656, 28.98977, 12.34548, 31.45182, 17.22235, 33.33014, 22.09921, 35.20847, 28.49164, 36.14781, 34.8833, 36.14781, 41.2765, 36.14781, 47.66816, 35.20847, 52.54599, 33.33014, 57.42382, 31.45182, 59.86177, 28.98977, 59.86177, 26.52803, 59.86177, 21.23659, 9.90656, 21.23659, 9.90656, 21.23659],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(89,117,194)",
        "shadowColor": "#1ABC9C",
        "points": [5.8752, 11.80832, 63.53922, 11.80832, 63.53922, 11.80832, 63.53922, 11.80832, 63.53922, 21.23659, 63.53922, 21.23659, 63.53922, 21.23659, 5.8752, 21.23659, 5.8752, 21.23659, 5.8752, 21.23659, 5.8752, 11.80832, 5.8752, 11.80832, 5.8752, 11.80832, 5.8752, 11.80832],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(89,117,194)",
        "shadowColor": "#1ABC9C",
        "points": [34.84838, 1.33211, 31.08229, 1.33211, 13.64909, 1.09051, 13.64909, 1.33211, 13.64909, 11.80832, 55.77183, 11.80832, 55.77183, 1.33211],
        "segments": [1, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(89,117,194)",
        "shadowColor": "#1ABC9C",
        "points": [30.98987, 35.90816, 38.43009, 35.90816, 38.43009, 35.90816, 38.43009, 35.90816, 38.43009, 49.52723, 38.43009, 49.52723, 38.43009, 49.52723, 30.98987, 49.52723, 30.98987, 49.52723, 30.98987, 49.52723, 30.98987, 35.90816, 30.98987, 35.90816, 30.98987, 35.90816, 30.98987, 35.90816],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }]
});
s('cable.vga', {
    "width": 50,
    "height": 28,
    "comps": [{
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [4.22204, 10.25974, 4.22204, 12.91385, 4.22204, 14.14862, 4.6932, 15.38355, 5.63534, 16.32569, 6.57748, 17.26783, 7.8124, 17.73899, 9.04718, 17.73899, 10.28225, 17.73899, 11.51703, 17.26783, 12.45935, 16.32569, 13.40168, 15.38355, 13.87266, 14.14862, 13.87266, 12.91385, 13.87266, 10.25974, 4.22204, 10.25974, 4.22204, 10.25974],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [-1.38671, 12.91431, 9.83116, 12.91431, 9.83116, 12.91431, 9.83116, 12.91431, 9.83116, 15.08569, 9.83116, 15.08569, 9.83116, 15.08569, -1.38671, 15.08569, -1.38671, 15.08569, -1.38671, 15.08569, -1.38671, 12.91431, -1.38671, 12.91431, -1.38671, 12.91431, -1.38671, 12.91431],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [2.09856, 16.02089, 1.95224, 15.87948, 1.76018, 15.80889, 1.56815, 15.80889, 1.37644, 15.80889, 1.18442, 15.87952, 1.0379, 16.02089, 0.89139, 16.1623, 0.81825, 16.34748, 0.81825, 16.53267, 0.81825, 18.94539, 2.31825, 18.94539, 2.31825, 16.53267, 2.31821, 16.34748, 2.24472, 16.1623, 2.09856, 16.02089, 2.09856, 16.02089],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [2.09854, 9.26553, 1.95201, 9.12413, 1.76027, 9.05353, 1.56823, 9.05353, 1.3765, 9.05353, 1.18445, 9.12416, 1.03793, 9.26553, 0.8914, 9.40694, 0.81825, 9.59213, 0.81825, 9.77731, 0.81825, 12.19003, 2.31806, 12.19003, 2.31806, 9.77731, 2.31825, 9.59213, 2.24491, 9.40694, 2.09854, 9.26553, 2.09854, 9.26553],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [22.75463, 3.22661, 24.25463, 3.22661, 24.25463, 3.22661, 24.25463, 3.22661, 24.25463, 24.77232, 24.25463, 24.77232, 24.25463, 24.77232, 22.75463, 24.77232, 22.75463, 24.77232, 22.75463, 24.77232, 22.75463, 3.22661, 22.75463, 3.22661, 22.75463, 3.22661, 22.75463, 3.22661],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [36.12734, 10.26101, 36.12734, 12.91511, 36.12734, 14.14989, 36.59851, 15.38481, 37.54065, 16.32695, 38.48279, 17.26909, 39.71771, 17.74026, 40.95249, 17.74026, 42.18756, 17.74026, 43.42233, 17.26909, 44.36466, 16.32695, 45.30699, 15.38481, 45.77796, 14.14989, 45.77796, 12.91511, 45.77796, 10.26101, 36.12734, 10.26101, 36.12734, 10.26101],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [40.16884, 12.91431, 51.38671, 12.91431, 51.38671, 12.91431, 51.38671, 12.91431, 51.38671, 15.08569, 51.38671, 15.08569, 51.38671, 15.08569, 40.16884, 15.08569, 40.16884, 15.08569, 40.16884, 15.08569, 40.16884, 12.91431, 40.16884, 12.91431, 40.16884, 12.91431, 40.16884, 12.91431],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [48.96206, 9.26661, 48.81574, 9.1252, 48.62368, 9.05461, 48.43165, 9.05461, 48.23994, 9.05461, 48.04792, 9.12524, 47.9014, 9.26661, 47.75489, 9.40802, 47.68175, 9.59321, 47.68175, 9.77839, 47.68175, 12.19111, 49.18175, 12.19111, 49.18175, 9.77839, 49.18171, 9.59321, 49.10822, 9.40802, 48.96206, 9.26661, 48.96206, 9.26661],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [48.96204, 16.02197, 48.81551, 15.88056, 48.62377, 15.80997, 48.43173, 15.80997, 48.24, 15.80997, 48.04795, 15.8806, 47.90143, 16.02197, 47.7549, 16.16338, 47.68175, 16.34856, 47.68175, 16.53375, 47.68175, 18.94647, 49.18156, 18.94647, 49.18156, 16.53375, 49.18175, 16.34856, 49.10841, 16.16338, 48.96204, 16.02197, 48.96204, 16.02197],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [34.94996, 12.43227, 36.44996, 12.43227, 36.44996, 12.43227, 36.44996, 12.43227, 36.44996, 15.56881, 36.44996, 15.56881, 36.44996, 15.56881, 34.94996, 15.56881, 34.94996, 15.56881, 34.94996, 15.56881, 34.94996, 12.43227, 34.94996, 12.43227, 34.94996, 12.43227, 34.94996, 12.43227],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "text",
        "text": "VGA",
        "align": "center",
        "font": "10px arial, sans-serif",
        "rect": [0, 3.36497, 50, 10.63566]
    }]
});
s('cable1', {
    "width": 50,
    "height": 28,
    "comps": [{
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [4.22204, 10.25974, 4.22204, 12.91385, 4.22204, 14.14862, 4.6932, 15.38355, 5.63534, 16.32569, 6.57748, 17.26783, 7.8124, 17.73899, 9.04718, 17.73899, 10.28225, 17.73899, 11.51703, 17.26783, 12.45935, 16.32569, 13.40168, 15.38355, 13.87266, 14.14862, 13.87266, 12.91385, 13.87266, 10.25974, 4.22204, 10.25974, 4.22204, 10.25974],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [-1.38671, 12.91431, 9.83116, 12.91431, 9.83116, 12.91431, 9.83116, 12.91431, 9.83116, 15.08569, 9.83116, 15.08569, 9.83116, 15.08569, -1.38671, 15.08569, -1.38671, 15.08569, -1.38671, 15.08569, -1.38671, 12.91431, -1.38671, 12.91431, -1.38671, 12.91431, -1.38671, 12.91431],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [2.09856, 16.02089, 1.95224, 15.87948, 1.76018, 15.80889, 1.56815, 15.80889, 1.37644, 15.80889, 1.18442, 15.87952, 1.0379, 16.02089, 0.89139, 16.1623, 0.81825, 16.34748, 0.81825, 16.53267, 0.81825, 18.94539, 2.31825, 18.94539, 2.31825, 16.53267, 2.31821, 16.34748, 2.24472, 16.1623, 2.09856, 16.02089, 2.09856, 16.02089],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [2.09854, 9.26553, 1.95201, 9.12413, 1.76027, 9.05353, 1.56823, 9.05353, 1.3765, 9.05353, 1.18445, 9.12416, 1.03793, 9.26553, 0.8914, 9.40694, 0.81825, 9.59213, 0.81825, 9.77731, 0.81825, 12.19003, 2.31806, 12.19003, 2.31806, 9.77731, 2.31825, 9.59213, 2.24491, 9.40694, 2.09854, 9.26553, 2.09854, 9.26553],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [22.75463, 3.22661, 24.25463, 3.22661, 24.25463, 3.22661, 24.25463, 3.22661, 24.25463, 24.77232, 24.25463, 24.77232, 24.25463, 24.77232, 22.75463, 24.77232, 22.75463, 24.77232, 22.75463, 24.77232, 22.75463, 3.22661, 22.75463, 3.22661, 22.75463, 3.22661, 22.75463, 3.22661],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [36.12734, 10.26101, 36.12734, 12.91511, 36.12734, 14.14989, 36.59851, 15.38481, 37.54065, 16.32695, 38.48279, 17.26909, 39.71771, 17.74026, 40.95249, 17.74026, 42.18756, 17.74026, 43.42233, 17.26909, 44.36466, 16.32695, 45.30699, 15.38481, 45.77796, 14.14989, 45.77796, 12.91511, 45.77796, 10.26101, 36.12734, 10.26101, 36.12734, 10.26101],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [40.16884, 12.91431, 51.38671, 12.91431, 51.38671, 12.91431, 51.38671, 12.91431, 51.38671, 15.08569, 51.38671, 15.08569, 51.38671, 15.08569, 40.16884, 15.08569, 40.16884, 15.08569, 40.16884, 15.08569, 40.16884, 12.91431, 40.16884, 12.91431, 40.16884, 12.91431, 40.16884, 12.91431],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [48.96206, 9.26661, 48.81574, 9.1252, 48.62368, 9.05461, 48.43165, 9.05461, 48.23994, 9.05461, 48.04792, 9.12524, 47.9014, 9.26661, 47.75489, 9.40802, 47.68175, 9.59321, 47.68175, 9.77839, 47.68175, 12.19111, 49.18175, 12.19111, 49.18175, 9.77839, 49.18171, 9.59321, 49.10822, 9.40802, 48.96206, 9.26661, 48.96206, 9.26661],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [48.96204, 16.02197, 48.81551, 15.88056, 48.62377, 15.80997, 48.43173, 15.80997, 48.24, 15.80997, 48.04795, 15.8806, 47.90143, 16.02197, 47.7549, 16.16338, 47.68175, 16.34856, 47.68175, 16.53375, 47.68175, 18.94647, 49.18156, 18.94647, 49.18156, 16.53375, 49.18175, 16.34856, 49.10841, 16.16338, 48.96204, 16.02197, 48.96204, 16.02197],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [34.94996, 12.43227, 36.44996, 12.43227, 36.44996, 12.43227, 36.44996, 12.43227, 36.44996, 15.56881, 36.44996, 15.56881, 36.44996, 15.56881, 34.94996, 15.56881, 34.94996, 15.56881, 34.94996, 15.56881, 34.94996, 12.43227, 34.94996, 12.43227, 34.94996, 12.43227, 34.94996, 12.43227],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "text",
        "text": "Cable",
        "align": "center",
        "font": "10px arial, sans-serif",
        "rect": [0, 3.36497, 50, 10.63566]
    }]
});
s('fitContent', {
    "background": "rgb(179,179,179)",
    "gridLightColor": "rgba(0,0,0,0.20)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [8.00001, 11.91764, 8.00001, 15]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "rect": [9.75, 7.24608, 2, 1.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [13.516, 6.484, 13.516, 9.51599]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "points": [8.00001, 0.99999, 8.00001, 4.08236]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [2.516, 6.4801, 2.516, 9.51209]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "rect": [4.25, 7.24608, 2, 1.5]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 3.14159,
        "rect": [7.00001, 4.5, 2, 1.5]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 6.28319,
        "rect": [7, 10, 2, 1.5]
    }]
});

s('importExport', {
    "gridLightColor": "rgba(0,0,0,0.20)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [5.01634, 3.73624, 5.01633, 12.73624]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "points": [11.02691, 3.73624, 11.02693, 12.73624]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 3.14159,
        "rect": [10.02692, 13.23625, 2, 1.5]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 6.28319,
        "rect": [4.01633, 1.58237, 2, 1.5]
    }]
});
s('toolbar.save', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "points": [3.66183, 14.5, 14.5, 14.5, 14.5, 4.83454, 10.71984, 1.5, 3.66183, 1.5, 3.66183, 6.18654, 10.71984, 6.18654, 10.71984, 1.5, 1.5, 1.5, 1.5, 14.5, 3.66183, 14.5, 3.66183, 9.03168, 12.17213, 9.03168, 12.17213, 14.5]
    }]
});
s('toolbar.ok', {
    "width": 40,
    "height": 40,
    "comps": [{
        "type": "shape",
        "points": [30.49479, 17.83854, 19.50521, 28.82813, 19.01042, 29.32292, 18.33333, 29.32292, 17.65625, 29.32292, 17.16146, 28.82813, 9.50521, 21.17188, 9.01042, 20.67708, 9.01042, 20, 9.01042, 19.32292, 9.50521, 18.82813, 12.16146, 16.17188, 12.65625, 15.67708, 13.33333, 15.67708, 14.01042, 15.67708, 14.50521, 16.17188, 18.33333, 20, 25.49479, 12.83854, 25.98958, 12.34375, 26.66667, 12.34375, 27.34375, 12.34375, 27.83854, 12.83854, 30.49479, 15.49479, 30.98958, 15.98958, 30.98958, 16.66667, 30.98958, 17.34375, 30.49479, 17.83854, 34.16667, 20, 34.16667, 16.14583, 32.26563, 12.89063, 30.36458, 9.63542, 27.10938, 7.73438, 23.85417, 5.83333, 20, 5.83333, 16.14583, 5.83333, 12.89063, 7.73438, 9.63542, 9.63542, 7.73438, 12.89063, 5.83333, 16.14583, 5.83333, 20, 5.83333, 23.85417, 7.73438, 27.10938, 9.63542, 30.36458, 12.89063, 32.26563, 16.14583, 34.16667, 20, 34.16667, 23.85417, 34.16667, 27.10938, 32.26563, 30.36458, 30.36458, 32.26563, 27.10938, 34.16667, 23.85417, 34.16667, 20, 40, 20, 40, 25.44271, 37.31771, 30.03906, 34.63542, 34.63542, 30.03906, 37.31771, 25.44271, 40, 20, 40, 14.55729, 40, 9.96094, 37.31771, 5.36458, 34.63542, 2.68229, 30.03906, 0, 25.44271, 0, 20, 0, 14.55729, 2.68229, 9.96094, 5.36458, 5.36458, 9.96094, 2.68229, 14.55729, 0, 20, 0, 25.44271, 0, 30.03906, 2.68229, 34.63542, 5.36458, 37.31771, 9.96094, 40, 14.55729, 40, 20],
        "segments": [1, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 3, 3, 2, 3, 3, 5, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5],
        "background": "rgb(179,179,179)",
        "rawPoints": [30.49479, 17.83854, 19.50521, 28.82813, 19.01042, 29.32292, 18.33333, 29.32292, 17.65625, 29.32292, 17.16146, 28.82813, 9.50521, 21.17188, 9.01042, 20.67708, 9.01042, 20, 9.01042, 19.32292, 9.50521, 18.82813, 12.16146, 16.17188, 12.65625, 15.67708, 13.33333, 15.67708, 14.01042, 15.67708, 14.50521, 16.17188, 18.33333, 20, 25.49479, 12.83854, 25.98958, 12.34375, 26.66667, 12.34375, 27.34375, 12.34375, 27.83854, 12.83854, 30.49479, 15.49479, 30.98958, 15.98958, 30.98958, 16.66667, 30.98958, 17.34375, 30.49479, 17.83854, 34.16667, 20, 34.16667, 16.14583, 32.26563, 12.89063, 30.36458, 9.63542, 27.10938, 7.73438, 23.85417, 5.83333, 20, 5.83333, 16.14583, 5.83333, 12.89063, 7.73438, 9.63542, 9.63542, 7.73438, 12.89063, 5.83333, 16.14583, 5.83333, 20, 5.83333, 23.85417, 7.73438, 27.10938, 9.63542, 30.36458, 12.89063, 32.26563, 16.14583, 34.16667, 20, 34.16667, 23.85417, 34.16667, 27.10938, 32.26563, 30.36458, 30.36458, 32.26563, 27.10938, 34.16667, 23.85417, 34.16667, 20, 40, 20, 40, 25.44271, 37.31771, 30.03906, 34.63542, 34.63542, 30.03906, 37.31771, 25.44271, 40, 20, 40, 14.55729, 40, 9.96094, 37.31771, 5.36458, 34.63542, 2.68229, 30.03906, 0, 25.44271, 0, 20, 0, 14.55729, 2.68229, 9.96094, 5.36458, 5.36458, 9.96094, 2.68229, 14.55729, 0, 20, 0, 25.44271, 0, 30.03906, 2.68229, 34.63542, 5.36458, 37.31771, 9.96094, 40, 14.55729, 40, 20],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 40,
            "height": 40
        }
    }]
});
s('toolbar.fitContent', {
    "width": 40,
    "height": 40,
    "comps": [{
        "type": "shape",
        "points": [33.41146, 10.75521, 24.16667, 20, 33.41146, 29.24479, 37.16146, 25.49479, 37.91667, 24.6875, 38.98438, 25.13021, 40, 25.57292, 40, 26.66667, 40, 38.33333, 40, 39.01042, 39.50521, 39.50521, 39.01042, 40, 38.33333, 40, 26.66667, 40, 25.57292, 40, 25.13021, 38.95833, 24.6875, 37.94271, 25.49479, 37.16146, 29.24479, 33.41146, 20, 24.16667, 10.75521, 33.41146, 14.50521, 37.16146, 15.3125, 37.94271, 14.86979, 38.95833, 14.42708, 40, 13.33333, 40, 1.66667, 40, 0.98958, 40, 0.49479, 39.50521, 0, 39.01042, 0, 38.33333, 0, 26.66667, 0, 25.57292, 1.04167, 25.13021, 2.05729, 24.6875, 2.83854, 25.49479, 6.58854, 29.24479, 15.83333, 20, 6.58854, 10.75521, 2.83854, 14.50521, 2.34375, 15, 1.66667, 15, 1.35417, 15, 1.04167, 14.86979, 0, 14.42708, 0, 13.33333, 0, 1.66667, 0, 0.98958, 0.49479, 0.49479, 0.98958, 0, 1.66667, 0, 13.33333, 0, 14.42708, 0, 14.86979, 1.04167, 15.3125, 2.05729, 14.50521, 2.83854, 10.75521, 6.58854, 20, 15.83333, 29.24479, 6.58854, 25.49479, 2.83854, 24.6875, 2.05729, 25.13021, 1.04167, 25.57292, 0, 26.66667, 0, 38.33333, 0, 39.01042, 0, 39.50521, 0.49479, 40, 0.98958, 40, 1.66667, 40, 13.33333, 40, 14.42708, 38.98438, 14.86979, 38.64583, 15, 38.33333, 15, 37.65625, 15, 37.16146, 14.50521],
        "segments": [1, 2, 2, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 2, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 2, 2, 3, 3, 2, 3, 3, 2, 3, 3, 3],
        "background": "#2A2A2A",
        "rawPoints": [33.41146, 10.75521, 24.16667, 20, 33.41146, 29.24479, 37.16146, 25.49479, 37.91667, 24.6875, 38.98438, 25.13021, 40, 25.57292, 40, 26.66667, 40, 38.33333, 40, 39.01042, 39.50521, 39.50521, 39.01042, 40, 38.33333, 40, 26.66667, 40, 25.57292, 40, 25.13021, 38.95833, 24.6875, 37.94271, 25.49479, 37.16146, 29.24479, 33.41146, 20, 24.16667, 10.75521, 33.41146, 14.50521, 37.16146, 15.3125, 37.94271, 14.86979, 38.95833, 14.42708, 40, 13.33333, 40, 1.66667, 40, 0.98958, 40, 0.49479, 39.50521, 0, 39.01042, 0, 38.33333, 0, 26.66667, 0, 25.57292, 1.04167, 25.13021, 2.05729, 24.6875, 2.83854, 25.49479, 6.58854, 29.24479, 15.83333, 20, 6.58854, 10.75521, 2.83854, 14.50521, 2.34375, 15, 1.66667, 15, 1.35417, 15, 1.04167, 14.86979, 0, 14.42708, 0, 13.33333, 0, 1.66667, 0, 0.98958, 0.49479, 0.49479, 0.98958, 0, 1.66667, 0, 13.33333, 0, 14.42708, 0, 14.86979, 1.04167, 15.3125, 2.05729, 14.50521, 2.83854, 10.75521, 6.58854, 20, 15.83333, 29.24479, 6.58854, 25.49479, 2.83854, 24.6875, 2.05729, 25.13021, 1.04167, 25.57292, 0, 26.66667, 0, 38.33333, 0, 39.01042, 0, 39.50521, 0.49479, 40, 0.98958, 40, 1.66667, 40, 13.33333, 40, 14.42708, 38.98438, 14.86979, 38.64583, 15, 38.33333, 15, 37.65625, 15, 37.16146, 14.50521],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 40,
            "height": 40
        }
    }],
    "uuid": "4233D856-0AC0-429B-87FF-FA4EF2DC4AAC"
});
s('toolbar.new', {
    "width": 34.28571,
    "height": 40,
    "comps": [{
        "type": "shape",
        "points": [32.76786, 8.48214, 33.39286, 9.10714, 33.83929, 10.17857, 34.28571, 11.25, 34.28571, 12.14286, 34.28571, 37.85714, 34.28571, 38.75, 33.66071, 39.375, 33.03571, 40, 32.14286, 40, 2.14286, 40, 1.25, 40, 0.625, 39.375, 0, 38.75, 0, 37.85714, 0, 2.14286, 0, 1.25, 0.625, 0.625, 1.25, 0, 2.14286, 0, 22.14286, 0, 23.03571, 0, 24.10714, 0.44643, 25.17857, 0.89286, 25.80357, 1.51786, 22.85714, 3.03571, 22.85714, 11.42857, 31.25, 11.42857, 31.02679, 10.78125, 30.75893, 10.51339, 23.77232, 3.52679, 23.50446, 3.25893, 22.85714, 3.03571, 31.42857, 37.14286, 31.42857, 14.28571, 22.14286, 14.28571, 21.25, 14.28571, 20.625, 13.66071, 20, 13.03571, 20, 12.14286, 20, 2.85714, 2.85714, 2.85714, 2.85714, 37.14286, 31.42857, 37.14286],
        "segments": {
            "_as": [1, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 5, 1, 2, 2, 3, 2, 3, 5, 1, 2, 2, 3, 3, 2, 2, 2, 2]
        },
        "background": "rgb(179,179,179)",
        "rawPoints": [32.76786, 8.48214, 33.39286, 9.10714, 33.83929, 10.17857, 34.28571, 11.25, 34.28571, 12.14286, 34.28571, 37.85714, 34.28571, 38.75, 33.66071, 39.375, 33.03571, 40, 32.14286, 40, 2.14286, 40, 1.25, 40, 0.625, 39.375, 0, 38.75, 0, 37.85714, 0, 2.14286, 0, 1.25, 0.625, 0.625, 1.25, 0, 2.14286, 0, 22.14286, 0, 23.03571, 0, 24.10714, 0.44643, 25.17857, 0.89286, 25.80357, 1.51786, 22.85714, 3.03571, 22.85714, 11.42857, 31.25, 11.42857, 31.02679, 10.78125, 30.75893, 10.51339, 23.77232, 3.52679, 23.50446, 3.25893, 22.85714, 3.03571, 31.42857, 37.14286, 31.42857, 14.28571, 22.14286, 14.28571, 21.25, 14.28571, 20.625, 13.66071, 20, 13.03571, 20, 12.14286, 20, 2.85714, 2.85714, 2.85714, 2.85714, 37.14286, 31.42857, 37.14286],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 34.28571,
            "height": 40
        }
    }]
});
s('toolbar.edit', {
    "background": "rgb(128,128,128)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [4.97735, 14.52911, 2.45927, 14.52911, 2.45927, 1.52086, 13.49363, 1.52086, 13.49363, 3.97983, 13.49363, 13, 13.49363, 14.52911, 12.13999, 14.52911],
        "segments": [1, 2, 2, 2, 2, 1, 2, 2]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 4.5, 9.50451, 4.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 7.5, 9.50451, 7.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "closePath": true,
        "points": [13, 6, 15, 8, 9, 14.0442, 7, 14, 7, 12, 13, 6, 11.56, 7.56, 13.52, 9.48],
        "segments": [1, 2, 2, 2, 2, 2, 1, 2]
    }]
});
s('toolbar.import.csv', {

    "width": 50,
    "height": 50,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 3,
        "borderColor": "#000000",
        "borderCap": "round",
        "points": [2, 12, 2, 45, 48, 45, 48, 12]
    }, {
        "type": "shape",
        "borderWidth": 3,
        "borderColor": "#000000",
        "borderCap": "round",
        "points": [25, 24, 25, 38.49716, 13, 32.49716, 25, 38.49716, 37, 32.49716]
    }, {
        "type": "text",
        "text": "CSV",
        "align": "center",
        "vAlign": "bottom",
        "color": "rgb(0,0,0)",
        "font": "16px arial, sans-serif",
        "rect": [0, 4, 50, 20]
    }]
});
s('toolbar.search', {
    "width": 20,
    "height": 20,
    "blendMode": "override",
    "comps": [{
        "type": "oval",
        "borderWidth": 2,
        "borderColor": "#45c4f9",
        "rect": [1.67487, 1.48648, 12.86422, 12.47105]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "#45c4f9",
        "borderCap": "round",
        "points": [12.64901, 12.21284, 18.31926, 17.88309]
    }]
});
s('switch.toggle.button', {
    "dataBindings": [],
    "width": 40,
    "height": 40,
    "comps": [{
        "type": "oval",
        "background": {
            "func": function func(data, view) {
                if (!data.a('target') || !data.a('target').a('portInfo')) {
                    return 'gray';
                } else {
                    var info = data.a('target').a('portInfo');
                    return info.ifadminstatus !== 1 ? '#7ED321' : '#D0011B';
                }
            }
        },
        "borderWidth": 1,
        "borderColor": "rgb(181,181,181)",
        "gradient": "radial.northwest",
        "rect": [1, 1, 38, 38]
    }, {
        "type": "shape",
        "background": "rgb(232,232,232)",
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "closePath": true,
        "visible": {
            "func": function func(data, view) {
                return !!data.a('target');
            },
            "value": true
        },
        "rotation": {
            "func": function func(data, view) {
                if (!data.a('target') || !data.a('target').a('portInfo')) {
                    return 0;
                } else {
                    var info = data.a('target').a('portInfo');
                    return info.ifadminstatus !== 1 ? Math.PI : 0;
                }
            }
        },
        "points": [23, 22, 22.6, 6.5, 17.4, 6.5, 17.4, 22, 12, 22, 20, 36, 28, 22]
    }]
});
s('nms.button', {
    "width": 40,
    "height": 40,
    "comps": [{
        "type": "oval",
        "background": "#FFFFFF",
        "borderWidth": 2,
        "borderColor": "#7c99bc",
        "rect": [1.167, 1, 37.833, 38]
    }, {
        "type": "roundRect",
        "background": "#7c99bc",
        "borderColor": "#979797",
        "rect": [8, 7.5, 24, 10.5]
    }, {
        "type": "oval",
        "background": "#7c99bc",
        "borderColor": "#979797",
        "borderWidthAbsolute": true,
        "rect": [5.09176, 24, 4.90824, 5]
    }, {
        "type": "oval",
        "background": "#7c99bc",
        "borderColor": "#979797",
        "borderWidthAbsolute": true,
        "rect": [30.09176, 24, 4.90824, 5]
    }, {
        "type": "oval",
        "background": "#7c99bc",
        "borderColor": "#979797",
        "borderWidthAbsolute": true,
        "rect": [17.54517, 24.5, 4.90824, 5]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "#7c99bc",
        "points": [8.57689, 24.96829, 8.57689, 24.96829, 9.29918, 22.59093, 10, 22, 10.70082, 21.40907, 28.96905, 21.40907, 30, 22, 31.03095, 22.59093, 31.92511, 25.15889, 31.92511, 25.15889],
        "segments": [1, 4, 4, 4]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "#7c99bc",
        "points": [19.99929, 17.92036, 19.99929, 26.02818]
    }]
});
s('toolbar.add.circle', {
    "gridThickLinesEvery": 7,
    "width": 25,
    "height": 25,
    "comps": [{
        "type": "oval",
        "borderWidth": 2,
        "borderColor": "rgb(237,237,237)",
        "rect": [1, 1, 23, 23]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(237,237,237)",
        "borderCap": "round",
        "points": [6.30769, 12.5, 12.5, 12.5, 12.5, 18.69231, 12.5, 12.5, 18.69231, 12.5, 12.5, 12.5, 12.5, 6.30769]
    }]
});
s('toolbar.delete.circle', {
    "width": 25,
    "height": 25,
    "comps": [{
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [10.33709, 10.25568, 10.33709, 16.79752]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [12.55402, 10.25568, 12.55402, 16.79752]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [14.66291, 10.25568, 14.66291, 16.79752]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [5.84924, 7.92905, 19.15076, 7.91094, 9.95991, 7.90167, 10.91001, 6.00146, 13.76034, 6.00146, 14.71045, 7.90167]
    }, {
        "type": "rect",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rect": [8.06616, 7.92905, 8.86768, 11.0695]
    }, {
        "type": "oval",
        "borderWidth": 2,
        "borderColor": "rgb(237,237,237)",
        "rect": [1, 1, 23, 23]
    }]
});
s('preview.next', {
    "gridThickLinesEvery": 7,
    "width": 25,
    "height": 25,
    "comps": [{
        "type": "oval",
        "background": "#FFFFFF",
        "borderWidth": 2,
        "borderColor": "#4A4A4A",
        "rect": [1, 1, 23, 23]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "#4A4A4A",
        "borderCap": "round",
        "points": [6.30769, 12.5, 18.69231, 12.5, 14, 17, 18.69231, 12.5, 14, 8]
    }]
});
s('subMapWidget', {
    "width": 100,
    "height": 100,
    "comps": [{
        "type": "shape",
        "background": "#1093c6",
        "shadowColor": "#1ABC9C",
        "points": [16.51396, 28.1234, 16.50756, 27.9244, 16.48709, 27.73755, 16.48709, 27.53343, 16.48709, 18.33706, 22.98444, 7.13147, 30.99702, 2.50449, 34.81263, 0.30266, 38.27439, 0, 40.86206, 1.26824, 47.48931, 5.16768, 48.25269, 4.52268, 49.04486, 3.9519, 49.86263, 3.47903, 53.15545, 1.57795, 55.32913, 1.14539, 57.76707, 2.66574, 60.85514, 4.94692, 61.59804, 4.32623, 62.3659, 3.77146, 63.15871, 3.31394, 66.03689, 1.65281, 68.86325, 1.58754, 70.76817, 2.62991, 83.25225, 10.25793, 81.35948, 9.29043, 78.80699, 9.49135, 75.99088, 11.11729, 74.82694, 11.78916, 73.7097, 12.65876, 72.66094, 13.66337, 72.51633, 13.27049, 72.33972, 12.91407, 72.14648, 12.57814, 72.1196, 12.53015, 72.09593, 12.48087, 72.06777, 12.43416, 71.87581, 12.12126, 71.66209, 11.83779, 71.43237, 11.57928, 71.39206, 11.53385, 71.34982, 11.4897, 71.30887, 11.44555, 71.07084, 11.19535, 70.81424, 10.9714, 70.53846, 10.77815, 70.50006, 10.75128, 70.46103, 10.72888, 70.42072, 10.70265, 68.49532, 9.43184, 65.75087, 9.51759, 62.69544, 11.28238, 61.68059, 11.86787, 60.70861, 12.61525, 59.78078, 13.45989, 59.67456, 13.55651, 59.56962, 13.65378, 59.46276, 13.75296, 58.96493, 14.22839, 58.47478, 14.72366, 58.00959, 15.25732, 57.92577, 14.85803, 57.82402, 14.4773, 57.70949, 14.11065, 57.66405, 13.96348, 57.6071, 13.82782, 57.55527, 13.68449, 57.48041, 13.47717, 57.40874, 13.26665, 57.32492, 13.07084, 57.24941, 12.89296, 57.16239, 12.72979, 57.07856, 12.56214, 57.00818, 12.42009, 56.93843, 12.27355, 56.861, 12.1379, 56.75606, 11.95169, 56.64216, 11.77893, 56.52763, 11.60552, 56.46172, 11.50698, 56.39645, 11.40651, 56.32798, 11.31181, 56.19361, 11.12689, 56.04963, 10.95284, 55.90246, 10.78327, 55.84551, 10.71864, 55.78856, 10.65274, 55.73097, 10.59067, 55.56333, 10.41278, 55.38928, 10.24449, 55.20883, 10.08644, 55.16596, 10.04869, 55.12309, 10.01157, 55.07894, 9.97446, 54.87801, 9.80745, 54.67069, 9.65196, 54.45441, 9.50991, 54.4301, 9.49263, 54.4045, 9.47791, 54.37763, 9.46128, 51.73364, 7.76623, 47.99226, 7.90381, 43.83111, 10.30784, 35.8166, 14.93418, 29.31926, 26.14041, 29.31926, 35.33614, 29.31926, 35.5409, 29.33973, 35.72774, 29.34613, 35.92611, 24.34738, 40.33488, 20.65911, 47.67752, 20.65911, 53.89204, 20.65911, 57.4165, 21.85249, 59.92355, 23.79069, 61.19884, 21.61765, 59.87108, 12.91847, 54.59463, 11.33605, 53.63545, 11.24902, 53.58746, 11.1684, 53.53371, 11.08457, 53.48251, 11.08137, 53.4806, 9.07023, 52.23347, 7.82694, 49.68994, 7.82694, 46.08933, 7.8263, 39.87353, 11.51393, 32.53154, 16.51396, 28.1234],
        "segments": [1, 4, 4, 4, 2, 4, 4, 2, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4]
    }, {
        "type": "shape",
        "background": "#48bfdd",
        "shadowColor": "#1ABC9C",
        "points": [29.34549, 35.92611, 29.33973, 35.72582, 29.31862, 35.54026, 29.31862, 35.33486, 29.31862, 26.13849, 35.81469, 14.93354, 43.82919, 10.30656, 50.79237, 6.28683, 56.60249, 8.56224, 58.00959, 15.2554, 59.42245, 13.63458, 61.00935, 12.25436, 62.6948, 11.2811, 67.30962, 8.61663, 71.22185, 9.75946, 72.6603, 13.66209, 73.70906, 12.65812, 74.8263, 11.78788, 75.99024, 11.11537, 78.80699, 9.49071, 81.35884, 9.28915, 83.25161, 10.25793, 83.85437, 10.62394, 83.86589, 10.6329, 83.87805, 10.64122, 83.88957, 10.64954, 85.54174, 11.83396, 86.55275, 14.05498, 86.55275, 17.13857, 86.55275, 23.83172, 81.82403, 31.98956, 75.99024, 35.35725, 32.32222, 60.56855, 32.32222, 60.56727, 29.19896, 62.36278, 26.37132, 62.57586, 24.27699, 61.4887, 24.25844, 61.47783, 24.2354, 61.47015, 24.21557, 61.45927, 24.13814, 61.41192, 23.99289, 61.32105, 23.78813, 61.19628, 21.85185, 59.92228, 20.65783, 57.41458, 20.65783, 53.89076, 20.65783, 47.67624, 24.3461, 40.33488, 29.34549, 35.92611],
        "segments": [1, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4]
    }, {
        "type": "shape",
        "background": "#5d7a2a",
        "shadowColor": "#1ABC9C",
        "points": [56.00868, 24.96751, 59.33286, 26.86283, 47.38181, 47.47787, 44.01668, 45.64973, 56.00868, 24.96751, 56.00868, 24.96751]
    }, {
        "type": "shape",
        "background": "#5d7a2a",
        "shadowColor": "#1ABC9C",
        "points": [53.53106, 43.92718, 53.53106, 53.29631, 50.16785, 51.46817, 50.16785, 45.87049, 53.53106, 43.92718, 53.53106, 43.92718]
    }, {
        "type": "shape",
        "background": "#97c848",
        "shadowColor": "#1ABC9C",
        "points": [47.38181, 47.47787, 59.37254, 26.79501, 71.36454, 33.63149, 65.21337, 37.18283, 65.21337, 46.55133, 53.53106, 53.29631, 53.53106, 43.92718, 47.38181, 47.47787, 47.38181, 47.47787]
    }, {
        "type": "shape",
        "background": "#f0aa29",
        "shadowColor": "#1ABC9C",
        "points": [60.95304, 53.63673, 65.82061, 50.82573, 66.28837, 50.55634, 66.71389, 50.54034, 67.04855, 50.71503, 67.06198, 50.70607, 71.10539, 53.00516, 71.09963, 53.01604, 70.76689, 52.85543, 70.35289, 52.87527, 69.8941, 53.14018, 65.02716, 55.95117, 63.95216, 56.57058, 63.08256, 58.23363, 63.08256, 59.66632, 63.08256, 64.52878, 63.08256, 65.25888, 63.30908, 65.7823, 63.67317, 66.04401, 63.67189, 66.04593, 59.68096, 63.78652, 59.68224, 63.775, 59.27207, 63.53632, 59.00844, 62.99626, 59.00844, 62.21561, 59.00844, 57.35251, 59.00908, 55.92174, 59.87932, 54.25741, 60.95304, 53.63673],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#fdf48e",
        "shadowColor": "#1ABC9C",
        "points": [65.0278, 65.99794, 69.89474, 63.18759, 70.97101, 62.56818, 71.84061, 60.90513, 71.84061, 59.4718, 71.84061, 54.60998, 71.84061, 53.17729, 70.97101, 52.51885, 69.89474, 53.13954, 65.0278, 55.94926, 63.95344, 56.56994, 63.08192, 58.23299, 63.08192, 59.66568, 63.08192, 64.52814, 63.08192, 65.96083, 63.95408, 66.61991, 65.0278, 65.99794],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#bf4616",
        "shadowColor": "#1ABC9C",
        "points": [46.6677, 61.97821, 51.53464, 59.16722, 52.00303, 58.89783, 52.42727, 58.88183, 52.76257, 59.05652, 52.77536, 59.04756, 56.81941, 61.34665, 56.81429, 61.35817, 56.48155, 61.19692, 56.06627, 61.21675, 55.60876, 61.48166, 50.74118, 64.29202, 49.66618, 64.91207, 48.79595, 66.57512, 48.79595, 68.00781, 48.79595, 72.87026, 48.79595, 73.59973, 49.0231, 74.12379, 49.3872, 74.3855, 49.38528, 74.38806, 45.39498, 72.128, 45.39626, 72.11712, 44.98546, 71.87845, 44.72119, 71.33775, 44.72119, 70.55773, 44.72119, 65.694, 44.72183, 64.26323, 45.5927, 62.59954, 46.6677, 61.97821],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#ed714a",
        "shadowColor": "#1ABC9C",
        "points": [50.74182, 74.34007, 55.6094, 71.52971, 56.68376, 70.90967, 57.55463, 69.24662, 57.55463, 67.81328, 57.55463, 62.95147, 57.55463, 61.51942, 56.68376, 60.8597, 55.6094, 61.48102, 50.74182, 64.29074, 49.66746, 64.91143, 48.79595, 66.57448, 48.79595, 68.00717, 48.79595, 72.86962, 48.79595, 74.30296, 49.66746, 74.96139, 50.74182, 74.34007],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#1a638a",
        "shadowColor": "#1ABC9C",
        "points": [32.38108, 70.32034, 37.24866, 67.50934, 37.71641, 67.24059, 38.14193, 67.22459, 38.47659, 67.39928, 38.49003, 67.38968, 42.53343, 69.68878, 42.52831, 69.70029, 42.19494, 69.53904, 41.78093, 69.55888, 41.32278, 69.82379, 36.45585, 72.63415, 35.38149, 73.25419, 34.51061, 74.9166, 34.51061, 76.35057, 34.51061, 81.21239, 34.51061, 81.94249, 34.73777, 82.46719, 35.10186, 82.72763, 35.10058, 82.73019, 31.10964, 80.47013, 31.11156, 80.45861, 30.7014, 80.22057, 30.43713, 79.68115, 30.43713, 78.89986, 30.43713, 74.03613, 30.43649, 72.60407, 31.30609, 70.94102, 32.38108, 70.32034],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#448ecd",
        "shadowColor": "#1ABC9C",
        "points": [36.45521, 82.68155, 41.32214, 79.8712, 42.39714, 79.25243, 43.26738, 77.5881, 43.26738, 76.15541, 43.26738, 71.2936, 43.26738, 69.8609, 42.39714, 69.20119, 41.32214, 69.82251, 36.45521, 72.63159, 35.38149, 73.25291, 34.50997, 74.91532, 34.50997, 76.34929, 34.50997, 81.21111, 34.50997, 82.6438, 35.38149, 83.30288, 36.45521, 82.68155],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#779340",
        "shadowColor": "#1ABC9C",
        "points": [62.68712, 69.79436, 67.55341, 66.984, 68.0218, 66.71333, 68.44668, 66.69861, 68.78134, 66.87202, 68.7935, 66.86306, 72.83819, 69.16215, 72.83243, 69.17303, 72.50097, 69.01178, 72.08569, 69.0329, 71.62689, 69.29717, 66.75996, 72.10752, 65.6856, 72.72821, 64.81472, 74.39062, 64.81472, 75.82395, 64.81472, 80.68577, 64.81472, 81.41587, 65.04252, 81.94057, 65.40597, 82.20228, 65.40341, 82.20356, 61.41504, 79.9435, 61.41631, 79.93199, 61.00487, 79.69395, 60.74124, 79.15453, 60.74124, 78.37388, 60.74124, 73.51078, 60.74188, 72.07809, 61.61212, 70.4144, 62.68712, 69.79436],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#83ae38",
        "shadowColor": "#1ABC9C",
        "points": [66.7606, 82.15621, 71.62753, 79.34522, 72.70317, 78.72645, 73.57341, 77.06212, 73.57341, 75.62943, 73.57341, 70.76761, 73.57341, 69.33556, 72.70317, 68.6752, 71.62753, 69.29653, 66.7606, 72.10561, 65.68752, 72.72757, 64.81536, 74.38998, 64.81536, 75.82331, 64.81536, 80.68513, 64.81536, 82.11782, 65.68816, 82.77626, 66.7606, 82.15621],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#ea893e",
        "shadowColor": "#1ABC9C",
        "points": [48.4005, 78.13584, 53.26743, 75.32485, 53.73519, 75.05418, 54.16007, 75.0401, 54.49472, 75.21351, 54.50624, 75.20519, 58.55093, 77.50428, 58.54581, 77.51452, 58.21435, 77.35455, 57.79907, 77.37438, 57.34027, 77.63801, 52.47462, 80.44901, 51.39898, 81.06905, 50.52874, 82.73211, 50.52874, 84.16544, 50.52874, 89.02725, 50.52874, 89.75736, 50.75654, 90.28206, 51.11935, 90.54377, 51.11807, 90.54633, 47.12778, 88.28563, 47.12906, 88.27411, 46.71889, 88.03544, 46.45462, 87.49602, 46.45462, 86.71472, 46.45462, 81.85227, 46.45526, 80.42022, 47.32614, 78.75717, 48.4005, 78.13584],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#f3b044",
        "shadowColor": "#1ABC9C",
        "points": [52.47526, 90.4977, 57.34091, 87.6867, 58.41591, 87.06794, 59.28615, 85.40361, 59.28615, 83.97219, 59.28615, 79.10846, 59.28615, 77.67769, 58.41591, 77.01733, 57.34091, 77.63865, 52.47526, 80.44709, 51.40154, 81.06842, 50.52938, 82.73147, 50.52938, 84.1648, 50.52938, 89.02661, 50.52938, 90.45995, 51.40154, 91.11774, 52.47526, 90.4977],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#c09a84",
        "shadowColor": "#1ABC9C",
        "points": [34.11388, 86.47733, 38.98082, 83.66697, 39.44921, 83.39694, 39.87409, 83.38158, 40.20939, 83.55563, 40.22154, 83.54667, 44.26623, 85.84576, 44.26111, 85.856, 43.92965, 85.69603, 43.51373, 85.71587, 43.05558, 85.98014, 38.18928, 88.7905, 37.11428, 89.41118, 36.24341, 91.07487, 36.24341, 92.50692, 36.24341, 97.36874, 36.24341, 98.09884, 36.4712, 98.62354, 36.83466, 98.88526, 36.8321, 98.88781, 32.84372, 96.62712, 32.845, 96.6156, 32.43356, 96.37692, 32.16992, 95.8375, 32.16992, 95.05685, 32.16992, 90.19439, 32.16928, 88.7617, 33.03952, 87.09865, 34.11388, 86.47733],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#eadbca",
        "shadowColor": "#1ABC9C",
        "points": [38.18864, 98.83918, 43.05494, 96.02819, 44.12994, 95.40942, 45.00017, 93.74509, 45.00017, 92.31368, 45.00017, 87.44995, 45.00017, 86.01853, 44.12994, 85.35946, 43.05494, 85.98078, 38.18864, 88.78858, 37.11492, 89.41054, 36.24277, 91.07423, 36.24277, 92.50628, 36.24277, 97.3681, 36.24277, 98.80143, 37.11492, 99.45923, 38.18864, 98.83918],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }]
});
s('ready.flag', {

    "width": 96,
    "height": 32,
    "comps": [{
        "type": "rect",
        "background": "rgba(245,164,34,0.7)",
        "borderColor": "#979797",
        "rect": [0, 0, 96, 32]
    }, {
        "type": "text",
        "text": "Ready",
        "align": "center",
        "color": "#FFFFFF",
        "font": "14px arial, sans-serif",
        "rect": [0, 0, 96, 32]
    }]
});

s('patch.panel.port', {
    "dataBindings": [],
    "width": 50,
    "height": 28,
    "comps": [{
        "type": "shape",
        "background": "#2e6ba5",
        "borderWidth": 1,
        "borderColor": "#2e6ba5",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "closePath": true,
        "points": [9.58748, 7.00444, 9.58748, 21.64577, 40.99998, 21.64577, 40.99998, 7.00444, 34.32722, 7.00444, 34.32722, 4.95384, 32.37055, 4.95384, 32.37055, 2.20383, 18.88608, 2.20383, 18.88608, 4.95384, 16.93501, 4.95384, 16.93501, 7.00444]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [35.13268, 2.05638, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [31.82802, 2.05638, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [28.52335, 2.10265, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [25.21868, 2.1185, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [21.914, 1.99425, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [18.60934, 1.99425, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [15.30467, 2.04053, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [12.00001, 2.05638, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [38.00001, 2.10265, 1.44935, 4.8815]
    }]
});

s('toolbar.picture', {
    "dataBindings": [],
    "width": 40,
    "height": 32,
    "comps": [{
        "type": "shape",
        "points": [13.33333, 9.33333, 13.33333, 11, 12.16667, 12.16667, 11, 13.33333, 9.33333, 13.33333, 7.66667, 13.33333, 6.5, 12.16667, 5.33333, 11, 5.33333, 9.33333, 5.33333, 7.66667, 6.5, 6.5, 7.66667, 5.33333, 9.33333, 5.33333, 11, 5.33333, 12.16667, 6.5, 13.33333, 7.66667, 13.33333, 9.33333, 34.66667, 17.33333, 34.66667, 26.66667, 5.33333, 26.66667, 5.33333, 22.66667, 12, 16, 15.33333, 19.33333, 26, 8.66667, 36.66667, 2.66667, 3.33333, 2.66667, 3.0625, 2.66667, 2.86458, 2.86458, 2.66667, 3.0625, 2.66667, 3.33333, 2.66667, 28.66667, 2.66667, 28.9375, 2.86458, 29.13542, 3.0625, 29.33333, 3.33333, 29.33333, 36.66667, 29.33333, 36.9375, 29.33333, 37.13542, 29.13542, 37.33333, 28.9375, 37.33333, 28.66667, 37.33333, 3.33333, 37.33333, 3.0625, 37.13542, 2.86458, 36.9375, 2.66667, 36.66667, 2.66667, 40, 3.33333, 40, 28.66667, 40, 30.04167, 39.02083, 31.02083, 38.04167, 32, 36.66667, 32, 3.33333, 32, 1.95833, 32, 0.97917, 31.02083, 0, 30.04167, 0, 28.66667, 0, 3.33333, 0, 1.95833, 0.97917, 0.97917, 1.95833, 0, 3.33333, 0, 36.66667, 0, 38.04167, 0, 39.02083, 0.97917, 40, 1.95833, 40, 3.33333],
        "segments": {
            "_as": [1, 3, 3, 3, 3, 3, 3, 3, 3, 5, 1, 2, 2, 2, 2, 2, 2, 5, 1, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 5, 1, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 5]
        },
        "background": "#2A2A2A",
        "rawPoints": [13.33333, 9.33333, 13.33333, 11, 12.16667, 12.16667, 11, 13.33333, 9.33333, 13.33333, 7.66667, 13.33333, 6.5, 12.16667, 5.33333, 11, 5.33333, 9.33333, 5.33333, 7.66667, 6.5, 6.5, 7.66667, 5.33333, 9.33333, 5.33333, 11, 5.33333, 12.16667, 6.5, 13.33333, 7.66667, 13.33333, 9.33333, 34.66667, 17.33333, 34.66667, 26.66667, 5.33333, 26.66667, 5.33333, 22.66667, 12, 16, 15.33333, 19.33333, 26, 8.66667, 36.66667, 2.66667, 3.33333, 2.66667, 3.0625, 2.66667, 2.86458, 2.86458, 2.66667, 3.0625, 2.66667, 3.33333, 2.66667, 28.66667, 2.66667, 28.9375, 2.86458, 29.13542, 3.0625, 29.33333, 3.33333, 29.33333, 36.66667, 29.33333, 36.9375, 29.33333, 37.13542, 29.13542, 37.33333, 28.9375, 37.33333, 28.66667, 37.33333, 3.33333, 37.33333, 3.0625, 37.13542, 2.86458, 36.9375, 2.66667, 36.66667, 2.66667, 40, 3.33333, 40, 28.66667, 40, 30.04167, 39.02083, 31.02083, 38.04167, 32, 36.66667, 32, 3.33333, 32, 1.95833, 32, 0.97917, 31.02083, 0, 30.04167, 0, 28.66667, 0, 3.33333, 0, 1.95833, 0.97917, 0.97917, 1.95833, 0, 3.33333, 0, 36.66667, 0, 38.04167, 0, 39.02083, 0.97917, 40, 1.95833, 40, 3.33333],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 40,
            "height": 32
        }
    }]
});

s('editor.edit2', {
    "width": 40,
    "height": 34.28571,
    "comps": [{
        "type": "shape",
        "points": [31.42857, 20.71429, 31.42857, 27.85714, 31.42857, 30.51339, 29.54241, 32.39955, 27.65625, 34.28571, 25, 34.28571, 6.42857, 34.28571, 3.77232, 34.28571, 1.88616, 32.39955, 0, 30.51339, 0, 27.85714, 0, 9.28571, 0, 6.62946, 1.88616, 4.7433, 3.77232, 2.85714, 6.42857, 2.85714, 22.14286, 2.85714, 22.45536, 2.85714, 22.65625, 3.05804, 22.85714, 3.25893, 22.85714, 3.57143, 22.85714, 5, 22.85714, 5.3125, 22.65625, 5.51339, 22.45536, 5.71429, 22.14286, 5.71429, 6.42857, 5.71429, 4.95536, 5.71429, 3.90625, 6.76339, 2.85714, 7.8125, 2.85714, 9.28571, 2.85714, 27.85714, 2.85714, 29.33036, 3.90625, 30.37946, 4.95536, 31.42857, 6.42857, 31.42857, 25, 31.42857, 26.47321, 31.42857, 27.52232, 30.37946, 28.57143, 29.33036, 28.57143, 27.85714, 28.57143, 20.71429, 28.57143, 20.40179, 28.77232, 20.20089, 28.97321, 20, 29.28571, 20, 30.71429, 20, 31.02679, 20, 31.22768, 20.20089, 31.42857, 20.40179, 31.42857, 20.71429, 40, 1.42857, 40, 12.85714, 40, 13.4375, 39.57589, 13.86161, 39.15179, 14.28571, 38.57143, 14.28571, 37.99107, 14.28571, 37.56696, 13.86161, 33.63839, 9.93304, 19.08482, 24.48661, 18.86161, 24.70982, 18.57143, 24.70982, 18.28125, 24.70982, 18.05804, 24.48661, 15.51339, 21.94196, 15.29018, 21.71875, 15.29018, 21.42857, 15.29018, 21.13839, 15.51339, 20.91518, 30.06696, 6.36161, 26.13839, 2.43304, 25.71429, 2.00893, 25.71429, 1.42857, 25.71429, 0.84821, 26.13839, 0.42411, 26.5625, 0, 27.14286, 0, 38.57143, 0, 39.15179, 0, 39.57589, 0.42411, 40, 0.84821, 40, 1.42857],
        "segments": [1, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 5, 1, 2, 3, 3, 3, 2, 2, 3, 3, 2, 3, 3, 2, 2, 3, 3, 3, 2, 3, 3, 5],
        "background": "#2A2A2A",
        "rawPoints": [31.42857, 20.71429, 31.42857, 27.85714, 31.42857, 30.51339, 29.54241, 32.39955, 27.65625, 34.28571, 25, 34.28571, 6.42857, 34.28571, 3.77232, 34.28571, 1.88616, 32.39955, 0, 30.51339, 0, 27.85714, 0, 9.28571, 0, 6.62946, 1.88616, 4.7433, 3.77232, 2.85714, 6.42857, 2.85714, 22.14286, 2.85714, 22.45536, 2.85714, 22.65625, 3.05804, 22.85714, 3.25893, 22.85714, 3.57143, 22.85714, 5, 22.85714, 5.3125, 22.65625, 5.51339, 22.45536, 5.71429, 22.14286, 5.71429, 6.42857, 5.71429, 4.95536, 5.71429, 3.90625, 6.76339, 2.85714, 7.8125, 2.85714, 9.28571, 2.85714, 27.85714, 2.85714, 29.33036, 3.90625, 30.37946, 4.95536, 31.42857, 6.42857, 31.42857, 25, 31.42857, 26.47321, 31.42857, 27.52232, 30.37946, 28.57143, 29.33036, 28.57143, 27.85714, 28.57143, 20.71429, 28.57143, 20.40179, 28.77232, 20.20089, 28.97321, 20, 29.28571, 20, 30.71429, 20, 31.02679, 20, 31.22768, 20.20089, 31.42857, 20.40179, 31.42857, 20.71429, 40, 1.42857, 40, 12.85714, 40, 13.4375, 39.57589, 13.86161, 39.15179, 14.28571, 38.57143, 14.28571, 37.99107, 14.28571, 37.56696, 13.86161, 33.63839, 9.93304, 19.08482, 24.48661, 18.86161, 24.70982, 18.57143, 24.70982, 18.28125, 24.70982, 18.05804, 24.48661, 15.51339, 21.94196, 15.29018, 21.71875, 15.29018, 21.42857, 15.29018, 21.13839, 15.51339, 20.91518, 30.06696, 6.36161, 26.13839, 2.43304, 25.71429, 2.00893, 25.71429, 1.42857, 25.71429, 0.84821, 26.13839, 0.42411, 26.5625, 0, 27.14286, 0, 38.57143, 0, 39.15179, 0, 39.57589, 0.42411, 40, 0.84821, 40, 1.42857],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 40,
            "height": 34.28571
        }
    }]
});
s("icon.nms", "/images/icon-gotonms.png");
s("icon.reguser", "/images/icon-adduser.png");
s("icon.portdown", "/images/icon-portdown.png");
s("icon.portup", "/images/icon-portup.png");
s("icon.portnormal", "/images/icon-portnormal.png");

var API_PORT = location.port;
var hostname = location.hostname;
//dev
//export const API_URL = `http://192.168.0.79:${API_PORT}/`;
//export const NMS_URL = `http://192.168.0.79:${NMS_PORT}/`;
//pro
var API_URL = 'http://' + hostname + ':' + API_PORT + '/';


var API_PATH = 'api/htbackend/';
var API_HEAD = API_URL + API_PATH;



 // unit second

var util = {
	trim: function trim(s) {
		return s.replace(/^\s+|\s+$/g, '');
	},
	ajax: function ajax(option) {
		// 定义domain,方便环境切换
		// var domain = 'https://' + window.location.host + '/';
		// var url = domain + option.urlStr;
		var url = option.url,
		    _option$type = option.type,
		    type = _option$type === undefined ? 'get' : _option$type,
		    data = option.data,
		    dataType = option.dataType,
		    _option$resultType = option.resultType,
		    resultType = _option$resultType === undefined ? 'json' : _option$resultType,
		    _option$async = option.async,
		    async = _option$async === undefined ? true : _option$async;
		// var type = option.type;
		// var data = option.data;

		var xhrRequest = null;
		if (window.XMLHttpRequest) {
			xhrRequest = new XMLHttpRequest();
		} else {
			xhrRequest = new ActiveXObject('Microsoft.XMLHTTP');
		}
		var str = "";
		xhrRequest.open(type, url, async);
		if (type.toUpperCase() === "POST" && data != null) {
			if (dataType === 'json') {
				xhrRequest.setRequestHeader("Content-type", "application/json;charset=utf-8");
				// xhrRequest.overrideMimeType('application/json');
				str = data;
			} else if (dataType === 'text') {
				xhrRequest.setRequestHeader('Content-type', 'text/plain');
				str = data;
			} else if (dataType === 'multipart') {
				//xhrRequest.setRequestHeader('Content-type', 'multipart/form-data');
				str = data;
			} else {
				xhrRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
				for (var key in data) {
					str += '&' + key + '=' + data[key];
				}
				str = str.slice(1);
			}
		} else {
			str = null;
		}
		xhrRequest.onreadystatechange = function () {
			if (xhrRequest.readyState == 4) {
				if (xhrRequest.status == 200) {
					var responseData = null;
					if (xhrRequest.responseText) {
						if (resultType === 'json') {
							responseData = JSON.parse(xhrRequest.responseText);
						} else if (resultType === 'text') {
							responseData = xhrRequest.responseText;
						}
					}
					option.success(responseData);
				} else {
					console.log(xhrRequest.status);
					if (option.erorr) {
						option.error(xhrRequest.status);
					}
				}
			}
		};
		xhrRequest.send(str);
	},
	getUrlParamter: function getUrlParamter(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]);
		return null;
	},
	isString: function isString(o) {
		return typeof o === 'string' || o instanceof String;
	},
	getNodeId: function getNodeId(data) {
		if (!data) {
			return null;
		}
		var sp = data.a('siteTreeParam');
		return sp ? sp.id : null;
	},
	getEntityId: function getEntityId(data) {
		if (!data) {
			return null;
		}
		return data.a('id') ? data.a('id') : null;
	},
	selectFile: function selectFile(type, readType, callback) {
		var self = this,
		    fileDom = document.getElementById('hiddenFile');
		if (!fileDom) {
			fileDom = document.createElement('input');
			fileDom.setAttribute('type', 'file');
			fileDom.setAttribute('id', 'hiddenFile');
			fileDom.style.width = 0;
			fileDom.style.height = 0;

			fileDom.addEventListener('change', function (e) {
				var file = e.target.files[0];
				if (!file) {
					//if (!file || (type && file.type.indexOf(type) < 0)) {
					callback(null);
					return;
				}
				var reader = new FileReader();
				reader.onload = function (rd) {
					callback(file, rd.target.result);
					// remove dom
					document.body.removeChild(fileDom);
				};
				if (readType === 'text' && file.type.indexOf('image') !== 0) {
					reader.readAsText(file);
				} else {
					reader.readAsDataURL(file);
				}
			});

			document.body.appendChild(fileDom);
		}
		fileDom.click();
	},
	parseRGBA: function parseRGBA(rgba) {
		rgba = rgba.replace(/(rgba\()|\)|\s/g, '');
		return rgba.split(',');
	},
	exportAndDownload: function exportAndDownload(content, filename) {
		// 创建隐藏的可下载链接
		var eleLink = document.createElement('a');
		eleLink.download = filename;
		eleLink.style.display = 'none';
		// 字符内容转变成blob地址
		var blob = new Blob([content]);
		eleLink.href = URL.createObjectURL(blob);
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	},
	exportAndDownload2: function exportAndDownload2(content, filename) {
		// 创建隐藏的可下载链接
		var eleLink = document.createElement('a');
		eleLink.download = filename;
		eleLink.style.display = 'none';

		var image_data = atob(content.split(',')[1]);
		// Use typed arrays to convert the binary data to a Blob
		var arraybuffer = new ArrayBuffer(image_data.length);
		var view = new Uint8Array(arraybuffer);
		for (var i = 0; i < image_data.length; i++) {
			view[i] = image_data.charCodeAt(i) & 0xff;
		}
		try {
			// This is the recommended method:
			var blob = new Blob([arraybuffer], { type: 'application/octet-stream' });
		} catch (e) {
			// The BlobBuilder API has been deprecated in favour of Blob, but older
			// browsers don't know about the Blob constructor
			// IE10 also supports BlobBuilder, but since the `Blob` constructor
			//  also works, there's no need to add `MSBlobBuilder`.
			var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
			bb.append(arraybuffer);
			var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
		}

		eleLink.href = URL.createObjectURL(blob);
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	},
	exportBlob: function exportBlob(content) {

		var image_data = atob(content.split(',')[1]);
		// Use typed arrays to convert the binary data to a Blob
		var arraybuffer = new ArrayBuffer(image_data.length);
		var view = new Uint8Array(arraybuffer);
		for (var i = 0; i < image_data.length; i++) {
			view[i] = image_data.charCodeAt(i) & 0xff;
		}
		try {
			// This is the recommended method:
			var blob = new Blob([arraybuffer], { type: 'application/octet-stream' });
		} catch (e) {
			// The BlobBuilder API has been deprecated in favour of Blob, but older
			// browsers don't know about the Blob constructor
			// IE10 also supports BlobBuilder, but since the `Blob` constructor
			//  also works, there's no need to add `MSBlobBuilder`.
			var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
			bb.append(arraybuffer);
			var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
		}

		return blob;
	},
	checkforvalidity: function checkforvalidity(templist) {
		var valid = true;
		for (var j = 0; j + 2 < templist.length;) {
			if (templist[j].nodeid === undefined && templist[j].category_id === undefined) {
				j++;
				continue;
			}
			var a = templist[j],
			    c = templist[j + 1],
			    b = templist[j + 2];
			if (a.nodeid && b.nodeid && c.category_id) {
				if (a.x + 1 === c.x && c.x + 1 === b.x) {
					j += 2;
				} else {
					valid = false;
					break;
				}
			} else {
				while (j < templist.length - 1) {
					if (templist[j + 1].nodeid !== undefined || templist[j + 1].category_id !== undefined) {
						valid = false;
					}
					j++;
				}
				break;
			}
		}
		return valid;
	},
	addInvalid: function addInvalid(invalid, list) {
		list.forEach(function (d) {
			/*if (d.x) {
   	invalid.push(d);
   }*/
			if (d.nodeid || d.category_id) {
				invalid.push(d);
			}
		});
	},
	getMinMaxPoint: function getMinMaxPoint(list, offset) {
		if (list && list.length > 0) {
			var minx = void 0,
			    miny = void 0,
			    maxx = void 0,
			    maxy = void 0,
			    minrec = { minx: 0, miny: 0, maxx: 0, maxy: 0 };

			list.forEach(function (d) {
				var cminx = d.x,
				    cminy = d.y,
				    cmaxx = d.x + d.width,
				    cmaxy = d.y + d.height;
				if (minx) {
					minx = minx > cminx ? cminx : minx;
				} else {
					minx = cminx;
				}
				if (miny) {
					miny = miny > cminy ? cminy : miny;
				} else {
					miny = cminy;
				}
				if (maxx) {
					maxx = maxx < cmaxx ? cmaxx : maxx;
				} else {
					maxx = cmaxx;
				}
				if (maxy) {
					maxy = maxy < cmaxy ? cmaxy : maxy;
				} else {
					maxy = cmaxy;
				}
			});

			minx -= offset;
			miny -= offset;
			maxx += offset;
			maxy += offset;

			/*minrec.x = maxx - ((maxx - minx)/2);
   minrec.y = maxy - ((maxy - miny)/2);
   minrec.width = (maxx - minx);
   minrec.height = (maxy - miny);*/
			minrec.maxx = maxx;
			minrec.maxy = maxy;
			minrec.minx = minx;
			minrec.miny = miny;
			return minrec;
		}
		return;
	},
	getMinRect: function getMinRect(list, offset) {
		if (list && list.length > 0) {
			var minx = void 0,
			    miny = void 0,
			    maxx = void 0,
			    maxy = void 0,
			    minrec = { x: 0, y: 0, width: 0, height: 0 };

			list.forEach(function (d) {
				var cminx = d.x,
				    cminy = d.y,
				    cmaxx = d.x + d.width,
				    cmaxy = d.y + d.height;
				if (minx) {
					minx = minx > cminx ? cminx : minx;
				} else {
					minx = cminx;
				}
				if (miny) {
					miny = miny > cminy ? cminy : miny;
				} else {
					miny = cminy;
				}
				if (maxx) {
					maxx = maxx < cmaxx ? cmaxx : maxx;
				} else {
					maxx = cmaxx;
				}
				if (maxy) {
					maxy = maxy < cmaxy ? cmaxy : maxy;
				} else {
					maxy = cmaxy;
				}
			});

			minx -= offset;
			miny -= offset;
			maxx += offset;
			maxy += offset;

			minrec.x = minx;
			minrec.y = miny;
			minrec.width = maxx - minx;
			minrec.height = maxy - miny;

			return minrec;
		}
		return;
	},
	getFourPoints: function getFourPoints(rect) {
		return { p1: { x: rect.x, y: rect.y },
			p2: { x: rect.x + rect.width, y: rect.y },
			p3: { x: rect.x, y: rect.y + rect.height },
			p4: { x: rect.x + rect.width, y: rect.y + rect.height } };
	}
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var CMS = function () {
    function CMS() {
        classCallCheck(this, CMS);

        this.initUI();
        this.initDialog();
        this.loadTreeData();
    }

    createClass(CMS, [{
        key: 'initUI',
        value: function initUI() {
            var _this = this;

            var self = this,
                treeView = this.treeView = new ht.widget.TreeView(),
                gv = this.gv = new ht.graph.GraphView(),
                splitView = this.splitView = new ht.widget.SplitView(treeView, gv, 'h', 240);

            splitView.addToDOM();
            gv.dm().deserialize(floorData.display);
            gv.fitContent();
            gv.setZoom(1);
            gv.handleScroll = function () {};
            gv.setInteractors([new ht.graph.SelectInteractor(gv), new ht.graph.DefaultInteractor(gv)]);
            gv.mi(function (e) {
                if (e.kind === 'clickData') {
                    var ld = e.data;
                    if (ld && ld.a('type') === self.TYPE_OUTLET) {
                        self.loadDeviceInfo(ld);
                    }
                }
            });

            treeView.getIcon = function (data) {
                var type = data.a('type'),
                    product = _this.getDataCategory(data);
                if (product && product.image_tree) {
                    var img = product.image_tree;
                    if (img[0] === 'd') {
                        return img;
                    } else {
                        return JSON.parse(img);
                    }
                }
                if (type === 86 || type === 87 || type === 88 || type === 89 || type === 90 || type === 99) {
                    return 'tree.icon' + type;
                }
                return 'tree.icon';
            };
        }
    }, {
        key: 'loadTreeData',
        value: function loadTreeData() {
            var _this2 = this;

            util.ajax({
                url: API_HEAD + 'getSiteTreeModelData/' + siteid,
                success: function success(r) {
                    if (r && r[0] && r[0].sitetreejson_data) {
                        _this2.treeView.dm().deserialize(r[0].sitetreejson_data);
                        _this2.treeView.expandAll();

                        _this2.dm.mm(_this2.handleTreeUpdate, _this2);
                        _this2.dm.mh(_this2.handleTreeUpdate, _this2);
                        _this2.dm.md(_this2.handleTreeUpdate, _this2);
                    }
                }
            });
        }
    }, {
        key: 'loadDeviceInfo',
        value: function loadDeviceInfo(node) {
            var self = this;
            if (!node) return;
            self.outletInfoDialog.setTitle(node.a('name') + ' infomation');
            self.outletInfoDialog.show();

            var dm = self.dialogGv.dm(),
                node1 = new ht.Node();
            dm.clear();
            dm.add(node1);
            node1.setName('192.168.0.1');

            for (var i = 0; i < Math.random() * 15; i++) {
                var node = new ht.Node(),
                    edge = new ht.Edge(node1, node);
                node.setName('192.168.0.' + (i + 2));

                dm.add(node);
                dm.add(edge);
            }

            self.autoLayout.layout('towardsouth', function () {
                self.dialogGv.fitContent(true);
            });
            // table
            var tableDm = self.tablePane.getDataModel(),
                data;
            tableDm.clear();
            for (var i = 0; i < 20; i++) {
                data = new ht.Data();
                data.a('time', new Date().toLocaleString());
                data.a('active', i % 2 === 0 ? 'plug' : 'remove');
                data.a('status', Math.floor(Math.random() + 0.5));
                tableDm.add(data);
            }
        }
    }, {
        key: 'createData',
        value: function createData(data, parent) {
            var self = this,
                htData = new ht.Data(),
                dm = this.treeView.dm();
            htData.a(data);
            htData.setName(data.name);
            if (parent) {
                htData.setParent(parent);
            }
            dm.add(htData);
            if (data.children) {
                data.children.forEach(function (d) {
                    self.createData(d, htData);
                });
            }
            if (data.id === floorData.targetId) {
                self.treeView.sm().ss(htData);
            }
            return htData;
        }
    }, {
        key: 'initDialog',
        value: function initDialog() {
            var self = this,
                borderPane = this.dialogBorderPane = new ht.widget.BorderPane(),
                dgv = this.dialogGv = new ht.graph.GraphView(),
                tablePane = this.tablePane = new ht.widget.TablePane(),
                outletInfoDialog = this.outletInfoDialog = new ht.widget.Dialog(),
                autoLayout = this.autoLayout = new ht.layout.AutoLayout(dgv);

            borderPane.setTopView(dgv);
            borderPane.setTopHeight(180);
            borderPane.setCenterView(tablePane);

            tablePane.addColumns([{
                name: 'id',
                width: 60,
                tag: 'id'
            }, {
                name: 'time',
                width: 180,
                accessType: 'attr',
                tag: 'time'
            }, {
                name: 'active',
                width: 220,
                accessType: 'attr',
                tag: 'active'
            }, {
                name: 'status',
                width: 120,
                accessType: 'attr',
                tag: 'status',
                drawCell: function drawCell(g, data, selected, column, x, y, w, h, tableView) {
                    var status = data.getAttr('status'),
                        color = status ? 'green' : 'red';

                    // draw background
                    g.fillStyle = color;
                    g.beginPath();
                    g.rect(x, y, w, h);
                    g.fill();
                }
            }]);

            dgv.dm().add(new ht.Node());
            dgv.fitContent();

            outletInfoDialog.setConfig({
                title: "New Rack",
                content: borderPane,
                width: 800,
                height: 600,
                draggable: true,
                closable: true,
                resizeMode: "wh",
                buttons: []
            });
        }
    }, {
        key: 'dm',
        get: function get$$1() {
            return this.treeView.dm();
        }
    }]);
    return CMS;
}();

window.cms = new CMS();

})));
