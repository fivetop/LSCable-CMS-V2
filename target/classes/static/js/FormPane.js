(function(w){

	var FormPane = function(){
		FormPane.superClass.constructor.apply(this);
		this._itemIds = [];
		this._getterMap = {};
		this._setterMap = {};
	}

	ht.Default.def(FormPane, ht.widget.FormPane, {
		addRow: function(items, widths, height){
			var self = this,
				map = {};
			for (var i = 0; i < items.length; i++) {
				if (items[i] && items[i].id) {
					self._itemIds.push(items[i].id);
					if (items[i].getter) {
						self._getterMap[items[i].id] = items[i].getter;
					}
					if (items[i].setter) {
						self._setterMap[items[i].id] = items[i].setter;
						map[items[i].id] = items[i].setter;
					}
				}
			}
			FormPane.superClass.addRow.apply(this, arguments);
			this.addItemListener(map);
		},
		addItemListener: function(map) {
			var self = this,
				item;

			for (var k in map) {
				item = self.getItemById(k);
				if (item.element) {
					var input = item.element.getElement();
					if (input.type === 'text' || input.type === 'number') {
						input.addEventListener('keyup', function(e){
							if (e.keyCode === 13) {
								map[k](input.value);
							}
						});
						input.addEventListener('blur', function(e){
							map[k](input.value);
						});
					}
					if (input.type === 'number') {
						input.addEventListener('click', function(e){
							map[k](input.value);
						});
					}
				}
			}
		},

		getValueObject: function() {
			var self = this,
				obj = {};
			self._itemIds.forEach(function(id){
				obj[id] = self.v(id);
			});
			return obj;
		},
		reset: function(){
			var self = this;
			self._itemIds.forEach(function(id){
				self.v(id, '');
			});
		},
		refreshData: function(){
			var self = this,
				item;
			setTimeout(function(){
				for (var k in self._getterMap) {
					item = self.getItemById(k);
					if (item.element) {
						item.element.getElement().value = self._getterMap[k]();
					}
				}
			}, 100);
		},
		setValues: function(valueObj){
			if (!valueObj) return;
			var self = this;
			self._itemIds.forEach(function(id){
				self.v(id, valueObj[id] || '');
			});
		},
		getLastRow: function(){
			if (this._rows.length > 0) {
				return this._rows[this._rows.length - 1];
			}
			return null;
		}
	});

	w.FormPane = FormPane;
})(window);