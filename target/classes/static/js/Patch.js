(function(w) {

	ht.Default.setImage('patchPanel', {
		"dataBindings": [{
			"attr": "start.index",
			"valueType": "Int",
			"defaultValue": -2
		}, {
			"attr": "end.index",
			"valueType": "Int",
			"defaultValue": 2
		}, {
			"attr": "port.count",
			"valueType": "PositiveNumber",
			"defaultValue": 8
		}],
		"width": 100,
		"height": 100,
		"fitSize": true,
		"comps": [{
			"type": "components/patch.json",
			"displayName": "patch",
			"rect": [
				0,
				0,
				100,
				100
			],
			"start": {
				"func": "attr@start.index",
				"value": -2
			},
			"end": {
				"func": "attr@end.index",
				"value": 2
			},
			"portCount": {
				"func": "attr@port.count",
				"value": 10
			}
		}]
	});

	var Patch = w.Patch = function(cellWidth, cellHeight) {
		this.setImage('patchPanel');
		this.a('start.index', -2);
		this.a('end.index', 2);
		this.a('port.count', 8);
		this.setCellSize(cellWidth, cellHeight);

		this._deviceMap = {};
	}

	ht.Default.def(Patch, ht.Node, {
		setStartIndex: function(i) {
			this.a('start.index', i);
			this.calcuSize();
		},
		getStartIndex: function(){
			return this.a('start.index');
		},
		setEndIndex: function(i) {
			this.a('end.index', i);
			this.calcuSize();
		},
		getEndIndex: function(){
			return this.a('end.index');
		},
		calcuSize: function(){
			var colCount = this.a('end.index') - this.a('start.index') + 1,
				rowCount = this.a('port.count'),
				cw = this.a('cell.width'),
				ch = this.a('cell.height');
			this.setSize(cw * colCount, ch * rowCount);
		},
		setCellSize: function(cw, ch){
			var colCount = this.a('end.index') - this.a('start.index') + 1,
				rowCount = this.a('port.count'),
				_cw = cw, _ch = ch;

			if (typeof(cw) === 'object') {
				_cw = cw.width;
				_ch = cw.height;
			}
			this.a({
				'cell.width': _cw,
				'cell.height': _ch
			})
			this.calcuSize();
		},
		getCellRect: function(p, isPort, deviceId) {
			var r = this.getRect(),
				start = this.a('start.index'),
				end = this.a('end.index'),
				portCount = this.a('port.count'),
				cw = this.a('cell.width'),
				ch = this.a('cell.height'),
				colCount = end - start + 1,
				x = r.x,
				y = r.y,
				rect = {
					x: x,
					y: y,
					width: cw,
					height: ch
				}, i, j, key;

			for (i = 0; i < colCount; i++) {// in which column
				if (p.x > x && p.x < x + cw) {
					break;
				}
				x += cw;
			}
			if (i + start === 0 || (isPort && i % 2 !== 0) || (!isPort && i % 2 !== 1)) {
				return null;
			}

			for (j = 0; j < portCount; j++) {
				if (p.y > y && p.y < y + ch) {
					break;
				}
				y += ch;
			}
			if (i === colCount || j === portCount) {
				return null;
			}
			// the cell had data
			key = this.parseKey(i, j);
			if (this._deviceMap[key]) {
				return null;
			}
			// The same switch cannot connect
			if (isPort && deviceId) {
				for (var u = 0; u < colCount; u++) {
					key = this.parseKey(u, j);
					devicePort = this._deviceMap[key];
					if (devicePort && devicePort.a('device.id') === deviceId) {
						return null;
					}
				}
			}
			rect.x = x;
			rect.y = y;
			return rect;
		},
		getCellIndex: function(x, y){
			x++; y++;//Avoid floating point errors
			var rect = this.getRect(),
				cw = this.a('cell.width'),
				ch = this.a('cell.height');
			return {
				x: Math.floor((x - rect.x) / cw),
				y: Math.floor((y - rect.y) / ch)
			}
		},
		plugIn: function(node, rect) {
			var ci = this.getCellIndex(rect.x, rect.y),
				key;

			node.setSize(rect.width, rect.height);
			node.setHost(this);
			key = this.parseKey(ci.x, ci.y);
			node.a('patch.key', key);
			this._deviceMap[key] = node;
			this.calcuStartEnd(ci.x);
		},
		rePlugIn: function(node, rect) {
			var ci = this.getCellIndex(rect.x, rect.y),
				colCount = this.a('end.index') - this.a('start.index') + 1,
				key = this.parseKey(ci.x, ci.y),
				oldKey = node.a('patch.key');

			if (key === oldKey) return;

			delete this._deviceMap[oldKey];
			node.a('patch.key', key);
			this._deviceMap[key] = node;
			this.calcuStartEnd(ci.x);
			this.calcuStartEndOnModify();
		},
		parseKey: function(x, y){
			var si = this.a('start.index'),
				ei = this.a('end.index');
			return 'k' + (x + si) + '_' + y;
		},
		calcuStartEnd: function(x){
			var colCount = this.a('end.index') - this.a('start.index') + 1,
				cw = this.a('cell.width');

			if (x === 0 || x === 1) {
				this.setStartIndex(this.a('start.index') - 2);
				this.setX(this.p().x - cw);
			}
			else if (x === colCount - 1 || x === colCount - 2) {
				this.setEndIndex(this.a('end.index') + 2);
				this.setX(this.p().x + cw);
			}
			this.layoutDevice();
		},
		calcuStartEndOnModify: function(){
			var si = this.a('start.index'),
				ei = this.a('end.index'),
				colCount = si - this.a('start.index') + 1,
				map = this._deviceMap,
				frontFlag = si < -2, backFlag = ei > 2,
				cw = this.a('cell.width'),
				arr, x;

			if (frontFlag || backFlag) {
				for (var k in map) {
					arr = k.replace(/k/g, '').split('_');
					x = parseInt(arr[0]) - si;
					if (frontFlag && x < 4) {
						frontFlag = false;
					}
					else if (backFlag && x >= colCount - 4) {
						backFlag = false;
					}
				}
			}
			if (frontFlag) {
				this.setStartIndex(this.a('start.index') + 2);
				this.setX(this.p().x + cw);
			}
			else if (backFlag) {
				this.setEndIndex(this.a('end.index') - 2);
				this.setX(this.p().x - cw);
			}
			this.layoutDevice();
		},
		layoutDevice: function(){
			var r = this.getRect(),
				startIndex = this.a('start.index'),
				cw = this.a('cell.width'),
				ch = this.a('cell.height'),
				map = this._deviceMap,
				arr, x, y;
			// re position
			for (var key in map) {
				arr = key.replace(/k/g, '').split('_');
				x = parseInt(arr[0]) - startIndex;
				y = parseInt(arr[1]);
				map[key].p(r.x + cw * (x + 0.5), r.y + ch * (y + 0.5));
			}
		},
		serializeDevices: function(){
			var list = [], device;
			for(var k in this._deviceMap){
				device = this._deviceMap[k];
				list.push({
					patchKey: k,
					name: device.a('name'),
					deviceType: device.a('device.type')
				});
			}

			return list;
		},
		removeDevices: function(list){
			var self = this;
			if (list.size() <= 0) return;

			list.each(function(data){
				var key = data.a('patch.key');
				if (key) {
					delete self._deviceMap[key];
				}
			});
			self.calcuStartEndOnModify();
		}
	});



})(window);