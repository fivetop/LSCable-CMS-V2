(function(w){

	ht.Default.setImage('toolbar.save', {
		"background": "rgb(179,179,179)",
		"width": 16,
		"height": 16,
		"blendMode": "override",
		"comps": [{
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(138,138,138)",
			"shadowColor": "#1ABC9C",
			"points": [
				3.66183,
				14.5,
				14.5,
				14.5,
				14.5,
				4.83454,
				10.71984,
				1.5,
				3.66183,
				1.5,
				3.66183,
				6.18654,
				10.71984,
				6.18654,
				10.71984,
				1.5,
				1.5,
				1.5,
				1.5,
				14.5,
				3.66183,
				14.5,
				3.66183,
				9.03168,
				12.17213,
				9.03168,
				12.17213,
				14.5
			]
		}]
	});

	ht.Default.setImage('toolbar.file', {
		"background": "rgb(128,128,128)",
		"width": 16,
		"height": 16,
		"comps": [{
			"type": "rect",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"shadowColor": "#1ABC9C",
			"rect": [
				0.5,
				1.99999,
				15,
				11.91767
			]
		}, {
			"type": "circle",
			"background": "rgb(255,255,255)",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"shadowColor": "#1ABC9C",
			"rect": [
				4.64115,
				4.65804,
				0.85454,
				1.28473
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				1.89157,
				9.10438,
				5.93792,
				9.10438,
				7.64109,
				10.37599,
				9.4302,
				13.65071,
				9.62104,
				14,
				8.9583,
				12.31629,
				7.31819,
				10.67389,
				7.31819,
				10.67389,
				8.62615,
				6.00103,
				14.10843,
				6.00103
			],
			"segments": [
				1,
				4,
				4,
				4
			]
		}]
	});
	ht.Default.setImage('toolbar.delete', {
		"background": "rgb(89,89,89)",
		"width": 16,
		"height": 16,
		"comps": [{
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				5.5,
				5.57173,
				5.5,
				12.45709
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				8.05685,
				5.57173,
				8.05685,
				12.45709
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				10.5,
				5.57173,
				10.5,
				12.45709
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				1,
				3.18902,
				15,
				3.16996,
				5.32652,
				3.16021,
				6.32652,
				1.16021,
				9.32652,
				1.16021,
				10.32652,
				3.16021
			]
		}, {
			"type": "rect",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"shadowColor": "#1ABC9C",
			"rect": [
				3.33333,
				3.18902,
				9.33334,
				11.65078
			]
		}]
	});
	ht.Default.setImage('editor.preview', {
	    "background": "rgb(179,179,179)",
	    "width": 16,
	    "height": 16,
	    "blendMode": "override",
	    "comps": [{
	        "type": "shape",
	        "borderWidth": 1,
	        "borderColor": "rgb(138,138,138)",
	        "borderCap": "round",
	        "points": [
	            1.9869,
	            6.489,
	            2,
	            2,
	            14,
	            8,
	            1.9869,
	            14,
	            2,
	            9.555
	        ]
	    }]
	});

	// temp json
	var listData = [
		{name: 'Switch 1', type: 9},
		{name: 'Switch Z11', type: 9},
		{name: 'Switch Z13', type: 9},
		{name: 'Switch Y13', type: 9},
		{name: 'Pathch Panel 2', type: 5},
		{name: 'Pathch Panel x1', type: 5},
		{name: 'Pathch Panel x5', type: 5},
		{name: 'Server xB5', type: 10},
		{name: 'Server xB5', type: 10},
		{name: 'Router xB5', type: 11},
		{name: 'Switch xB5', type: 11},
	]

	var DEFAULT_FLOOR_IMAGE = './imgs/floor.jpeg',
		ICON_SIZE = 26;

	var FloorBuild = function(cms){
		this.cms = cms;
		this.init();
	}

	FloorBuild.prototype = {};
	FloorBuild.prototype.constructor = FloorBuild;

	FloorBuild.prototype.init = function(){
		var self = this,
			listView = this.listView = new ht.widget.ListView(),
			listForm = this.listForm = new ht.widget.FormPane(),
			listBorder = this.listBorder = new ht.widget.BorderPane(),
			gv = this.gv = new ht.graph.GraphView(),
			borderPane = this.borderPane = new ht.widget.BorderPane(),
			toolbar = this.toolbar = new ht.widget.Toolbar(),
			splitView = this.splitView = new ht.widget.SplitView(listBorder, borderPane, 'h', 220),
			overview = this.overview = new ht.graph.Overview(gv),
			overviewDiv = overview.getView();

		overviewDiv.style.height = '120px';
		overviewDiv.style.width = '120px';
		overviewDiv.style.right = '0';
		overviewDiv.style.bottom = '0';
		overviewDiv.style.zIndex = 10;
		borderPane.getView().appendChild(overview.getView());

		gv.setEditable(true);
		gv.dm().setHierarchicalRendering(true);
		gv.handleScroll = function(){};
		gv.dm().mm(function(e){
			if (e.kind === 'remove') {
				self.onRemove(e.data);
			}
		});

		listBorder.setTopView(listForm);
		listBorder.setCenterView(listView);
		listBorder.setTopHeight(32);
		listForm.setVPadding(2);
		listForm.setHPadding(4);
		listForm.addRow([
			{
				comboBox: {
					labels: ['All', 'Pathch Panel', 'Switch', 'Server', 'Backbone Switch/Router'],
					values: [-1, 5, 9, 10, 11],
					value: -1,
					onValueChanged: function(e) {
						var val = this.getValue();
						self.listTypeFilter = val;
						self.listView.ivm();
					}
				}
			}
		], [0.1], 28);
		listView.setVisibleFunc(function(data){
			if (!self.listTypeFilter || self.listTypeFilter === -1)
				return true;
			return data.a('type') === self.listTypeFilter;
		});

		borderPane.setCenterView(gv);
		borderPane.setTopView(toolbar);
		borderPane.setTopHeight(32);

		this.initToolbar();
		listView.handleDragAndDrop = this.handleListDND.bind(this);

		this.addListener();
	}

	FloorBuild.prototype.addListener = function(){
		var self = this;
		self.cms.notifier.add(function(e){
			if (e.kind === 'treeAdd') {
				self.handleSave();
				self.iv();
			}
		});
	}
	FloorBuild.prototype.onRemove = function(data){
		var treeNode = data.a('treeNode');
		cms.treeView.dm().remove(treeNode);
	}

	FloorBuild.prototype.initToolbar = function(){
		var self = this,
			toolbar = self.toolbar;
		var toolbarItems = [
			{
				icon: self.getToolbarIcon('toolbar.save'),
				toolTip: 'Save',
				action: function(){
					self.handleSave();
				}
			},{
				icon: self.getToolbarIcon('toolbar.file'),
				toolTip: 'Select floor plan image',
				action: function(){
					self.handleSelectBg();
				}
			},{
				icon: self.getToolbarIcon('toolbar.delete'),
				toolTip: 'Delete this floor',
				action: function(){
					self.handleRemove();
				}
			},{
				icon: self.getToolbarIcon('editor.preview'),
				toolTip: 'Preview',
				action: function(){
					var json = self.gv.dm().serialize();
					var data = {
						display: json,
						targetId: self.cms.treeView.sm().ld().a('id')
					};
					localStorage.setItem('floorData', JSON.stringify(data));
					location.href = 'viewing-site-floor-map.html';
				}
			},
		]
		toolbar.setItems(toolbarItems);
		toolbar.setStickToRight(true);
		toolbar.enableToolTip(true);
	}

	FloorBuild.prototype.getToolbarIcon = function(url){
		return {
			width: ICON_SIZE + 6,
        	height: ICON_SIZE + 6,
        	comps: [
        		{
        			type: 'image',
        			name: url,
        			color: '#000',
        			rect: [3, 3, ICON_SIZE, ICON_SIZE]
        		}
        	]
		}
	}

	FloorBuild.prototype.setData = function(data) {
		this.data = data;
		this.iv();
		this.loadList();
	}

	FloorBuild.prototype.iv = function(){
		var self = this,
			data = self.data,
			dm = self.gv.dm();
		self.areas = [];
		dm.clear();
		if (!data) return;

		this.addNode(data);
		setTimeout(function(){
			self.fitFloor();
        }, 100);
	}

	FloorBuild.prototype.handleSave = function(){
		var self = this,
			dm = self.gv.dm();
		dm.each(function(data) {
			var type = data.a('type'),
				treeNode = data.a('treeNode');
			if (type === self.cms.TYPE_AREA) {
				var rect = data.getRect();
				treeNode.a({
					x: data.p().x,
					y: data.p().y,
					width: rect.width,
					height: rect.height
				});
			}
			else if (type === self.cms.TYPE_FLOOR) {
				treeNode.a('img', self.background.getImage());
			}
			else {
				treeNode.a({
					x: data.p().x,
					y: data.p().y
				})
			}
		});
	}

	FloorBuild.prototype.handleRemove = function(){
		this.cms.remove();
	}

	FloorBuild.prototype.addNode = function(data, parent){
		var self = this,
			children = data.getChildren(),
			dm = self.gv.dm(),
		node = new ht.Node();

		if (data.a('type') === self.cms.TYPE_FLOOR) {
			self.background = node;
			node.setImage(data.a('img') || DEFAULT_FLOOR_IMAGE);
			node.s('2d.editable', false);
			node.s('2d.movable', false);
		}
		else if (data.a('type') === self.cms.TYPE_AREA) {
			node.setImage(data.a('areaShape') || './symbols/area-rect.json');
			node.setName(data.a('name'));
			node.s('pixelPerfect', false);
			if (data.a('x')) {
				node.p(data.a('x'), data.a('y'));
				node.setWidth(data.a('width'));
				node.setHeight(data.a('height'));
			}
			self.areas.push(node);
		}
		else {
			node.s('2d.editable', false);
			node.setName(data.a('name'));
			if (data.a('x')) {
				node.p(data.a('x'), data.a('y'));
			}
			if (data.a('defaultImage')) {
				node.setImage(data.a('defaultImage'));
			}
		}
		node.a(data.getAttrObject());
		node.a('treeNode', data);
		dm.add(node);

		if (parent) {
			node.setParent(parent);
			node.setHost(parent);
		}
		if (data.a('type') !== cms.TYPE_RACK_SPACE && children && children.size() > 0) {
			children.each(function(child){
				self.addNode(child, node);
			})
		}
	}

	FloorBuild.prototype.fitFloor = function(){
		var self = this,
			gv = self.gv,
			rect = self.background.getRect(),
            width = gv.getWidth(),
            height = gv.getHeight(),
            cx = rect.x + rect.width * 0.5,
            cy = rect.y + rect.height * 0.5,
            zoom = 1,
            x = -cx + width * 0.5,
            y = -cy + height * 0.5;
   		gv.setTranslate(x, y);
	}

	FloorBuild.prototype.loadList = function(list) {
		var self = this,
			listView = self.listView,
			dm = listView.dm();
		dm.clear();
		// TODO available device list from server
		setTimeout(function(){
			var data = listData;
			data.forEach(function(d) {
				var data = new ht.Data();
				data.setName(d.name);
				data.a(d);
				dm.add(data);
			});
		}, 40);
	}
	FloorBuild.prototype.handleListDND = function(e, state){
		var self = this,
			listView = self.listView,
			gv = self.gv,
			dnd = self.dnd;

		if (state ==='prepare') {
			var data = listView.getDataAt(e);
			listView.sm().ss(data);
			if (dnd && dnd.parentNode) {
				document.body.removeChild(dnd);
			}
			dnd = self.dnd = ht.Default.createDiv();
			dnd.style.zIndex = 10;
			dnd.innerText = data.getName();
		}
		else if (state === 'begin') {
			if (dnd) {
				var pagePoint = ht.Default.getPagePoint(e);
                dnd.style.left = pagePoint.x - dnd.offsetWidth * 0.5 + 'px';
                dnd.style.top = pagePoint.y - dnd.offsetHeight * 0.5 + 'px';
                document.body.appendChild(dnd)
			}
		}
		else if (state === 'between') {
			if (dnd) {
				var pagePoint = ht.Default.getPagePoint(e);
                dnd.style.left = pagePoint.x - dnd.offsetWidth * 0.5 + 'px';
                dnd.style.top = pagePoint.y - dnd.offsetHeight * 0.5 + 'px';

                self.judgeInArea(e);
			}
		}
		else {
			if (ht.Default.containedInView(e, self.gv)) {
				var area = self.judgeInArea(e),
					node = new ht.Node(),
					ld = listView.sm().ld();
				node.a(ld.getAttrObject());
				node.p(self.gv.lp(e));
				node.setName(ld.getName());
				node.setHost(area || self.background);
				node.setParent(area || self.background);
				self.gv.dm().add(node);
				if (area) {
					self.oldHoverArea.s('body.color', null);
					self.oldHoverArea = null;
				}
				// update tree data
				var treeNode = self.cms.createData(ld.getAttrObject(), area ? area.a('treeNode') : self.background.a('treeNode'));
				node.a('treeNode', treeNode);
			}
			document.body.removeChild(dnd);
			self.dnd = null;
		}
	}
	FloorBuild.prototype.judgeInArea = function(e){
		var self = this,
			areas = self.areas,
			lp = self.gv.lp(e),
			area = null;
		if (areas.length === 0) return;

		for (var i = 0; i < areas.length; i++) {
			if (ht.Default.containsPoint(areas[i].getRect(), lp)) {
				area = areas[i];
				break;
			}
		}
		if (area) {
			self.oldHoverArea = area;
			area.s('body.color', 'red');
		}
		else if (self.oldHoverArea) {
			self.oldHoverArea.s('body.color', null);
			self.oldHoverArea = null;
		}
		return area;
	}
	FloorBuild.prototype.handleSelectBg = function(){
		var self = this;
		if (!self.fileDom) {
			var fileDom = self.fileDom = document.createElement('input');
			fileDom.setAttribute('type', 'file');
			fileDom.style.width = 0;
			fileDom.style.height = 0;
			fileDom.addEventListener('change', function(e){
				var file = e.target.files[0];
				// is image
				if (file && file.type.indexOf('image') === 0) {
					var reader = new FileReader();
					reader.onload = function (e) {
	                    self.background.setImage(e.target.result);
	                    self.background.setSize(-1, -1);
	                    // remove dom
	                    document.body.removeChild(self.fileDom)
	                    self.fileDom = null;
	                }
					reader.readAsDataURL(file)
				}
			});
			document.body.appendChild(fileDom);
		}

		self.fileDom.click();
	}
	FloorBuild.prototype.getView = function(){
		return this.splitView.getView();
	}
	FloorBuild.prototype.getHTView = function(){
		return this.splitView;
	}

	w.FloorBuild = FloorBuild;
})(window);