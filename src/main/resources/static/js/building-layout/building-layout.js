(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

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
		    dataType = option.dataType;
		// var type = option.type;
		// var data = option.data;

		var xhrRequest = null;
		if (window.XMLHttpRequest) {
			xhrRequest = new XMLHttpRequest();
		} else {
			xhrRequest = new ActiveXObject('Microsoft.XMLHTTP');
		}
		var str = "";
		xhrRequest.open(type, url, true);
		if (type.toUpperCase() === "POST" && data != null) {
			if (dataType === 'json') {
				xhrRequest.setRequestHeader("Content-type", "application/json;charset=utf-8");
				// xhrRequest.overrideMimeType('application/json');
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
						responseData = JSON.parse(xhrRequest.responseText);
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







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var FormPane = function (_ht$widget$FormPane) {
    inherits(FormPane, _ht$widget$FormPane);

    function FormPane() {
        classCallCheck(this, FormPane);

        var _this = possibleConstructorReturn(this, (FormPane.__proto__ || Object.getPrototypeOf(FormPane)).call(this));

        _this._itemIds = [];
        _this._getterMap = {};
        _this._setterMap = {};
        _this._visibleFunc = null;
        return _this;
    }

    createClass(FormPane, [{
        key: 'addRow',
        value: function addRow(items, widths, height) {
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
            get(FormPane.prototype.__proto__ || Object.getPrototypeOf(FormPane.prototype), 'addRow', this).apply(this, arguments);
            this.addItemListener(map);
        }
    }, {
        key: 'addItemListener',
        value: function addItemListener(map) {
            var self = this,
                item;

            for (var k in map) {
                item = self.getItemById(k);
                if (item.element) {
                    var input = item.element.getElement();
                    if (input.type === 'text' || input.type === 'number') {
                        input.addEventListener('keyup', function (e) {
                            if (e.keyCode === 13) {
                                map[k](input.value);
                            }
                        });
                        input.addEventListener('blur', function (e) {
                            map[k](input.value);
                        });
                    }
                    if (input.type === 'number') {
                        input.addEventListener('click', function (e) {
                            map[k](input.value);
                        });
                    }
                }
            }
        }
    }, {
        key: 'getValueObject',
        value: function getValueObject() {
            var self = this,
                obj = {},
                item;
            self._itemIds.forEach(function (id) {
                item = self.getItemById(id);
                if (item.format) {
                    obj[id] = item.format.apply(item);
                } else {
                    obj[id] = self.v(id);
                }
            });
            return obj;
        }
    }, {
        key: 'reset',
        value: function reset(data) {
            var self = this,
                item;
            self._itemIds.forEach(function (id) {
                item = self.getItemById(id);
                if (!item) return;
                self.v(id, item.defautValue === undefined ? '' : item.defautValue);
                if (item.__fileData) {
                    item.__fileData = null;
                }
            });
            self.hideError();
        }
    }, {
        key: 'addFormItems',
        value: function addFormItems(items, widths, height) {
            var _this2 = this;

            var self = this;
            items.forEach(function (item) {
                var label = {
                    element: item.label,
                    align: 'right'
                },
                    ctrl = {
                    id: item.id,
                    defautValue: item.value || ''
                };

                if (item.file) {
                    var fileWidths = widths.slice(0);
                    fileWidths.push(60);
                    ctrl.textField = {
                        editable: false
                    };
                    ctrl.format = function () {
                        return this.__fileData ? encodeURIComponent(this.__fileData) : '';
                    };
                    _this2.setCtrlSetterAndGetter(ctrl, item);
                    self.addRow([label, ctrl, {
                        button: {
                            label: 'select',
                            onClicked: function onClicked() {
                                self._selectFile(item.file.type, item.file.readType, function (file, result) {
                                    self.v(item.id, file.name);
                                    self.getItemById(item.id).__fileData = result;
                                    if (item.file.onSelected) {
                                        item.file.onSelected(result);
                                    }
                                });
                            }
                        }
                    }], fileWidths, height);
                } else if (item.textField && item.button) {
                    var ws = widths.slice(0);
                    ws.push(item.button.width || height || 32);
                    ctrl.textField = item.textField;
                    self.addRow([label, ctrl, {
                        button: item.button
                    }], ws, height);
                } else {
                    if (item.comboBox) {
                        ctrl.comboBox = item.comboBox;
                    } else if (item.multiComboBox) {
                        ctrl.multiComboBox = item.multiComboBox;
                    } else if (item.slider) {
                        ctrl.slider = item.slider;
                        ctrl.value = item.value;
                    } else if (item.element) {
                        ctrl.element = item.element;
                    } else if (item.textField) {
                        ctrl.textField = item.textField;
                    } else {
                        ctrl.textField = {
                            type: item.type || 'text',
                            value: item.value || '',
                            editable: item.editable === undefined ? 'true' : item.editable
                        };
                    }
                    _this2.setCtrlSetterAndGetter(ctrl, item);
                    self.addRow([label, ctrl], widths, height);
                }
            });
        }
    }, {
        key: 'setCtrlSetterAndGetter',
        value: function setCtrlSetterAndGetter(ctrl, data) {
            if (data.setter) ctrl.setter = data.setter;
            if (data.getter) ctrl.getter = data.getter;
        }
    }, {
        key: 'refreshData',
        value: function refreshData() {
            var self = this,
                item;
            setTimeout(function () {
                for (var k in self._getterMap) {
                    item = self.getItemById(k);
                    if (item.element) {
                        item.element.getElement().value = self._getterMap[k]();
                    }
                }
            }, 100);
        }
    }, {
        key: 'setValues',
        value: function setValues(valueObj) {
            if (!valueObj) return;
            var self = this;
            self._itemIds.forEach(function (id) {
                self.v(id, valueObj[id]);
            });
        }
    }, {
        key: 'getLastRow',
        value: function getLastRow() {
            if (this._rows.length > 0) {
                return this._rows[this._rows.length - 1];
            }
            return null;
        }
    }, {
        key: 'showInfo',
        value: function showInfo(text) {
            var row = this.tipRow;
            row.items[0].element = text;
            row.items[0].color = '#00CC00';
            if (this.getLastRow() !== row) {
                this._rows.push(row);
            }
            this.iv();
        }
    }, {
        key: 'showError',
        value: function showError(text) {
            var row = this.tipRow;
            row.items[0].element = text;
            row.items[0].color = '#CC0000';
            if (this.getLastRow() !== row) {
                this._rows.push(row);
            }
            this.iv();
        }
    }, {
        key: 'hideError',
        value: function hideError() {
            if (this.tipRow && this._rows.indexOf(this.tipRow) >= 0) {
                this.removeRow(this.tipRow);
            }
        }
    }, {
        key: '_selectFile',
        value: function _selectFile(type, readType, callback) {
            var self = this,
                fileDom = self.__fileDom;
            if (!fileDom) {
                fileDom = self.__fileDom = document.createElement('input');
                fileDom.setAttribute('type', 'file');
                fileDom.style.width = 0;
                fileDom.style.height = 0;

                fileDom.addEventListener('change', function (e) {
                    var file = e.target.files[0];
                    if (!file || type && file.type.indexOf(type) < 0) {
                        callback(null);
                        return;
                    }
                    var reader = new FileReader();
                    reader.onload = function (rd) {
                        callback(file, rd.target.result);
                        // remove dom
                        document.body.removeChild(fileDom);
                        self.__fileDom = null;
                    };
                    if (readType === 'text') {
                        reader.readAsText(file);
                    } else {
                        reader.readAsDataURL(file);
                    }
                });

                document.body.appendChild(fileDom);
            }
            fileDom.click();
        }
    }, {
        key: 'setVisibleFunc',
        value: function setVisibleFunc(func) {
            this._visibleFunc = func ? func.bind(this) : null;
        }
    }, {
        key: 'validateImpl',
        value: function validateImpl() {
            var _this3 = this;

            var self = this,
                canvas = self._canvas,
                rowHeight = self._rowHeight,
                width = self.getWidth(),
                height = self.getHeight(),
                hPadding = self._hPadding,
                vPadding = self._vPadding,
                vGap = self._vGap,
                ty = self.ty(),
                tx = self.tx(),
                w = width - hPadding * 2,
                h = height - vPadding * 2,
                rows = self._rows,
                rowSize = rows.length,
                percentSum = 0,
                percentHeight = h - (rowSize - 1) * vGap,
                values,
                value,
                i,
                row,
                rh,
                g;

            self._viewRect = { x: -tx, y: -ty, width: width, height: height };

            if (canvas) {
                ht.Default.setCanvas(canvas, width, height);
                g = ht.Default.initContext(canvas);
                ht.Default.translateAndScale(g, 0, 0, 1);
                g.clearRect(0, 0, width, height);
            }

            for (i = 0; i < rowSize; i++) {
                row = rows[i];
                // if (i === 0) continue;
                rh = row.height;
                if (rh == null) {
                    percentHeight -= rowHeight;
                } else if (util.isString(rh)) {
                    values = rh.split('\+');
                    value = parseFloat(values[0]);
                    if (value > 1) {
                        percentHeight -= value;
                    } else {
                        percentSum += value;
                    }
                    value = parseFloat(values[1]);
                    if (value > 1) {
                        percentHeight -= value;
                    } else {
                        percentSum += value;
                    }
                } else if (rh > 1) {
                    percentHeight -= rh;
                } else {
                    percentSum += rh;
                }
            }

            if (percentHeight < 0) {
                self._scrollHeight = height - percentHeight;
                percentHeight = 0;
            } else {
                self._scrollHeight = height;
            }

            var y = vPadding + ty,
                scrollWidth = width;

            for (i = 0; i < rowSize; i++) {
                row = rows[i];
                if (this._visibleFunc && !this._visibleFunc(row)) {
                    row.items.forEach(function (item) {
                        if (item.id) {
                            var element = _this3.getItemById(item.id).element;
                            if (element.getElement) {
                                element.getElement().style.display = 'none';
                            } else if (element.getView) {
                                element.getView().style.display = 'none';
                            }
                        }
                    });
                    continue;
                }
                rh = row.height;
                if (rh == null) {
                    rh = rowHeight;
                } else if (util.isString(rh)) {
                    values = rh.split('\+');
                    value = parseFloat(values[0]);
                    if (value > 1) {
                        rh = value;
                    } else {
                        rh = value / percentSum * percentHeight;
                    }
                    value = parseFloat(values[1]);
                    if (value > 1) {
                        rh += value;
                    } else {
                        rh += value / percentSum * percentHeight;
                    }
                } else if (rh <= 1) {
                    rh = rh / percentSum * percentHeight;
                }

                var x = hPadding + tx;

                if (g) {
                    var borderColor = self.getRowBorderColor(row),
                        background = self.getRowBackground(row);
                    if (background) {
                        fillRect(g, x, y, w, rh, background);
                    }
                    if (borderColor) {
                        drawBorder(g, borderColor, x, y, w, rh);
                    }
                }

                var sw = self.validateRow(g, width, row.items, row.widths, x, y, w, rh);
                if (sw > scrollWidth) {
                    scrollWidth = sw;
                }

                y += rh + vGap;
            }

            if (g) {
                g.restore();
            }

            self._scrollWidth = scrollWidth;

            // update scroll bar
            // self.updateHBar();
            // self.updateVBar();

            // adjust translate
            self.tx(self.tx());
            self.ty(self.ty());
        }
    }, {
        key: 'validateItem',
        value: function validateItem(g, item, x, y, w, h) {
            var self = this,
                element = item.element,
                label;

            // element
            if (element && !util.isString(element)) {
                if (element.getElement) {
                    element.getElement().style.display = 'block';
                } else if (element.getView) {
                    element.getView().style.display = 'block';
                }

                ht.Default.layout(element, x, y, w, h);
            } else {
                if (g) {
                    // label
                    if (util.isString(item)) {
                        label = item;
                    } else if (util.isString(item.element)) {
                        label = item.element;
                    }
                    if (label) {
                        g.save();
                        g.beginPath();
                        g.rect(x, y, w, h);
                        g.clip();

                        ht.Default.drawText(g, label, self.getLabelFont(item), self.getLabelColor(item), x + self._labelHPadding, y - self._labelVPadding, w - self._labelHPadding * 2, h - self._labelVPadding * 2, self.getLabelAlign(item), self.getLabelVAlign(item));
                        g.restore();
                    }
                }
            }
        }
    }, {
        key: 'addSpaceRow',
        value: function addSpaceRow() {
            this.addRow([], [], 32);
        }
    }, {
        key: 'getValue',
        value: function getValue(id) {
            var item = this.getItemById(id);
            if (item) {
                if (item.element instanceof ht.widget.Image) {
                    return item.element.getIcon() || '';
                } else {
                    return get(FormPane.prototype.__proto__ || Object.getPrototypeOf(FormPane.prototype), 'getValue', this).call(this, id);
                }
            }
            return '';
        }
    }, {
        key: 'tipRow',
        get: function get$$1() {
            if (!this.__tipRow) {
                this.addRow([{
                    element: '11',
                    color: 'red',
                    align: 'center',
                    vAlign: 'top'
                }], [0.1], this.getLastRow().height);

                this.__tipRow = this.getLastRow();
            }
            return this.__tipRow;
        }
    }]);
    return FormPane;
}(ht.widget.FormPane);

var CMS = function () {
    function CMS() {
        classCallCheck(this, CMS);

        this.typeMap = {};
        this.init();
    }

    createClass(CMS, [{
        key: 'init',
        value: function init() {
            this.initUI();
            this.initDialog();
            // this.initGrid();

            this.gv.sm().setSelectionMode('single');
            this.gv.mi(this.handleInteractor, this);
            this.loadWidgets();
        }
    }, {
        key: 'serialize',
        value: function serialize() {
            var self = this,
                obj = {
                'grid.row.count': this.grid.s('grid.row.count'),
                'grid.column.count': this.grid.s('grid.column.count'),
                'grid.row.percents': this.grid.s('grid.row.percents'),
                'grid.column.percents': this.grid.s('grid.column.percents'),
                widgets: []
            },
                dm = this.gv.dm();

            dm.each(function (d) {
                if (d instanceof ht.Node && d.getHost() === self.grid) {
                    var widget = {
                        a: d.getAttrObject()
                    };
                    widget.s = {
                        'attach.row.index': d.s('attach.row.index'),
                        'attach.column.index': d.s('attach.column.index'),
                        'attach.row.span': d.s('attach.row.span'),
                        'attach.column.span': d.s('attach.column.span')
                    };
                    widget.img = d.getImage();
                    obj.widgets.push(widget);
                }
            });

            return JSON.stringify(obj);
        }
    }, {
        key: 'initUI',
        value: function initUI() {

            this.initToolBar();

            this.borderPane = new ht.widget.BorderPane();
            this.gv = new ht.graph.GraphView();
            this.palette = new ht.widget.Palette();
            this.mainSplitPane = new ht.widget.SplitView(this.palette, this.gv, 'h', 220);

            this.borderPane.setCenterView(this.mainSplitPane);
            this.borderPane.setTopView(this.topBar);
            this.borderPane.setTopHeight(28);
            this.borderPane.addToDOM();

            this.palette.handleDragAndDrop = this.handlePaletteDragAndDrop.bind(this);

            // util.ajax({
            // 	url: 'http://211.114.70.120:8080/api/htbackend/getWidgetTypeForMainPage',
            // 	type: 'get',
            // 	success: function(r) {
            // 		console.log(r);
            // 	},
            // 	error: function(s){
            // 		console.log(s);
            // 	}
            // });
        }
    }, {
        key: 'initToolBar',
        value: function initToolBar() {
            var self = this,
                toolbar = this.topBar = new ht.widget.FormPane();

            toolbar.getView().style.background = '#f7f7f7';

            toolbar.setVGap(0);
            toolbar.setHGap(0);
            toolbar.setVPadding(0);
            toolbar.setHPadding(0);

            var rcComboBox = this.rcComboBox = new ht.widget.ComboBox();
            rcComboBox.setWidth(90);
            rcComboBox.setDropDownWidth(90);

            util.ajax({
                url: 'http://211.114.70.120:8080/api/htbackend/getAvailableLayoutForBuildingLayout',
                type: 'get',
                success: function success(r) {
                    rcComboBox.setValues(r);
                    rcComboBox.setValue(r[0]);
                    self.initGrid();
                    rcComboBox.onValueChanged = function (ov, nv) {
                        var rc = nv.split('X');
                        self.grid.s({
                            'grid.column.count': rc[0],
                            'grid.row.count': rc[1]
                        });
                    };
                },
                error: function error(s) {
                    console.log(s);
                }
            });

            toolbar.addRow(['', 'Layout', {
                label: 'Row Column',
                element: rcComboBox,
                unfocusable: true
            }, '', {
                button: {
                    label: 'preview',
                    onClicked: function onClicked() {
                        localStorage.setItem('widgets', self.serialize());
                        location.href = 'viewing-layout.html';
                    }
                }
            }, '', {
                button: {
                    label: 'new widget',
                    onClicked: function onClicked() {
                        self.newWidgetForm.reset({
                            colSpan: 1,
                            rowSpan: 1
                        });
                        self.dialog.show();
                    }
                }
            }, ''], [0.1, 50, 80, 8, 50, 8, 70, 0.1], 28);
        }
    }, {
        key: 'refreshWidgetType',
        value: function refreshWidgetType() {
            var _this = this;

            var form = this.newWidgetForm;
            if (this._reqTimer) {
                clearTimeout(this._reqTimer);
            }

            this._reqTimer = setTimeout(function () {
                var col = form.v('colSpan'),
                    row = form.v('rowSpan'),
                    size = col + 'X' + row,
                    cache = _this.typeMap[size];

                _this._reqTimer = null;
                if (cache !== undefined) {
                    _this.setWidgetTypeVL(cache);
                } else {
                    util.ajax({
                        url: 'http://211.114.70.120:8080/api/htbackend/getAvailableWidgetForLayoutSize/' + size,
                        type: 'get',
                        success: function success(r) {
                            _this.typeMap[size] = r;
                            _this.setWidgetTypeVL(r);
                        },
                        error: function error(s) {
                            console.log(s);
                        }
                    });
                }
            }, 300);
        }
    }, {
        key: 'setWidgetTypeVL',
        value: function setWidgetTypeVL(r) {
            var form = this.newWidgetForm;
            var comboBox = form.getItemById('widget_type').element;
            comboBox.setValues(r.map(function (d) {
                return d.id;
            }));
            comboBox.setLabels(r.map(function (d) {
                return d.name;
            }));
            comboBox.setValue(r.length === 0 ? '' : r[0].id);
            this._currWidgetTypes = r;
            if (r.length === 0) {
                form.showError('No widget of this size');
            } else {
                form.hideError();
            }
        }
    }, {
        key: 'initDialog',
        value: function initDialog() {
            var self = this,
                dialog = this.dialog = new ht.widget.Dialog(),
                form = this.newWidgetForm = new FormPane();

            form.setHPadding(30);
            form.setVPadding(24);

            dialog.setConfig({
                title: "New Widget",
                content: form,
                width: 410,
                height: 440,
                draggable: true,
                closable: true,
                resizeMode: "wh",
                buttons: [{
                    label: "Ok",
                    action: function action(button, e) {
                        self.handleSaveNewWidget();
                    }
                }, {
                    label: 'Cancel',
                    action: function action() {
                        dialog.hide();
                    }
                }],
                buttonsAlign: "right"
            });

            var formItems = [{
                id: 'colSpan',
                label: 'Column',
                value: 1,
                slider: {
                    min: 1,
                    max: 4,
                    step: 1,
                    onValueChanged: function onValueChanged() {
                        self.refreshWidgetType();
                    }
                }
            }, {
                id: 'rowSpan',
                label: 'Row',
                value: 1,
                slider: {
                    min: 1,
                    max: 4,
                    step: 1,
                    onValueChanged: function onValueChanged() {
                        self.refreshWidgetType();
                    }
                }
            }, {
                id: 'img',
                label: 'Image',
                file: {
                    type: 'image'
                }
            }, {
                id: 'widget_type',
                label: 'Widget Type',
                comboBox: {}
            }];
            var itemWidths = [80, 0.1];

            form.addFormItems(formItems, itemWidths, 26);

            self.refreshWidgetType();
        }
    }, {
        key: 'getWidgetTypeNameById',
        value: function getWidgetTypeNameById(id) {
            var types = this._currWidgetTypes;
            for (var i = 0; i < types.length; i++) {
                if (types[i].id === id) return types[i].name;
            }
        }
    }, {
        key: 'handleSaveNewWidget',
        value: function handleSaveNewWidget() {
            var _this2 = this;

            var self = this,
                form = self.newWidgetForm,
                formData = form.getValueObject();
            if (!formData.img) {
                form.showError('Please select an image');
                return;
            } else if (!formData.widget_type) {
                form.showError('Please select a widget type');
                return;
            }
            formData.name = formData.rowSpan + 'X' + formData.colSpan + ' ' + this.getWidgetTypeNameById(formData.widget_type);

            self.dialog.hide();
            util.ajax({
                url: 'http://211.114.70.120:8080/api/htbackend/insertWidgetForBuildingLayout',
                type: 'post',
                data: formData,
                success: function success(r) {
                    _this2.addPaletteNode(r);
                },
                error: function error(s) {
                    console.log(s);
                }
            });
        }
    }, {
        key: 'handleInteractor',
        value: function handleInteractor(e) {
            var data = this.gv.sm().ld();
            var grid = this.gv.getDataAt(e, function (d) {
                return d instanceof ht.Grid;
            });
            if (data instanceof ht.Grid) return;
            if (e.kind === 'betweenMove') {
                this.handleMove(e.event, data);
            } else if (e.kind === 'endMove') {
                if (this.rowIndex === -1 || this._isOut) {
                    // data.setHost(null);
                    this.gv.dm().remove(data);
                } else {
                    data.s({
                        'attach.row.index': this.rowIndex,
                        'attach.column.index': this.columnIndex,
                        'attach.padding': 0
                    });
                    data.setHost(grid);
                    if (this.tempNode) {
                        data.p(this.tempNode.p());
                    }
                }
                this.removeTempNode();
            }
        }
    }, {
        key: 'removeTempNode',
        value: function removeTempNode() {
            this.gv.dm().remove(this.tempNode);
            this.tempNode = null;
        }
    }, {
        key: 'handlePaletteDragAndDrop',
        value: function handlePaletteDragAndDrop(e, state) {
            var self = this,
                grid = self.gv.getDataAt(e, function (d) {
                return d instanceof ht.Grid;
            });
            if (state === 'between') {
                self.handleMove(e);
            } else if (state === 'end') {
                var tempNode = self.tempNode,
                    paletteNode = self.palette.sm().ld();

                if (self.gv.dm().contains(tempNode) && !self._isOut) {
                    tempNode.s({
                        'opacity': 1,
                        'attach.row.index': self.rowIndex,
                        'attach.column.index': self.columnIndex,
                        'attach.padding': 0,
                        '2d.editable': false,
                        'body.color': null
                    });
                    // TODO add more attr
                    tempNode.a(paletteNode.getAttrObject());
                    tempNode.setHost(grid);
                    tempNode.setImage(paletteNode.getImage());

                    self.tempNode = null;
                } else if (self.gv.dm().contains(tempNode) && self._isOut) {
                    self.removeTempNode();
                }
            }
        }
    }, {
        key: 'setTempNode',
        value: function setTempNode(rect, target) {
            var self = this,
                dm = self.gv.dm(),
                paletteNode = self.palette.sm().ld(),
                tempNode = this.tempNode,
                rowSpan,
                colSpan;
            if (!tempNode) {
                tempNode = this.tempNode = new ht.Node();
                tempNode.s({
                    'opacity': 0.5
                });
                tempNode.setImage('./symbols/temp.json');
                dm.add(tempNode);
            } else if (!dm.contains(tempNode)) {
                dm.add(tempNode);
            }
            if (!target) {
                target = paletteNode;
            }
            dm.sendToTop(tempNode);
            tempNode.s({
                'attach.row.span': target ? target.s('attach.row.span') : 1,
                'attach.column.span': target ? target.s('attach.column.span') : 1
            });
            rowSpan = target ? target.s('attach.row.span') : 1;
            colSpan = target ? target.s('attach.column.span') : 1;

            var rowCount = this.grid.s('grid.row.count'),
                colCount = this.grid.s('grid.column.count');
            if (this.rowIndex + rowSpan > rowCount || this.columnIndex + colSpan > colCount) {
                tempNode.s('body.color', 'red');
                this._isOut = true;
            } else {
                tempNode.s('body.color', '#7ED321');
                this._isOut = false;
            }
            tempNode.setSize(rect.width * colSpan, rect.height * rowSpan);
            tempNode.p({
                x: rect.x + rect.width * colSpan * 0.5,
                y: rect.y + rect.height * rowSpan * 0.5
            });
        }
    }, {
        key: 'handleMove',
        value: function handleMove(e, target) {
            var self = this,
                grid = self.gv.getDataAt(e, function (d) {
                return d instanceof ht.Grid;
            });
            var lp = self.gv.lp(e),
                flag = false;
            // if (target) {
            // 	lp = {
            // 		x: target.getRect().x,
            // 		y: target.getRect().y
            // 	}
            // }
            // else {
            // 	lp = self.gv.lp(e);
            // }
            if (grid) {
                var col = grid.s('grid.column.count'),
                    row = grid.s('grid.row.count');
                for (var i = 0; i < row; i++) {
                    for (var j = 0; j < col; j++) {
                        var rect = grid.getCellRect(i, j);
                        if (ht.Default.containsPoint(rect, lp)) {
                            self.setTempNode(rect, target);
                            this.rowIndex = i;
                            this.columnIndex = j;
                            flag = true;
                            break;
                        }
                    }
                    if (flag) break;
                }
            }
            if (!flag) {
                self.removeTempNode();
                this.rowIndex = -1;
            }
        }
    }, {
        key: 'initGrid',
        value: function initGrid() {
            var rc = this.rcComboBox.getValue().split('X'),
                GRID_COLUMN = rc[0],
                GRID_ROW = rc[1],
                GRID_BORDER = 1,
                GRID_GAP = 0,
                GRID_DEPTH = 0,
                GRID_CELL_DEPTH = -2,
                GRID_BACKGROUND = 'rgb(201,254,255)';

            // graphView
            var grid = this.grid = new ht.Grid();
            grid.setSize(600, 360);
            grid.s({
                'grid.row.count': GRID_ROW,
                'grid.column.count': GRID_COLUMN,
                'grid.border': GRID_BORDER,
                'grid.gap': GRID_GAP,
                'grid.depth': GRID_DEPTH,
                'grid.cell.depth': GRID_CELL_DEPTH,
                'grid.cell.border.color': null,
                'grid.background': GRID_BACKGROUND,
                'select.width': 0
            });
            this.gv.dm().add(grid);
            this.gv.fitContent(1);
            this.gv.setEditable(true);
        }
    }, {
        key: 'loadWidgets',
        value: function loadWidgets() {
            var _this3 = this;

            util.ajax({
                url: 'http://211.114.70.120:8080/api/htbackend/getAvailableWidgetForBuildingLayout',
                type: 'get',
                success: function success(r) {
                    var data = r;
                    var group = new ht.Group();
                    group.setName('widget');
                    group.setExpanded(true);
                    _this3.palette.dm().add(group);
                    _this3._paletteBaseGroup = group;
                    data.forEach(function (d, i) {
                        _this3.addPaletteNode(d);
                    });
                },
                error: function error(s) {
                    console.log(s);
                }
            });
        }
    }, {
        key: 'addPaletteNode',
        value: function addPaletteNode(d) {
            var node = new ht.Node(),
                group = this._paletteBaseGroup;

            node.s("draggable", true);
            node.setImage(d.img);
            node.setParent(group);
            node.setName(d.name);
            node.s({
                'image.stretch': 'centerUniform',
                'attach.row.span': d.rowSpan || 1,
                'attach.column.span': d.colSpan || 1
            });
            node.a({
                name: d.name,
                widgetId: d.id,
                widgetType: d.widgetType
            });
            this.palette.dm().add(node);
        }
    }]);
    return CMS;
}();

window.cms = new CMS();

})));
