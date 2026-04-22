(function(w){

	var ICON_SIZE = 24;
	let btnIconColor = 'rgb(159, 159, 159)',
	    btnSelectColor = 'rgb(231, 231, 231)',
	    btnBgColor = '#fff';

	var CMS = function(){
		this.init();
	}
	var pt = CMS.prototype = {};
	pt.constructor = CMS;
	pt._iconSize = 46;

	pt.init = function(){
		this.dnd = {};
		this.initUI();
		this.initListView();
		this.initPropertyForm();
		this.initPropertyView();
		this.initToolbar();

		this.loadListDatas();
		this.mainSplitPane.addToDOM();

		this.propertyForm.refreshData();
	}
	pt.initUI = function(){
		var self = this;
		var gv = this.gv = new ht.graph.GraphView(),
			listForm = this.listForm = new ht.widget.FormPane(),
			leftTopBorderPane = this.leftTopBorderPane = new ht.widget.BorderPane(),
			listView = this.listView = new ht.widget.ListView(),
			propertyForm = this.propertyForm = new FormPane(),
			toolbar = this.toolbar = new ht.widget.FormPane(),
			borderPane = this.borderPane = new ht.widget.BorderPane(),
			leftSplitPane = this.leftSplitPane = new ht.widget.SplitView(leftTopBorderPane, propertyForm, 'v', 0.61),
			mainSplitPane = this.mainSplitPane = new ht.widget.SplitView(leftSplitPane, borderPane, 'h', 320),
			overview = this.overview = new ht.graph.Overview(gv),
			overviewDiv = overview.getView(),
			propertyView = this.propertyView = new ht.widget.PropertyView(gv.dm());

		overviewDiv.style.height = '120px';
		overviewDiv.style.width = '120px';
		overviewDiv.style.left = '0';
		overviewDiv.style.bottom = '0';
		overviewDiv.style.zIndex = 10;
		overview.handleScroll = function(){}
		borderPane.getView().appendChild(overview.getView());

		toolbar.setVPadding(0);
		toolbar.setHPadding(0);
		toolbar.setHGap(0);
		toolbar.getView().style.background = '#f7f7f7';

		borderPane.setCenterView(gv);
		borderPane.setTopView(toolbar);
		borderPane.setTopHeight(32);
		borderPane.setRightView(propertyView);
		borderPane.setRightWidth(240);

		gv.setEditable(true);
		gv.enableToolTip();
		gv.enableFlow(60);
		gv.dm().setHierarchicalRendering(1);
		gv.dm().enableHistoryManager();
		gv.getView().style.borderRight = '1px solid #2c3e50';
		gv.handleScroll = function(){};

		var node = this.bgNode = new ht.Node();
		node.setImage('./imgs/map.jpeg');//temporary map
		node.a('isMap', true);
		node.s('2d.editable', false);
		gv.dm().add(node);
		gv.dm().md(function(){
			self.propertyForm.refreshData();
		});
		gv.fitContent();

		leftTopBorderPane.setCenterView(listView);
		leftTopBorderPane.setTopView(listForm);
		leftTopBorderPane.setTopHeight(46);
		var searchInput = this.searchInput = new ht.widget.TextField();
		searchInput.getElement().addEventListener('keyup', function(e){
			self.listView.ivm();
		});
		listForm.addRow([
			{
				element: searchInput
			}, {
				button:{
					label: 'Search',
					onClicked: function(){
						self.listView.ivm();
					}
				}
			}
		], [0.5, 0.2], 30);
	}
	pt.initPropertyForm = function(){
		var self = this,
			form = self.propertyForm;
		form.addRow([
			'Width',
			{
				id: 'width',
				getter: function(){ return self.bgNode.getWidth();},
				setter: function(v){ self.bgNode.setWidth(parseFloat(v)); },
				textField: {
					type: 'number'
				}
			}
		], [80, 0.1]);

		form.addRow([
			'Height',
			{
				id: 'height',
				getter: function(){ return self.bgNode.getHeight();},
				setter: function(v){ self.bgNode.setHeight(parseFloat(v)) },
				textField: {
					type: 'number'
				}
			}
		], [80, 0.1]);

		form.addRow([
			'Opacity',
			{
				id: 'opacity',
				getter: function(){ return self.bgNode.s('opacity') || 1;},
				setter: function(v){ self.bgNode.s('opacity', v) },
				textField: {
				}
			}
		], [80, 0.1]);

		form.addRow([
			'Background',
			{
				id: 'background',
				button: {
					label: 'select image',
					onClicked: function(){
						self.handleSelectBg();
					}
				}
			}
		], [80, 0.1]);

		form.addRow([
			'Export JSON',
			{
				id: 'exportJson',
				// getter: function(){ return self.gv.dm().serialize()},
				textArea: {
				}
			}
		], [80, 0.1], 150);

		var exportJsonTextArea = form.getItemById('exportJson').element.getElement();
		exportJsonTextArea.value = self.gv.dm().serialize();
		exportJsonTextArea.addEventListener('focus', function(){
			exportJsonTextArea.value = self.gv.dm().serialize();
		})

		// });

		form.addRow([
		{
			button: {
				label: 'Start',
				onClicked: function(){
					self.startAlarm();
					this.setLabel(self._timer ? 'Stop' : 'Start');
				}
			}
		}
		], [98]);

	}
	pt.initPropertyView = function(){
		var self = this;

		var edgeProperties = [
            {
                name: 'edge.color',
                displayName: 'Color',
                accessType: 'style',
                valueType: 'color',
                colorPicker: {
                	instant: true
                },
                editable: true
            },
            {
                name: 'flow.element.background',
                displayName: 'Flow Color',
                accessType: 'style',
                valueType: 'color',
                colorPicker: {
                	instant: true
                },
                editable: true
            },{
                name: 'flow.element.shadow.begincolor',
                displayName: 'Flow Shadow Begin',
                accessType: 'style',
                valueType: 'color',
                colorPicker: {
                	instant: true
                },
                editable: true
            },{
                name: 'flow.element.shadow.endcolor',
                displayName: 'Flow Shadow end',
                accessType: 'style',
                valueType: 'color',
                colorPicker: {
                	instant: true
                },
                editable: true
            },{
                name: 'edge.type',
                displayName: 'Edge Type',
                accessType: 'style',
                enum: {
                	values: ['points', 'boundary', 'ripple', 'h.v', 'v.h', 'ortho', 'flex', 'extend.east', 'extend.west', 'extend.north', 'extend.south'],
                },
                editable: true
            },
        ];

        this.gv.sm().ms(function(){
        	var ld = self.gv.sm().ld();
        	self.propertyView.setProperties(null);
        	if (ld instanceof ht.Edge) {
        		self.propertyView.setProperties(edgeProperties);
        	}
        });
	}
	pt.handleSelectBg = function(){
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
	                    self.bgNode.setImage(e.target.result);
	                    self.bgNode.setSize(-1, -1);
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
	pt.startAlarm = function(){
		var self = this,
			dm = self.gv.dm();
		if (this._timer) {
			clearInterval(self._timer);
			self._timer = null;
			return;
		}
		dm.enableAnimation();
		this._timer = setInterval(function(){
			var list = dm.getDatas(),
				size = list.size();
			if (size <= 1) return;


			var ran = Math.floor(Math.random() * size),
				data = list.get(ran),
				alarm;
			if (data instanceof ht.Node && !data.a('isMap') && !data.a('isAlarm')) {
				alarm = data.a('alarmNode');
				if (alarm) {
					data.a('alarmNode', null);
					data.setToolTip(null);
					dm.remove(alarm);
				}
				else {
					alarm = new ht.Node();
					alarm.setImage('devece.alarm');
					alarm.a('isAlarm', true);
					alarm.p(data.p());
					alarm.setHost(data);
					alarm.s({
						'2d.selectable': false
					});
					data.a('alarmNode', alarm);
					data.setToolTip('alarm info: disconnect');
					dm.add(alarm);

					alarm.setAnimation({
		                hide: {
		                    property: "opacity",
		                    accessType: "style",
		                    frames: 30,
		                    from: 1,
		                    to: 0,
		                    next: 'expandSize',
		                    onComplete: function() {
		                        this.setSize(0, 0);
		                        this.s('opacity', 1);
		                    }
		                },
		                expandSize: {
		                    from: 0,
		                    to: 1,
		                    next: "hide",
		                    onUpdate: function(v) {
		                    	var host = this.getHost(),
		                    		size = Math.min(host.getHeight(), host.getWidth()) * v;
		                        this.setSize(size, size);
		                    }
		                },
		                start: ["expandSize"]
		            });
				}
			}
		}, 1000);
	}
	pt.initToolbar = function() {
		var self = this,
			toolbar = self.toolbar;
		toolbar.addRow([
			'', self.createToobarBtn({
		        icon: self.getToolbarIcon('editor.edit'),
		        togglable: true,
		        groupId: 't',
		        selected: true,
		        toolTip: 'edit',
		        onClicked: () =>{
		            // event.globalEvent.fire({type: 'endCreateEdge'});
		            self.gv.setEditable(true);
		        }
		    }), self.createToobarBtn({
		        icon: self.getToolbarIcon('editor.edge'),
		        togglable: true,
		        groupId: 't',
		        toolTip: 'edit',
		        onClicked: () =>{
		            self.gv.setInteractors([
		                new ht.graph.DefaultInteractor(self.gv),
		                new ht.graph.TouchInteractor(self.gv, {
		                    selectable: false
		                }),
		                new CreateEdgeInteractor(self.gv)
		            ]);
		        }
		    }), '',
			self.createToobarBtn({
		        icon: self.getToolbarIcon('editor.undo'),
		        toolTip: 'Preview',
		        onClicked: () =>{
		            self.gv.dm().undo();
		        }
		    }),
		    self.createToobarBtn({
		        icon: self.getToolbarIcon('editor.redo'),
		        toolTip: 'Preview',
		        onClicked: () =>{
		            self.gv.dm().redo();
		        }
		    }), '',// padding
		    self.createToobarBtn({
		        icon: self.getToolbarIcon('editor.preview'),
		        toolTip: 'Preview',
		        onClicked: () =>{
		            // save in localStorage now,save in server last
					localStorage.setItem('mapWidgetPreview', self.gv.dm().serialize());
					location.href = './preview-map-widget.html';
		        }
		    }),''
		], [0.1, 32, 32, 12, 32, 32, 12, 32, 0.1], 32);
	}
	pt.createToobarBtn = function(options){
		var button = {
			background: btnBgColor,
	        iconColor: btnIconColor,
	        selectBackground: btnSelectColor,
	        width: 32,
		};

		for(var k in options){
			button[k] = options[k];
		}

		return {
			button: button
		}
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
	pt.createFormItem = function(type, options){
		if (type === 'number') {
			return {
				textField: {
					type: 'number'
				}
			}
		}
	}
	pt.initListView = function(){
		var self = this,
			listView = self.listView;
        ht.Default.setImage('productIcon', {
            width: self._iconSize,
            height: self._iconSize,
            comps: [
                {
                    type: 'image',
                    stretch: 'uniform',
                    rect: [0, 0, self._iconSize, self._iconSize],
                    name: {func: function(data){return data.a('img');}}
                }
            ]
        });
		// list view
		listView.setRowHeight(50);
		listView.drawRowBackground = function(g, data, selected, x, y, width, height){
            if(this.isSelected(data)){
                g.fillStyle = '#87A6CB';
            }
            else if(this.getRowIndex(data) % 2 === 0){
                g.fillStyle = '#F1F4F7';
            }
            else{
                g.fillStyle = '#FAFAFA';
            }
            g.beginPath();
            g.rect(x, y, width, height);
            g.fill();
        };
        listView.setIndent(60);
        listView.getIcon = function(data){
            return 'productIcon';
        };
        listView.getLabel = function(data){
        	return data.a('name');
        }
        listView.setVisibleFunc(function(data){
        	var key = self.searchInput.getElement().value;
        	if (key) {
        		key = key.replace(/^\s?|\s?/g, '');
        		return data.a('name').toLowerCase().indexOf(key.toLowerCase()) >= 0;
        	}
        	return true;
        })
        listView.handleDragAndDrop = this.handleListDND.bind(this);
        // listView.drawIcon = function(g, data, x, y, width, height){
        // 	ht.Default.drawImage(g, data.a('img'), x + 10, y + 5, 40, 40)
        // }
	}

	pt.handleListDND = function(e, state){
		var self = this,
			listView = self.listView,
			dnd = self.dnd;
		if (state ==='prepare') {
			var data = listView.getDataAt(e);
			listView.sm().ss(data);
			if (dnd.dragImage && dnd.dragImage.parentNode) {
				document.body.removeChild(dnd.dragImage);
			}
			dnd.dragImage = ht.Default.toCanvas(data.a('img'), self._iconSize, self._iconSize, 'centerUniform');
		}
		else if (state === 'begin') {
			if (dnd.dragImage) {
				var pagePoint = ht.Default.getPagePoint(e);
                dnd.dragImage.style.left = pagePoint.x - dnd.dragImage.width/2 + 'px';
                dnd.dragImage.style.top = pagePoint.y - dnd.dragImage.height/2 + 'px';
                document.body.appendChild(dnd.dragImage)
			}
		}
		else if (state === 'between') {
			var dragImage = dnd.dragImage;
			if(dragImage){
                var pagePoint = ht.Default.getPagePoint(e);
                dragImage.style.left = pagePoint.x - dragImage.width/2 + 'px';
                dragImage.style.top = pagePoint.y - dragImage.height/2 + 'px';
            }
		}
		else {
			if (ht.Default.containedInView(e, self.gv)) {
               	var node = new ht.Node(),
               		sd = self.listView.sm().ld();
               	node.setImage(sd.a('img'));
               	node.setName(sd.a('name'));
               	node.s('2d.editable', false);
               	node.a({
               		url: sd.a('url')
               	});
               	node.p(self.gv.lp(e));
               	self.gv.dm().add(node);
            }
           	if (dnd.dragImage && dnd.dragImage.parentNode) {
				document.body.removeChild(dnd.dragImage);
			}
			dnd.dragImage = null;
		}
	}
	pt.loadListDatas = function(){
		var self = this;
		setTimeout(function(){
			var dm = self.listView.dm();
			var listData = [
				{
					name: 'Switch',
					img: './symbols/service.json',
				}, {
					name: 'Server',
					img: './imgs/deviceicons/cisco3100.png',
				}, {
					name: 'subGroup',
					img: './symbols/cloud.json',
					url: 'index.html'
				}, {
					name: 'subGroup2',
					img: './symbols/cloud.json',
					url: 'index.html'
				},{
					name: 'Router',
					img: './symbols/service.json',
				},
			];
			listData.forEach(function(d){
				var data = new ht.Data();
				data.a(d);

				dm.add(data);
			});
		},10);
	}
	w.cms = new CMS();

})(window);