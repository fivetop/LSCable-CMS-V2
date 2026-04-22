(function(w){

	var treeData = [
		{
			id: 1,
			name: 'l2 switch',
			portCount: 24
		}, {
			id: 2,
			name: 'l3 switch',
			portCount: 12
		}
	]
	var ICON_SIZE = 26;

	var CMS = function(){
		this.init();
	}

	var pt = CMS.prototype = {};
	pt.constructor = CMS;
	pt.init = function(){
		this.initUI();
		this.initToolbar();

		this.loadCableData();
		this.loadTreeData();

		var patchPanel = this.patchPanel = new Patch(50, 28);
		this.gv.dm().add(patchPanel);
		this.gv.fitContent();

		this.setEditable(false);

		this.splitView.addToDOM();
		this.addEventListener();
	}
	pt.addEventListener = function(){
		var self = this;
		window.addEventListener('keyup', function(e){
			if (e.keyCode === 8) {
				self.removeSelection()
			}
		})
	}
	pt.removeSelection = function(){
		var self = this,
			selection = self.gv.sm().getSelection();

		self.patchPanel.removeDevices(selection);
		selection.each(function(data){
			if (data instanceof Patch) return;
			self.gv.dm().remove(data);
		});
	}
	pt.initUI = function(){
		var self = this,
			gv = this.gv = new ht.graph.GraphView(),
			treeView = this.treeView = new ht.widget.TreeView(),
			toolbar = this.toolbar = new ht.widget.Toolbar(),
			rightBorderPane = this.rightBorderPane = new ht.widget.BorderPane(),
			cablePane = this.cablePane = new ht.widget.Palette(),
			splitView = this.splitView = new ht.widget.SplitView(treeView, rightBorderPane, 'h', 280),
			overview = this.overview = new ht.graph.Overview(gv),
			overviewDiv = overview.getView();

		overviewDiv.style.height = '120px';
		overviewDiv.style.width = '120px';
		overviewDiv.style.left = '0';
		overviewDiv.style.bottom = '0';
		overviewDiv.style.zIndex = 10;
		rightBorderPane.getView().appendChild(overviewDiv);

		rightBorderPane.setCenterView(gv);
		rightBorderPane.setTopView(toolbar);
		rightBorderPane.setTopHeight(32);
		rightBorderPane.setRightView(cablePane);
		rightBorderPane.setRightWidth(180);

		// gv.dm().setHierarchicalRendering(true);
		gv.mi(self.handleInteractor, self);
		var scrollBarinteractor = new ht.graph.ScrollBarInteractor(gv),
            selectInteractor = new ht.graph.SelectInteractor(gv),
            moveInteractor = new ht.graph.MoveInteractor(gv),
            defaultInteractor = new ht.graph.DefaultInteractor(gv),
            touchInteractor = new ht.graph.TouchInteractor(gv, {editable: false});
		self.editInteractors = [
			scrollBarinteractor,
			selectInteractor,
			moveInteractor,
			defaultInteractor,
			touchInteractor];
		self.uneditInteractor = [defaultInteractor, touchInteractor, moveInteractor];

		treeView.handleDragAndDrop = self.handleTreeDND.bind(self);
		treeView.getLabelColor = function(data){
			return data.a('topoNode') ? '#ddd' : '#000';
		}

		cablePane.getView().style.backgroundColor = '#f7f7f7';
		cablePane.handleDragAndDrop = self.handleCableDND.bind(self);
	}
	pt.initToolbar = function (){
		var self = this,
			toolbar = self.toolbar;

		var toolbarItems = [
			{
				icon: self.getToolbarIcon('fitContent'),
				toolTip: 'Zoom Fit',
				action: function(){
					self.gv.fitContent(true);
				}
			}, {
				icon: self.getToolbarIcon('importExport'),
				toolTip: 'Import/Export',
				action: function(){
					// TODO
				}
			}, {
				icon: self.getToolbarIcon('toolbar.edit', function(){
					return !self._editable;
				}),
				toolTip: 'Edit',
				action: function(){
					// TODO
					self.setEditable(true);
				}
			}, {
				icon: self.getToolbarIcon('toolbar.save', function(){
					return self._editable;
				}),
				toolTip: 'Save',
				action: function(){
					// TODO
					self.setEditable(false);
					console.log(self.serialize());
				}
			}
		];

		toolbar.setItems(toolbarItems);
		toolbar.setStickToRight(true);
		toolbar.enableToolTip(true);
	}
	pt.setEditable = function(v){
		var old = this._editable;
		if (v === old) return;

		this._editable = v;

		this.gv.setInteractors( v ? this.editInteractors : this.uneditInteractor);
		this.cablePane.setDisabled(!v)
	}
	pt.getToolbarIcon = function(url, stateFunc){
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
	}
	pt.loadCableData = function(){
		var self = this,
			cablePane = self.cablePane,
			dm = cablePane.dm();
		// temp data
		var data = [
			{name: 'AVG', img: 'cable.vga'},
			{name: 'Cable1', img: 'cable1'},
		];
		setTimeout(function(){
			var group = new ht.Group();
			group.setName('Cable');
			group.setExpanded(true);
			dm.add(group);
			data.forEach(function(d){
				var node = new ht.Node();
				node.setImage(d.img);
				node.setName(d.name);
				node.setParent(group);
				node.s("draggable", true);
				dm.add(node);
			});
		}, 10);
	}

	pt.loadTreeData = function(){
		var self = this;

		setTimeout(function(){
			var data = treeData;

			data.forEach(function(d) {
				self.addTreeData(d, null);
			});
		}, 10);
	}
	pt.addTreeData = function(data, parent){
		var self = this,
			htData = new ht.Data(),
			dm = this.treeView.dm();
		htData.a(data);
		htData.setName(data.name)
		if (parent) {
			htData.setParent(parent);
		}
		dm.add(htData);
		if (data.children) {
			data.children.forEach(function(d){
				self.addTreeData(d, htData);
			});
		}
		if (data.portCount) {
			for (var i = 1; i <= data.portCount; i++) {
				self.addTreeData({
					name: 'port ' + i,
					port: i,
					isPort: true
				}, htData);
			}
		}
		return htData;
	}
	pt.handleTreeDND = function(e, state) {
		if (!this._editable) return;
		var self = this,
			treeView = self.treeView,
			dnd = self.dnd,
			dm = self.gv.dm();


		if (state === 'prepare') {
			var data = treeView.getDataAt(e);

			if (!data || !data.a('isPort')) return;

			treeView.sm().ss(data);

			if (data.a('topoNode')) {
				self.gv.sm().ss(data.a('topoNode'));
				return;
			}

			if (dnd && dnd.parentNode) {
				document.body.removeChild(dnd);
			}
			dnd = self.dnd = ht.Default.createDiv();
			dnd.style.zIndex = 10;
			dnd.innerText = data.getParent().getName() + ' - ' + data.a('port');
		}
		if (!dnd) return;

		if (state === 'begin') {
            document.body.appendChild(dnd)
		}
		else if (state === 'between') {
			var pagePoint = ht.Default.getPagePoint(e),
				ld = treeView.sm().ld();
            dnd.style.left = pagePoint.x - dnd.offsetWidth * 0.5 + 'px';
            dnd.style.top = pagePoint.y - dnd.offsetHeight * 0.5 + 'px';
            self.showDragHelper(e, true, ld.getParent().a('id'));
		}
		else if (state === 'end') {
			var ld = treeView.sm().ld(),
				deviceId = ld.getParent().a('id'),
				rect = self.showDragHelper(e, true, deviceId);

			if (rect) {
				var node = new ht.Node();
				node.setImage('port.icon');
				node.a({
					'port.info': dnd.innerText,
					'treeNode': ld,
					'device.type': 1,
					'device.id': deviceId
				});
				ld.a('topoNode', node);
				dm.add(node);
				this.patchPanel.plugIn(node, rect);

				dm.remove(self.dragHelper);
			}

			document.body.removeChild(dnd);
			self.dnd = null;
		}

	}
	pt.handleCableDND = function(e, state) {
		if (!this._editable) return;
		var self = this,
			cablePane = self.cablePane,
			dm = self.gv.dm();

		if (state === 'between') {
			self.showDragHelper(e);
		}
		else if (state === 'end') {
			var rect = self.showDragHelper(e),
				ld = cablePane.sm().ld();
			if (rect) {
				var node = new ht.Node();
				node.setImage(ld.getImage());
				node.a('device.type', 2);
				dm.add(node);
				this.patchPanel.plugIn(node, rect);

				dm.remove(self.dragHelper);
			}
		}
	}
	pt.handleInteractor = function(e) {
		if (!this._editable || e.kind.indexOf('Move') < 0) return;
		var target = this.gv.sm().ld();
		if (!target || !target.a('device.type')) return;

		if (e.kind === 'prepareMove') {
			target.a('oldRect', target.getRect());
		}
		else if (e.kind === 'betweenMove') {
			this.showDragHelper(e.event, target.a('device.type') === 1);
			this.gv.dm().sendToTop(target)
		}
		else if (e.kind === 'endMove') {
			var rect = this.showDragHelper(e.event, target.a('device.type') === 1);
			if (rect) {
				this.patchPanel.rePlugIn(target, rect);
				this.gv.dm().remove(this.dragHelper);
			}
			else {
				var oldRect = target.a('oldRect');
				target.p(oldRect.x + oldRect.width * 0.5, oldRect.y + oldRect.height * 0.5);
			}
		}

	}
	pt.showDragHelper = function(e, isPort, deviceId){
		var self = this,
			dragHelper = self.dragHelper,
			data = self.gv.getDataAt(e, function(data) {
				return data instanceof Patch;
			}),
			dm = self.gv.dm();

		if (!dragHelper) {
			dragHelper = self.dragHelper = new ht.Node();
			dragHelper.s('image.stretch', 'centerUniform')
			dragHelper.setImage('port.plug');
		}
		if (data) {
			var rect = data.getCellRect(self.gv.lp(e), isPort, deviceId);
			if (rect) {
				if (!dm.contains(dragHelper)) {
					dm.add(dragHelper);
				}
				dragHelper.p(rect.x + rect.width * 0.5, rect.y + rect.height * 0.75);
				dragHelper.setSize(rect.width * 0.5, rect.height * 0.5);
				return rect;
			}
		}
		if (dm.contains(dragHelper)) {
			dm.remove(dragHelper);
		}
	}
	pt.serialize = function(){
		var patchPanel = this.patchPanel;
		return {
			startIndex: patchPanel.a('start.index'),
			endIndex: patchPanel.a('end.index'),
			devices: patchPanel.serializeDevices()
		}
	}

	w.cms = new CMS();

})(window);