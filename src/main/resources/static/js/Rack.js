(function(w){

	// 41.6 600
	ht.Default.setImage('rack', {
		"dataBindings": [{
			"attr": "usize",
			"valueType": "PositiveNumber"
		}, {
			"attr": "name",
			"valueType": "String"
		}],
		"width": 240,
		"height": {
	        func: function(data) {
	            return data.a('usize') ? data.a('usize') * 20.8 + 75: data._height;
	        }
	    },
		"fitSize": true,
		"comps": [{
			"type": "components/rack.json",
			"displayName": "rack",
			"rect": [
				0,
				0,
				240,
				500
			],
			"usize": {
				"func": "attr@usize",
				"value": 20
			},
			"name": {
				"func": "attr@name",
				"value": "Rack"
			}
		}]
	});

	var HEADER_HEIGHT = 30,
		U_HEIGHT = 20.8,
		FOOTER_HEIGHT = 45,
		DEFAULT_USIZE = 18;

	var Rack = function(usize){
		Rack.superClass.constructor.apply(this);
		this.setImage('rack');
		this.setUSize(usize || DEFAULT_USIZE);
	}

	ht.Default.def(Rack, ht.Node, {
		setUSize: function(size){
			if (typeof(size) === 'string') {
				size = parseInt(size);
			}
			this.a('usize', size);
		},
		caluCellRect: function(uindex, uHeight) {
			var rect = this.getRect();

			return {
				width: rect.width - U_HEIGHT * 2,
				height: U_HEIGHT * uHeight,
				x: rect.x + U_HEIGHT,
				y: rect.y + HEADER_HEIGHT + U_HEIGHT * uindex
			}
		},
		getCellIndex: function(y){
			var rect = this.getRect();
			y ++;
			if (y < rect.y + HEADER_HEIGHT) {
				return 0;
			}
			else if (y > rect.y + rect.height - FOOTER_HEIGHT) {
				return this.a('usize') - 1;
			}
			else {
				return Math.floor((y - rect.y - HEADER_HEIGHT) / U_HEIGHT);
			}
			return -1;
		},
		getCellRect: function(lp, uHeight){
			var ownRect = this.getRect(),
				rect = {};
			uHeight = uHeight || 1;
			if (ht.Default.containsPoint(ownRect, lp)) {
				rect.width = ownRect.width - U_HEIGHT * 2;
				rect.height = U_HEIGHT * uHeight;
				rect.x = ownRect.x + U_HEIGHT;

				if (lp.y < ownRect.y + HEADER_HEIGHT) {// in header
					rect.y = ownRect.y + HEADER_HEIGHT;
				}
				else if (lp.y > ownRect.y + ownRect.height - FOOTER_HEIGHT) {// in footer
					rect.y = ownRect.y + ownRect.height - FOOTER_HEIGHT - uHeight * U_HEIGHT;
				}
				else { // in rack cell
					var offset = lp.y - ownRect.y - HEADER_HEIGHT;
					rect.y = lp.y - offset % U_HEIGHT;
					if (uHeight > 1 && Math.floor(offset / U_HEIGHT) + uHeight > this.a('usize')) {
						rect.y -= (Math.floor(offset / U_HEIGHT) + uHeight - this.a('usize')) * U_HEIGHT;
					}
				}
				return rect;
			}
			return null;
		}
	});

	w.Rack = Rack;
})(window);