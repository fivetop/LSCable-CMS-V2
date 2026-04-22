
(function(w){
	var treeIconCombo = {
		labels: ['box', 'host', 'cylinder'],
		values: ['./symbols/box.json', './symbols/host.json', './symbols/cylinder.json'],
		icons: ['./symbols/box.json', './symbols/host.json', './symbols/cylinder.json']
	};

	var areaIconCombo = {
		labels: ['circle', 'rect', 'round rect'],
		values: ['./symbols/area-arc.json', './symbols/area-rect.json', './symbols/area-round-rect.json'],
		icons: ['./symbols/area-arc.json', './symbols/area-rect.json', './symbols/area-round-rect.json']
	};
	var formConfig = {
		form1: [// Site
			{
				label: 'Site Name',
				id: 'siteName',
				textField: {}
			}, {
				label: 'Region',
				id: 'region',
				textField: {}
			}, {
				label: 'Description',
				id: 'description',
				textField: {}
			}, {
				label: 'Site Image',
				id: 'siteImage',
				textField: {}
			}, {
				label: 'Default Image',
				id: 'defaultImage',
				comboBox: treeIconCombo
			}, {
				label: 'Tree Icon',
				id: 'treeIcon',
				comboBox: treeIconCombo
			}
		],
		form2: [// DFD
			{
				label: 'FDF Name',
				id: 'FDFName',
				textField: {}
			}, {
				label: 'Product Name',
				id: 'productName',
				textField: {}
			}, {
				label: 'Manufacturer',
				id: 'manufacturer',
				textField: {}
			}, {
				label: 'Model No',
				id: 'modelNo',
				textField: {}
			}, {
				label: 'Dimensions',
				id: 'dimensions',
				textField: {}
			}, {
				label: 'Description',
				id: 'description',
				textField: {}
			}, {
				label: 'FDF Image',
				id: 'FDFImage',
				textField: {}
			}, {
				label: 'Default Image',
				id: 'defaultImage',
				comboBox: treeIconCombo
			}, {
				label: 'Tree Icon',
				id: 'treeIcon',
				comboBox: treeIconCombo
			}
		],
		form3: [// Building
			{
				label: 'Building Name',
				id: 'buildingName',
				textField: {}
			}, {
				label: 'Description',
				id: 'description',
				textField: {}
			}, {
				label: 'Building Image',
				id: 'buildingImage',
				textField: {}
			}, {
				label: 'Default Image',
				id: 'defaultImage',
				comboBox: treeIconCombo
			}, {
				label: 'TreeIcon',
				id: 'treeIcon',
				comboBox: treeIconCombo
			},
		],
		form4: [// Outlet
			{
				label: 'Outlet Name',
				id: 'outletName',
				textField: {}
			}, {
				label: 'Description',
				id: 'description',
				textField: {}
			}, {
				label: 'Port Count',
				id: 'portCount',
				textField: {}
			}, {
				label: 'Asset Tag',
				id: 'assetTag',
				textField: {}
			}, {
				label: 'Default Image',
				id: 'defaultImage',
				comboBox: treeIconCombo
			},
		],
		form5: [// Patch Panel
			{
				label: 'Patch Panel Name',
				id: 'patchPanelName',
				textField: {}
			}, {
				label: 'Product Name',
				id: 'productName',
				textField: {}
			}, {
				label: 'Manufacturer',
				id: 'manufacturer',
				textField: {}
			}, {
				label: 'Model No',
				id: 'modelNo',
				textField: {}
			}, {
				label: 'Dimensions',
				id: 'dimensions',
				textField: {}
			}, {
				label: 'Full Depth',
				id: 'fullDepth',
				textField: {}
			}, {
				label: 'Height(U)',
				id: 'uHeight',
				textField: {}
			}, {
				label: 'Description',
				id: 'description',
				textField: {}
			}, {
				label: 'Port Count',
				id: 'portCount',
				textField: {}
			}, {
				label: 'Asset Tag',
				id: 'assetTag',
				textField: {}
			}, {
				label: 'Default Image',
				id: 'defaultImage',
				comboBox: treeIconCombo
			}, {
				label: 'Image for Rack Front',
				id: 'imageForRackFront',
				textField: {}
			}, {
				label: 'Image for Rack Back',
				id: 'imageForRackBack',
				textField: {}
			}, {
				label: 'Image for Map',
				id: 'imageForMap',
				textField: {}
			}, {
				label: 'Tree Icon',
				id: 'treeIcon',
				comboBox: treeIconCombo
			}, {
				label: 'Image for Linkage',
				id: 'imageForLinkage',
				textField: {}
			},
		],
		form6: [// Area
			{
				label: 'Area Name',
				id: 'areaName',
				textField: {}
			}, {
				label: 'Description',
				id: 'description',
				textField: {}
			}, {
				label: 'Area Shape',
				id: 'areaShape',
				comboBox: areaIconCombo
			}, {
				label: 'TreeIcon',
				id: 'treeIcon',
				comboBox: treeIconCombo
			}
		],
		l2Switch: [// L2 Switch
			{
				label: 'Switch Name',
				id: 'name',
				textField: {}
			}, {
				label: 'IP',
				id: 'ip',
				textField: {}
			}, {
				label: 'Product Name',
				id: 'productName',
				textField: {}
			}, {
				label: 'Product Name',
				id: 'productName',
				textField: {}
			}, {
				label: 'Manufacturer',
				id: 'manufacturer',
				textField: {}
			}, {
				label: 'Model No',
				id: 'modelNo',
				textField: {}
			}, {
				label: 'Dimensions',
				id: 'dimensions',
				textField: {}
			}, {
				label: 'Height(U)',
				id: 'uHeight',
				textField: {}
			}, {
				label: 'Description',
				id: 'description',
				textField: {}
			}, {
				label: 'Port Count',
				id: 'portCount',
				textField: {}
			}, {
				label: 'Asset Tag',
				id: 'assetTag',
				textField: {}
			}, {
				label: 'Default Image',
				id: 'defaultImage',
				textField: {}
			}, {
				label: 'Image for Rack Front',
				id: 'imageForRackFront',
				textField: {}
			}, {
				label: 'Image for Rack Back',
				id: 'imageForRackBack',
				textField: {}
			}, {
				label: 'Image for Map',
				id: 'imageForMap',
				textField: {}
			}, {
				label: 'Tree Icon',
				id: 'treeIcon',
				comboBox: treeIconCombo
			}, {
				label: 'Image for Linkage',
				id: 'imageForLinkage',
				textField: {}
			}
		]
	}
	w.formConfig = formConfig;
})(window);