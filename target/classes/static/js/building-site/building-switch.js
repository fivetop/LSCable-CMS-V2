(function(w){

	ht.Default.setImage('switch.port', {
		"dataBindings": [{
			"attr": "state.color",
			"valueType": "Color"
		}],
		"width": 24,
		"height": 20,
		"comps": [{
			"type": "rect",
			"background": "rgb(161,161,161)",
			"rect": [
				0,
				0,
				24,
				20
			]
		}, {
			"type": "shape",
			"background": {
				"func": "attr@state.color",
				"value": "rgb(0,255,81)"
			},
			"borderColor": "rgb(150,150,150)",
			"closePath": true,
			"points": [
				6,
				2,
				6,
				2,
				5.52901,
				3.18367,
				4.52901,
				4.43367,
				3.52901,
				5.68367,
				2,
				6,
				2,
				6,
				2,
				18,
				22,
				18,
				22,
				6,
				22,
				6,
				20.59394,
				5.43367,
				19.59394,
				4.43367,
				18.59394,
				3.43367,
				18,
				2,
				18,
				2
			],
			"segments": [
				1,
				4,
				4,
				2,
				2,
				2,
				4,
				4
			]
		}]
	});

	var SwitchBuild = function(cms){
		this.cms = cms;
		this.init();
	}

	var pt = SwitchBuild.prototype = {};
	pt.constructor = SwitchBuild;
	pt.COLOR_PLUGGED = 'rgb(0,255,81)';
	pt.COLOR_UNPLUGGED = 'rgb(23,23,23)';

	pt.init = function(){
		var mainBorder = this.mainBorder = new ht.widget.BorderPane(),
			formPane = this.formPane = new FormPane(),
			portGv = this.portGv = new ht.graph.GraphView(),
			topoGv = this.topoGv = new ht.graph.GraphView();

		mainBorder.setCenterView(formPane);
		mainBorder.setTopView(portGv);
		mainBorder.setBottomView(topoGv);
		mainBorder.setTopHeight(68);
		mainBorder.setBottomHeight(220);

		portGv.getView().style.borderBottom = '1px solid #066086';
		portGv.setInteractors([
            new ht.graph.SelectInteractor(portGv)
        ]);
		topoGv.getView().style.borderTop = '1px solid #066086';
        topoGv.setInteractors([
            new ht.graph.SelectInteractor(topoGv)
        ]);

        portGv.sm().ms(this.handlePortSelect, this);

		this.initForm();
	}
	pt.initForm = function () {
		var self = this,
			form = self.formPane,
			config = formConfig['l2Switch'];
		config.forEach(function(item){
			var row = self.cms.createFormItem(item);
			form.addRow(row, [0.1, 0.2, 0.6, 0.1], 28);
		});

		form.addRow([
			'',{
				button: {
					label: 'Save',
					onClicked: self.handleSave.bind(self)
				}
			}, {
				button: {
					label: 'Remove',
					onClicked: self.handleRemove.bind(self)
				}
			}, ''
		], [0.1, 80, 80, 0.1], 36);
	}
	pt.handleSave = function(){
		var self = this,
			form = self.formPane,
			ld = self.cms.treeView.sm().ld(),
			values = form.getValueObject();

		ld.a(values);
	}
	pt.handleRemove = function(){
		this.cms.remove();
	}
	pt.setData = function(data){
		this.data = data;
		this.iv();
	}
	pt.iv = function(){
		var self = this,
			data = self.data;
		this.formPane.reset();
		if (!data) return;
		this.formPane.setValues(data.getAttrObject());
		this.loadPorts();
	}
	pt.loadPorts = function(){
		var self = this,
			count = this.data.a('portCount'),
			dm = this.portGv.dm();
		dm.clear();
		// TODO temp data
		var jsonData = [];
		for (var i = 0; i < count; i++) {
			jsonData.push({pid: i, status: Math.floor(Math.random() + 0.5)});
		}
		/////////
		setTimeout(function(){
			var x = 0;
			jsonData.forEach(function(p, i) {
				var node = new ht.Node();
				node.setImage('switch.port');
				node.a('state.color', p.status ? self.COLOR_PLUGGED : self.COLOR_UNPLUGGED);
				node.a('status', p.status);
				node.s({
					'2d.movable': false,
				})
				x += node.getWidth();
				node.setX(x);
				dm.add(node);
				if (i && (i + 1) % 5 ===0) {
					x += 20;
				}
			}, 10);
			self.portGv.fitContent(true, 5);
		});
	}
	pt.handlePortSelect = function(){
		var ld = this.portGv.sm().ld();
		this.topoGv.dm().clear();

		if (!ld || !ld.a('status')) return;

		this.loadTopo();
	}
	pt.loadTopo = function(){
		var self = this,
			dm = self.topoGv.dm();

		setTimeout(function(){
			var node1 = new ht.Node(),
				node2 = new ht.Node(),
				node3 = new ht.Node(),
				edge = new ht.Edge(node1, node2),
				edge2 = new ht.Edge(node2, node3);
			node2.p(100, 0);
			node3.p(200, 0);
			dm.add(node1);
			dm.add(node2);
			dm.add(node3);
			dm.add(edge);
			dm.add(edge2);

			self.topoGv.fitContent(1);
		}, 10);
	}

	pt.getView = function(){
		return this.mainBorder.getView();
	}
	pt.getHTView = function(){
		return this.mainBorder;
	}

	w.SwitchBuild = SwitchBuild;

})(window);