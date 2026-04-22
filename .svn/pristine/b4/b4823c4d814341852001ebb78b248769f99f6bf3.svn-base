(function(w){

	ht.Default.setImage('toolbar.add.rack', {
		"background": "rgb(130,130,130)",
		"width": 16,
		"height": 16,
		"comps": [{
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				7.55205,
				14.52911,
				2.45927,
				14.52911,
				2.45927,
				1.52086,
				13.49363,
				1.52086,
				13.49363,
				8.43478
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				8.54249,
				12.50305,
				14.54249,
				12.50305,
				11.54249,
				12.50305,
				11.54249,
				9.50305,
				11.54249,
				15.50305
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				6.44839,
				4.5,
				9.50451,
				4.5
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				6.44839,
				7.5,
				9.50451,
				7.5
			]
		}]
	});
	ht.Default.setImage('toolbar.edit.rack', {
		"background": "rgb(128,128,128)",
		"width": 16,
		"height": 16,
		"comps": [{
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				4.97735,
				14.52911,
				2.45927,
				14.52911,
				2.45927,
				1.52086,
				13.49363,
				1.52086,
				13.49363,
				3.97983,
				13.49363,
				13,
				13.49363,
				14.52911,
				12.13999,
				14.52911
			],
			"segments": [
				1,
				2,
				2,
				2,
				2,
				1,
				2,
				2
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				6.44839,
				4.5,
				9.50451,
				4.5
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"shadowColor": "#1ABC9C",
			"points": [
				6.44839,
				7.5,
				9.50451,
				7.5
			]
		}, {
			"type": "shape",
			"borderWidth": 1,
			"borderColor": "rgb(255,255,255)",
			"borderCap": "round",
			"closePath": true,
			"points": [
				13,
				6,
				15,
				8,
				9,
				14.0442,
				7,
				14,
				7,
				12,
				13,
				6,
				11.56,
				7.56,
				13.52,
				9.48
			],
			"segments": [
				1,
				2,
				2,
				2,
				2,
				2,
				1,
				2
			]
		}]
	});

	var ICON_SIZE = 26;

	// temp json
	var listData = [
		{name: 'Switch 1', type: 9, uHeight: 1, img: './symbols/carrey icon/机房设备/pane1.json'},
		{name: 'Switch Z11', type: 9, img: './symbols/carrey icon/机房设备/pane1.json'},
		{name: 'Switch Z13', type: 9, uHeight: 2, img: './symbols/carrey icon/机房设备/pane1.json'},
		{name: 'Switch Y13', type: 9, uHeight: 3, img: './symbols/carrey icon/机房设备/pane1.json'},
		{name: 'Pathch Panel 2', type: 5, uHeight: 5, img: './symbols/carrey icon/机房设备/pane2.json'},
		{name: 'Pathch Panel x1', type: 5, uHeight: 3, img: './symbols/carrey icon/机房设备/pane2.json'},
		{name: 'Pathch Panel x5', type: 5, uHeight: 2, img: './symbols/carrey icon/机房设备/pane2.json'},
		{name: 'Server xB5', type: 10, img: './symbols/carrey icon/机房设备/pane-simple.json'},
		{name: 'Server xB5', type: 10, uHeight: 4, img: './symbols/carrey icon/机房设备/pane-simple.json'},
		{name: 'Router xB5', type: 11, img: './symbols/carrey icon/机房设备/pane-simple.json'},
		{name: 'Switch xB5', type: 11, img: './symbols/carrey icon/机房设备/pane-simple.json'},
	]

	var RackBuild = function(cms){
		this.cms = cms;
		this.init();
	}

	RackBuild.prototype = {
		constructor: RackBuild,
		RACK_GAP: 16,
		init: function(){
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
			overviewDiv.style.left = '0';
			overviewDiv.style.bottom = '0';
			overviewDiv.style.zIndex = 10;
			borderPane.getView().appendChild(overview.getView());

			gv.setToolTipEnabled(true);
			gv.mi(this.handleInteractor.bind(this));
			gv.sm().setSelectionMode('single');
			gv.sm().ms(function(){
				self.toolbar.iv();
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
			listView.handleDragAndDrop = this.handleListDND.bind(this);

			borderPane.setCenterView(gv);
			borderPane.setTopView(toolbar);
			borderPane.setTopHeight(32);

			this.initToolbar();
			this.initDialog();
			self.addListener();

			self.dragHelper = new ht.Node();
			self.dragHelper.setImage('./symbols/temp.json');
			self.dragHelper.setAnchor(0, 0);
			self.dragHelper.s({
				'body.color': '#7ED321',
				'opacity': 0.5
			});
		},
		addListener: function(){
			var self = this;
			self.cms.notifier.add(function(e){
				if (e.kind === 'treeAdd') {
					self.handleSave();
					self.iv();
				}
			});
		},
		initToolbar: function(){
			var self = this,
				toolbar = self.toolbar;
			var toolbarItems = [
				{
					icon: self.getToolbarIcon('toolbar.add.rack'),
					toolTip: 'Delete a rack',
					action: function(){
						self._editingRack = null;
						self.addRackForm.reset();
						self.addRackDialog.show();
					}
				},{
					icon: self.getToolbarIcon('toolbar.edit.rack', function(){
						return self.gv.sm().ld() instanceof Rack;
					}),
					toolTip: 'Edit rack info',
					action: function(){
						var ld = self.gv.sm().ld();
						if (!ld) return;
						self._editingRack = ld;
						self.addRackForm.v('name', ld.a('name'));
						self.addRackForm.v('usize', ld.a('usize'));
						self.addRackDialog.show();
					}
				},{
					icon: self.getToolbarIcon('toolbar.save', function(){
						return !!self._savable * 1;
					}),
					toolTip: 'Save',
					action: function(){
						self.handleSave();
					}
				},{
					icon: self.getToolbarIcon('toolbar.delete', function(){
						return self.gv.sm().ld() instanceof Rack;
					}),
					toolTip: 'Delete a rack',
					action: function(){
						self.handleRemoveRack();
					}
				},
			]
			toolbar.setItems(toolbarItems);
			toolbar.setStickToRight(true);
			toolbar.enableToolTip(true);
		},
		initDialog: function(){
			var self = this,
				addRackDialog = this.addRackDialog = new ht.widget.Dialog(),
				addRackForm = this.addRackForm = new FormPane(),
				labelWidth = 72;

			addRackForm.addRow([
				'Name',{
					id: 'name',
					textField: {}
				}
			], [labelWidth, 0.1]);

			addRackForm.addRow([
				'Height(U)',{
					id: 'usize',
					textField: {
						type: 'number'
					}
				}
			], [labelWidth, 0.1]);

			addRackDialog.setConfig({
	            title: "New Rack",
			    content: addRackForm,
			    width: 320,
			    height: 220,
			    draggable: true,
			    closable: true,
			    resizeMode: "none",
			    buttons: [
			    	{
				        label: "Ok",
				        action: function(button, e) {
				        	var formData = addRackForm.getValueObject(), rack;
				        	if (self._editingRack) {
				        		rack = self._editingRack;
				        		rack.a(formData);
				        		rack.a('treeNode').a(rack.getAttrObject());
				        	}
				        	else {
				        		rack = self.createRack(formData);
					        	self.gv.dm().add(rack);
					        	// update tree
					        	formData.type = self.cms.TYPE_RACK;
					        	var treeNode = self.cms.createData(formData, cms.treeView.sm().ld());
					        	rack.a('treeNode', treeNode);
				        	}
				        	self.gv.fitContent(1);
				        	addRackDialog.hide();

		    			}
		    		}, {
		    			label: 'Cancel',
		    			action: function(){
				            addRackDialog.hide();
		    			}
		    		}
			    ],
			    buttonsAlign: "right"
	        });
		},
		handleSave: function(){
			if (!this._savable) return;

			var self = this,
				dm = self.gv.dm();
			dm.each(function(data) {
				var treeNode = data.a('treeNode');
				if (treeNode) {
					treeNode.a(data.getAttrObject());
				}
			});
			this._savable = false;
			this.toolbar.iv();
		},
		handleRemoveRack: function(){
			var ld = this.gv.sm().ld();
			if (ld && ld instanceof Rack) {
				this.cms.treeView.dm().remove(ld.a('treeNode'));
				this.gv.dm().remove(ld);
			}

		},
		getToolbarIcon: function(url, stateFunc){
			return {
				width: ICON_SIZE + 6,
	        	height: ICON_SIZE + 6,
	        	comps: [
	        		{
	        			type: 'image',
	        			name: url,
	        			color: {
	        				func: function(){
	        					if (stateFunc) {
	        						var state = stateFunc();
	        						return state ? '#000' : '#ababab';
	        					}
		        				return '#000';
	        				}
	        			},
	        			rect: [3, 3, ICON_SIZE, ICON_SIZE]
	        		}
	        	]
			}
		},
		setData: function(data) {
			this._savable = false;
			this.data = data;
			this.iv();
			this.loadList();
		},
		iv: function(){
			var self = this,
				data = self.data,
				dm = self.gv.dm();
			self.racks = [];
			dm.clear();
			if (!data) return;

			this.addNode(data);
			this.gv.fitContent();
		},
		addNode: function(data, parent){
			var self = this,
				children = data.getChildren(),
				dm = self.gv.dm(),
				cms = self.cms,
				node;

			if (data.a('type') === cms.TYPE_RACK) {
				node = self.createRack(data.getAttrObject());
			}
			else if (parent && parent.a('type') === cms.TYPE_RACK) {
				var rect = parent.caluCellRect(data.a('uindex'), data.a('uHeight'));
				node = self.createPane(rect, data.getAttrObject(), parent, data.a('uindex'));
			}
			if (node) {
				node.a(data.getAttrObject());
				node.a('treeNode', data);
				dm.add(node);

				if (parent) {
					node.setParent(parent);
					node.setHost(parent);
				}
			}

			if (children && children.size() > 0) {
				children.each(function(child){
					self.addNode(child, node);
				})
			}
		},
		onRackAdd: function(rack){
			var self = this,
				racks = self.racks;

			if (racks.length !== 0) {
				var lastRack = racks[racks.length - 1],
					rect = lastRack.getRect();
				rack.p(rect.x + rect.width + self.RACK_GAP, lastRack.getY());
			}
			racks.push(rack);
		},
		loadList: function(list) {
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
		},
		getView: function(){
			return this.splitView.getView();
		},
		getHTView: function(){
			return this.splitView;
		},
		handleListDND: function(e, state){
			var self = this,
				listView = self.listView,
				gv = self.gv,
				dm = gv.dm(),
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
	                self.showDragHelper(e);
				}
			}
			else {
				if (ht.Default.containedInView(e, self.gv)) {
					if (dm.contains(self.dragHelper)) {
						var rect = self.dragHelper.getRect(),
							target = self.showDragHelper(e),
							node,
							ld = self.listView.sm().ld(),
							uindex = target.getCellIndex(rect.y);
						node = self.createPane(rect, ld.getAttrObject(), target, uindex);
						dm.add(node);
						// update tree data
						var treeNode = self.cms.createData(ld.getAttrObject(), target.a('treeNode'));
						treeNode.a('uindex', uindex);
						node.a('treeNode', treeNode);

						dm.remove(self.dragHelper);
					}
				}
				document.body.removeChild(dnd);
				self.dnd = null;
			}
		},
		createPane: function(rect, attr, parent, uindex){
			var node = new ht.Node();
			node.setAnchor(0, 0);
			node.setSize(rect.width, rect.height);
			node.p(rect);
			node.a(attr);
			node.a('uindex', uindex);
			node.setImage(attr.img || './imgs/pane.png');
			node.setHost(parent);
			node.setParent(parent);
			node.setToolTip(attr.name);
			// this.gv.dm().add(node);
			return node;
		},
		createRack: function(attr){
			var node = new Rack(attr.usize);
			node.s({
				'2d.editable': false,
				'2d.movable': false,
				'pixelPerfect': false
			});
			node.setAnchor(0, 1);
			node.a(attr);
			this.onRackAdd(node);
			return node;
		},
		showDragHelper: function(e, uHeight){
			var self = this,
				dm = self.gv.dm(),
				lp = self.gv.lp(e),
				ld = self.listView.sm().ld(),
				racks = self.racks,
				rect = null,
				target = null;
			if (racks.length === 0) return;

			for (var i = 0; i < racks.length; i++) {
				rect = racks[i].getCellRect(lp, uHeight || ld.a('uHeight'));
				if (rect) {
					target = racks[i];
					break;
				}
			}

			if (rect) {
				if (!dm.contains(self.dragHelper)) {
					dm.add(self.dragHelper);
				}
				self.dragHelper.p(rect);
				self.dragHelper.setSize(rect.width, rect.height);
			}

			if (!rect && dm.contains(self.dragHelper)){
				dm.remove(self.dragHelper);
			}
			return target;
		},
		handleInteractor: function(e){
			if (e.kind.indexOf('Move') < 0) return;

			var self = this,
				listView = self.listView,
				gv = self.gv,
				dm = gv.dm(),
				target = gv.sm().ld(),
				uHeight = target.a('uHeight') || 1;

			if (e.kind === 'prepareMove') {
				self._oldPosition = target.p();
			}
			else if (e.kind === 'betweenMove') {
				self.showDragHelper(e.event, uHeight);
				dm.sendToTop(target);
			}
			else if (e.kind === 'endMove') {
				var rack = self.showDragHelper(e.event, uHeight);
				if (dm.contains(self.dragHelper)) {
					target.p(self.dragHelper.p());
					target.a('uindex', rack.getCellIndex(target.p().y));
					dm.remove(self.dragHelper);
					self._savable = true;
					self.toolbar.iv();
					target.setHost(rack);
					target.setParent(rack);
					// update tree
					var treeNode = target.a('treeNode');
					treeNode.setParent(rack.a('treeNode'));

				}
				else {
					target.p(self._oldPosition);
				}
			}
		}
	};

	w.RackBuild = RackBuild;
})(window);