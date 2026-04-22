(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function __$styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
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
		    dataType = option.dataType,
		    _option$resultType = option.resultType,
		    resultType = _option$resultType === undefined ? 'json' : _option$resultType,
		    _option$async = option.async,
		    async = _option$async === undefined ? true : _option$async;
		// var type = option.type;
		// var data = option.data;

		var xhrRequest = null;
		if (window.XMLHttpRequest) {
			xhrRequest = new XMLHttpRequest();
		} else {
			xhrRequest = new ActiveXObject('Microsoft.XMLHTTP');
		}
		var str = "";
		xhrRequest.open(type, url, async);
		if (type.toUpperCase() === "POST" && data != null) {
			if (dataType === 'json') {
				xhrRequest.setRequestHeader("Content-type", "application/json;charset=utf-8");
				// xhrRequest.overrideMimeType('application/json');
				str = data;
			} else if (dataType === 'text') {
				xhrRequest.setRequestHeader('Content-type', 'text/plain');
				str = data;
			} else if (dataType === 'multipart') {
				//xhrRequest.setRequestHeader('Content-type', 'multipart/form-data');
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
						if (resultType === 'json') {
							responseData = JSON.parse(xhrRequest.responseText);
						} else if (resultType === 'text') {
							responseData = xhrRequest.responseText;
						}
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
	},
	getNodeId: function getNodeId(data) {
		if (!data) {
			return null;
		}
		var sp = data.a('siteTreeParam');
		return sp ? sp.id : null;
	},
	getEntityId: function getEntityId(data) {
		if (!data) {
			return null;
		}
		return data.a('id') ? data.a('id') : null;
	},
	selectFile: function selectFile(type, readType, callback) {
		var self = this,
		    fileDom = document.getElementById('hiddenFile');
		if (!fileDom) {
			fileDom = document.createElement('input');
			fileDom.setAttribute('type', 'file');
			fileDom.setAttribute('id', 'hiddenFile');
			fileDom.style.width = 0;
			fileDom.style.height = 0;

			fileDom.addEventListener('change', function (e) {
				var file = e.target.files[0];
				if (!file) {
					//if (!file || (type && file.type.indexOf(type) < 0)) {
					callback(null);
					return;
				}
				var reader = new FileReader();
				reader.onload = function (rd) {
					callback(file, rd.target.result);
					// remove dom
					document.body.removeChild(fileDom);
				};
				if (readType === 'text' && file.type.indexOf('image') !== 0) {
					reader.readAsText(file);
				} else {
					reader.readAsDataURL(file);
				}
			});

			document.body.appendChild(fileDom);
		}
		fileDom.click();
	},
	parseRGBA: function parseRGBA(rgba) {
		rgba = rgba.replace(/(rgba\()|\)|\s/g, '');
		return rgba.split(',');
	},
	exportAndDownload: function exportAndDownload(content, filename) {
		// 创建隐藏的可下载链接
		var eleLink = document.createElement('a');
		eleLink.download = filename;
		eleLink.style.display = 'none';
		// 字符内容转变成blob地址
		var blob = new Blob([content]);
		eleLink.href = URL.createObjectURL(blob);
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	},
	exportAndDownload2: function exportAndDownload2(content, filename) {
		// 创建隐藏的可下载链接
		var eleLink = document.createElement('a');
		eleLink.download = filename;
		eleLink.style.display = 'none';

		var image_data = atob(content.split(',')[1]);
		// Use typed arrays to convert the binary data to a Blob
		var arraybuffer = new ArrayBuffer(image_data.length);
		var view = new Uint8Array(arraybuffer);
		for (var i = 0; i < image_data.length; i++) {
			view[i] = image_data.charCodeAt(i) & 0xff;
		}
		try {
			// This is the recommended method:
			var blob = new Blob([arraybuffer], { type: 'application/octet-stream' });
		} catch (e) {
			// The BlobBuilder API has been deprecated in favour of Blob, but older
			// browsers don't know about the Blob constructor
			// IE10 also supports BlobBuilder, but since the `Blob` constructor
			//  also works, there's no need to add `MSBlobBuilder`.
			var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
			bb.append(arraybuffer);
			var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
		}

		eleLink.href = URL.createObjectURL(blob);
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	},
	exportBlob: function exportBlob(content) {

		var image_data = atob(content.split(',')[1]);
		// Use typed arrays to convert the binary data to a Blob
		var arraybuffer = new ArrayBuffer(image_data.length);
		var view = new Uint8Array(arraybuffer);
		for (var i = 0; i < image_data.length; i++) {
			view[i] = image_data.charCodeAt(i) & 0xff;
		}
		try {
			// This is the recommended method:
			var blob = new Blob([arraybuffer], { type: 'application/octet-stream' });
		} catch (e) {
			// The BlobBuilder API has been deprecated in favour of Blob, but older
			// browsers don't know about the Blob constructor
			// IE10 also supports BlobBuilder, but since the `Blob` constructor
			//  also works, there's no need to add `MSBlobBuilder`.
			var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
			bb.append(arraybuffer);
			var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
		}

		return blob;
	},
	checkforvalidity: function checkforvalidity(templist) {
		var valid = true;
		for (var j = 0; j + 2 < templist.length;) {
			if (templist[j].nodeid === undefined && templist[j].category_id === undefined) {
				j++;
				continue;
			}
			var a = templist[j],
			    c = templist[j + 1],
			    b = templist[j + 2];
			if (a.nodeid && b.nodeid && c.category_id) {
				if (a.x + 1 === c.x && c.x + 1 === b.x) {
					j += 2;
				} else {
					valid = false;
					break;
				}
			} else {
				while (j < templist.length - 1) {
					if (templist[j + 1].nodeid !== undefined || templist[j + 1].category_id !== undefined) {
						valid = false;
					}
					j++;
				}
				break;
			}
		}
		return valid;
	},
	addInvalid: function addInvalid(invalid, list) {
		list.forEach(function (d) {
			/*if (d.x) {
   	invalid.push(d);
   }*/
			if (d.nodeid || d.category_id) {
				invalid.push(d);
			}
		});
	},
	getMinMaxPoint: function getMinMaxPoint(list, offset) {
		if (list && list.length > 0) {
			var minx = void 0,
			    miny = void 0,
			    maxx = void 0,
			    maxy = void 0,
			    minrec = { minx: 0, miny: 0, maxx: 0, maxy: 0 };

			list.forEach(function (d) {
				var cminx = d.x,
				    cminy = d.y,
				    cmaxx = d.x + d.width,
				    cmaxy = d.y + d.height;
				if (minx) {
					minx = minx > cminx ? cminx : minx;
				} else {
					minx = cminx;
				}
				if (miny) {
					miny = miny > cminy ? cminy : miny;
				} else {
					miny = cminy;
				}
				if (maxx) {
					maxx = maxx < cmaxx ? cmaxx : maxx;
				} else {
					maxx = cmaxx;
				}
				if (maxy) {
					maxy = maxy < cmaxy ? cmaxy : maxy;
				} else {
					maxy = cmaxy;
				}
			});

			minx -= offset;
			miny -= offset;
			maxx += offset;
			maxy += offset;

			/*minrec.x = maxx - ((maxx - minx)/2);
   minrec.y = maxy - ((maxy - miny)/2);
   minrec.width = (maxx - minx);
   minrec.height = (maxy - miny);*/
			minrec.maxx = maxx;
			minrec.maxy = maxy;
			minrec.minx = minx;
			minrec.miny = miny;
			return minrec;
		}
		return;
	},
	getMinRect: function getMinRect(list, offset) {
		if (list && list.length > 0) {
			var minx = void 0,
			    miny = void 0,
			    maxx = void 0,
			    maxy = void 0,
			    minrec = { x: 0, y: 0, width: 0, height: 0 };

			list.forEach(function (d) {
				var cminx = d.x,
				    cminy = d.y,
				    cmaxx = d.x + d.width,
				    cmaxy = d.y + d.height;
				if (minx) {
					minx = minx > cminx ? cminx : minx;
				} else {
					minx = cminx;
				}
				if (miny) {
					miny = miny > cminy ? cminy : miny;
				} else {
					miny = cminy;
				}
				if (maxx) {
					maxx = maxx < cmaxx ? cmaxx : maxx;
				} else {
					maxx = cmaxx;
				}
				if (maxy) {
					maxy = maxy < cmaxy ? cmaxy : maxy;
				} else {
					maxy = cmaxy;
				}
			});

			minx -= offset;
			miny -= offset;
			maxx += offset;
			maxy += offset;

			minrec.x = minx;
			minrec.y = miny;
			minrec.width = maxx - minx;
			minrec.height = maxy - miny;

			return minrec;
		}
		return;
	},
	getFourPoints: function getFourPoints(rect) {
		return { p1: { x: rect.x, y: rect.y },
			p2: { x: rect.x + rect.width, y: rect.y },
			p3: { x: rect.x, y: rect.y + rect.height },
			p4: { x: rect.x + rect.width, y: rect.y + rect.height } };
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





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

// import '../../css/form.css';

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

            items.forEach(function (item) {
                var _createElement2 = _this2._createElement(item, widths),
                    _createElement3 = slicedToArray(_createElement2, 2),
                    ctrls = _createElement3[0],
                    ws = _createElement3[1];

                _this2.addRow(ctrls, ws, height);
            });
        }
    }, {
        key: '_createElement',
        value: function _createElement(item, widths) {
            var self = this,
                label = {
                element: item.label,
                align: item.align || 'right'
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
                this.setCtrlSetterAndGetter(ctrl, item);
                return [[label, ctrl, {
                    button: {
                        label: 'select',
                        onClicked: function onClicked() {
                            util.selectFile(item.file.type, item.file.readType, function (file, result) {
                                self.v(item.id, file.name);
                                self.getItemById(item.id).__fileData = result;
                                if (item.file.onSelected) {
                                    item.file.onSelected(result);
                                }
                            });
                        }
                    }
                }], fileWidths];
            } else if (item.textField && item.button) {
                var ws = widths.slice(0);
                ws.push(item.button.width || height || 32);
                ctrl.textField = item.textField;
                return [[label, ctrl, {
                    button: item.button
                }], ws];
            } else {
                if (item.comboBox) {
                    ctrl.comboBox = item.comboBox;
                } else if (item.multiComboBox) {
                    ctrl.multiComboBox = item.multiComboBox;
                } else if (item.slider) {
                    ctrl.slider = item.slider;
                    ctrl.value = item.value;
                } else if (item.checkBox) {
                    ctrl.checkBox = item.checkBox;
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
                this.setCtrlSetterAndGetter(ctrl, item);
                return [[label, ctrl], widths];
            }
        }
        // tow columns

    }, {
        key: 'addFormItems2',
        value: function addFormItems2(items, widths, height) {
            var _this3 = this;

            var self = this,
                pc = [],
                pw = [];
            items.forEach(function (item, i) {
                var _createElement4 = _this3._createElement(item, widths),
                    _createElement5 = slicedToArray(_createElement4, 2),
                    ctrls = _createElement5[0],
                    ws = _createElement5[1];

                pc.push.apply(pc, ctrls);
                pw.push.apply(pw, ws);
                if (i % 2 === 1 || i === items.length - 1) {
                    _this3.addRow(pc, pw, height);
                    pc = [];
                    pw = [];
                }
            });
        }
    }, {
        key: 'addFormItemsGeneric',
        value: function addFormItemsGeneric(items, widths, height) {
            var _this4 = this;

            var colCnt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
            var remainder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;

            var self = this,
                pc = [],
                pw = [];
            items.forEach(function (item, i) {
                var _createElement6 = _this4._createElement(item, widths),
                    _createElement7 = slicedToArray(_createElement6, 2),
                    ctrls = _createElement7[0],
                    ws = _createElement7[1];

                pc.push.apply(pc, ctrls);
                pw.push.apply(pw, ws);

                if (i % colCnt === remainder || i === items.length - 1) {
                    _this4.addRow(pc, pw, height);
                    pc = [];
                    pw = [];
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
        key: 'addSpaceRow',
        value: function addSpaceRow(height) {
            this.addRow([], [], height || 32);
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
                }], [0.1], this.getLastRow().height || 32);

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

        this.init();
        this.splitView.addToDOM();
    }

    createClass(CMS, [{
        key: 'init',
        value: function init() {
            var form = this.form = new FormPane(),
                dm = this.dm = new ht.DataModel(),
                treeView = this.treeView = new ht.widget.TreeView(dm),
                splitView = this.splitView = new ht.widget.SplitView(treeView, form, 'h', 0.5);

            form.addFormItems([{
                id: 'file',
                label: 'File',
                file: {
                    readType: 'text',
                    onSelected: function onSelected(r) {
                        var str = r.replace(/\r+/g, ''),
                            lines = str.split('\n'),
                            json = {
                            v: ht.Default.getVersion(),
                            p: {
                                autoAdjustIndex: true,
                                hierarchicalRendering: false
                            },
                            d: []
                        };
                        lines.forEach(function (line) {
                            var cols = line.split(','),
                                _cols = slicedToArray(cols, 4),
                                id = _cols[0],
                                name = _cols[1],
                                type = _cols[2],
                                parentId = _cols[3],
                                data = {
                                c: 'ht.Data',
                                i: id,
                                p: { name: name },
                                a: { name: name, type: type }
                            };

                            if (parentId) {
                                data.p.parent = {
                                    __i: parentId
                                };
                            }
                            json.d.push(data);
                        });
                        dm.deserialize(json);
                    }
                }
            }], [60, 0.1], 28);
        }
    }]);
    return CMS;
}();

window.cms = new CMS();

})));
