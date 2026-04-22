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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

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

var API_PORT = location.port;
var hostname = location.hostname;
//dev
//export const API_URL = `http://192.168.0.79:${API_PORT}/`;
//export const NMS_URL = `http://192.168.0.79:${NMS_PORT}/`;
//pro
var API_URL = 'http://' + hostname + ':' + API_PORT + '/';


var API_PATH = 'api/htbackend/';
var API_HEAD = API_URL + API_PATH;



var POLLING_PERIOD = 60; // unit second



var TREE_NODE_TYPE = {
    SITE: 'Site',
    FDF: 'FDF',
    BUILDING: 'Building',
    OUTLET: 'Outlet',
    PATCH_PANEL: 'Patch Panel',
    AREA: 'Area',
    FLOOR: 'Floor',
    RACK_SPACE: 'Rackspace',
    L2_SWITCH: 'L2 Switch',
    L3_SWITCH: 'L3 Switch',
    PC: 'PC',
    SERVER: 'Server',
    BACKBONE: 'Backbone Switch&Router',
    BLANK: 'Blank',
    CABLE: 'Cable',
    ENTRY_PANEL: 'Entry Panel',
    MANAGEMENT: 'Management',
    RACK: 'Rack',
    CONSOLIDATION_POINT: 'Consolidation Point'
};



var ALARM_COLORS = {
    '1': 'rgba(250, 91, 90, 0.8)',
    '2': 'rgba(250, 173, 90, 0.8)',
    '3': 'rgba(232, 222, 101, 0.8)',
    '4': 'rgba(172, 76, 171, 0.8)'
    // '5': 'rgba(69, 186, 124, 0.8)',
};

var NodeAlarm = function () {
    function NodeAlarm(dataModel, cms, targetId, alarmSize) {
        classCallCheck(this, NodeAlarm);

        this.cms = cms;
        if (alarmSize) {
            this.alarmSize = alarmSize;
        }
        if (targetId) {
            this.targetId = targetId;
        }
        this._dm = dataModel;
        this._active = false;
        this._alarms = [];

        dataModel.enableAnimation();
    }

    createClass(NodeAlarm, [{
        key: 'handleDataModelChange',
        value: function handleDataModelChange(e) {
            if (e.kind === 'add' && e.data.a('type_naeme')) {
                this.startNodeAlarm(e.data);
            }
        }
    }, {
        key: 'setDataModel',
        value: function setDataModel(dm) {
            this._dm = dm;
        }
    }, {
        key: 'dm',
        value: function dm(_dm) {
            if (_dm) {
                this.setDataModel(_dm);
                return;
            }
            return this._dm;
        }
    }, {
        key: 'start',
        value: function start(dm) {
            var _this = this;

            if (dm) {
                if (dm instanceof ht.DataModel) {
                    this.dm(dm);
                } else {
                    this.targetId = dm;
                }
            } else {
                dm = this.dm();
            }
            // this._dm.mm(this.handleDataModelChange, this);
            if (this._pollingTimer) {
                this.stop();
            }
            this._active = true;
            this.loadNodeStatus();
            this.loadEdgeStatus();
            this._pollingTimer = setInterval(function () {
                _this.loadNodeStatus();
                _this.loadEdgeStatus();
            }, POLLING_PERIOD * 1000);
        }
    }, {
        key: 'getNodeByEntityid',
        value: function getNodeByEntityid(entityid) {
            var list = this._dm.toDatas();
            for (var i = 0, len = list.size(); i < len; i++) {
                if (util.getEntityId(list.get(i)) === entityid) {
                    return list.get(i);
                }
            }
        }
    }, {
        key: 'loadNodeStatus',
        value: function loadNodeStatus() {
            var _this2 = this;

            if (this.targetId) {
                util.ajax({
                    url: API_HEAD + 'getChildrensAlarmStatus/' + this.targetId,
                    success: function success(r) {

                        if (r && r.length > 0) {
                            r.forEach(function (item) {
                                //                            let targetList = this._dm.toDatas();
                                //                            for (let i = 0; i < targetList.size(); i++) 
                                {
                                    var node = _this2.getNodeByEntityid(item.entityid),
                                        statusList = [],
                                        status = void 0;
                                    if (node === undefined) {
                                        console.log('node error : ' + item.nodeid);
                                    } else {

                                        for (var key in item) {
                                            if (key.toLowerCase().indexOf('status') >= 0) {
                                                statusList.push(item[key]);
                                            }
                                        }
                                        status = Math.min.apply(_this2, statusList);
                                        {
                                            _this2.startNodeAlarm(node, status);
                                        }
                                    }

                                    //                                if (targetList.get(i).a('id') + '' === item.entityid) {
                                    //                                    this.startNodeAlarm(targetList.get(i), item.status);
                                    //                                    break;
                                    //                                }
                                }
                            });
                        }
                    }
                });
            }
            /*  else {
                 this.dm().each(data => {
                     let typeName = cms.getNodeTypeNameById(data.a('type'));
                     if (typeName === FLOOR || typeName === RACK) return;
                          let nodeid = util.getNodeId(data);
                     if (nodeid) {
                         util.ajax({
                             url: `${API_HEAD}getAlarmStatus/${nodeid}`,
                             success: r => {
                                 if (r && r[0]) {
                                     this.startNodeAlarm(data, r[0].status);
                                 }
                             }
                         });
                     }
                 });
             } */
        }
    }, {
        key: 'loadEdgeStatus',
        value: function loadEdgeStatus() {
            var _this3 = this;

            {
                this.dm().each(function (data) {

                    if (data instanceof ht.Edge && data.a('visible')) {

                        util.ajax({
                            url: API_HEAD + 'getEdgeStatus/' + data.a('datarate.interface'),
                            success: function success(r) {
                                if (r) {
                                    _this3.startEdgeStatus(data, r.result);
                                }
                            }
                        });
                    }
                });
            }
        }
    }, {
        key: 'getReadableFileSizeString',
        value: function getReadableFileSizeString(fileSizeInBytes) {
            var i = -1;
            var byteUnits = [' K', ' M', ' G', ' T', 'P', 'E', 'Z', 'Y'];
            do {
                fileSizeInBytes = fileSizeInBytes / 1024;
                i++;
            } while (fileSizeInBytes > 1024);

            return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
        }
    }, {
        key: 'startEdgeStatus',
        value: function startEdgeStatus(data, result) {
            var self = this;
            if (result && result.length > 0 && data && result[0].rxrate && result[0].txrate) {
                var formRx = self.getReadableFileSizeString(result[0].rxrate);
                var formTx = self.getReadableFileSizeString(result[0].txrate);
                data.setAttr('rxRate', formRx);
                data.setAttr('txRate', formTx);
                var rxUtil = result[0].rxrate / result[0].speedin * 100;
                var txUtil = result[0].txrate / result[0].speedout * 100;
                var mainColorRx = 'rgb(128,201,174,1)';
                if (rxUtil > 80) {
                    mainColorRx = 'rgb(254,127,127,1)';
                } else if (rxUtil > 60) {
                    mainColorRx = 'rgb(254,176,127,1)';
                } else if (rxUtil > 40) {
                    mainColorRx = 'rgb(254,227,129,1)';
                }
                var mainColorTx = 'rgb(128,201,174,1)';
                if (txUtil > 80) {
                    mainColorTx = 'rgb(254,127,127,1)';
                } else if (txUtil > 60) {
                    mainColorTx = 'rgb(254,176,127,1)';
                } else if (txUtil > 40) {
                    mainColorTx = 'rgb(254,227,129,1)';
                }
                data.setAttr('mainColorRx', mainColorRx);
                data.setAttr('mainColorTx', mainColorTx);
            } else {
                data.setAttr('rxRate', '-');
                data.setAttr('txRate', '-');
                data.setAttr('mainColorRx', 'rgb(180, 180, 180, 1)');
                data.setAttr('mainColorTx', 'rgb(180, 180, 180, 1)');
            }
        }
    }, {
        key: 'startNodeAlarm',
        value: function startNodeAlarm(data, status) {
            var self = this,
                dm = this._dm,
                alarm = void 0;
            if (status && ALARM_COLORS[status] && data) {
                var color = ALARM_COLORS[status];
                if (data.a('alarmNode')) {
                    alarm = data.a('alarmNode');
                    alarm.s({
                        'body.color': color
                    });
                    return;
                } else {
                    alarm = new ht.Node();
                    alarm.setImage('devece.alarm');
                    alarm.setSize(0, 0);
                    alarm.a('isAlarm', true);
                    data.a('alarmNode', alarm);
                    if (this._hostAnchor) {
                        var rect = data.getRect(),
                            anchor = this._hostAnchor;
                        alarm.p({
                            x: rect.x + anchor.x * rect.width,
                            y: rect.y + anchor.y * rect.height
                        });
                    } else {
                        var _rect = data.getRect();
                        //alarm.p(data.p());
                        alarm.p({
                            x: _rect.x + _rect.width / 2,
                            y: _rect.y
                        });
                    }
                    alarm.setHost(data);
                    alarm.s({
                        '2d.selectable': false,
                        'body.color': color
                    });
                }
                // data.setToolTip('alarm info: disconnect');
                dm.add(alarm);
                this._alarms.push(alarm);

                alarm.setAnimation({
                    hide: {
                        property: "opacity",
                        accessType: "style",
                        frames: 30,
                        from: 1,
                        to: 0,
                        next: 'expandSize',
                        onComplete: function onComplete() {
                            this.setSize(0, 0);
                            this.s('opacity', 1);
                        }
                    },
                    expandSize: {
                        from: 0,
                        to: 1,
                        next: "hide",
                        onUpdate: function onUpdate(v) {
                            var host = this.getHost();
                            if (!host) {
                                self._dm.remove(this);
                                return;
                            }
                            var size = self.alarmSize || Math.min(host.getHeight(), host.getWidth());

                            size *= v;
                            this.setSize(size, size);
                        }
                    },
                    start: ["expandSize"]
                });
            } else if (data) {
                if (data.a('alarmNode')) {
                    alarm = data.a('alarmNode');
                    data.a('alarmNode', null);
                    var index = this._alarms.indexOf(alarm);
                    this._alarms.splice(index, 1);
                    dm.remove(alarm);
                }
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            var _this4 = this;

            // this._dm.umm(this.handleDataModelChange, this);
            if (this._active) {
                this._active = false;
                if (this._pollingTimer) {
                    clearInterval(this._pollingTimer);
                }
                this._pollingTimer = null;
                this._alarms.forEach(function (data) {
                    var host = data.getHost();
                    if (host) {
                        host.a('alarmNode', null);
                    }
                    _this4._dm.remove(data);
                });
                this._alarms = [];
            }
        }
    }, {
        key: 'toggle',
        value: function toggle(targetId) {
            if (this.active) {
                this.stop();
            } else {
                this.start(targetId);
            }
        }
    }, {
        key: 'setHostAnchor',
        value: function setHostAnchor(anchor) {
            this._hostAnchor = anchor;
        }
    }, {
        key: 'alarmSize',
        get: function get$$1() {
            return this._alarmSize;
        },
        set: function set$$1(v) {
            this._alarmSize = v;
        }
    }, {
        key: 'active',
        get: function get$$1() {
            return !!this._active;
        }
    }]);
    return NodeAlarm;
}();

var s = ht.Default.setImage;
s('ifBoard', {
    "dataBindings": [{
        "attr": "rxRate",
        "valueType": "String"
    }, {
        "attr": "txRate",
        "valueType": "String"
    }, {
        "attr": "mainColorRx",
        "valueType": "Color"
    }, {
        "attr": "mainColorTx",
        "valueType": "Color"
    }, {
        "attr": "mainFontSize",
        "valueType": "PositiveNumber"
    }, {
        "attr": "mainFontBold",
        "valueType": "String"
    }, {
        "attr": "mainFontFamily",
        "valueType": "String"
    }, {
        "attr": "mainFontColor",
        "valueType": "Color"
    }, {
        "attr": "boxWidth",
        "valueType": "PositiveNumber"
    }, {
        "attr": "boxHeight",
        "valueType": "PositiveNumber"
    }],
    "width": 100,
    "height": 20,
    /*"height": {
    	func: function (data) {
    		return data.a('usize') ? data.a('usize') * (U_HEIGHT+U_GAP) + 86 : data._height;
    	}
    },*/
    "fitSize": true,
    "comps": [{
        "type": "components/ifBoard.json",
        "rect": [0, 0, 240, 500],
        "rxRate": {
            "func": "attr@rxRate",
            "value": "11.3 M"
        },
        "txRate": {
            "func": "attr@txRate",
            "value": "1 G"
        },
        "boxWidth": {
            "func": "attr@boxWidth",
            "value": 120
        },
        "boxHeight": {
            "func": "attr@boxHeight",
            "value": 60
        },
        "mainColorRx": {
            "func": "attr@mainColorRx",
            "value": "rgb(128,201,174,1)"
        },
        "mainColorTx": {
            "func": "attr@mainColorTx",
            "value": "rgb(128,201,174,1)"
        },
        "mainFontSize": {
            "func": "attr@mainFontSize",
            "value": 14
        },
        "mainFontBold": {
            "func": "attr@mainFontBold",
            "value": ""
        },
        "mainFontFamily": {
            "func": "attr@mainFontFamily",
            "value": "sans-serif"
        },
        "mainFontColor": {
            "func": "attr@mainFontColor",
            "value": "#ffffff"
        }
    }]
});
/*
s('portBoard', {
	  "dataBindings": [
	    {
	      "attr": "displayURL",
	      "valueType": "URL",
	      "defaultValue": "displays/basic/PortStatus.json"
	    }
	  ],
	  "snapshotURL": "symbols/basic/snapshot_display.json",
	  "renderHTML": {
			func: function (data, gv, cache) {
				{    if (!cache.graphView) {        var graphView = cache.graphView = new ht.graph.GraphView();        graphView.setScrollBarVisible(false);        graphView.layoutHTML = function() {            gv.layoutHTML(data, graphView, true);            var rect = data.getRect();            if (cache.lastWidth !== graphView.getWidth() ||                cache.lastHeight !== graphView.getHeight() ||               cache.lastZoom !== graphView.getZoom()) {                cache.lastWidth = graphView.getWidth();                cache.lastHeight = graphView.getHeight();                cache.lastZoom = graphView.getZoom();               setTimeout(function() {                    graphView.fitContent(false);                }, 500);            }        };    }    var displayURL = data.a('displayURL');    if (cache.graphView.displayURL !== displayURL) {        cache.graphView.dm().clear();        cache.graphView.displayURL = displayURL;        if (displayURL) {            ht.Default.xhrLoad(displayURL, function(json) {                cache.graphView.dm().deserialize(json);                setTimeout(function() {                   cache.graphView.fitContent(true);                }, 500);           });        }    }   return cache.graphView;
			}
			}
	  },
		  //"__ht__function(data, gv, cache) {    if (!cache.graphView) {\n        var graphView = cache.graphView = new ht.graph.GraphView();\n        graphView.setScrollBarVisible(false);\n        graphView.layoutHTML = function() {\n            gv.layoutHTML(data, graphView, true);\n            var rect = data.getRect();\n            if (cache.lastWidth !== graphView.getWidth() ||\n                cache.lastHeight !== graphView.getHeight() ||\n                cache.lastZoom !== graphView.getZoom()) {\n                cache.lastWidth = graphView.getWidth();\n                cache.lastHeight = graphView.getHeight();\n                cache.lastZoom = graphView.getZoom();\n                setTimeout(function() {\n                    graphView.fitContent(false);\n                }, 500);\n            }\n        };\n    }\n    var displayURL = data.a('displayURL');\n    if (cache.graphView.displayURL !== displayURL) {\n        cache.graphView.dm().clear();\n        cache.graphView.displayURL = displayURL;\n        if (displayURL) {\n            ht.Default.xhrLoad(displayURL, function(json) {\n                cache.graphView.dm().deserialize(json);\n                setTimeout(function() {\n                    cache.graphView.fitContent(true);\n                }, 500);\n            });\n        }\n    }\n    return cache.graphView;\n}",
	  "width": 200,
	  "height": 120,
	  "scrollable": true,
	  "interactive": true,
	  "pixelPerfect": false,
	  "attachStyle": "close",
	  "comps": []
	});*/
s("bus", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADuUlEQVR4Xu2XS2hcVRzGf+ec+8hMnaRJbNQkJVRIfZS0ahobRKHu+rIPROtK1AqSLmyrVhBcZKWb1EYXBdGF+NioEVqirlSM4itiKImVoNWpj5a2ah5tJ5nk3vN3LvfOIpQJc1dZmA+++z/nu/P9z8c5ZxZXiQhLCQ38vwMsB1gOoCJ2vTi02ck1fmpFEAEBkIW/UqTTtaqw3OylJ7493P06YAGciMH83D1rG33aGzMABFYIS5TYgtEqImEK3TMKrRRCAgFBODE6dwB4C5ghQaaj95O3j49NyrwVufXIqFyZF/lnRuRiIa7R/JaU+vr+Mdn3Xl4eeTcvj5XqXcdOiRWRpwb/kFXde5pJoAFH1VzT2ZhzuVwExzFcmoWpGVtiGNVojjEp9CIorenf3caRnW0c3dXG2qYV/PJvwN1r6mjd/fQLgFMO4OJlb26p9fj+7CwZX1MMKVEW1Jo0egCeq5megcmCMF2IA41fKHLn6hzZuoYHgZpyAANCa63DlTlLjWcIQ7BWlRjXIArgaoIq9cif8Q1zIYSR38b+/NQcjobN7Q2Zdc8ObAOUAyiNwgLnLs+T812UAqM1WgSlVImQq0mp+y77P8wjAq6JL2vWLUbh2NiaY7Cx5UnguAKaNvaPnn9oU3PpCApopeJ/gQhlGKXQCqxQlR71AHhnTysTBXj5u7/JTxVxtWJXez23NWe4/40xRg51rHQAMAa0Jus7gCCACAugVFmrTrciPDp4FgEcFd8JgA9OT+L7LmgD4DkABT/HrPHwvYD113rU+hpRigUQIQ2EhX5FfDyf/Rkw8BcUsg2U7wAjB1bT+7XgukV+mghAa0SXUwI2BBvEVQAqhVGgiH1X+xEB4+d47aLD9CGoA5xyO6vB91w0IGHI9GAf8+fGAXBvuInaHQdRno/YsPJuKIXSpqJfHBetDZwCASgHWPfKBfZqMNkVaKM4/2YvG1pX0r33GQC++WKIkyeOct3DvUgQIhUCqCiAYxb1GwuHHxDeb5mEffVxgOfsADIUNQZtHMbzP9Kx8yB9fS8B0NPTw+df9rPpq1exYbDYDlThD0Epnjeax8s7MH46DwgQNTAEVijMzOK6HkA0jjR+PvM7NlxsB6rzl9ciedYDa5IK4GzdtuNYV1fXjRtuvwOAkyM/MDw8/OvHHw3uBwIqIKV/AvgNwEtCNCVsA7q3bNl6Zvv2+yRiNI605F1TBab11wMeVwMXuB7oBO5N2JloLhWQyl9lkzpgVcK6FOY0/qXH8qfZkgdYDvAftC1Oc+4ypOMAAAAASUVORK5CYII=");
s('editor.edit', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(51,153,255)",
        "shadowColor": "#1ABC9C",
        "rotation": 5.49779,
        "closePath": true,
        "points": [6, -0.83884, 0.5, 13.16116, 6.04966, 10.58206, 11.5, 13.16116, 6, -0.83884]
    }]
});
s('editor.preview', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "points": [1.9869, 6.489, 2, 2, 14, 8, 1.9869, 14, 2, 9.555]
    }]
});
s('editor.edge', {
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(61,61,61)",
        "borderJoin": "miter",
        "rect": [2, 2, 2.68327, 2.5555]
    }, {
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(61,61,61)",
        "borderJoin": "miter",
        "rect": [11.31673, 11.4445, 2.68327, 2.5555]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(61,61,61)",
        "points": [3.38484, 4.62436, 3.52786, 13.01496, 10.86963, 12.96728]
    }]
});

s('devece.alarm', {
    "width": 100,
    "height": 100,
    "blendMode": "override",
    "comps": [{
        "type": "oval",
        "background": "rgb(245,245,245)",
        "gradient": "radial.center",
        "rect": [0, 0, 100, 100]
    }]
});
s('editor.redo', {
    "background": "rgb(191,191,191)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "scaleX": -1,
        "points": [9.9945, 5.006, 6.0345, 5.006, 6.0345, 3.527, 6.0345, 3.336, 5.9255, 3.162, 5.7545, 3.078, 5.5825, 2.994, 5.3785, 3.015, 5.2275, 3.132, 2.4795, 5.264, 2.3575, 5.359, 2.2865, 5.505, 2.2865, 5.659, 2.2865, 5.813, 2.3575, 5.959, 2.4795, 6.054, 5.2275, 8.186, 5.3175, 8.256, 5.4255, 8.292, 5.5345, 8.292, 5.6095, 8.292, 5.6845, 8.275, 5.7545, 8.241, 5.9255, 8.157, 6.0345, 7.983, 6.0345, 7.792, 6.0345, 6.006, 9.9945, 6.006, 11.5445, 6.006, 12.7135, 7.296, 12.7135, 9.006, 12.7135, 10.689, 11.4815, 12.006, 9.9085, 12.006, 5.0345, 12.006, 4.7585, 12.006, 4.5345, 12.23, 4.5345, 12.506, 4.5345, 12.782, 4.7585, 13.006, 5.0345, 13.006, 9.9085, 13.006, 12.0425, 13.006, 13.7135, 11.249, 13.7135, 9.006, 13.7135, 6.763, 12.0795, 5.006, 9.9945, 5.006, 9.9945, 5.006],
        "segments": [1, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 4, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2]
    }]
});

s('editor.undo', {
    "background": "rgb(191,191,191)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "points": [9.9945, 5.006, 6.0345, 5.006, 6.0345, 3.527, 6.0345, 3.336, 5.9255, 3.162, 5.7545, 3.078, 5.5825, 2.994, 5.3785, 3.015, 5.2275, 3.132, 2.4795, 5.264, 2.3575, 5.359, 2.2865, 5.505, 2.2865, 5.659, 2.2865, 5.813, 2.3575, 5.959, 2.4795, 6.054, 5.2275, 8.186, 5.3175, 8.256, 5.4255, 8.292, 5.5345, 8.292, 5.6095, 8.292, 5.6845, 8.275, 5.7545, 8.241, 5.9255, 8.157, 6.0345, 7.983, 6.0345, 7.792, 6.0345, 6.006, 9.9945, 6.006, 11.5445, 6.006, 12.7135, 7.296, 12.7135, 9.006, 12.7135, 10.689, 11.4815, 12.006, 9.9085, 12.006, 5.0345, 12.006, 4.7585, 12.006, 4.5345, 12.23, 4.5345, 12.506, 4.5345, 12.782, 4.7585, 13.006, 5.0345, 13.006, 9.9085, 13.006, 12.0425, 13.006, 13.7135, 11.249, 13.7135, 9.006, 13.7135, 6.763, 12.0795, 5.006, 9.9945, 5.006, 9.9945, 5.006],
        "segments": [1, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 4, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2]
    }]
});
s("arrow", "data:image/png;base64,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");
s('flow-arrow', {
    "width": 75,
    "height": 45,
    "comps": [{
        "type": "triangle",
        "background": "rgb(38,226,255)",
        "borderColor": "#979797",
        "shadow": true,
        "shadowColor": "rgb(38,226,255)",
        "shadowBlur": 20,
        "shadowOffsetX": 0,
        "shadowOffsetY": 0,
        "rotation": 1.5708,
        "rect": [41.15315, 10, 30, 25]
    }, {
        "type": "rect",
        "background": "rgb(38,226,255)",
        "borderColor": "#979797",
        "rotation": 1.5708,
        "rect": [33.60473, 17.5, 10, 10]
    }, {
        "type": "rect",
        "background": "rgb(38,226,255)",
        "borderColor": "#979797",
        "rotation": 1.5708,
        "rect": [16.79364, 17.5, 10, 10]
    }, {
        "type": "rect",
        "background": "rgb(38,226,255)",
        "borderColor": "#979797",
        "rotation": 1.5708,
        "rect": [-0.01745, 17.5, 10, 10]
    }]
});
s('drop-water', {
    "width": 52,
    "height": 52,
    "comps": [{
        "type": "shape",
        "background": "rgb(0,153,255)",
        "fillRule": "evenodd",
        "shadowColor": "#1ABC9C",
        "rotation": 3.92548,
        "points": [47.76549, 9.00116, 47.75736, 9.20463, 43.83625, 26.12885, 42.28308, 30.8093, 39.58372, 38.94376, 34.47482, 46.08573, 25.78318, 46.08573, 25.78318, 46.08573, 16.6436, 46.08573, 9.23451, 38.65803, 9.23451, 29.53706, 9.23451, 29.53706, 9.23451, 20.65929, 16.61153, 15.55431, 25.00368, 13.0065, 31.39346, 11.0666, 47.76549, 9.00116, 47.76549, 9.00116],
        "segments": [1, 4, 4, 2, 4, 2, 4, 4]
    }, {
        "type": "shape",
        "background": "rgba(255,255,255,0.7)",
        "fillRule": "evenodd",
        "shadowColor": "#1ABC9C",
        "rotation": 4.02533,
        "points": [23.58481, 33.25229, 21.36937, 39.04895, 27.21875, 45.91448, 23.58481, 45.91448, 23.58481, 45.91448, 19.94346, 45.91448, 16.99156, 43.07283, 16.99156, 39.58338, 16.99156, 39.58338, 16.99156, 36.08681, 19.95087, 33.25229, 23.58481, 33.25229],
        "segments": [1, 4, 2, 4, 2, 4]
    }]
});

s('treeicon-directory', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "rgb(255,204,153)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [14.5, 14.5, 0.5, 14.5, 0.5, 1.50001, 6.5, 1.50001, 7.5, 3.50001, 14.5, 3.50001, 14.5, 14.5]
    }, {
        "type": "shape",
        "background": "rgb(255,227,199)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [0.5, 5.50001, 14.5, 5.50001, 14.5, 14.50001, 0.5, 14.50001, 0.5, 5.50001]
    }]
});
s('dir.expanded', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "rgb(255,255,255)",
        "borderWidth": 1,
        "borderColor": "rgb(51,153,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [2.35891, 10.47175, 3.3125, 6.30284, 15.5, 6.30284, 13.625, 14.5, 0.5, 14.5, 0.5, 1.5, 6.125, 1.5, 7.0625, 3.2289, 12.6875, 3.2289, 12.6875, 6.30284]
    }]
});

s('tree.icon86', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [7.99427, 3.36181, 9.02491, 3.36181, 9.86465, 4.20155, 9.86465, 5.22072, 9.86465, 6.25515, 9.02491, 7.09489, 7.99427, 7.09489, 6.96749, 7.09489, 6.12775, 6.25515, 6.12775, 5.22072, 6.12775, 4.20155, 6.97131, 3.36181, 7.99427, 3.36181, 7.99427, 3.36181, 7.99427, 3.36181, 3.93293, 7.03383, 3.93293, 7.03383, 3.68865, 6.47653, 3.54743, 5.86961, 3.54743, 5.22455, 3.54743, 4.00309, 4.05126, 2.89232, 4.85283, 2.09072, 5.65444, 1.28915, 6.76521, 0.79291, 7.99049, 0.79291, 9.21573, 0.79291, 10.32649, 1.28915, 11.13192, 2.09072, 11.93349, 2.89232, 12.42972, 4.00687, 12.42972, 5.22455, 12.42972, 5.87343, 12.29228, 6.47653, 12.04801, 7.03383, 13.59773, 7.03383, 13.7733, 7.03383, 13.92599, 7.16741, 13.94127, 7.33916, 15.32302, 14.59157, 15.36119, 14.78243, 15.23143, 14.95422, 15.04439, 14.99622, 15.02529, 14.99622, 15.0024, 15, 14.98712, 15, 0.99382, 15, 0.79531, 15, 0.63881, 14.84353, 0.63881, 14.64885, 0.63881, 14.61832, 0.64263, 14.59157, 0.65027, 14.54962, 2.03206, 7.31245, 2.07023, 7.14834, 2.21527, 7.03001, 2.37557, 7.03001, 3.93293, 7.03001, 3.93293, 7.03383, 3.93293, 7.03383, 4.32229, 7.73617, 4.32229, 7.73617, 2.99199, 7.73617, 1.76, 14, 14.26, 14, 12.98415, 7.73617, 11.67011, 7.73617, 11.59376, 7.84304, 11.07846, 8.54538, 10.36084, 9.08739, 9.54403, 9.38894, 8.46379, 10.79361, 8.26529, 11.04935, 7.90268, 11.09899, 7.65076, 10.90813, 7.60495, 10.86996, 7.56678, 10.82797, 7.54389, 10.79361, 6.46747, 9.38894, 5.63916, 9.08739, 4.92154, 8.54538, 4.40624, 7.84304, 4.32229, 7.73617, 4.32229, 7.73617, 4.32229, 7.73617, 10.31507, 2.90757, 10.31507, 2.90757, 9.7196, 2.3121, 8.89511, 1.94567, 7.99427, 1.94567, 7.08965, 1.94567, 6.26897, 2.3121, 5.67351, 2.90757, 5.08186, 3.49921, 4.70779, 4.32371, 4.70779, 5.22072, 4.70779, 5.94977, 4.94446, 6.61012, 5.34142, 7.15595, 5.73839, 7.70181, 6.31479, 8.13313, 6.97895, 8.34688, 7.08965, 8.38123, 7.19652, 8.44993, 7.27286, 8.5492, 7.99427, 9.48435, 8.71189, 8.5492, 8.71953, 8.5492, 8.78059, 8.45757, 8.87986, 8.38505, 8.99816, 8.3507, 9.66997, 8.14077, 10.24637, 7.70181, 10.64715, 7.15595, 11.04029, 6.61012, 11.27314, 5.94977, 11.27314, 5.22072, 11.26932, 4.32371, 10.90289, 3.49921, 10.31507, 2.90757, 10.31507, 2.90757, 10.31507, 2.90757, 7.99427, 4.0565, 7.99427, 4.0565, 7.35303, 4.0565, 6.82244, 4.58327, 6.82244, 5.22455, 6.82244, 5.87343, 7.35303, 6.40019, 7.99427, 6.40019, 8.64319, 6.40019, 9.15849, 5.87343, 9.15849, 5.22455, 9.16231, 4.58709, 8.63555, 4.0565, 7.99427, 4.0565, 7.99427, 4.0565, 7.99427, 4.0565],
        "segments": [1, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 4, 4, 2, 4, 2, 4, 4, 2, 4, 4, 2, 4, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 4, 2, 4, 4, 2, 4, 2, 2, 2, 1, 2, 4, 4, 4, 4, 4, 4, 2, 2, 2, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 2]
    }]
});
s('tree.icon87', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [12.42266, 8.84948, 12.42266, 8.51451, 12.69847, 8.23606, 13.03419, 8.23606, 13.37798, 8.23606, 13.64577, 8.51047, 13.64577, 8.84948, 13.64577, 14.8785, 13.64577, 15.22958, 13.37798, 15.5, 13.03419, 15.5, 13.01824, 15.5, 2.96976, 15.5, 2.63002, 15.5, 2.35823, 15.22958, 2.35823, 14.8785, 2.35823, 14.86642, 2.35823, 8.84948, 2.35823, 8.51451, 2.63002, 8.23606, 2.96976, 8.23606, 3.3095, 8.23606, 3.58129, 8.51047, 3.58129, 8.84948, 3.58129, 14.26511, 5.54384, 14.26511, 5.54384, 8.18762, 5.54384, 7.9778, 5.71169, 7.81233, 5.91154, 7.81233, 5.91955, 7.81233, 10.09241, 7.81233, 10.30026, 7.81233, 10.46415, 7.9778, 10.46415, 8.18762, 10.46415, 8.1957, 10.46415, 14.26511, 12.42266, 14.26511, 12.42266, 8.84948, 12.42266, 8.84948, 12.42266, 8.84948, 6.27529, 14.26511, 6.27529, 14.26511, 9.73271, 14.26511, 9.73271, 8.55083, 6.27529, 8.55083, 6.27529, 14.26511, 6.27529, 14.26511, 6.27529, 14.26511, 1.11115, 9.01086, 1.11115, 9.01086, 0.86733, 9.26512, 0.48761, 9.26512, 0.23983, 9.01086, 0, 8.78084, 0, 8.38133, 0.23983, 8.14327, 7.5703, 0.75421, 7.81413, 0.5, 8.19383, 0.5, 8.43766, 0.75421, 8.44166, 0.76229, 15.76417, 8.14327, 16, 8.38133, 16, 8.77681, 15.76417, 9.01086, 15.52034, 9.26512, 15.13263, 9.26512, 14.8928, 9.01086, 8.00198, 2.05366, 1.11115, 9.01086, 1.11115, 9.01086, 1.11115, 9.01086],
        "segments": [1, 4, 4, 2, 4, 2, 2, 4, 2, 2, 4, 4, 2, 2, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 4, 4, 2, 4, 2, 2, 4, 4, 2, 2, 2, 2]
    }]
});
s('tree.icon88', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [13.32204, 2.99924, 6.50532, 2.99924, 6.24577, 2.99924, 6.02946, 2.77646, 6.02946, 2.49799, 6.02946, 2.21952, 6.24267, 2.00002, 6.50532, 2.00002, 13.79172, 2.00002, 14.05437, 2.00002, 14.2645, 2.21952, 14.2645, 2.49799, 14.2645, 2.51111, 14.2645, 14.49873, 14.2645, 14.78048, 14.05437, 14.99998, 13.79172, 14.99998, 13.78244, 14.99998, 2.47588, 14.99998, 2.21014, 14.99998, 2.00002, 14.78048, 2.00002, 14.49873, 2.00002, 14.48565, 2.00002, 2.49799, 2.00002, 2.21952, 2.21014, 2.00002, 2.47588, 2.00002, 2.48823, 2.00002, 4.10743, 2.00002, 4.36392, 2.00002, 4.58329, 2.21952, 4.58329, 2.49799, 4.58329, 2.77646, 4.36392, 2.99924, 4.10743, 2.99924, 2.94247, 2.99924, 2.94247, 6.69482, 4.49062, 6.69482, 4.6451, 6.69482, 4.7687, 6.82587, 4.7687, 6.99621, 4.7687, 7.16003, 4.6451, 7.29764, 4.49062, 7.29764, 2.94247, 7.29764, 2.94247, 14.00076, 7.8495, 14.00076, 7.8495, 7.29764, 6.30448, 7.29764, 6.14688, 7.29764, 6.02327, 7.16003, 6.02327, 6.99621, 6.02327, 6.82587, 6.14688, 6.69482, 6.30448, 6.69482, 8.11218, 6.69482, 8.13071, 6.69482, 8.15233, 6.69482, 9.96003, 6.69482, 10.11454, 6.69482, 10.23815, 6.82587, 10.23815, 6.99621, 10.23815, 7.16003, 10.11454, 7.29764, 9.96003, 7.29764, 8.41501, 7.29764, 8.41501, 14.00076, 13.32204, 14.00076, 13.32204, 7.29764, 11.77699, 7.29764, 11.62248, 7.29764, 11.49581, 7.16003, 11.49581, 6.99621, 11.49581, 6.82587, 11.62248, 6.69482, 11.77699, 6.69482, 13.32204, 6.69482],
        "segments": [1, 2, 4, 4, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 4, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 4, 4, 2, 2, 2, 2, 2, 4, 4, 2]
    }]
});
s('tree.icon89', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [12.5208, 9.29892, 14.34309, 10.29658, 14.59294, 10.4264, 14.68292, 10.74759, 14.55632, 11.0004, 14.503, 11.09607, 14.4297, 11.17466, 14.34309, 11.21567, 8.23985, 14.57759, 8.08327, 14.65961, 7.90339, 14.65619, 7.76012, 14.57759, 1.65688, 11.21567, 1.40703, 11.08581, 1.31705, 10.76465, 1.44368, 10.50842, 1.49363, 10.41618, 1.57027, 10.34442, 1.65688, 10.29658, 3.47587, 9.29892, 1.65688, 8.29104, 1.40703, 8.15437, 1.31705, 7.84003, 1.44368, 7.58037, 1.49363, 7.49155, 1.57027, 7.42664, 1.65688, 7.37198, 3.47587, 6.37091, 1.65688, 5.363, 1.40703, 5.22975, 1.31705, 4.91202, 1.44368, 4.66601, 1.49363, 4.57035, 1.57027, 4.49517, 1.65688, 4.44736, 7.76012, 1.08198, 7.91336, 1, 8.09328, 1, 8.23985, 1.08198, 14.34309, 4.44736, 14.59294, 4.58403, 14.68292, 4.89834, 14.55632, 5.15119, 14.503, 5.24343, 14.4297, 5.31518, 14.34309, 5.363, 12.5208, 6.37091, 14.34309, 7.37198, 14.59294, 7.51204, 14.68292, 7.81954, 14.55632, 8.07578, 14.503, 8.16805, 14.4297, 8.24319, 14.34309, 8.29104, 12.5208, 9.29892, 12.5208, 9.29892, 12.5208, 9.29892, 13.03384, 10.75439, 13.03384, 10.75439, 11.45473, 9.88318, 8.24318, 11.64955, 8.18989, 11.68371, 8.13323, 11.69739, 8.07994, 11.70423, 8.06993, 11.70765, 8.02331, 11.70765, 8.01331, 11.70765, 7.99667, 11.70765, 7.98666, 11.70765, 7.94334, 11.70765, 7.93003, 11.70423, 7.88004, 11.69739, 7.82342, 11.68029, 7.76679, 11.64955, 4.55524, 9.88318, 2.97613, 10.75439, 8.00664, 13.52186, 13.03384, 10.75439, 13.03384, 10.75439, 13.03384, 10.75439, 7.99667, 10.60066, 7.99667, 10.60066, 9.67572, 9.67818, 11.35812, 8.7557, 13.03051, 7.82638, 11.45139, 6.95514, 8.23985, 8.72153, 8.18655, 8.7557, 8.12993, 8.77277, 8.0766, 8.77961, 8.0666, 8.77961, 8.01998, 8.78645, 8.00997, 8.78645, 7.99333, 8.78645, 7.98333, 8.78645, 7.94001, 8.77961, 7.9267, 8.77961, 7.87671, 8.77277, 7.82008, 8.75228, 7.76346, 8.72153, 4.55191, 6.95514, 2.9728, 7.82638, 4.64188, 8.75912, 6.32758, 9.6816, 7.99667, 10.60066, 7.99667, 10.60066, 7.99667, 10.60066, 7.99667, 7.68629, 7.99667, 7.68629, 9.67572, 6.75698, 11.35812, 5.8345, 13.03051, 4.91202, 7.99667, 2.14455, 2.96613, 4.91202, 4.64188, 5.8345, 6.32758, 6.75698, 7.99667, 7.68629, 7.99667, 7.68629, 7.99667, 7.68629],
        "segments": [1, 2, 4, 4, 2, 4, 2, 4, 4, 2, 2, 4, 4, 2, 2, 4, 4, 2, 4, 2, 4, 4, 2, 2, 4, 4, 2, 2, 2, 1, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 1, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 2, 2, 1, 2, 4, 2, 2, 4, 2, 2]
    }]
});
s('tree.icon90', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [2.65556, 8.45092, 4.3722, 8.45092, 4.53616, 8.45092, 4.66797, 8.32, 4.66797, 8.15635, 4.66797, 7.9927, 4.53616, 7.85523, 4.3722, 7.85523, 2.65556, 7.85523, 2.48841, 7.85523, 2.36304, 7.9927, 2.36304, 8.15635, 2.36304, 8.32, 2.48841, 8.45092, 2.65556, 8.45092, 2.65556, 8.45092, 2.65556, 8.45092, 2.65556, 7.3512, 2.65556, 7.3512, 4.3722, 7.3512, 4.53616, 7.3512, 4.66797, 7.22028, 4.66797, 7.05666, 4.66797, 6.88646, 4.53616, 6.75554, 4.3722, 6.75554, 2.65556, 6.75554, 2.48841, 6.75554, 2.36304, 6.88646, 2.36304, 7.05666, 2.36304, 7.22028, 2.48841, 7.3512, 2.65556, 7.3512, 2.65556, 7.3512, 2.65556, 7.3512, 14.51136, 3.5219, 14.51136, 3.5219, 10.972, 3.5219, 10.972, 2.50402, 10.972, 2.23239, 10.75018, 2, 10.48012, 2, 5.52306, 2, 5.24982, 2, 5.03444, 2.22911, 5.03444, 2.50402, 5.03444, 3.5219, 1.49508, 3.5219, 1.2218, 3.5219, 1.00002, 3.74774, 1.00002, 4.02593, 1.00002, 13.7825, 1.00002, 14.05413, 1.2218, 14.27997, 1.49508, 14.27997, 5.03444, 14.27997, 5.03444, 14.49598, 5.03444, 14.76765, 5.24982, 15, 5.52306, 15, 10.48012, 15, 10.74696, 15, 10.972, 14.77092, 10.972, 14.49598, 10.972, 14.27997, 14.51136, 14.27997, 14.78138, 14.27997, 14.99998, 14.05741, 14.99998, 13.7825, 14.99998, 4.02593, 14.99998, 3.74774, 14.7846, 3.5219, 14.51136, 3.5219, 14.51136, 3.5219, 14.51136, 3.5219, 5.03766, 13.2752, 5.03766, 13.2752, 1.98692, 13.2752, 1.98692, 4.52016, 5.03766, 4.52016, 5.03766, 13.2752, 5.03766, 13.2752, 5.03766, 13.2752, 9.9915, 13.99523, 9.9915, 13.99523, 6.02137, 13.99523, 6.02137, 3.0015, 9.9915, 3.0015, 9.9915, 13.99523, 9.9915, 13.99523, 9.9915, 13.99523, 14.0163, 13.2752, 14.0163, 13.2752, 10.972, 13.2752, 10.972, 4.52016, 14.0163, 4.52016, 14.0163, 13.2752, 14.0163, 13.2752, 14.0163, 13.2752, 2.65556, 6.25151, 2.65556, 6.25151, 4.3722, 6.25151, 4.53616, 6.25151, 4.66797, 6.12059, 4.66797, 5.95694, 4.66797, 5.79005, 4.53616, 5.65585, 4.3722, 5.65585, 2.65556, 5.65585, 2.48841, 5.65585, 2.36304, 5.79005, 2.36304, 5.95694, 2.36304, 6.12059, 2.48841, 6.25151, 2.65556, 6.25151, 2.65556, 6.25151, 2.65556, 6.25151, 4.28863, 10.80087, 4.28863, 10.80087, 4.08931, 10.59466, 3.81607, 10.4703, 3.51068, 10.4703, 3.20851, 10.4703, 2.93205, 10.59466, 2.73594, 10.80087, 2.53662, 11.0005, 2.41446, 11.27545, 2.41446, 11.58309, 2.41446, 11.88421, 2.527, 12.1624, 2.71345, 12.35551, 2.73594, 12.37186, 2.93205, 12.57807, 3.20529, 12.70243, 3.51068, 12.70243, 3.81285, 12.70243, 4.08931, 12.57807, 4.28863, 12.37186, 4.48796, 12.1722, 4.61333, 11.89729, 4.61333, 11.57981, 4.61333, 11.27872, 4.49439, 11.0136, 4.30791, 10.81067, 4.28863, 10.80087, 4.28863, 10.80087, 4.28863, 10.80087, 3.87074, 11.95292, 3.87074, 11.95292, 3.78392, 12.04131, 3.65214, 12.10674, 3.51068, 12.10674, 3.36925, 12.10674, 3.24387, 12.04456, 3.15386, 11.95292, 3.13777, 11.94312, 3.0542, 11.84821, 3.00275, 11.73036, 3.00275, 11.58637, 3.00275, 11.44562, 3.05742, 11.32125, 3.14743, 11.21978, 3.15386, 11.22633, 3.24387, 11.12814, 3.36603, 11.06596, 3.51068, 11.06596, 3.64892, 11.06596, 3.7807, 11.12487, 3.87074, 11.22633, 3.88358, 11.23289, 3.96715, 11.32452, 4.01861, 11.44562, 4.01861, 11.58309, 4.02183, 11.73036, 3.96715, 11.86128, 3.87074, 11.95292, 3.87074, 11.95292, 3.87074, 11.95292, 11.6342, 7.3512, 11.6342, 7.3512, 13.35407, 7.3512, 13.52124, 7.3512, 13.64983, 7.22028, 13.64983, 7.05666, 13.64983, 6.88646, 13.52124, 6.75554, 13.35407, 6.75554, 11.6342, 6.75554, 11.46706, 6.75554, 11.33846, 6.88646, 11.33846, 7.05666, 11.33846, 7.22028, 11.46706, 7.3512, 11.6342, 7.3512, 11.6342, 7.3512, 11.6342, 7.3512, 11.6342, 8.45092, 11.6342, 8.45092, 13.35407, 8.45092, 13.52124, 8.45092, 13.64983, 8.32, 13.64983, 8.15635, 13.64983, 7.9927, 13.52124, 7.85523, 13.35407, 7.85523, 11.6342, 7.85523, 11.46706, 7.85523, 11.33846, 7.9927, 11.33846, 8.15635, 11.33846, 8.32, 11.46706, 8.45092, 11.6342, 8.45092, 11.6342, 8.45092, 11.6342, 8.45092, 11.6342, 6.25151, 11.6342, 6.25151, 13.35407, 6.25151, 13.52124, 6.25151, 13.64983, 6.12059, 13.64983, 5.95694, 13.64983, 5.79005, 13.52124, 5.65585, 13.35407, 5.65585, 11.6342, 5.65585, 11.46706, 5.65585, 11.33846, 5.79005, 11.33846, 5.95694, 11.33846, 6.12059, 11.46706, 6.25151, 11.6342, 6.25151, 11.6342, 6.25151, 11.6342, 6.25151, 6.94719, 7.87816, 6.94719, 7.87816, 9.06246, 7.87816, 9.22642, 7.87816, 9.35819, 7.74724, 9.35819, 7.57704, 9.35819, 7.41338, 9.22642, 7.27594, 9.06246, 7.27594, 6.94719, 7.27594, 6.78002, 7.27594, 6.65143, 7.41338, 6.65143, 7.57704, 6.65143, 7.74724, 6.78002, 7.87816, 6.94719, 7.87816, 6.94719, 7.87816, 6.94719, 7.87816, 13.27371, 10.80087, 13.27371, 10.80087, 13.07439, 10.59466, 12.80115, 10.4703, 12.49254, 10.4703, 12.19355, 10.4703, 11.91388, 10.59466, 11.72102, 10.80087, 11.52492, 11.0005, 11.39954, 11.27545, 11.39954, 11.58309, 11.39954, 11.88421, 11.51848, 12.1624, 11.70493, 12.35551, 11.7178, 12.37186, 11.91388, 12.57807, 12.19037, 12.70243, 12.48932, 12.70243, 12.79471, 12.70243, 13.07117, 12.57807, 13.27049, 12.37186, 13.4666, 12.1722, 13.59197, 11.89729, 13.59197, 11.57981, 13.59197, 11.27872, 13.47944, 11.0136, 13.28655, 10.81067, 13.27371, 10.80087, 13.27371, 10.80087, 13.27371, 10.80087, 12.85579, 11.95292, 12.85579, 11.95292, 12.76578, 12.04131, 12.64041, 12.10674, 12.49254, 12.10674, 12.36073, 12.10674, 12.22892, 12.04456, 12.13569, 11.95292, 12.12285, 11.94312, 12.03925, 11.84821, 11.98461, 11.73036, 11.98461, 11.58637, 11.98461, 11.44562, 12.03925, 11.32125, 12.13891, 11.21978, 12.13891, 11.22633, 12.22892, 11.12814, 12.36073, 11.06596, 12.49576, 11.06596, 12.64363, 11.06596, 12.769, 11.12487, 12.85901, 11.22633, 12.87188, 11.23289, 12.95545, 11.32452, 13.00688, 11.44562, 13.00688, 11.58309, 13.00366, 11.73036, 12.95223, 11.86128, 12.85579, 11.95292, 12.85579, 11.95292, 12.85579, 11.95292, 6.94719, 5.178, 6.94719, 5.178, 9.06246, 5.178, 9.22642, 5.178, 9.35819, 5.04708, 9.35819, 4.88016, 9.35819, 4.71323, 9.22642, 4.58234, 9.06246, 4.58234, 6.94719, 4.58234, 6.78002, 4.58234, 6.65143, 4.71323, 6.65143, 4.88016, 6.65143, 5.04708, 6.78002, 5.178, 6.94719, 5.178, 6.94719, 5.178, 6.94719, 5.178, 6.94719, 6.53298, 6.94719, 6.53298, 9.06246, 6.53298, 9.22642, 6.53298, 9.35819, 6.39551, 9.35819, 6.23189, 9.35819, 6.06496, 9.22642, 5.93732, 9.06246, 5.93732, 6.94719, 5.93732, 6.78002, 5.93732, 6.65143, 6.06496, 6.65143, 6.23189, 6.65143, 6.39226, 6.78002, 6.53298, 6.94719, 6.53298, 6.94719, 6.53298, 6.94719, 6.53298, 8.92421, 10.89579, 8.92421, 10.89579, 8.90816, 10.88596, 8.67347, 10.64378, 8.36164, 10.49975, 8.00483, 10.49975, 7.66085, 10.49975, 7.34259, 10.63722, 7.11434, 10.86306, 7.1015, 10.88596, 6.87003, 11.11179, 6.72538, 11.44234, 6.72538, 11.80892, 6.72538, 12.1722, 6.87324, 12.49622, 7.1015, 12.72534, 7.33294, 12.96752, 7.6512, 13.11155, 8.00805, 13.11155, 8.36164, 13.11155, 8.67668, 12.96424, 8.91137, 12.72534, 8.91137, 12.72534, 9.14603, 12.4995, 9.29071, 12.1722, 9.29071, 11.80892, 9.2875, 11.45217, 9.14925, 11.1347, 8.92421, 10.89579, 8.92421, 10.89579, 8.92421, 10.89579, 8.49345, 12.2966, 8.49345, 12.2966, 8.36808, 12.42749, 8.1945, 12.50933, 8.00483, 12.50933, 7.80872, 12.50933, 7.63514, 12.42749, 7.5162, 12.30312, 7.50977, 12.30312, 7.5162, 12.2966, 7.38761, 12.17548, 7.30723, 11.99875, 7.30723, 11.80565, 7.30723, 11.60599, 7.38761, 11.42927, 7.5162, 11.30818, 7.52261, 11.29507, 7.64798, 11.1707, 7.81838, 11.09541, 8.00161, 11.09541, 8.19771, 11.09541, 8.36486, 11.17725, 8.49023, 11.30818, 8.5031, 11.3147, 8.62204, 11.4391, 8.69277, 11.60927, 8.69277, 11.80565, 8.69599, 11.99875, 8.61882, 12.17548, 8.49345, 12.2966, 8.49345, 12.2966, 8.49345, 12.2966],
        "segments": [1, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 2, 4, 2, 4, 2, 2, 4, 2, 4, 2, 2, 4, 2, 4, 2, 2, 4, 2, 4, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 2, 2, 1, 2, 2, 4, 4, 2, 4, 4, 4, 4, 2, 4, 4, 2, 2, 1, 2, 4, 4, 2, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 2]
    }]
});
s('tree.icon99', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [3.84623, 1.14709, 3.85667, 1.14709, 12.15377, 1.14709, 12.44672, 1.14709, 12.69086, 1.38079, 12.69086, 1.68422, 12.69086, 1.69117, 12.69086, 14.46986, 12.69086, 14.75586, 12.45021, 15, 12.15377, 15, 12.1398, 15, 3.84623, 15, 3.55674, 15, 3.30911, 14.75935, 3.30911, 14.46986, 3.30911, 14.45593, 3.30911, 1.68422, 3.30911, 1.38079, 3.55674, 1.14709, 3.84623, 1.14709, 3.84623, 1.14709, 3.84623, 1.14709, 6.25965, 11.9518, 6.25965, 11.9518, 6.5526, 11.9518, 6.79675, 12.18896, 6.79675, 12.4854, 6.79675, 12.7749, 6.55609, 13.02249, 6.25965, 13.02249, 5.96321, 13.02249, 5.72954, 12.77835, 5.72954, 12.4854, 5.73304, 12.18896, 5.9667, 11.9518, 6.25965, 11.9518, 6.25965, 11.9518, 6.25965, 11.9518, 6.25965, 9.55929, 6.25965, 9.55929, 6.5003, 9.55929, 6.72004, 9.65694, 6.88047, 9.80689, 7.03391, 9.97084, 7.13505, 10.19403, 7.13505, 10.4277, 7.13505, 10.66835, 7.0374, 10.88806, 6.88047, 11.04851, 6.7235, 11.20545, 6.5038, 11.30659, 6.25965, 11.30659, 6.019, 11.30659, 5.7993, 11.20894, 5.64582, 11.04851, 5.48191, 10.88806, 5.38426, 10.67185, 5.38426, 10.4277, 5.38426, 10.19403, 5.48191, 9.97084, 5.64582, 9.80689, 5.7993, 9.65694, 6.019, 9.55929, 6.25965, 9.55929, 6.25965, 9.55929, 6.25965, 9.55929, 6.42706, 10.2603, 6.42706, 10.2603, 6.3852, 10.22193, 6.32592, 10.19054, 6.25965, 10.19054, 6.19688, 10.19054, 6.13411, 10.22193, 6.09923, 10.2603, 6.05039, 10.30565, 6.02249, 10.35795, 6.02249, 10.4277, 6.02249, 10.49746, 6.05039, 10.55674, 6.09923, 10.59511, 6.13411, 10.63348, 6.19339, 10.66137, 6.25965, 10.66137, 6.32243, 10.66137, 6.3852, 10.62999, 6.42706, 10.59511, 6.46892, 10.55674, 6.49332, 10.49746, 6.49332, 10.4277, 6.49681, 10.36144, 6.46892, 10.30565, 6.42706, 10.2603, 6.42706, 10.2603, 6.42706, 10.2603, 5.7086, 8.10844, 5.7086, 8.10844, 5.53424, 8.10844, 5.38775, 7.95846, 5.38775, 7.78407, 5.38775, 7.60968, 5.53424, 7.46672, 5.7086, 7.46672, 10.29137, 7.46672, 10.46576, 7.46672, 10.61221, 7.60968, 10.61221, 7.78407, 10.61221, 7.95846, 10.46576, 8.10844, 10.29137, 8.10844, 5.7086, 8.10844, 5.7086, 8.10844, 5.7086, 8.10844, 5.7086, 5.98793, 5.7086, 5.98793, 5.53424, 5.98793, 5.38775, 5.84842, 5.38775, 5.66709, 5.38775, 5.4927, 5.53424, 5.34621, 5.7086, 5.34621, 10.29137, 5.34621, 10.46576, 5.34621, 10.61221, 5.4927, 10.61221, 5.66709, 10.61221, 5.84842, 10.46576, 5.98793, 10.29137, 5.98793, 5.7086, 5.98793, 5.7086, 5.98793, 5.7086, 5.98793, 5.7086, 3.86746, 5.7086, 3.86746, 5.53424, 3.86746, 5.38775, 3.72446, 5.38775, 3.55007, 5.38775, 3.36874, 5.53424, 3.23272, 5.7086, 3.23272, 10.29137, 3.23272, 10.46576, 3.23272, 10.61221, 3.36874, 10.61221, 3.55007, 10.61221, 3.72446, 10.46576, 3.86746, 10.29137, 3.86746, 5.7086, 3.86746, 5.7086, 3.86746, 5.7086, 3.86746, 11.62711, 2.21433, 11.62711, 2.21433, 4.37983, 2.21433, 4.37983, 13.93626, 11.62711, 13.93626, 11.62711, 2.21433, 11.62711, 2.21433, 11.62711, 2.21433],
        "segments": [1, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 2, 2, 1, 2, 4, 4, 2, 4, 4, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2]
    }]
});
s('tree.icon', {
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "background": "#231815",
        "shadowColor": "#1ABC9C",
        "points": [3.46955, 11.05503, 3.29365, 11.05503, 3.14941, 11.19924, 3.14941, 11.37866, 3.14941, 13.10945, 3.14941, 13.29239, 3.29365, 13.44015, 3.46955, 13.44015, 3.64897, 13.44015, 3.7967, 13.29239, 3.7967, 13.10945, 3.7967, 11.37866, 3.80022, 11.19924, 3.64897, 11.05503, 3.46955, 11.05503, 3.46955, 11.05503, 3.46955, 11.05503, 14.95191, 10.50624, 14.95191, 10.50624, 14.95191, 10.47458, 14.95191, 10.44993, 14.94486, 10.42179, 13.74177, 3.05887, 13.69603, 2.78095, 13.56587, 2.51007, 13.38293, 2.32364, 13.17537, 2.12313, 12.91858, 1.99998, 12.59844, 1.99998, 3.35697, 1.99998, 3.04035, 1.99998, 2.7519, 2.12662, 2.54082, 2.33417, 2.5373, 2.33417, 2.34031, 2.54173, 2.21719, 2.81613, 2.21015, 3.11165, 1.01407, 10.37256, 1.0035, 10.42179, 0.99998, 10.46049, 0.99998, 10.50624, 0.99998, 13.60901, 1.03868, 14.16481, 1.39753, 14.65733, 1.97446, 14.80509, 1.9815, 14.8121, 1.98499, 14.8121, 1.99907, 14.8121, 2.00259, 14.8121, 2.01668, 14.81562, 2.03073, 14.81914, 2.03073, 14.81914, 2.04482, 14.82266, 2.04482, 14.82266, 2.05887, 14.82266, 2.06943, 14.82618, 2.087, 14.82971, 2.16793, 14.83675, 2.20311, 14.84027, 2.21719, 14.84027, 2.23124, 14.84379, 13.65733, 14.84379, 14.36793, 14.84379, 14.94486, 14.25982, 14.94486, 13.54921, 14.94486, 10.50624, 14.95191, 10.50624, 14.95191, 10.50624, 14.95191, 10.50624, 3.26199, 3.23829, 3.26199, 3.23829, 3.26904, 3.20663, 3.27256, 3.18198, 3.27256, 3.1468, 3.27256, 3.1468, 3.27256, 3.12923, 3.28309, 3.10813, 3.29717, 3.09757, 3.29717, 3.09757, 3.31126, 3.08348, 3.33587, 3.06591, 3.35345, 3.06591, 12.59492, 3.06591, 12.60196, 3.06591, 12.60901, 3.06591, 12.61605, 3.07996, 12.65123, 3.11514, 12.67232, 3.17145, 12.68289, 3.23477, 13.45681, 7.94169, 13.41811, 7.93465, 13.38645, 7.93465, 13.35832, 7.93465, 2.59361, 7.93465, 2.56195, 7.93465, 2.52325, 7.93465, 2.49508, 7.94169, 3.26199, 3.23829, 3.26199, 3.23829, 3.26199, 3.23829, 2.38253, 8.63821, 2.38253, 8.63821, 2.4388, 8.59955, 2.51973, 8.57842, 2.59709, 8.57842, 13.36184, 8.57842, 13.43924, 8.57842, 13.5096, 8.60307, 13.57644, 8.63821, 13.74529, 9.64082, 13.66789, 9.64082, 2.29456, 9.64082, 2.2242, 9.64082, 2.38253, 8.63821, 2.38253, 8.63821, 2.38253, 8.63821, 13.87897, 13.54921, 13.87897, 13.54921, 13.87897, 13.6688, 13.78047, 13.7673, 13.66085, 13.7673, 2.27699, 13.7673, 2.17145, 13.76026, 2.08, 13.6899, 2.06591, 13.57735, 2.06591, 13.57383, 2.06239, 13.57383, 2.06239, 10.92484, 2.06943, 10.80525, 2.16441, 10.71379, 2.28755, 10.71379, 13.66085, 10.71379, 13.72064, 10.71379, 13.77695, 10.73489, 13.81213, 10.77711, 13.81213, 10.77711, 13.81213, 10.77711, 13.85083, 10.81581, 13.87545, 10.86856, 13.87545, 10.92135, 13.87545, 13.54921, 13.87897, 13.54921, 13.87897, 13.54921, 11.75064, 11.1711, 11.75064, 11.1711, 11.15614, 11.1711, 10.67066, 11.65305, 10.67066, 12.24407, 10.67066, 12.83505, 11.15614, 13.32053, 11.75064, 13.32053, 12.33461, 13.32053, 12.82713, 12.83156, 12.82713, 12.24407, 12.82361, 11.65305, 12.33813, 11.1711, 11.75064, 11.1711, 11.75064, 11.1711, 11.75064, 11.1711, 11.75064, 12.66971, 11.75064, 12.66971, 11.5079, 12.66971, 11.31091, 12.47976, 11.31091, 12.24407, 11.31091, 12.00485, 11.50438, 11.81487, 11.75064, 11.81487, 11.98633, 11.81487, 12.17632, 12.00837, 12.17632, 12.24407, 12.17632, 12.47624, 11.98633, 12.66971, 11.75064, 12.66971, 11.75064, 12.66971, 11.75064, 12.66971, 5.84411, 11.05503, 5.84411, 11.05503, 5.66472, 11.05503, 5.52048, 11.19924, 5.52048, 11.37866, 5.52048, 13.10945, 5.52048, 13.29239, 5.66472, 13.44015, 5.84411, 13.44015, 6.02001, 13.44015, 6.16777, 13.29239, 6.16777, 13.10945, 6.16777, 11.37866, 6.17129, 11.19924, 6.02001, 11.05503, 5.84411, 11.05503, 5.84411, 11.05503, 5.84411, 11.05503, 4.66211, 11.05503, 4.66211, 11.05503, 4.48621, 11.05503, 4.34197, 11.19924, 4.34197, 11.37866, 4.34197, 13.10945, 4.34197, 13.29239, 4.48621, 13.44015, 4.66211, 13.44015, 4.83801, 13.44015, 4.98225, 13.29239, 4.98225, 13.10945, 4.98225, 11.37866, 4.98225, 11.19924, 4.83449, 11.05503, 4.66211, 11.05503, 4.66211, 11.05503, 4.66211, 11.05503],
        "segments": [1, 4, 2, 4, 4, 2, 4, 2, 2, 1, 2, 4, 2, 4, 4, 2, 4, 2, 4, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 1, 2, 4, 2, 4, 2, 4, 2, 4, 4, 2, 4, 2, 4, 2, 2, 2, 1, 2, 4, 2, 4, 2, 2, 2, 2, 2, 2, 2, 1, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4, 2, 2, 4, 2, 2, 2, 1, 2, 4, 4, 4, 4, 2, 2, 1, 2, 4, 4, 4, 4, 2, 2, 1, 2, 4, 2, 4, 4, 2, 4, 2, 2, 1, 2, 4, 2, 4, 4, 2, 4, 2, 2]
    }]
});
s('toolbar.add.rack', {
    "background": "rgb(130,130,130)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [7.55205, 14.52911, 2.45927, 14.52911, 2.45927, 1.52086, 13.49363, 1.52086, 13.49363, 8.43478]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [8.54249, 12.50305, 14.54249, 12.50305, 11.54249, 12.50305, 11.54249, 9.50305, 11.54249, 15.50305]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 4.5, 9.50451, 4.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 7.5, 9.50451, 7.5]
    }]
});
s('toolbar.edit.rack', {
    "background": "rgb(128,128,128)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [4.97735, 14.52911, 2.45927, 14.52911, 2.45927, 1.52086, 13.49363, 1.52086, 13.49363, 3.97983, 13.49363, 13, 13.49363, 14.52911, 12.13999, 14.52911],
        "segments": [1, 2, 2, 2, 2, 1, 2, 2]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 4.5, 9.50451, 4.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 7.5, 9.50451, 7.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "closePath": true,
        "points": [13, 6, 15, 8, 9, 14.0442, 7, 14, 7, 12, 13, 6, 11.56, 7.56, 13.52, 9.48],
        "segments": [1, 2, 2, 2, 2, 2, 1, 2]
    }]
});
s('toolbar.delete', {
    "background": "rgb(89,89,89)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [5.5, 5.57173, 5.5, 12.45709]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [8.05685, 5.57173, 8.05685, 12.45709]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [10.5, 5.57173, 10.5, 12.45709]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [1, 3.18902, 15, 3.16996, 5.32652, 3.16021, 6.32652, 1.16021, 9.32652, 1.16021, 10.32652, 3.16021]
    }, {
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rect": [3.33333, 3.18902, 9.33334, 11.65078]
    }]
});

s('toolbar.file', {
    "background": "rgb(128,128,128)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rect": [0.5, 1.99999, 15, 11.91767]
    }, {
        "type": "circle",
        "background": "rgb(255,255,255)",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rect": [4.64115, 4.65804, 0.85454, 1.28473]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [1.89157, 9.10438, 5.93792, 9.10438, 7.64109, 10.37599, 9.4302, 13.65071, 9.62104, 14, 8.9583, 12.31629, 7.31819, 10.67389, 7.31819, 10.67389, 8.62615, 6.00103, 14.10843, 6.00103],
        "segments": [1, 4, 4, 4]
    }]
});
s('area.square', {
    "width": 100,
    "height": 100,
    "blendMode": "override",
    "comps": [{
        "type": "rect",
        "borderWidth": 1,
        "borderColor": "rgb(0,166,255)",
        "rect": [1, 1, 98, 98]
    }]
});
s('area.squareView', {
    "width": 100,
    "height": 100,
    "blendMode": "override",
    "comps": [{
        "type": "rect",
        //"borderWidth": 1,
        //"borderColor": "rgb(0,166,255,0)",
        "rect": [1, 1, 98, 98]
    }]
});
s('port', {
    "dataBindings": [{
        "attr": "state.color",
        "valueType": "Color"
    }],
    "width": 24,
    "height": 20,
    "comps": [{
        "type": "rect",
        "background": "rgb(161,161,161)",
        "rect": [0, 0, 24, 20]
    }, {
        "type": "shape",
        "background": {
            "func": "attr@state.color",
            "value": "rgb(0,255,81)"
        },
        "borderColor": "rgb(150,150,150)",
        "closePath": true,
        "points": [6, 2, 6, 2, 5.52901, 3.18367, 4.52901, 4.43367, 3.52901, 5.68367, 2, 6, 2, 6, 2, 18, 22, 18, 22, 6, 22, 6, 20.59394, 5.43367, 19.59394, 4.43367, 18.59394, 3.43367, 18, 2, 18, 2],
        "segments": [1, 4, 4, 2, 2, 2, 4, 4]
    }]
});
s('port.icon', {
    "dataBindings": [{
        "attr": "device.name",
        "valueType": "String"
    }, {
        "attr": "device.port",
        "valueType": "String"
    }],
    "width": 50,
    "height": 28,
    "comps": [{
        "type": "shape",
        "background": "#727272",
        "borderWidth": 1,
        "borderColor": "#727272",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "closePath": true,
        "points": [9.29375, 6.15024, 9.29375, 20.79157, 40.70625, 20.79157, 40.70625, 6.15024, 34.03349, 6.15024, 34.03349, 4.09964, 32.07682, 4.09964, 32.07682, 1.34963, 18.59235, 1.34963, 18.59235, 4.09964, 16.64128, 4.09964, 16.64128, 6.15024]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [34.83896, 1.20218, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [31.5343, 1.20218, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [28.22963, 1.24845, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [24.92496, 1.2643, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [21.62028, 1.14005, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [18.31562, 1.14005, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [15.01095, 1.18633, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [11.70629, 1.20218, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [37.70629, 1.24845, 1.44935, 4.8815]
    }, {
        "type": "text",
        "text": {
            "func": "attr@device.port",
            "value": "1"
        },
        "align": "center",
        "color": "rgb(255,255,255)",
        "font": "10px arial, sans-serif",
        "shadow": true,
        "shadowColor": "rgb(0,58,125)",
        "shadowBlur": 2,
        "shadowOffsetX": 0,
        "shadowOffsetY": 0,
        "rect": [14, 4.14005, 21.6735, 16.15549]
    }, {
        "type": "text",
        "text": {
            "func": "attr@device.name",
            "value": "-"
        },
        "align": "center",
        "color": "#4A4A4A",
        "font": "10px arial, sans-serif",
        "scaleX": 0.75,
        "scaleY": 0.75,
        "rect": [-8.33333, 19.59022, 66.66667, 9.61117]
    }]
});
s('port.plug', {
    "width": 69,
    "height": 50,
    "comps": [{
        "type": "shape",
        "background": "rgb(89,117,194)",
        "shadowColor": "#1ABC9C",
        "points": [9.90656, 21.23659, 9.90656, 26.52803, 9.90656, 28.98977, 12.34548, 31.45182, 17.22235, 33.33014, 22.09921, 35.20847, 28.49164, 36.14781, 34.8833, 36.14781, 41.2765, 36.14781, 47.66816, 35.20847, 52.54599, 33.33014, 57.42382, 31.45182, 59.86177, 28.98977, 59.86177, 26.52803, 59.86177, 21.23659, 9.90656, 21.23659, 9.90656, 21.23659],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(89,117,194)",
        "shadowColor": "#1ABC9C",
        "points": [5.8752, 11.80832, 63.53922, 11.80832, 63.53922, 11.80832, 63.53922, 11.80832, 63.53922, 21.23659, 63.53922, 21.23659, 63.53922, 21.23659, 5.8752, 21.23659, 5.8752, 21.23659, 5.8752, 21.23659, 5.8752, 11.80832, 5.8752, 11.80832, 5.8752, 11.80832, 5.8752, 11.80832],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(89,117,194)",
        "shadowColor": "#1ABC9C",
        "points": [34.84838, 1.33211, 31.08229, 1.33211, 13.64909, 1.09051, 13.64909, 1.33211, 13.64909, 11.80832, 55.77183, 11.80832, 55.77183, 1.33211],
        "segments": [1, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(89,117,194)",
        "shadowColor": "#1ABC9C",
        "points": [30.98987, 35.90816, 38.43009, 35.90816, 38.43009, 35.90816, 38.43009, 35.90816, 38.43009, 49.52723, 38.43009, 49.52723, 38.43009, 49.52723, 30.98987, 49.52723, 30.98987, 49.52723, 30.98987, 49.52723, 30.98987, 35.90816, 30.98987, 35.90816, 30.98987, 35.90816, 30.98987, 35.90816],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }]
});
s('cable.vga', {
    "width": 50,
    "height": 28,
    "comps": [{
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [4.22204, 10.25974, 4.22204, 12.91385, 4.22204, 14.14862, 4.6932, 15.38355, 5.63534, 16.32569, 6.57748, 17.26783, 7.8124, 17.73899, 9.04718, 17.73899, 10.28225, 17.73899, 11.51703, 17.26783, 12.45935, 16.32569, 13.40168, 15.38355, 13.87266, 14.14862, 13.87266, 12.91385, 13.87266, 10.25974, 4.22204, 10.25974, 4.22204, 10.25974],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [-1.38671, 12.91431, 9.83116, 12.91431, 9.83116, 12.91431, 9.83116, 12.91431, 9.83116, 15.08569, 9.83116, 15.08569, 9.83116, 15.08569, -1.38671, 15.08569, -1.38671, 15.08569, -1.38671, 15.08569, -1.38671, 12.91431, -1.38671, 12.91431, -1.38671, 12.91431, -1.38671, 12.91431],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [2.09856, 16.02089, 1.95224, 15.87948, 1.76018, 15.80889, 1.56815, 15.80889, 1.37644, 15.80889, 1.18442, 15.87952, 1.0379, 16.02089, 0.89139, 16.1623, 0.81825, 16.34748, 0.81825, 16.53267, 0.81825, 18.94539, 2.31825, 18.94539, 2.31825, 16.53267, 2.31821, 16.34748, 2.24472, 16.1623, 2.09856, 16.02089, 2.09856, 16.02089],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [2.09854, 9.26553, 1.95201, 9.12413, 1.76027, 9.05353, 1.56823, 9.05353, 1.3765, 9.05353, 1.18445, 9.12416, 1.03793, 9.26553, 0.8914, 9.40694, 0.81825, 9.59213, 0.81825, 9.77731, 0.81825, 12.19003, 2.31806, 12.19003, 2.31806, 9.77731, 2.31825, 9.59213, 2.24491, 9.40694, 2.09854, 9.26553, 2.09854, 9.26553],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [22.75463, 3.22661, 24.25463, 3.22661, 24.25463, 3.22661, 24.25463, 3.22661, 24.25463, 24.77232, 24.25463, 24.77232, 24.25463, 24.77232, 22.75463, 24.77232, 22.75463, 24.77232, 22.75463, 24.77232, 22.75463, 3.22661, 22.75463, 3.22661, 22.75463, 3.22661, 22.75463, 3.22661],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [36.12734, 10.26101, 36.12734, 12.91511, 36.12734, 14.14989, 36.59851, 15.38481, 37.54065, 16.32695, 38.48279, 17.26909, 39.71771, 17.74026, 40.95249, 17.74026, 42.18756, 17.74026, 43.42233, 17.26909, 44.36466, 16.32695, 45.30699, 15.38481, 45.77796, 14.14989, 45.77796, 12.91511, 45.77796, 10.26101, 36.12734, 10.26101, 36.12734, 10.26101],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [40.16884, 12.91431, 51.38671, 12.91431, 51.38671, 12.91431, 51.38671, 12.91431, 51.38671, 15.08569, 51.38671, 15.08569, 51.38671, 15.08569, 40.16884, 15.08569, 40.16884, 15.08569, 40.16884, 15.08569, 40.16884, 12.91431, 40.16884, 12.91431, 40.16884, 12.91431, 40.16884, 12.91431],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [48.96206, 9.26661, 48.81574, 9.1252, 48.62368, 9.05461, 48.43165, 9.05461, 48.23994, 9.05461, 48.04792, 9.12524, 47.9014, 9.26661, 47.75489, 9.40802, 47.68175, 9.59321, 47.68175, 9.77839, 47.68175, 12.19111, 49.18175, 12.19111, 49.18175, 9.77839, 49.18171, 9.59321, 49.10822, 9.40802, 48.96206, 9.26661, 48.96206, 9.26661],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [48.96204, 16.02197, 48.81551, 15.88056, 48.62377, 15.80997, 48.43173, 15.80997, 48.24, 15.80997, 48.04795, 15.8806, 47.90143, 16.02197, 47.7549, 16.16338, 47.68175, 16.34856, 47.68175, 16.53375, 47.68175, 18.94647, 49.18156, 18.94647, 49.18156, 16.53375, 49.18175, 16.34856, 49.10841, 16.16338, 48.96204, 16.02197, 48.96204, 16.02197],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [34.94996, 12.43227, 36.44996, 12.43227, 36.44996, 12.43227, 36.44996, 12.43227, 36.44996, 15.56881, 36.44996, 15.56881, 36.44996, 15.56881, 34.94996, 15.56881, 34.94996, 15.56881, 34.94996, 15.56881, 34.94996, 12.43227, 34.94996, 12.43227, 34.94996, 12.43227, 34.94996, 12.43227],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "text",
        "text": "VGA",
        "align": "center",
        "font": "10px arial, sans-serif",
        "rect": [0, 3.36497, 50, 10.63566]
    }]
});
s('cable1', {
    "width": 50,
    "height": 28,
    "comps": [{
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [4.22204, 10.25974, 4.22204, 12.91385, 4.22204, 14.14862, 4.6932, 15.38355, 5.63534, 16.32569, 6.57748, 17.26783, 7.8124, 17.73899, 9.04718, 17.73899, 10.28225, 17.73899, 11.51703, 17.26783, 12.45935, 16.32569, 13.40168, 15.38355, 13.87266, 14.14862, 13.87266, 12.91385, 13.87266, 10.25974, 4.22204, 10.25974, 4.22204, 10.25974],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [-1.38671, 12.91431, 9.83116, 12.91431, 9.83116, 12.91431, 9.83116, 12.91431, 9.83116, 15.08569, 9.83116, 15.08569, 9.83116, 15.08569, -1.38671, 15.08569, -1.38671, 15.08569, -1.38671, 15.08569, -1.38671, 12.91431, -1.38671, 12.91431, -1.38671, 12.91431, -1.38671, 12.91431],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [2.09856, 16.02089, 1.95224, 15.87948, 1.76018, 15.80889, 1.56815, 15.80889, 1.37644, 15.80889, 1.18442, 15.87952, 1.0379, 16.02089, 0.89139, 16.1623, 0.81825, 16.34748, 0.81825, 16.53267, 0.81825, 18.94539, 2.31825, 18.94539, 2.31825, 16.53267, 2.31821, 16.34748, 2.24472, 16.1623, 2.09856, 16.02089, 2.09856, 16.02089],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [2.09854, 9.26553, 1.95201, 9.12413, 1.76027, 9.05353, 1.56823, 9.05353, 1.3765, 9.05353, 1.18445, 9.12416, 1.03793, 9.26553, 0.8914, 9.40694, 0.81825, 9.59213, 0.81825, 9.77731, 0.81825, 12.19003, 2.31806, 12.19003, 2.31806, 9.77731, 2.31825, 9.59213, 2.24491, 9.40694, 2.09854, 9.26553, 2.09854, 9.26553],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [22.75463, 3.22661, 24.25463, 3.22661, 24.25463, 3.22661, 24.25463, 3.22661, 24.25463, 24.77232, 24.25463, 24.77232, 24.25463, 24.77232, 22.75463, 24.77232, 22.75463, 24.77232, 22.75463, 24.77232, 22.75463, 3.22661, 22.75463, 3.22661, 22.75463, 3.22661, 22.75463, 3.22661],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [36.12734, 10.26101, 36.12734, 12.91511, 36.12734, 14.14989, 36.59851, 15.38481, 37.54065, 16.32695, 38.48279, 17.26909, 39.71771, 17.74026, 40.95249, 17.74026, 42.18756, 17.74026, 43.42233, 17.26909, 44.36466, 16.32695, 45.30699, 15.38481, 45.77796, 14.14989, 45.77796, 12.91511, 45.77796, 10.26101, 36.12734, 10.26101, 36.12734, 10.26101],
        "segments": [1, 2, 4, 4, 4, 4, 2, 2, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [40.16884, 12.91431, 51.38671, 12.91431, 51.38671, 12.91431, 51.38671, 12.91431, 51.38671, 15.08569, 51.38671, 15.08569, 51.38671, 15.08569, 40.16884, 15.08569, 40.16884, 15.08569, 40.16884, 15.08569, 40.16884, 12.91431, 40.16884, 12.91431, 40.16884, 12.91431, 40.16884, 12.91431],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [48.96206, 9.26661, 48.81574, 9.1252, 48.62368, 9.05461, 48.43165, 9.05461, 48.23994, 9.05461, 48.04792, 9.12524, 47.9014, 9.26661, 47.75489, 9.40802, 47.68175, 9.59321, 47.68175, 9.77839, 47.68175, 12.19111, 49.18175, 12.19111, 49.18175, 9.77839, 49.18171, 9.59321, 49.10822, 9.40802, 48.96206, 9.26661, 48.96206, 9.26661],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [48.96204, 16.02197, 48.81551, 15.88056, 48.62377, 15.80997, 48.43173, 15.80997, 48.24, 15.80997, 48.04795, 15.8806, 47.90143, 16.02197, 47.7549, 16.16338, 47.68175, 16.34856, 47.68175, 16.53375, 47.68175, 18.94647, 49.18156, 18.94647, 49.18156, 16.53375, 49.18175, 16.34856, 49.10841, 16.16338, 48.96204, 16.02197, 48.96204, 16.02197],
        "segments": [1, 4, 4, 4, 2, 2, 2, 4, 2]
    }, {
        "type": "shape",
        "background": "rgb(23,23,23)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [34.94996, 12.43227, 36.44996, 12.43227, 36.44996, 12.43227, 36.44996, 12.43227, 36.44996, 15.56881, 36.44996, 15.56881, 36.44996, 15.56881, 34.94996, 15.56881, 34.94996, 15.56881, 34.94996, 15.56881, 34.94996, 12.43227, 34.94996, 12.43227, 34.94996, 12.43227, 34.94996, 12.43227],
        "segments": [1, 2, 3, 2, 3, 2, 3, 2, 3, 2]
    }, {
        "type": "text",
        "text": "Cable",
        "align": "center",
        "font": "10px arial, sans-serif",
        "rect": [0, 3.36497, 50, 10.63566]
    }]
});
s('fitContent', {
    "background": "rgb(179,179,179)",
    "gridLightColor": "rgba(0,0,0,0.20)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [8.00001, 11.91764, 8.00001, 15]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "rect": [9.75, 7.24608, 2, 1.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "rotation": -1.5708,
        "points": [13.516, 6.484, 13.516, 9.51599]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "points": [8.00001, 0.99999, 8.00001, 4.08236]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "points": [2.516, 6.4801, 2.516, 9.51209]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 1.5708,
        "rect": [4.25, 7.24608, 2, 1.5]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 3.14159,
        "rect": [7.00001, 4.5, 2, 1.5]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 6.28319,
        "rect": [7, 10, 2, 1.5]
    }]
});

s('importExport', {
    "gridLightColor": "rgba(0,0,0,0.20)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [5.01634, 3.73624, 5.01633, 12.73624]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "points": [11.02691, 3.73624, 11.02693, 12.73624]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 3.14159,
        "rect": [10.02692, 13.23625, 2, 1.5]
    }, {
        "type": "triangle",
        "background": "rgb(138,138,138)",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "rotation": 6.28319,
        "rect": [4.01633, 1.58237, 2, 1.5]
    }]
});
s('toolbar.save', {
    "background": "rgb(179,179,179)",
    "width": 16,
    "height": 16,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(138,138,138)",
        "shadowColor": "#1ABC9C",
        "points": [3.66183, 14.5, 14.5, 14.5, 14.5, 4.83454, 10.71984, 1.5, 3.66183, 1.5, 3.66183, 6.18654, 10.71984, 6.18654, 10.71984, 1.5, 1.5, 1.5, 1.5, 14.5, 3.66183, 14.5, 3.66183, 9.03168, 12.17213, 9.03168, 12.17213, 14.5]
    }]
});
s('toolbar.ok', {
    "width": 40,
    "height": 40,
    "comps": [{
        "type": "shape",
        "points": [30.49479, 17.83854, 19.50521, 28.82813, 19.01042, 29.32292, 18.33333, 29.32292, 17.65625, 29.32292, 17.16146, 28.82813, 9.50521, 21.17188, 9.01042, 20.67708, 9.01042, 20, 9.01042, 19.32292, 9.50521, 18.82813, 12.16146, 16.17188, 12.65625, 15.67708, 13.33333, 15.67708, 14.01042, 15.67708, 14.50521, 16.17188, 18.33333, 20, 25.49479, 12.83854, 25.98958, 12.34375, 26.66667, 12.34375, 27.34375, 12.34375, 27.83854, 12.83854, 30.49479, 15.49479, 30.98958, 15.98958, 30.98958, 16.66667, 30.98958, 17.34375, 30.49479, 17.83854, 34.16667, 20, 34.16667, 16.14583, 32.26563, 12.89063, 30.36458, 9.63542, 27.10938, 7.73438, 23.85417, 5.83333, 20, 5.83333, 16.14583, 5.83333, 12.89063, 7.73438, 9.63542, 9.63542, 7.73438, 12.89063, 5.83333, 16.14583, 5.83333, 20, 5.83333, 23.85417, 7.73438, 27.10938, 9.63542, 30.36458, 12.89063, 32.26563, 16.14583, 34.16667, 20, 34.16667, 23.85417, 34.16667, 27.10938, 32.26563, 30.36458, 30.36458, 32.26563, 27.10938, 34.16667, 23.85417, 34.16667, 20, 40, 20, 40, 25.44271, 37.31771, 30.03906, 34.63542, 34.63542, 30.03906, 37.31771, 25.44271, 40, 20, 40, 14.55729, 40, 9.96094, 37.31771, 5.36458, 34.63542, 2.68229, 30.03906, 0, 25.44271, 0, 20, 0, 14.55729, 2.68229, 9.96094, 5.36458, 5.36458, 9.96094, 2.68229, 14.55729, 0, 20, 0, 25.44271, 0, 30.03906, 2.68229, 34.63542, 5.36458, 37.31771, 9.96094, 40, 14.55729, 40, 20],
        "segments": [1, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 3, 3, 2, 3, 3, 5, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5],
        "background": "rgb(179,179,179)",
        "rawPoints": [30.49479, 17.83854, 19.50521, 28.82813, 19.01042, 29.32292, 18.33333, 29.32292, 17.65625, 29.32292, 17.16146, 28.82813, 9.50521, 21.17188, 9.01042, 20.67708, 9.01042, 20, 9.01042, 19.32292, 9.50521, 18.82813, 12.16146, 16.17188, 12.65625, 15.67708, 13.33333, 15.67708, 14.01042, 15.67708, 14.50521, 16.17188, 18.33333, 20, 25.49479, 12.83854, 25.98958, 12.34375, 26.66667, 12.34375, 27.34375, 12.34375, 27.83854, 12.83854, 30.49479, 15.49479, 30.98958, 15.98958, 30.98958, 16.66667, 30.98958, 17.34375, 30.49479, 17.83854, 34.16667, 20, 34.16667, 16.14583, 32.26563, 12.89063, 30.36458, 9.63542, 27.10938, 7.73438, 23.85417, 5.83333, 20, 5.83333, 16.14583, 5.83333, 12.89063, 7.73438, 9.63542, 9.63542, 7.73438, 12.89063, 5.83333, 16.14583, 5.83333, 20, 5.83333, 23.85417, 7.73438, 27.10938, 9.63542, 30.36458, 12.89063, 32.26563, 16.14583, 34.16667, 20, 34.16667, 23.85417, 34.16667, 27.10938, 32.26563, 30.36458, 30.36458, 32.26563, 27.10938, 34.16667, 23.85417, 34.16667, 20, 40, 20, 40, 25.44271, 37.31771, 30.03906, 34.63542, 34.63542, 30.03906, 37.31771, 25.44271, 40, 20, 40, 14.55729, 40, 9.96094, 37.31771, 5.36458, 34.63542, 2.68229, 30.03906, 0, 25.44271, 0, 20, 0, 14.55729, 2.68229, 9.96094, 5.36458, 5.36458, 9.96094, 2.68229, 14.55729, 0, 20, 0, 25.44271, 0, 30.03906, 2.68229, 34.63542, 5.36458, 37.31771, 9.96094, 40, 14.55729, 40, 20],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 40,
            "height": 40
        }
    }]
});
s('toolbar.fitContent', {
    "width": 40,
    "height": 40,
    "comps": [{
        "type": "shape",
        "points": [33.41146, 10.75521, 24.16667, 20, 33.41146, 29.24479, 37.16146, 25.49479, 37.91667, 24.6875, 38.98438, 25.13021, 40, 25.57292, 40, 26.66667, 40, 38.33333, 40, 39.01042, 39.50521, 39.50521, 39.01042, 40, 38.33333, 40, 26.66667, 40, 25.57292, 40, 25.13021, 38.95833, 24.6875, 37.94271, 25.49479, 37.16146, 29.24479, 33.41146, 20, 24.16667, 10.75521, 33.41146, 14.50521, 37.16146, 15.3125, 37.94271, 14.86979, 38.95833, 14.42708, 40, 13.33333, 40, 1.66667, 40, 0.98958, 40, 0.49479, 39.50521, 0, 39.01042, 0, 38.33333, 0, 26.66667, 0, 25.57292, 1.04167, 25.13021, 2.05729, 24.6875, 2.83854, 25.49479, 6.58854, 29.24479, 15.83333, 20, 6.58854, 10.75521, 2.83854, 14.50521, 2.34375, 15, 1.66667, 15, 1.35417, 15, 1.04167, 14.86979, 0, 14.42708, 0, 13.33333, 0, 1.66667, 0, 0.98958, 0.49479, 0.49479, 0.98958, 0, 1.66667, 0, 13.33333, 0, 14.42708, 0, 14.86979, 1.04167, 15.3125, 2.05729, 14.50521, 2.83854, 10.75521, 6.58854, 20, 15.83333, 29.24479, 6.58854, 25.49479, 2.83854, 24.6875, 2.05729, 25.13021, 1.04167, 25.57292, 0, 26.66667, 0, 38.33333, 0, 39.01042, 0, 39.50521, 0.49479, 40, 0.98958, 40, 1.66667, 40, 13.33333, 40, 14.42708, 38.98438, 14.86979, 38.64583, 15, 38.33333, 15, 37.65625, 15, 37.16146, 14.50521],
        "segments": [1, 2, 2, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 2, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 2, 2, 3, 3, 2, 3, 3, 2, 3, 3, 3],
        "background": "#2A2A2A",
        "rawPoints": [33.41146, 10.75521, 24.16667, 20, 33.41146, 29.24479, 37.16146, 25.49479, 37.91667, 24.6875, 38.98438, 25.13021, 40, 25.57292, 40, 26.66667, 40, 38.33333, 40, 39.01042, 39.50521, 39.50521, 39.01042, 40, 38.33333, 40, 26.66667, 40, 25.57292, 40, 25.13021, 38.95833, 24.6875, 37.94271, 25.49479, 37.16146, 29.24479, 33.41146, 20, 24.16667, 10.75521, 33.41146, 14.50521, 37.16146, 15.3125, 37.94271, 14.86979, 38.95833, 14.42708, 40, 13.33333, 40, 1.66667, 40, 0.98958, 40, 0.49479, 39.50521, 0, 39.01042, 0, 38.33333, 0, 26.66667, 0, 25.57292, 1.04167, 25.13021, 2.05729, 24.6875, 2.83854, 25.49479, 6.58854, 29.24479, 15.83333, 20, 6.58854, 10.75521, 2.83854, 14.50521, 2.34375, 15, 1.66667, 15, 1.35417, 15, 1.04167, 14.86979, 0, 14.42708, 0, 13.33333, 0, 1.66667, 0, 0.98958, 0.49479, 0.49479, 0.98958, 0, 1.66667, 0, 13.33333, 0, 14.42708, 0, 14.86979, 1.04167, 15.3125, 2.05729, 14.50521, 2.83854, 10.75521, 6.58854, 20, 15.83333, 29.24479, 6.58854, 25.49479, 2.83854, 24.6875, 2.05729, 25.13021, 1.04167, 25.57292, 0, 26.66667, 0, 38.33333, 0, 39.01042, 0, 39.50521, 0.49479, 40, 0.98958, 40, 1.66667, 40, 13.33333, 40, 14.42708, 38.98438, 14.86979, 38.64583, 15, 38.33333, 15, 37.65625, 15, 37.16146, 14.50521],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 40,
            "height": 40
        }
    }],
    "uuid": "4233D856-0AC0-429B-87FF-FA4EF2DC4AAC"
});
s('toolbar.new', {
    "width": 34.28571,
    "height": 40,
    "comps": [{
        "type": "shape",
        "points": [32.76786, 8.48214, 33.39286, 9.10714, 33.83929, 10.17857, 34.28571, 11.25, 34.28571, 12.14286, 34.28571, 37.85714, 34.28571, 38.75, 33.66071, 39.375, 33.03571, 40, 32.14286, 40, 2.14286, 40, 1.25, 40, 0.625, 39.375, 0, 38.75, 0, 37.85714, 0, 2.14286, 0, 1.25, 0.625, 0.625, 1.25, 0, 2.14286, 0, 22.14286, 0, 23.03571, 0, 24.10714, 0.44643, 25.17857, 0.89286, 25.80357, 1.51786, 22.85714, 3.03571, 22.85714, 11.42857, 31.25, 11.42857, 31.02679, 10.78125, 30.75893, 10.51339, 23.77232, 3.52679, 23.50446, 3.25893, 22.85714, 3.03571, 31.42857, 37.14286, 31.42857, 14.28571, 22.14286, 14.28571, 21.25, 14.28571, 20.625, 13.66071, 20, 13.03571, 20, 12.14286, 20, 2.85714, 2.85714, 2.85714, 2.85714, 37.14286, 31.42857, 37.14286],
        "segments": {
            "_as": [1, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 5, 1, 2, 2, 3, 2, 3, 5, 1, 2, 2, 3, 3, 2, 2, 2, 2]
        },
        "background": "rgb(179,179,179)",
        "rawPoints": [32.76786, 8.48214, 33.39286, 9.10714, 33.83929, 10.17857, 34.28571, 11.25, 34.28571, 12.14286, 34.28571, 37.85714, 34.28571, 38.75, 33.66071, 39.375, 33.03571, 40, 32.14286, 40, 2.14286, 40, 1.25, 40, 0.625, 39.375, 0, 38.75, 0, 37.85714, 0, 2.14286, 0, 1.25, 0.625, 0.625, 1.25, 0, 2.14286, 0, 22.14286, 0, 23.03571, 0, 24.10714, 0.44643, 25.17857, 0.89286, 25.80357, 1.51786, 22.85714, 3.03571, 22.85714, 11.42857, 31.25, 11.42857, 31.02679, 10.78125, 30.75893, 10.51339, 23.77232, 3.52679, 23.50446, 3.25893, 22.85714, 3.03571, 31.42857, 37.14286, 31.42857, 14.28571, 22.14286, 14.28571, 21.25, 14.28571, 20.625, 13.66071, 20, 13.03571, 20, 12.14286, 20, 2.85714, 2.85714, 2.85714, 2.85714, 37.14286, 31.42857, 37.14286],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 34.28571,
            "height": 40
        }
    }]
});
s('toolbar.edit', {
    "background": "rgb(128,128,128)",
    "width": 16,
    "height": 16,
    "comps": [{
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [4.97735, 14.52911, 2.45927, 14.52911, 2.45927, 1.52086, 13.49363, 1.52086, 13.49363, 3.97983, 13.49363, 13, 13.49363, 14.52911, 12.13999, 14.52911],
        "segments": [1, 2, 2, 2, 2, 1, 2, 2]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 4.5, 9.50451, 4.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [6.44839, 7.5, 9.50451, 7.5]
    }, {
        "type": "shape",
        "borderWidth": 1,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "closePath": true,
        "points": [13, 6, 15, 8, 9, 14.0442, 7, 14, 7, 12, 13, 6, 11.56, 7.56, 13.52, 9.48],
        "segments": [1, 2, 2, 2, 2, 2, 1, 2]
    }]
});
s('toolbar.import.csv', {

    "width": 50,
    "height": 50,
    "blendMode": "override",
    "comps": [{
        "type": "shape",
        "borderWidth": 3,
        "borderColor": "#000000",
        "borderCap": "round",
        "points": [2, 12, 2, 45, 48, 45, 48, 12]
    }, {
        "type": "shape",
        "borderWidth": 3,
        "borderColor": "#000000",
        "borderCap": "round",
        "points": [25, 24, 25, 38.49716, 13, 32.49716, 25, 38.49716, 37, 32.49716]
    }, {
        "type": "text",
        "text": "CSV",
        "align": "center",
        "vAlign": "bottom",
        "color": "rgb(0,0,0)",
        "font": "16px arial, sans-serif",
        "rect": [0, 4, 50, 20]
    }]
});
s('toolbar.search', {
    "width": 20,
    "height": 20,
    "blendMode": "override",
    "comps": [{
        "type": "oval",
        "borderWidth": 2,
        "borderColor": "#45c4f9",
        "rect": [1.67487, 1.48648, 12.86422, 12.47105]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "#45c4f9",
        "borderCap": "round",
        "points": [12.64901, 12.21284, 18.31926, 17.88309]
    }]
});
s('switch.toggle.button', {
    "dataBindings": [],
    "width": 40,
    "height": 40,
    "comps": [{
        "type": "oval",
        "background": {
            "func": function func(data, view) {
                if (!data.a('target') || !data.a('target').a('portInfo')) {
                    return 'gray';
                } else {
                    var info = data.a('target').a('portInfo');
                    return info.ifadminstatus !== 1 ? '#7ED321' : '#D0011B';
                }
            }
        },
        "borderWidth": 1,
        "borderColor": "rgb(181,181,181)",
        "gradient": "radial.northwest",
        "rect": [1, 1, 38, 38]
    }, {
        "type": "shape",
        "background": "rgb(232,232,232)",
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "closePath": true,
        "visible": {
            "func": function func(data, view) {
                return !!data.a('target');
            },
            "value": true
        },
        "rotation": {
            "func": function func(data, view) {
                if (!data.a('target') || !data.a('target').a('portInfo')) {
                    return 0;
                } else {
                    var info = data.a('target').a('portInfo');
                    return info.ifadminstatus !== 1 ? Math.PI : 0;
                }
            }
        },
        "points": [23, 22, 22.6, 6.5, 17.4, 6.5, 17.4, 22, 12, 22, 20, 36, 28, 22]
    }]
});
s('nms.button', {
    "width": 40,
    "height": 40,
    "comps": [{
        "type": "oval",
        "background": "#FFFFFF",
        "borderWidth": 2,
        "borderColor": "#7c99bc",
        "rect": [1.167, 1, 37.833, 38]
    }, {
        "type": "roundRect",
        "background": "#7c99bc",
        "borderColor": "#979797",
        "rect": [8, 7.5, 24, 10.5]
    }, {
        "type": "oval",
        "background": "#7c99bc",
        "borderColor": "#979797",
        "borderWidthAbsolute": true,
        "rect": [5.09176, 24, 4.90824, 5]
    }, {
        "type": "oval",
        "background": "#7c99bc",
        "borderColor": "#979797",
        "borderWidthAbsolute": true,
        "rect": [30.09176, 24, 4.90824, 5]
    }, {
        "type": "oval",
        "background": "#7c99bc",
        "borderColor": "#979797",
        "borderWidthAbsolute": true,
        "rect": [17.54517, 24.5, 4.90824, 5]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "#7c99bc",
        "points": [8.57689, 24.96829, 8.57689, 24.96829, 9.29918, 22.59093, 10, 22, 10.70082, 21.40907, 28.96905, 21.40907, 30, 22, 31.03095, 22.59093, 31.92511, 25.15889, 31.92511, 25.15889],
        "segments": [1, 4, 4, 4]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "#7c99bc",
        "points": [19.99929, 17.92036, 19.99929, 26.02818]
    }]
});
s('toolbar.add.circle', {
    "gridThickLinesEvery": 7,
    "width": 25,
    "height": 25,
    "comps": [{
        "type": "oval",
        "borderWidth": 2,
        "borderColor": "rgb(237,237,237)",
        "rect": [1, 1, 23, 23]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(237,237,237)",
        "borderCap": "round",
        "points": [6.30769, 12.5, 12.5, 12.5, 12.5, 18.69231, 12.5, 12.5, 18.69231, 12.5, 12.5, 12.5, 12.5, 6.30769]
    }]
});
s('toolbar.delete.circle', {
    "width": 25,
    "height": 25,
    "comps": [{
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [10.33709, 10.25568, 10.33709, 16.79752]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [12.55402, 10.25568, 12.55402, 16.79752]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [14.66291, 10.25568, 14.66291, 16.79752]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "borderCap": "round",
        "shadowColor": "#1ABC9C",
        "points": [5.84924, 7.92905, 19.15076, 7.91094, 9.95991, 7.90167, 10.91001, 6.00146, 13.76034, 6.00146, 14.71045, 7.90167]
    }, {
        "type": "rect",
        "borderWidth": 2,
        "borderColor": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rect": [8.06616, 7.92905, 8.86768, 11.0695]
    }, {
        "type": "oval",
        "borderWidth": 2,
        "borderColor": "rgb(237,237,237)",
        "rect": [1, 1, 23, 23]
    }]
});
s('preview.next', {
    "gridThickLinesEvery": 7,
    "width": 25,
    "height": 25,
    "comps": [{
        "type": "oval",
        "background": "#FFFFFF",
        "borderWidth": 2,
        "borderColor": "#4A4A4A",
        "rect": [1, 1, 23, 23]
    }, {
        "type": "shape",
        "borderWidth": 2,
        "borderColor": "#4A4A4A",
        "borderCap": "round",
        "points": [6.30769, 12.5, 18.69231, 12.5, 14, 17, 18.69231, 12.5, 14, 8]
    }]
});
s('subMapWidget', {
    "width": 100,
    "height": 100,
    "comps": [{
        "type": "shape",
        "background": "#1093c6",
        "shadowColor": "#1ABC9C",
        "points": [16.51396, 28.1234, 16.50756, 27.9244, 16.48709, 27.73755, 16.48709, 27.53343, 16.48709, 18.33706, 22.98444, 7.13147, 30.99702, 2.50449, 34.81263, 0.30266, 38.27439, 0, 40.86206, 1.26824, 47.48931, 5.16768, 48.25269, 4.52268, 49.04486, 3.9519, 49.86263, 3.47903, 53.15545, 1.57795, 55.32913, 1.14539, 57.76707, 2.66574, 60.85514, 4.94692, 61.59804, 4.32623, 62.3659, 3.77146, 63.15871, 3.31394, 66.03689, 1.65281, 68.86325, 1.58754, 70.76817, 2.62991, 83.25225, 10.25793, 81.35948, 9.29043, 78.80699, 9.49135, 75.99088, 11.11729, 74.82694, 11.78916, 73.7097, 12.65876, 72.66094, 13.66337, 72.51633, 13.27049, 72.33972, 12.91407, 72.14648, 12.57814, 72.1196, 12.53015, 72.09593, 12.48087, 72.06777, 12.43416, 71.87581, 12.12126, 71.66209, 11.83779, 71.43237, 11.57928, 71.39206, 11.53385, 71.34982, 11.4897, 71.30887, 11.44555, 71.07084, 11.19535, 70.81424, 10.9714, 70.53846, 10.77815, 70.50006, 10.75128, 70.46103, 10.72888, 70.42072, 10.70265, 68.49532, 9.43184, 65.75087, 9.51759, 62.69544, 11.28238, 61.68059, 11.86787, 60.70861, 12.61525, 59.78078, 13.45989, 59.67456, 13.55651, 59.56962, 13.65378, 59.46276, 13.75296, 58.96493, 14.22839, 58.47478, 14.72366, 58.00959, 15.25732, 57.92577, 14.85803, 57.82402, 14.4773, 57.70949, 14.11065, 57.66405, 13.96348, 57.6071, 13.82782, 57.55527, 13.68449, 57.48041, 13.47717, 57.40874, 13.26665, 57.32492, 13.07084, 57.24941, 12.89296, 57.16239, 12.72979, 57.07856, 12.56214, 57.00818, 12.42009, 56.93843, 12.27355, 56.861, 12.1379, 56.75606, 11.95169, 56.64216, 11.77893, 56.52763, 11.60552, 56.46172, 11.50698, 56.39645, 11.40651, 56.32798, 11.31181, 56.19361, 11.12689, 56.04963, 10.95284, 55.90246, 10.78327, 55.84551, 10.71864, 55.78856, 10.65274, 55.73097, 10.59067, 55.56333, 10.41278, 55.38928, 10.24449, 55.20883, 10.08644, 55.16596, 10.04869, 55.12309, 10.01157, 55.07894, 9.97446, 54.87801, 9.80745, 54.67069, 9.65196, 54.45441, 9.50991, 54.4301, 9.49263, 54.4045, 9.47791, 54.37763, 9.46128, 51.73364, 7.76623, 47.99226, 7.90381, 43.83111, 10.30784, 35.8166, 14.93418, 29.31926, 26.14041, 29.31926, 35.33614, 29.31926, 35.5409, 29.33973, 35.72774, 29.34613, 35.92611, 24.34738, 40.33488, 20.65911, 47.67752, 20.65911, 53.89204, 20.65911, 57.4165, 21.85249, 59.92355, 23.79069, 61.19884, 21.61765, 59.87108, 12.91847, 54.59463, 11.33605, 53.63545, 11.24902, 53.58746, 11.1684, 53.53371, 11.08457, 53.48251, 11.08137, 53.4806, 9.07023, 52.23347, 7.82694, 49.68994, 7.82694, 46.08933, 7.8263, 39.87353, 11.51393, 32.53154, 16.51396, 28.1234],
        "segments": [1, 4, 4, 4, 2, 4, 4, 2, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4]
    }, {
        "type": "shape",
        "background": "#48bfdd",
        "shadowColor": "#1ABC9C",
        "points": [29.34549, 35.92611, 29.33973, 35.72582, 29.31862, 35.54026, 29.31862, 35.33486, 29.31862, 26.13849, 35.81469, 14.93354, 43.82919, 10.30656, 50.79237, 6.28683, 56.60249, 8.56224, 58.00959, 15.2554, 59.42245, 13.63458, 61.00935, 12.25436, 62.6948, 11.2811, 67.30962, 8.61663, 71.22185, 9.75946, 72.6603, 13.66209, 73.70906, 12.65812, 74.8263, 11.78788, 75.99024, 11.11537, 78.80699, 9.49071, 81.35884, 9.28915, 83.25161, 10.25793, 83.85437, 10.62394, 83.86589, 10.6329, 83.87805, 10.64122, 83.88957, 10.64954, 85.54174, 11.83396, 86.55275, 14.05498, 86.55275, 17.13857, 86.55275, 23.83172, 81.82403, 31.98956, 75.99024, 35.35725, 32.32222, 60.56855, 32.32222, 60.56727, 29.19896, 62.36278, 26.37132, 62.57586, 24.27699, 61.4887, 24.25844, 61.47783, 24.2354, 61.47015, 24.21557, 61.45927, 24.13814, 61.41192, 23.99289, 61.32105, 23.78813, 61.19628, 21.85185, 59.92228, 20.65783, 57.41458, 20.65783, 53.89076, 20.65783, 47.67624, 24.3461, 40.33488, 29.34549, 35.92611],
        "segments": [1, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4]
    }, {
        "type": "shape",
        "background": "#5d7a2a",
        "shadowColor": "#1ABC9C",
        "points": [56.00868, 24.96751, 59.33286, 26.86283, 47.38181, 47.47787, 44.01668, 45.64973, 56.00868, 24.96751, 56.00868, 24.96751]
    }, {
        "type": "shape",
        "background": "#5d7a2a",
        "shadowColor": "#1ABC9C",
        "points": [53.53106, 43.92718, 53.53106, 53.29631, 50.16785, 51.46817, 50.16785, 45.87049, 53.53106, 43.92718, 53.53106, 43.92718]
    }, {
        "type": "shape",
        "background": "#97c848",
        "shadowColor": "#1ABC9C",
        "points": [47.38181, 47.47787, 59.37254, 26.79501, 71.36454, 33.63149, 65.21337, 37.18283, 65.21337, 46.55133, 53.53106, 53.29631, 53.53106, 43.92718, 47.38181, 47.47787, 47.38181, 47.47787]
    }, {
        "type": "shape",
        "background": "#f0aa29",
        "shadowColor": "#1ABC9C",
        "points": [60.95304, 53.63673, 65.82061, 50.82573, 66.28837, 50.55634, 66.71389, 50.54034, 67.04855, 50.71503, 67.06198, 50.70607, 71.10539, 53.00516, 71.09963, 53.01604, 70.76689, 52.85543, 70.35289, 52.87527, 69.8941, 53.14018, 65.02716, 55.95117, 63.95216, 56.57058, 63.08256, 58.23363, 63.08256, 59.66632, 63.08256, 64.52878, 63.08256, 65.25888, 63.30908, 65.7823, 63.67317, 66.04401, 63.67189, 66.04593, 59.68096, 63.78652, 59.68224, 63.775, 59.27207, 63.53632, 59.00844, 62.99626, 59.00844, 62.21561, 59.00844, 57.35251, 59.00908, 55.92174, 59.87932, 54.25741, 60.95304, 53.63673],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#fdf48e",
        "shadowColor": "#1ABC9C",
        "points": [65.0278, 65.99794, 69.89474, 63.18759, 70.97101, 62.56818, 71.84061, 60.90513, 71.84061, 59.4718, 71.84061, 54.60998, 71.84061, 53.17729, 70.97101, 52.51885, 69.89474, 53.13954, 65.0278, 55.94926, 63.95344, 56.56994, 63.08192, 58.23299, 63.08192, 59.66568, 63.08192, 64.52814, 63.08192, 65.96083, 63.95408, 66.61991, 65.0278, 65.99794],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#bf4616",
        "shadowColor": "#1ABC9C",
        "points": [46.6677, 61.97821, 51.53464, 59.16722, 52.00303, 58.89783, 52.42727, 58.88183, 52.76257, 59.05652, 52.77536, 59.04756, 56.81941, 61.34665, 56.81429, 61.35817, 56.48155, 61.19692, 56.06627, 61.21675, 55.60876, 61.48166, 50.74118, 64.29202, 49.66618, 64.91207, 48.79595, 66.57512, 48.79595, 68.00781, 48.79595, 72.87026, 48.79595, 73.59973, 49.0231, 74.12379, 49.3872, 74.3855, 49.38528, 74.38806, 45.39498, 72.128, 45.39626, 72.11712, 44.98546, 71.87845, 44.72119, 71.33775, 44.72119, 70.55773, 44.72119, 65.694, 44.72183, 64.26323, 45.5927, 62.59954, 46.6677, 61.97821],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#ed714a",
        "shadowColor": "#1ABC9C",
        "points": [50.74182, 74.34007, 55.6094, 71.52971, 56.68376, 70.90967, 57.55463, 69.24662, 57.55463, 67.81328, 57.55463, 62.95147, 57.55463, 61.51942, 56.68376, 60.8597, 55.6094, 61.48102, 50.74182, 64.29074, 49.66746, 64.91143, 48.79595, 66.57448, 48.79595, 68.00717, 48.79595, 72.86962, 48.79595, 74.30296, 49.66746, 74.96139, 50.74182, 74.34007],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#1a638a",
        "shadowColor": "#1ABC9C",
        "points": [32.38108, 70.32034, 37.24866, 67.50934, 37.71641, 67.24059, 38.14193, 67.22459, 38.47659, 67.39928, 38.49003, 67.38968, 42.53343, 69.68878, 42.52831, 69.70029, 42.19494, 69.53904, 41.78093, 69.55888, 41.32278, 69.82379, 36.45585, 72.63415, 35.38149, 73.25419, 34.51061, 74.9166, 34.51061, 76.35057, 34.51061, 81.21239, 34.51061, 81.94249, 34.73777, 82.46719, 35.10186, 82.72763, 35.10058, 82.73019, 31.10964, 80.47013, 31.11156, 80.45861, 30.7014, 80.22057, 30.43713, 79.68115, 30.43713, 78.89986, 30.43713, 74.03613, 30.43649, 72.60407, 31.30609, 70.94102, 32.38108, 70.32034],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#448ecd",
        "shadowColor": "#1ABC9C",
        "points": [36.45521, 82.68155, 41.32214, 79.8712, 42.39714, 79.25243, 43.26738, 77.5881, 43.26738, 76.15541, 43.26738, 71.2936, 43.26738, 69.8609, 42.39714, 69.20119, 41.32214, 69.82251, 36.45521, 72.63159, 35.38149, 73.25291, 34.50997, 74.91532, 34.50997, 76.34929, 34.50997, 81.21111, 34.50997, 82.6438, 35.38149, 83.30288, 36.45521, 82.68155],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#779340",
        "shadowColor": "#1ABC9C",
        "points": [62.68712, 69.79436, 67.55341, 66.984, 68.0218, 66.71333, 68.44668, 66.69861, 68.78134, 66.87202, 68.7935, 66.86306, 72.83819, 69.16215, 72.83243, 69.17303, 72.50097, 69.01178, 72.08569, 69.0329, 71.62689, 69.29717, 66.75996, 72.10752, 65.6856, 72.72821, 64.81472, 74.39062, 64.81472, 75.82395, 64.81472, 80.68577, 64.81472, 81.41587, 65.04252, 81.94057, 65.40597, 82.20228, 65.40341, 82.20356, 61.41504, 79.9435, 61.41631, 79.93199, 61.00487, 79.69395, 60.74124, 79.15453, 60.74124, 78.37388, 60.74124, 73.51078, 60.74188, 72.07809, 61.61212, 70.4144, 62.68712, 69.79436],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#83ae38",
        "shadowColor": "#1ABC9C",
        "points": [66.7606, 82.15621, 71.62753, 79.34522, 72.70317, 78.72645, 73.57341, 77.06212, 73.57341, 75.62943, 73.57341, 70.76761, 73.57341, 69.33556, 72.70317, 68.6752, 71.62753, 69.29653, 66.7606, 72.10561, 65.68752, 72.72757, 64.81536, 74.38998, 64.81536, 75.82331, 64.81536, 80.68513, 64.81536, 82.11782, 65.68816, 82.77626, 66.7606, 82.15621],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#ea893e",
        "shadowColor": "#1ABC9C",
        "points": [48.4005, 78.13584, 53.26743, 75.32485, 53.73519, 75.05418, 54.16007, 75.0401, 54.49472, 75.21351, 54.50624, 75.20519, 58.55093, 77.50428, 58.54581, 77.51452, 58.21435, 77.35455, 57.79907, 77.37438, 57.34027, 77.63801, 52.47462, 80.44901, 51.39898, 81.06905, 50.52874, 82.73211, 50.52874, 84.16544, 50.52874, 89.02725, 50.52874, 89.75736, 50.75654, 90.28206, 51.11935, 90.54377, 51.11807, 90.54633, 47.12778, 88.28563, 47.12906, 88.27411, 46.71889, 88.03544, 46.45462, 87.49602, 46.45462, 86.71472, 46.45462, 81.85227, 46.45526, 80.42022, 47.32614, 78.75717, 48.4005, 78.13584],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#f3b044",
        "shadowColor": "#1ABC9C",
        "points": [52.47526, 90.4977, 57.34091, 87.6867, 58.41591, 87.06794, 59.28615, 85.40361, 59.28615, 83.97219, 59.28615, 79.10846, 59.28615, 77.67769, 58.41591, 77.01733, 57.34091, 77.63865, 52.47526, 80.44709, 51.40154, 81.06842, 50.52938, 82.73147, 50.52938, 84.1648, 50.52938, 89.02661, 50.52938, 90.45995, 51.40154, 91.11774, 52.47526, 90.4977],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#c09a84",
        "shadowColor": "#1ABC9C",
        "points": [34.11388, 86.47733, 38.98082, 83.66697, 39.44921, 83.39694, 39.87409, 83.38158, 40.20939, 83.55563, 40.22154, 83.54667, 44.26623, 85.84576, 44.26111, 85.856, 43.92965, 85.69603, 43.51373, 85.71587, 43.05558, 85.98014, 38.18928, 88.7905, 37.11428, 89.41118, 36.24341, 91.07487, 36.24341, 92.50692, 36.24341, 97.36874, 36.24341, 98.09884, 36.4712, 98.62354, 36.83466, 98.88526, 36.8321, 98.88781, 32.84372, 96.62712, 32.845, 96.6156, 32.43356, 96.37692, 32.16992, 95.8375, 32.16992, 95.05685, 32.16992, 90.19439, 32.16928, 88.7617, 33.03952, 87.09865, 34.11388, 86.47733],
        "segments": [1, 2, 4, 2, 2, 2, 4, 2, 4, 2, 4, 2, 2, 2, 4, 2, 4]
    }, {
        "type": "shape",
        "background": "#eadbca",
        "shadowColor": "#1ABC9C",
        "points": [38.18864, 98.83918, 43.05494, 96.02819, 44.12994, 95.40942, 45.00017, 93.74509, 45.00017, 92.31368, 45.00017, 87.44995, 45.00017, 86.01853, 44.12994, 85.35946, 43.05494, 85.98078, 38.18864, 88.78858, 37.11492, 89.41054, 36.24277, 91.07423, 36.24277, 92.50628, 36.24277, 97.3681, 36.24277, 98.80143, 37.11492, 99.45923, 38.18864, 98.83918],
        "segments": [1, 2, 4, 2, 4, 2, 4, 2, 4]
    }]
});
s('ready.flag', {

    "width": 96,
    "height": 32,
    "comps": [{
        "type": "rect",
        "background": "rgba(245,164,34,0.7)",
        "borderColor": "#979797",
        "rect": [0, 0, 96, 32]
    }, {
        "type": "text",
        "text": "Ready",
        "align": "center",
        "color": "#FFFFFF",
        "font": "14px arial, sans-serif",
        "rect": [0, 0, 96, 32]
    }]
});

s('patch.panel.port', {
    "dataBindings": [],
    "width": 50,
    "height": 28,
    "comps": [{
        "type": "shape",
        "background": "#2e6ba5",
        "borderWidth": 1,
        "borderColor": "#2e6ba5",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "closePath": true,
        "points": [9.58748, 7.00444, 9.58748, 21.64577, 40.99998, 21.64577, 40.99998, 7.00444, 34.32722, 7.00444, 34.32722, 4.95384, 32.37055, 4.95384, 32.37055, 2.20383, 18.88608, 2.20383, 18.88608, 4.95384, 16.93501, 4.95384, 16.93501, 7.00444]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [35.13268, 2.05638, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [31.82802, 2.05638, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [28.52335, 2.10265, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [25.21868, 2.1185, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [21.914, 1.99425, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [18.60934, 1.99425, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [15.30467, 2.04053, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [12.00001, 2.05638, 1.44935, 4.8815]
    }, {
        "type": "rect",
        "background": "rgb(255,255,255)",
        "shadowColor": "#1ABC9C",
        "rotation": -3.14159,
        "rect": [38.00001, 2.10265, 1.44935, 4.8815]
    }]
});

s('toolbar.picture', {
    "dataBindings": [],
    "width": 40,
    "height": 32,
    "comps": [{
        "type": "shape",
        "points": [13.33333, 9.33333, 13.33333, 11, 12.16667, 12.16667, 11, 13.33333, 9.33333, 13.33333, 7.66667, 13.33333, 6.5, 12.16667, 5.33333, 11, 5.33333, 9.33333, 5.33333, 7.66667, 6.5, 6.5, 7.66667, 5.33333, 9.33333, 5.33333, 11, 5.33333, 12.16667, 6.5, 13.33333, 7.66667, 13.33333, 9.33333, 34.66667, 17.33333, 34.66667, 26.66667, 5.33333, 26.66667, 5.33333, 22.66667, 12, 16, 15.33333, 19.33333, 26, 8.66667, 36.66667, 2.66667, 3.33333, 2.66667, 3.0625, 2.66667, 2.86458, 2.86458, 2.66667, 3.0625, 2.66667, 3.33333, 2.66667, 28.66667, 2.66667, 28.9375, 2.86458, 29.13542, 3.0625, 29.33333, 3.33333, 29.33333, 36.66667, 29.33333, 36.9375, 29.33333, 37.13542, 29.13542, 37.33333, 28.9375, 37.33333, 28.66667, 37.33333, 3.33333, 37.33333, 3.0625, 37.13542, 2.86458, 36.9375, 2.66667, 36.66667, 2.66667, 40, 3.33333, 40, 28.66667, 40, 30.04167, 39.02083, 31.02083, 38.04167, 32, 36.66667, 32, 3.33333, 32, 1.95833, 32, 0.97917, 31.02083, 0, 30.04167, 0, 28.66667, 0, 3.33333, 0, 1.95833, 0.97917, 0.97917, 1.95833, 0, 3.33333, 0, 36.66667, 0, 38.04167, 0, 39.02083, 0.97917, 40, 1.95833, 40, 3.33333],
        "segments": {
            "_as": [1, 3, 3, 3, 3, 3, 3, 3, 3, 5, 1, 2, 2, 2, 2, 2, 2, 5, 1, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 5, 1, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 5]
        },
        "background": "#2A2A2A",
        "rawPoints": [13.33333, 9.33333, 13.33333, 11, 12.16667, 12.16667, 11, 13.33333, 9.33333, 13.33333, 7.66667, 13.33333, 6.5, 12.16667, 5.33333, 11, 5.33333, 9.33333, 5.33333, 7.66667, 6.5, 6.5, 7.66667, 5.33333, 9.33333, 5.33333, 11, 5.33333, 12.16667, 6.5, 13.33333, 7.66667, 13.33333, 9.33333, 34.66667, 17.33333, 34.66667, 26.66667, 5.33333, 26.66667, 5.33333, 22.66667, 12, 16, 15.33333, 19.33333, 26, 8.66667, 36.66667, 2.66667, 3.33333, 2.66667, 3.0625, 2.66667, 2.86458, 2.86458, 2.66667, 3.0625, 2.66667, 3.33333, 2.66667, 28.66667, 2.66667, 28.9375, 2.86458, 29.13542, 3.0625, 29.33333, 3.33333, 29.33333, 36.66667, 29.33333, 36.9375, 29.33333, 37.13542, 29.13542, 37.33333, 28.9375, 37.33333, 28.66667, 37.33333, 3.33333, 37.33333, 3.0625, 37.13542, 2.86458, 36.9375, 2.66667, 36.66667, 2.66667, 40, 3.33333, 40, 28.66667, 40, 30.04167, 39.02083, 31.02083, 38.04167, 32, 36.66667, 32, 3.33333, 32, 1.95833, 32, 0.97917, 31.02083, 0, 30.04167, 0, 28.66667, 0, 3.33333, 0, 1.95833, 0.97917, 0.97917, 1.95833, 0, 3.33333, 0, 36.66667, 0, 38.04167, 0, 39.02083, 0.97917, 40, 1.95833, 40, 3.33333],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 40,
            "height": 32
        }
    }]
});

s('editor.edit2', {
    "width": 40,
    "height": 34.28571,
    "comps": [{
        "type": "shape",
        "points": [31.42857, 20.71429, 31.42857, 27.85714, 31.42857, 30.51339, 29.54241, 32.39955, 27.65625, 34.28571, 25, 34.28571, 6.42857, 34.28571, 3.77232, 34.28571, 1.88616, 32.39955, 0, 30.51339, 0, 27.85714, 0, 9.28571, 0, 6.62946, 1.88616, 4.7433, 3.77232, 2.85714, 6.42857, 2.85714, 22.14286, 2.85714, 22.45536, 2.85714, 22.65625, 3.05804, 22.85714, 3.25893, 22.85714, 3.57143, 22.85714, 5, 22.85714, 5.3125, 22.65625, 5.51339, 22.45536, 5.71429, 22.14286, 5.71429, 6.42857, 5.71429, 4.95536, 5.71429, 3.90625, 6.76339, 2.85714, 7.8125, 2.85714, 9.28571, 2.85714, 27.85714, 2.85714, 29.33036, 3.90625, 30.37946, 4.95536, 31.42857, 6.42857, 31.42857, 25, 31.42857, 26.47321, 31.42857, 27.52232, 30.37946, 28.57143, 29.33036, 28.57143, 27.85714, 28.57143, 20.71429, 28.57143, 20.40179, 28.77232, 20.20089, 28.97321, 20, 29.28571, 20, 30.71429, 20, 31.02679, 20, 31.22768, 20.20089, 31.42857, 20.40179, 31.42857, 20.71429, 40, 1.42857, 40, 12.85714, 40, 13.4375, 39.57589, 13.86161, 39.15179, 14.28571, 38.57143, 14.28571, 37.99107, 14.28571, 37.56696, 13.86161, 33.63839, 9.93304, 19.08482, 24.48661, 18.86161, 24.70982, 18.57143, 24.70982, 18.28125, 24.70982, 18.05804, 24.48661, 15.51339, 21.94196, 15.29018, 21.71875, 15.29018, 21.42857, 15.29018, 21.13839, 15.51339, 20.91518, 30.06696, 6.36161, 26.13839, 2.43304, 25.71429, 2.00893, 25.71429, 1.42857, 25.71429, 0.84821, 26.13839, 0.42411, 26.5625, 0, 27.14286, 0, 38.57143, 0, 39.15179, 0, 39.57589, 0.42411, 40, 0.84821, 40, 1.42857],
        "segments": [1, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 2, 3, 3, 5, 1, 2, 3, 3, 3, 2, 2, 3, 3, 2, 3, 3, 2, 2, 3, 3, 3, 2, 3, 3, 5],
        "background": "#2A2A2A",
        "rawPoints": [31.42857, 20.71429, 31.42857, 27.85714, 31.42857, 30.51339, 29.54241, 32.39955, 27.65625, 34.28571, 25, 34.28571, 6.42857, 34.28571, 3.77232, 34.28571, 1.88616, 32.39955, 0, 30.51339, 0, 27.85714, 0, 9.28571, 0, 6.62946, 1.88616, 4.7433, 3.77232, 2.85714, 6.42857, 2.85714, 22.14286, 2.85714, 22.45536, 2.85714, 22.65625, 3.05804, 22.85714, 3.25893, 22.85714, 3.57143, 22.85714, 5, 22.85714, 5.3125, 22.65625, 5.51339, 22.45536, 5.71429, 22.14286, 5.71429, 6.42857, 5.71429, 4.95536, 5.71429, 3.90625, 6.76339, 2.85714, 7.8125, 2.85714, 9.28571, 2.85714, 27.85714, 2.85714, 29.33036, 3.90625, 30.37946, 4.95536, 31.42857, 6.42857, 31.42857, 25, 31.42857, 26.47321, 31.42857, 27.52232, 30.37946, 28.57143, 29.33036, 28.57143, 27.85714, 28.57143, 20.71429, 28.57143, 20.40179, 28.77232, 20.20089, 28.97321, 20, 29.28571, 20, 30.71429, 20, 31.02679, 20, 31.22768, 20.20089, 31.42857, 20.40179, 31.42857, 20.71429, 40, 1.42857, 40, 12.85714, 40, 13.4375, 39.57589, 13.86161, 39.15179, 14.28571, 38.57143, 14.28571, 37.99107, 14.28571, 37.56696, 13.86161, 33.63839, 9.93304, 19.08482, 24.48661, 18.86161, 24.70982, 18.57143, 24.70982, 18.28125, 24.70982, 18.05804, 24.48661, 15.51339, 21.94196, 15.29018, 21.71875, 15.29018, 21.42857, 15.29018, 21.13839, 15.51339, 20.91518, 30.06696, 6.36161, 26.13839, 2.43304, 25.71429, 2.00893, 25.71429, 1.42857, 25.71429, 0.84821, 26.13839, 0.42411, 26.5625, 0, 27.14286, 0, 38.57143, 0, 39.15179, 0, 39.57589, 0.42411, 40, 0.84821, 40, 1.42857],
        "unionRect": {
            "x": 0,
            "y": 0,
            "width": 40,
            "height": 34.28571
        }
    }]
});
s("icon.nms", "/images/icon-gotonms.png");
s("icon.reguser", "/images/icon-adduser.png");
s("icon.portdown", "/images/icon-portdown.png");
s("icon.portup", "/images/icon-portup.png");
s("icon.portnormal", "/images/icon-portnormal.png");

var CreateEdgeInteractor = function (_ht$graph$Interactor) {
    inherits(CreateEdgeInteractor, _ht$graph$Interactor);

    function CreateEdgeInteractor(graphView, ignoreNodes, edgeType) {
        classCallCheck(this, CreateEdgeInteractor);

        var _this = possibleConstructorReturn(this, (CreateEdgeInteractor.__proto__ || Object.getPrototypeOf(CreateEdgeInteractor)).call(this, graphView));

        _this._edgeType = edgeType;
        _this._ignoreNodes = [];
        if (ignoreNodes) {
            _this._ignoreNodes = _this._ignoreNodes.concat(ignoreNodes);
        }
        return _this;
    }

    createClass(CreateEdgeInteractor, [{
        key: 'setUp',
        value: function setUp() {
            get(CreateEdgeInteractor.prototype.__proto__ || Object.getPrototypeOf(CreateEdgeInteractor.prototype), 'setUp', this).call(this);
            this._autoMakeVisible = this._graphView.isAutoMakeVisible();
            this._graphView.setAutoMakeVisible(false);
        }
    }, {
        key: 'tearDown',
        value: function tearDown() {
            get(CreateEdgeInteractor.prototype.__proto__ || Object.getPrototypeOf(CreateEdgeInteractor.prototype), 'tearDown', this).call(this, this);
            this._graphView.setAutoMakeVisible(this._autoMakeVisible);
            this._graphView.getSelectionModel().clearSelection();
        }
    }, {
        key: 'handle_mousedown',
        value: function handle_mousedown(e) {
            this.handle_touchstart(e);
        }
    }, {
        key: 'handle_touchstart',
        value: function handle_touchstart(e) {
            // event.globalEvent.fire({type: 'startCreateEdge'});
            this._sourceNode = this.getNodeAt(e);
            if (this._sourceNode) {
                this._targetNode = null;
                this.startDragging(e);
                this._graphView.addTopPainter(this);
                this._graphView.getSelectionModel().setSelection(this._sourceNode);
            }
        }
    }, {
        key: 'getNodeAt',
        value: function getNodeAt(e) {
            var _this2 = this;

            if (ht.Default.isLeftButton(e) && ht.Default.getTouchCount(e) === 1) {
                var data = this._graphView.getDataAt(e, function (data) {
                    return data instanceof ht.Node && _this2._ignoreNodes.indexOf(data) < 0;
                });
                return data;
            }
            return null;
        }
    }, {
        key: 'handleWindowMouseMove',
        value: function handleWindowMouseMove(e) {
            this.handleWindowTouchMove(e);
        }
    }, {
        key: 'handleWindowMouseUp',
        value: function handleWindowMouseUp(e) {
            this.handleWindowTouchEnd(e);
        }
    }, {
        key: 'handleWindowTouchMove',
        value: function handleWindowTouchMove(e) {
            var graphView = this._graphView;
            this.redraw();
            this._logicalPoint = graphView.getLogicalPoint(e);
            this.autoScroll(e);
            this._targetNode = this.getNodeAt(e);
            if (this._targetNode) {
                graphView.getSelectionModel().setSelection([this._sourceNode, this._targetNode]);
            } else {
                graphView.getSelectionModel().setSelection([this._sourceNode]);
            }
            this.redraw();
        }
    }, {
        key: 'handleWindowTouchEnd',
        value: function handleWindowTouchEnd(e) {
            // event.globalEvent.fire({type: 'endCreateEdge'});
            this.redraw();
            if (this._targetNode) {
                var edge = new ht.Edge(this._sourceNode, this._targetNode);
                edge.setParent(this._graphView.getCurrentSubGraph());
                edge.s({
                    'icons': null
                });
                edge.s('flow', true);
                this._graphView.getDataModel().add(edge);
                this._graphView.getSelectionModel().setSelection(edge);
                if (this._edgeType) {
                    edge.s('edge.type', this._edgeType);
                }
                edge.a('mainFontSize', 14);
                edge.a('mainFontFamily', 'sans-serif');
                edge.a('mainFontBold', 'bold');
                edge.a('mainFontColor', '#000000');
                edge.a('boxWidth', 120);
                edge.a('boxHeight', 60);
            }
            this._graphView.removeTopPainter(this);
        }
    }, {
        key: 'redraw',
        value: function redraw() {
            var p1 = this._sourceNode.getPosition(),
                p2 = this._logicalPoint;
            if (p1 && p2) {
                var rect = ht.Default.unionPoint(p1, p2);
                ht.Default.grow(rect, 1);
                this._graphView.redraw(rect);
            }
        }
    }, {
        key: 'draw',
        value: function draw(g) {
            var p1 = this._sourceNode.getPosition(),
                p2 = this._logicalPoint;
            if (p1 && p2) {
                g.lineWidth = 1;
                g.strokeStyle = '#1ABC9C';
                g.beginPath();
                g.moveTo(p1.x, p1.y);
                g.lineTo(p2.x, p2.y);
                g.stroke();
            }
        }
    }]);
    return CreateEdgeInteractor;
}(ht.graph.Interactor);

var Loading = function () {
    function Loading() {
        classCallCheck(this, Loading);

        var div = this.div = document.createElement('div');
        div.setAttribute('style', '\n            position: absolute;\n            z-index: 10000;\n            left: 0;\n            top: 0;\n            bottom: 0;\n            right: 0;\n            display: none;\n            background: rgba(0, 0, 0, 0.2) url("./imgs/loading1.gif") no-repeat center;\n        ');
        document.body.appendChild(div);
    }

    createClass(Loading, [{
        key: 'hide',
        value: function hide() {
            this.div.style.display = 'none';
        }
    }, {
        key: 'show',
        value: function show(parentDom) {
            var div = this.div;
            if (parentDom && div.parentNode !== parentDom) {
                parentDom.appendChild(div);
            } else if (!parentDom && div.parentNode !== document.body) {
                document.body.appendChild(div);
            }
            this.div.style.display = 'block';
        }
    }]);
    return Loading;
}();

var loading = new Loading();

var TipWin = function () {
    function TipWin() {
        classCallCheck(this, TipWin);

        var div = this.div = ht.Default.createDiv();
        var s = div.style;
        s.overflow = 'hidden';
        s.top = '160px';
        s.left = '50%';
        s.padding = '8px 16px';
        s.backgroundColor = 'rgba(55, 55, 55, 0.8)';
        s.borderRadius = '5px';
        s.color = '#fff';
        s.zIndex = 10001;
    }

    createClass(TipWin, [{
        key: 'show',
        value: function show(text) {
            var div = this.div;

            div.innerText = text;

            if (div.parentNode !== document.body) {
                document.body.appendChild(div);
            }
            div.style.marginLeft = 0 - div.offsetWidth * 0.5 + 'px';
            setTimeout(function () {
                if (div.parentNode) {
                    document.body.removeChild(div);
                }
            }, 3000);
        }
    }]);
    return TipWin;
}();

new TipWin();

//import CreateNodeInteractor from '../interactor/create-node-interactor';
var AREA = TREE_NODE_TYPE.AREA;
var RACK = TREE_NODE_TYPE.RACK;

var ICON_SIZE = 24;
var btnIconColor = 'rgb(159, 159, 159)';
var btnSelectColor = 'rgb(231, 231, 231)';
var btnBgColor = '#fff';

var CMS = function () {
    function CMS() {
        classCallCheck(this, CMS);

        this.LIST_ICON_SIZE = 46;
        this.COMBOBOX_IMAGE_SIZE = 18;

        this.widgetId = parseInt(util.getUrlParamter('widget_id')) || null;
        this.areaId = parseInt(util.getUrlParamter('area_id')) || null;
        this.init();
        //this.initWebSocket();
    }

    createClass(CMS, [{
        key: 'init',
        value: function init() {
            this.dnd = {};
            this.deviceTypes = {};
            this.productImgMap = {};
            this.mapInfo = {
                displayName: ''
            };
            this.iconsStyle = {
                board: {
                    names: ['ifBoard'],
                    position: 17,
                    offsetX: -50,
                    offsetY: -20,
                    rotation: 0,
                    keepOrien: false,
                    rotationFixed: false,
                    //gap: 2,
                    width: 15,
                    height: 18
                }
            };
            this.interfaceList = [];
            this.initUI();
            this.initListView();
            this.loadIconData();
            // this.initDialog();

            this.initPropertyView();
            this.initToolbar();

            this.loadListDatas();
            this.initMapWidget();
            this.mainSplitPane.addToDOM();

            document.body.appendChild(this.propertyView.getView());

            this.edgeEditInteractors = [new ht.graph.DefaultInteractor(this.gv), new ht.graph.TouchInteractor(this.gv, {
                selectable: false
            }), new CreateEdgeInteractor(this.gv, [this.bgNode])];
        }
    }, {
        key: 'initUI',
        value: function initUI() {
            var self = this;
            var gv = this.gv = new ht.graph.GraphView(),
                listForm = this.listForm = new ht.widget.FormPane(),
                iconPane = this.iconPane = new ht.widget.Palette(),

            // createNodeInteractor = new CreateNodeInteractor(gv),
            leftTopBorderPane = this.leftTopBorderPane = new ht.widget.BorderPane(),
                leftTopBorderPaneInner = this.leftTopBorderPaneInner = new ht.widget.BorderPane(),
                listView = this.listView = new ht.widget.ListView(),
                propertyForm = this.propertyForm = new FormPane(),
                toolbar = this.toolbar = new ht.widget.FormPane(),
                borderPane = this.borderPane = new ht.widget.BorderPane(),
                mapPane = this.mapPane = new ht.ui.HTView(gv),
                leftSplitPane = this.leftSplitPane = new ht.widget.SplitView(leftTopBorderPane, propertyForm, 'v', 0.7),
                mainSplitPane = this.mainSplitPane = new ht.widget.SplitView(leftSplitPane, borderPane, 'h', 280),
                overview = this.overview = new ht.graph.Overview(gv),
                overviewDiv = overview.getView(),
                propertyView = this.propertyView = new ht.widget.PropertyView(gv.dm()),
                contextMenu = this.contextMenu = new ht.widget.ContextMenu(),
                nodeAlarm = this.nodeAlarm = new NodeAlarm(gv.dm(), this, this.areaId, 50);

            overviewDiv.style.height = '120px';
            overviewDiv.style.width = '120px';
            overviewDiv.style.left = '0';
            overviewDiv.style.bottom = '0';
            overviewDiv.style.zIndex = 10;
            overview.handleScroll = function () {};
            borderPane.getView().appendChild(overview.getView());

            toolbar.setVPadding(10);
            toolbar.setHPadding(0);
            toolbar.setHGap(0);
            toolbar.getView().style.background = '#f7f7f7';

            leftSplitPane.setDividerBackground('#EEEEEE');
            leftSplitPane.setDividerSize(10);
            leftSplitPane.setDraggable(false);
            leftSplitPane.setTogglable(false);
            mainSplitPane.setDividerSize(10);
            mainSplitPane.setDividerBackground('#EEEEEE');
            mainSplitPane.setDraggable(false);
            mainSplitPane.setTogglable(false);
            //borderPane.setCenterView(gv);
            borderPane.setCenterView(mapPane);
            borderPane.setTopView(toolbar);
            borderPane.setTopHeight(46);
            // borderPane.setRightView(propertyView);
            // borderPane.setRightWidth(240);
            var pvs = propertyView.getView().style;
            pvs.right = 0;
            pvs.top = '48px';
            pvs.width = '400px';
            pvs.height = '420px';
            //pvs.setColumnPosition(0.3);
            // pvs.zIndex = 10;
            pvs.backgroundColor = 'rgba(247, 247, 247, 0.5)';
            pvs.display = 'none';
            propertyView.getView().addEventListener('click', function (e) {
                e.preventDefault();
            });

            gv.setEditable(true);
            var editInteractor = gv.getEditInteractor();
            editInteractor.setStyle('anchorVisible', false);
            editInteractor.setStyle('connectGuideVisible', false);
            gv.enableToolTip();
            gv.enableFlow(60);
            gv.dm().setHierarchicalRendering(1);
            gv.dm().enableHistoryManager();
            var oldFunc = gv.invalidateData;
            gv.invalidateData = function () {
                oldFunc.apply(gv, arguments);
                this.redraw();
            };
            // gv.getView().style.borderRight = '1px solid #2c3e50';
            // gv.handleScroll = function(){};


            gv.dm().md(function () {
                self.propertyForm.refreshData();
            });

            /*
            gv.setVisibleFunc(function(data){
            	if(!(data instanceof ht.Edge)){
            		return true;
            	}
                if(data.a('showlabel')){
                    return false;
                }
                return true;
            });*/
            listForm.getView().style.backgroundColor = '#f7f7f7';
            leftTopBorderPaneInner.setTopView(listForm);
            leftTopBorderPaneInner.setTopHeight(60);
            leftTopBorderPaneInner.setCenterView(listView);
            leftTopBorderPane.setCenterView(leftTopBorderPaneInner);
            leftTopBorderPane.setTopView(iconPane);
            leftTopBorderPane.setTopHeight(250);
            leftTopBorderPane.getView().style.border = '1px solid grey';
            leftTopBorderPane.getView().style.borderRadius = '5px';
            propertyForm.getView().style.border = '1px solid grey';
            propertyForm.getView().style.borderRadius = '5px';
            borderPane.getView().style.border = '1px solid grey';
            borderPane.getView().style.borderRadius = '5px';
            //borderPane.getView().style.outline = '0px';
            var searchInput = this.searchInput = new ht.widget.TextField();
            searchInput.getElement().addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    self.loadListDatas();
                }
            });
            listForm.addRow([{ element: 'Racks:', font: 'bold 12px arial, sans-serif' }], [0.1], 30, { background: '#f7f7f7' });
            listForm.addRow([], [0.1], 1.01, { background: '#43AFF1' });
            //listForm.addRow([], [0.1], 1.01, {background: '#43AFF1'});
            //        listForm.addRow([
            //            {
            //                id: 'deviceType',
            //                comboBox: {
            //                    value: 'Select Type'
            //                }
            //            }, {
            //                id: 'searchKeyword',
            //                element: searchInput
            //            }, {
            //                button:{
            //                    label: 'Search',
            //                    onClicked: function(){
            //                        self.loadListDatas();
            //                    }
            //                }
            //            }
            //        ], [0.3, 0.3, 0.15], 30);
            //listForm.setRowHeight(32);
            //listForm.addRow([], [0.1], 1.01, {background: '#43AFF1'});
            //this.getOPMDeviceType();
            iconPane.getView().style.backgroundColor = '#f7f7f7';
            //iconPane.handleDragAndDrop = self.handleIconDND.bind(self);
            iconPane.handleDragAndDrop = function (e, state) {
                if (state === 'end') {
                    var bound = gv.getView().getBoundingClientRect(),
                        point = ht.Default.getClientPoint(e);

                    if (ht.Default.containsPoint({
                        x: bound.left,
                        y: bound.top,
                        width: bound.width,
                        height: bound.height
                    }, point)) {
                        var paletteNode = this.sm().ld(),
                            node = new ht.Node(),
                            lp = gv.lp(e);
                        gv.dm().add(node);
                        node.setPosition(lp.x, lp.y);
                        node.setImage(paletteNode.getImage());
                    }
                }
            };
            iconPane.getView().addEventListener("dragover", function (e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = "copy";
            });
            iconPane.getView().addEventListener("drop", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    Array.from(e.dataTransfer.files).forEach(function (file) {
                        if (!file) {
                            //if (!file || (type && file.type.indexOf(type) < 0)) {
                            return;
                        }
                        var reader = new FileReader();
                        reader.onload = function (rd) {
                            //callback(file, rd.target.result);
                            var t = new ht.Node();
                            if (file.type.indexOf('image') === 0) {
                                t.setImage(rd.target.result);
                            } else {
                                t.setImage(ht.Default.parse(rd.target.result));
                            }
                            t.a('deviceName', 'dummy'), t.setName(file.name), t.setParent(self.group), t.s("draggable", !0);

                            iconPane.dm().add(t);
                        };
                        if (file.type.indexOf('image') !== 0) {
                            reader.readAsText(file);
                        } else {
                            reader.readAsDataURL(file);
                        }
                    });
                }
            });
            /*       iconPane.sm().ms(function(e) {
                var selectedNode = iconPane.sm().ld();
                if (selectedNode) {
                    createNodeInteractor._image = selectedNode.getImage();
                }
            });
             gv.setInteractors(new ht.List([
                new ht.graph.ScrollBarInteractor(gv),
                new ht.graph.SelectInteractor(gv),
                new ht.graph.MoveInteractor(gv),
                new ht.graph.DefaultInteractor(gv),
                new ht.graph.TouchInteractor(gv),
                createNodeInteractor
            ]));*/
            contextMenu.enableGlobalKey();
            contextMenu.beforeShow = function (e) {
                var data = listView.getDataAt(e);
                if (data.a('type_name') === AREA) {
                    contextMenu.setItems([{
                        label: 'Delete Map',
                        action: function action() {
                            self.removeSubMap(data);
                        }
                    }]);
                } else {
                    contextMenu.setItems([]);
                }
            };
            contextMenu.addTo(listView.getView());
        }
    }, {
        key: 'initMapWidget',
        value: function initMapWidget() {
            var _this = this;

            if (!this.widgetId) {
                var node = this.bgNode = new ht.Node();
                node.setImage('symbols/floor3d.json'); //temporary map
                node.a('disableAnimate', true);
                node.s('2d.editable', false);
                node.s('2d.selectable', false);
                node.s('2d.movable', false);
                node.setTag('bgNode');
                this.gv.dm().add(node);
                this.initMapPropertyForm();
                setTimeout(function () {
                    _this.gv.fitContent(1, 0, true);
                }, 1000);
            } else {
                loading.show();
                util.ajax({
                    url: API_HEAD + 'getDCIMWidgetModelData/' + this.widgetId,
                    success: function success(r) {
                        loading.hide();
                        if (r && r[0] && r[0].content_data) {
                            _this.gv.dm().deserialize(r[0].content_data);
                            _this.bgNode = _this.gv.dm().getDataByTag('bgNode');
                            setTimeout(function () {
                                _this.initMapPropertyForm();
                            }, 100);
                            setTimeout(function () {
                                _this.gv.fitContent(1, 0, true);
                            }, 1000);
                        } else {
                            var node = _this.bgNode = new ht.Node();
                            node.setImage('symbols/floor3d.json'); //temporary map
                            node.a('disableAnimate', true);
                            node.s('2d.editable', false);
                            node.s('2d.selectable', false);
                            node.s('2d.movable', false);
                            node.setTag('bgNode');
                            _this.gv.dm().add(node);
                            _this.initMapPropertyForm();
                            setTimeout(function () {
                                _this.gv.fitContent(1, 0, true);
                            }, 1000);
                        }
                    }
                });
            }
        }
    }, {
        key: 'loadIconData',
        value: function loadIconData() {
            var self = this,
                iconPane = self.iconPane,
                dm = iconPane.dm();
            var group = this.group = new ht.Group();
            group.setName('Icons');
            group.setExpanded(true);
            dm.add(group);
            var t = ["AAA", "AMG", "APPserver", "Auth_lvl", "Auth_lvl2", "Backup1", "BackupSystem", "Cloud", "Cloud2", "CMTS", "Component1", "Computer", "Crowd1", "Database1", "DISK", "Disk2", "Earth1", "Earth2", "Equipment1", "Equipment2", "Equipment3", "F5", "FA", "Firewall1", "Firewall2", "Firewall3", "Firewall4", "Firewall5", "Firewall6", "Firewall7", "FirewallGE", "Gateway1", "Gateway10", "Gateway2", "Gateway3", "Gateway4", "Gateway5", "Gateway6", "Gateway7", "Gateway8", "Gateway9", "GK", "Host1", "IDS", "IDS2", "Import1", "Industrial", "Internet1", "IPV6Router", "Laptop1", "Laptop2", "Loadbalancer", "Management1", "Mobile1", "Mobile2", "MRS", "PBX", "Portal", "Router1", "Router2", "Router3", "Router4", "Satellite", "Scanning1", "Security", "Server1", "Server2", "Server3", "Server4", "Signal1", "SIP", "SIPP", "Soft", "SOHORouter", "Switch1", "Switch2", "Switch3", "Switch4", "Switch5", "Switch6", "Switch7", "System", "System2", "System3", "System4", "Tablet1", "Topology", "VoiceRouter", "VPN1", "VPN2"];

            t.forEach(function (e) {
                var t = new ht.Node();
                t.setImage("./symbols/dcim/" + e + ".json"), t.a('deviceName', 'dummy'), t.setName(e), dm.add(t), t.setParent(group), t.s("draggable", !0);
            });

            //        ht.Default.setImage("music.png", "data:image/png;base64,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");
            //        ht.Default.setImage("music2.png", "data:image/png;base64,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");
            //     
            //        {
            //            var node = new ht.Node();
            //            node.setImage("music.png");
            //            node.a('deviceName', 'dummy');
            //            node.setName("VPN1.json")
            //            node.setParent(group);
            //            node.s("draggable", true);
            //            dm.add(node);
            //        };        

            //        util.ajax({
            //            url: `${API_HEAD}getCableIcon`,
            //            success: r => {
            //                var group = new ht.Group();
            //                group.setName('Cable');
            //                group.setExpanded(true);
            //                dm.add(group);
            //                r.forEach(function (d) {
            //                    var node = new ht.Node();
            //                    node.setImage(d.image_linkage_connection);
            //                    node.setName(d.name);
            //                    node.a({
            //                        id: d.id,
            //                        type_id: d.type_id
            //                    })
            //                    node.setParent(group);
            //                    node.s("draggable", true);
            //                    dm.add(node);
            //                });
            //            }
            //        });
        }
    }, {
        key: 'initWebSocket',
        value: function initWebSocket() {
            var self = this;
            var socket = new SockJS('/realtime');
            var stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                setInterval(function () {
                    stompClient.send("/send/traps", {}, JSON.stringify(self.gv.dm().serialize()));
                }, 10000);
            });
        }
    }, {
        key: 'initMapPropertyForm',
        value: function initMapPropertyForm() {
            var self = this,
                form = self.propertyForm,
                colWidth = [89, 0.1];

            //form.addSpaceRow(10);
            form.addRow([{ element: 'DCIMWidget Property:', font: 'bold 12px arial, sans-serif' }], [0.1], 30, { background: '#f7f7f7' });
            form.addRow([], [0.1], 1.01, { background: '#43AFF1' });
            /*form.addRow([// map Name
                'Display Name',
                {
                    id: 'displayName',
                    getter: () => { return self.bgNode.a('displayName');},
                    setter: v => {
                        self.bgNode.a('displayName', v);
                    },
                    textField: {
                    }
                }
            ], colWidth);*/
            form.addRow([// width
            'Width', {
                id: 'width',
                getter: function getter() {
                    return self.bgNode.getWidth();
                },
                textField: {
                    editable: false,
                    type: 'number'
                }
            }], colWidth);

            form.addRow(['Height', {
                id: 'height',
                getter: function getter() {
                    return self.bgNode.getHeight();
                },
                textField: {
                    editable: false,
                    type: 'number'
                }
            }], colWidth);

            form.addRow(['Opacity', {
                id: 'opacity',
                getter: function getter() {
                    return self.bgNode.s('opacity') || 1;
                },
                setter: function setter(v) {
                    self.bgNode.s('opacity', v);
                },
                textField: {}
            }], colWidth);

            form.addRow(['Background', {
                id: 'background',
                button: {
                    label: 'Select Image',
                    onClicked: function onClicked() {
                        util.selectFile('image', 'text', function (file, data) {

                            if (file.type.indexOf('image') === 0) {
                                self.bgNode.setImage(data);
                            } else {
                                self.bgNode.setImage(ht.Default.parse(data));
                            }
                            self.bgNode.setSize(-1, -1);
                        });
                        /*self.handleSelectLocalImage(data => {
                            self.bgNode.setImage(data);
                            self.bgNode.setSize(-1, -1);
                        });*/
                    }
                }
            }], colWidth);
            /*
                    form.addRow([
                        'Export JSON',
                        {
                            id: 'exportJson',
                            // getter: function(){ return self.gv.dm().serialize()},
                            textArea: {
                            }
                        }
                    ], colWidth, 150);
            
                    var exportJsonTextArea = form.getItemById('exportJson').element.getElement();
                    exportJsonTextArea.value = self.gv.dm().serialize();
                    exportJsonTextArea.addEventListener('focus', function(){
                        exportJsonTextArea.value = self.gv.dm().serialize();
                    })
            */
            /*        form.addRow([
                        'Alarm Size',
                        {
                            id: 'alarmSize',
                            // getter: function(){ return self._alarmSize || '';},
                            setter: function(v){
                                if (isNaN(v)) return;
                                self.nodeAlarm.alarmSize = parseInt(v);
                            },
                            textField: {
                                type: 'number'
                            }
                        }
                    ], colWidth);*/

            form.addRow(['Alarm Animate', {
                button: {
                    label: 'Start',
                    onClicked: function onClicked() {
                        if (self.widgetId) {
                            self.nodeAlarm.toggle(self.areaId);
                            this.setLabel(self.nodeAlarm.active ? 'Stop' : 'Start');
                        }
                    }
                }
            }], colWidth);

            form.addRow([{
                id: 'showLabel',
                checkBox: {
                    value: true,
                    onValueChanged: function onValueChanged(oldVal, newVal) {
                        self.gv.dm().each(function (data) {
                            if (data instanceof ht.Node && data !== self.bgNode) {
                                data.setName(newVal ? data.a('displayName') : '');
                            }
                        });
                    }
                }
            }, 'Show Device/Map Label '], [16, 0.1]);
            //form.addRow([], [0.1], 1.01, {background: '#43AFF1'});
            form.refreshData();
        }
    }, {
        key: 'getComboBoxImage',
        value: function getComboBoxImage(name) {
            var imageMap = ht.Default.getImageMap(),
                realName = 'flow.image' + name,
                size = this.COMBOBOX_IMAGE_SIZE;
            if (!imageMap[realName]) {
                ht.Default.setImage(realName, {
                    width: size,
                    height: size,
                    comps: [{
                        type: 'image',
                        stretch: 'uniform',
                        rect: [0, 0, size, size],
                        name: name
                    }]
                });
            }
            return realName;
        }
    }, {
        key: 'initPropertyView',
        value: function initPropertyView() {
            var _this2 = this;

            var self = this;
            var edgeProperties = [{
                name: 'edge.color',
                displayName: 'Edge Color',
                accessType: 'style',
                valueType: 'color',
                colorPicker: {
                    instant: true
                },
                editable: true
            }, {
                name: 'edge.width',
                displayName: 'Edge Width(1~20)',
                accessType: 'style',
                valueType: 'number',
                editable: true
            }, {
                name: 'edge.type',
                displayName: 'Edge Type',
                accessType: 'style',
                enum: {
                    values: ['points', 'boundary', 'ripple', 'h.v', 'v.h', 'ortho', 'flex', 'extend.east', 'extend.west', 'extend.north', 'extend.south']
                },
                editable: true
            }, {
                name: 'flowType',
                displayName: 'Flow Type',
                enum: {
                    values: ['lighting', 'image', 'none']
                },
                getValue: function getValue(edge, property, view) {
                    return edge.a('flowType');
                },

                accessType: 'attr',
                editable: true
            }, {
                name: 'flow.element.background',
                displayName: 'Flow Color',
                accessType: 'style',
                valueType: 'color',
                colorPicker: {
                    instant: true
                },
                editable: true
            }, {
                name: 'flow.element.shadow.begincolor',
                displayName: 'Flow Shadow Begin',
                accessType: 'style',
                valueType: 'color',
                colorPicker: {
                    instant: true
                },
                editable: true
            }, {
                name: 'flow.element.shadow.endcolor',
                displayName: 'Flow Shadow end',
                accessType: 'style',
                valueType: 'color',
                colorPicker: {
                    instant: true
                },
                editable: true
            }, {
                name: 'flow.element.count',
                displayName: 'Element Count(1~20)',
                accessType: 'style',
                valueType: 'number',
                editable: true
            }, {
                name: 'flow.count',
                displayName: 'Flow Count(1~20)',
                accessType: 'style',
                valueType: 'number',
                editable: true
            }, {
                name: 'flow.element.image',
                displayName: 'Flow Image',
                accessType: 'attr',
                formatValue: function formatValue(v) {
                    return v || 'Arrow';
                },
                editable: false

            }, {
                name: 'datarate',
                displayName: 'Show Label',
                valueType: 'boolean',
                setValue: function setValue(data, property, value, view) {
                    if (value) {
                        data.s({
                            'icons': JSON.parse(JSON.stringify(self.iconsStyle))
                        });
                    } else {
                        data.s({
                            'icons': null
                        });
                    }
                    data.a({
                        'visible': value
                    });
                },
                getValue: function getValue(data, property, view) {
                    return data.s('icons');
                },
                editable: true
            }, {
                name: 'device',
                id: 'device',
                displayName: 'Selected Device',
                enum: {
                    values: []
                },
                /*comboBox: {
                    labels: [],
                    values: []
                },*/
                getValue: function getValue(edge, property, view) {
                    return edge.a('datarate.device');
                },

                setValue: function setValue(data, property, value, view) {
                    data.a('datarate.device', value);
                    self.getDeviceInterfaces(value);
                },
                accessType: 'attr',
                editable: true
            }, {
                name: 'interface',
                id: 'interface',
                displayName: 'Selected Interface',
                getValue: function getValue(edge, property, view) {
                    return edge.a('datarate.interface.displayname');
                },

                setValue: function setValue(data, property, value, view) {
                    data.a('datarate.interface', value);
                    data.a('datarate.interface.displayname', self.getInterfaceDisplayName(value));
                },
                accessType: 'attr',
                editable: true
            }, {
                name: 'mainFontBold',
                displayName: 'Label Font Bold',
                valueType: 'boolean',
                setValue: function setValue(data, property, value, view) {
                    data.a({
                        'mainFontBold': value ? 'bold' : ''
                    });
                },
                getValue: function getValue(data, property, view) {
                    return data.a('mainFontBold') === 'bold' ? true : false;
                },
                editable: true
            }, {
                name: 'mainFontFamily',
                displayName: 'Label Font Family',
                accessType: 'attr',
                valueType: 'String',
                editable: true
            }, {
                name: 'mainFontSize',
                displayName: 'Label Font Size(1~40)',
                accessType: 'attr',
                valueType: 'number',
                editable: true
            }, {
                name: 'mainFontColor',
                displayName: 'Label Color',
                accessType: 'attr',
                valueType: 'color',
                colorPicker: {
                    instant: true
                },
                editable: true
            }, {
                name: 'position',
                displayName: 'Label Position',
                enum: {
                    labels: ['Top', 'Left', 'Center', 'Right', 'Bottom'],
                    values: [3, 14, 17, 20, 31]
                },
                getValue: function getValue(edge, property, view) {
                    return edge.s('icons') ? edge.s('icons').board.position : null;
                },

                setValue: function setValue(data, property, value, view) {
                    data.s('icons').board.position = value;
                    self.gv.invalidateAll();
                },
                editable: true
            }, {
                name: 'offsetX',
                displayName: 'Label OffsetX',
                valueType: 'number',
                getValue: function getValue(edge, property, view) {
                    return edge.s('icons') ? edge.s('icons').board.offsetX : null;
                },

                setValue: function setValue(data, property, value, view) {
                    data.s('icons').board.offsetX = value;
                    self.gv.invalidateAll();
                },
                editable: true
            }, {
                name: 'offsetY',
                displayName: 'Label OffsetY',
                valueType: 'number',
                getValue: function getValue(edge, property, view) {
                    return edge.s('icons') ? edge.s('icons').board.offsetY : null;
                },

                setValue: function setValue(data, property, value, view) {
                    data.s('icons').board.offsetY = value;
                    self.gv.invalidateAll();
                },
                editable: true
            }, {
                name: 'rotation',
                displayName: 'Label Rotation(-1.0~1.0)',
                valueType: 'number',
                getValue: function getValue(edge, property, view) {
                    return edge.s('icons') ? edge.s('icons').board.rotation / Math.PI : null;
                },

                setValue: function setValue(data, property, value, view) {
                    data.s('icons').board.rotation = Math.PI * value;
                    self.gv.invalidateAll();
                },
                editable: true
            }, {
                name: 'boxWidth',
                displayName: 'Label Box Width',
                accessType: 'attr',
                valueType: 'number',
                setValue: function setValue(data, property, value, view) {
                    data.s('icons').board.width = value;
                    data.a('boxWidth', value);
                    self.gv.invalidateAll();
                },
                editable: true
            }, {
                name: 'boxHeight',
                displayName: 'Label Box Height',
                accessType: 'attr',
                valueType: 'number',
                setValue: function setValue(data, property, value, view) {
                    data.s('icons').board.height = value;
                    data.a('boxHeight', value);
                    self.gv.invalidateAll();
                },
                editable: true
            }];

            var nodeProperties = [{
                displayName: 'Label',
                setValue: function setValue(data, property, value, view) {
                    data.setName(value);
                    data.a('displayName', value);
                    data.s({
                        'label': value
                    });
                },
                getValue: function getValue(data, property, view) {
                    return data.s('label') ? data.s('label') : data.getName();
                },
                editable: true
            }, {
                name: 'Width',
                displayName: 'Image Width',
                valueType: 'number',
                setValue: function setValue(data, property, value, view) {
                    data.setWidth(value);
                    self.gv.invalidateAll();
                },
                getValue: function getValue(data, property, view) {
                    return data.getWidth();
                },
                editable: true
            }, {
                name: 'Height',
                displayName: 'Image Height',
                valueType: 'number',
                setValue: function setValue(data, property, value, view) {
                    data.setHeight(value);
                    self.gv.invalidateAll();
                },
                getValue: function getValue(data, property, view) {
                    return data.getHeight();
                },
                editable: true
            }, {
                name: 'fontBold',
                displayName: 'Label Font Bold',
                valueType: 'boolean',
                setValue: function setValue(data, property, value, view) {
                    var bold = value ? 'bold' : '';
                    data.s({
                        'label.font': bold + ' ' + data.a('fontSize') + 'px ' + data.a('fontFamily')
                    });
                    data.a('fontBold', bold);
                },
                getValue: function getValue(data, property, view) {
                    return data.a('fontBold') === 'bold' ? true : false;
                },
                editable: true
            }, {
                name: 'fontFamily',
                displayName: 'Label Font Family',
                valueType: 'String',
                setValue: function setValue(data, property, value, view) {
                    data.s({
                        'label.font': data.a('fontBold') + ' ' + data.a('fontSize') + 'px ' + value
                    });
                    data.a('fontFamily', value);
                },
                getValue: function getValue(data, property, view) {
                    return data.a('fontFamily');
                },
                editable: true
            }, {
                name: 'fontSize',
                displayName: 'Label Font Size(1~40)',
                valueType: 'number',
                setValue: function setValue(data, property, value, view) {
                    data.s({
                        'label.font': data.a('fontBold') + ' ' + value + 'px ' + data.a('fontFamily')
                    });
                    data.a('fontSize', value);
                },
                getValue: function getValue(data, property, view) {
                    return data.a('fontSize');
                },
                editable: true
                /*}, {
                 name: 'label.font',
                  displayName: 'Label Font',
                  accessType: 'style',
                  valueType: 'string',
                  editable: true*/
            }, {
                name: 'label.color',
                displayName: 'Label Color',
                accessType: 'style',
                valueType: 'color',
                colorPicker: {
                    instant: true
                },
                editable: true
            }, {
                name: 'label.scale',
                displayName: 'Label Scale(1.0~10.0)',
                accessType: 'style',
                valueType: 'number',
                editable: true
            }, {
                name: 'label.position',
                displayName: 'Label Position',
                accessType: 'style',
                enum: {
                    labels: ['Top', 'Left', 'Center', 'Right', 'Bottom'],
                    values: [3, 14, 17, 20, 31]
                },
                editable: true
            }, {
                name: 'label.offset.x',
                displayName: 'Label Offset X',
                accessType: 'style',
                valueType: 'number',
                editable: true
            }, {
                name: 'label.offset.y',
                displayName: 'Label Offset Y',
                accessType: 'style',
                valueType: 'number',
                editable: true
            }, {
                name: 'label.rotation',
                displayName: 'Label Rotation(-1.0~1.0)',
                accessType: 'style',
                valueType: 'number',
                setValue: function setValue(data, property, value, view) {
                    data.s('label.rotation', Math.PI * value);
                },
                getValue: function getValue(data, property, view) {
                    return data.s('label.rotation') / Math.PI;
                },
                editable: true
            }, {
                name: 'label.orientation',
                displayName: 'Label Orientation',
                accessType: 'attr',
                enum: {
                    values: ['horizontal', 'vertical']
                },
                setValue: function setValue(data, property, value, view) {
                    var newLabel = data.getName().toUpperCase();
                    if (value === 'vertical') {
                        var charArry = newLabel.split('');
                        newLabel = charArry.join('\n');
                    }
                    data.s({
                        'label': newLabel
                    });
                    data.a('label.orientation', value);
                },
                editable: true
            }, defineProperty({
                displayName: 'Image',
                editable: true,
                setValue: function setValue(data, property, value, view) {
                    if (value === 'default') {
                        data.setImage(_this2.getProductImageById(data.a('productId')));
                        data.a('customImage', null);
                    } else {
                        data.setImage(value);
                        data.a('customImage', value);
                    }
                },
                getValue: function getValue(data, property, view) {
                    return data.a('customImage') || 'Default';
                },
                formatValue: function formatValue(v) {
                    return v || 'Arrow';
                }
            }, 'editable', false)];

            this.propertyView.setVisibleFunc(function (p) {
                var ld = _this2.gv.sm().ld(),
                    name = p.getName();
                if (ld instanceof ht.Edge) {
                    if (name.startsWith('flow.element')) {
                        if (ld.a('flowType') === 'none') {
                            return false;
                        } else if (ld.a('flowType') === 'image') {
                            return name === 'flow.element.image' || name === 'flow.element.count';
                        } else if (ld.a('flowType') === 'lighting') {
                            return name !== 'flow.element.image' && name !== 'flow.element.count';
                        }
                    }
                    return true;
                }

                return true;
            });
            // select local image for flow image
            this.propertyView.getView().addEventListener('click', function (e) {
                var div = _this2.propertyView.getView(),
                    top = div.offsetTop,
                    offsetY = e.clientY - top,
                    rowHeight = _this2.propertyView.getRowHeight(),
                    rowIndex = Math.floor(offsetY / rowHeight),
                    row = _this2.propertyView.getRows().get(rowIndex);
                if (row && row.property.getDisplayName() === 'Flow Image') {
                    /*util.selectFile('image', null, (file, data) => {
                        let edge = this.gv.sm().ld();
                        edge.s('flow.element.image', data);
                        edge.a('flow.element.image', file.name.split('\.')[0]);
                    });*/
                    util.selectFile('image', 'text', function (file, data) {
                        var edge = _this2.gv.sm().ld();
                        if (file.type.indexOf('image') === 0) {
                            edge.s('flow.element.image', data);
                        } else {
                            edge.s('flow.element.image', ht.Default.parse(data));
                        }
                        edge.a('flow.element.image', file.name.split('\.')[0]);
                    });
                } else if (row && row.property.getDisplayName() === 'Image') {
                    /*util.selectFile('image', null, (file, data) => {
                        let node = this.gv.sm().ld();
                        node.setImage(data);
                        node.a('customImage', file.name.split('\.')[0]);
                    });
                    */
                    util.selectFile('image', 'text', function (file, data) {
                        var node = _this2.gv.sm().ld();

                        if (file.type.indexOf('image') === 0) {
                            node.setImage(data);
                        } else {
                            node.setImage(ht.Default.parse(data));
                        }
                        node.a('customImage', file.name.split('\.')[0]);
                    });
                }
            });

            this.gv.sm().ms(function () {
                var ld = _this2.gv.sm().ld();
                _this2.propertyView.setProperties(null);
                if (ld instanceof ht.Edge) {
                    if (!ld.a('flowType')) {
                        ld.a('flowType', 'lighting');
                    }
                    _this2.propertyView.setProperties(edgeProperties);
                    _this2.propertyView.getView().style.height = '420px';
                    _this2.propertyView.getView().style.display = 'block';
                    setTimeout(function () {
                        _this2.getEdgeDevices(ld);
                    }, 100);
                } else if (ld instanceof ht.Node && ld !== _this2.bgNode) {
                    _this2.propertyView.setProperties(nodeProperties);
                    _this2.propertyView.getView().style.height = '280px';
                    _this2.propertyView.getView().style.display = 'block';

                    if (!ld.s('label.position')) {
                        ld.s('label.position', 31);
                    }
                    if (!ld.s('label.font')) {
                        ld.s('label.font', 'bold 14px sans-serif');
                        ld.a('fontBold', 'bold');
                        ld.a('fontFamily', 'sans-serif');
                        ld.a('fontSize', 14);
                    }
                    if (!ld.s('label.color')) {
                        ld.s('label.color', 'rgb(0,0,0,1)');
                    }
                    if (!ld.s('label.scale')) {
                        ld.s('label.scale', 1);
                    }
                    /*setTimeout(() => {
                        if (this.propertyView._rows.get(1)) {
                            let property = this.propertyView._rows.get(1).property,
                                productId = ld.a('productId'),
                                imgs = this.productImgMap[productId];
                                 property.setEnum({
                                values: ['default'].concat(imgs)
                            });
                        }
                    }, 200);*/
                } else {
                    _this2.propertyView.getView().style.display = 'none';
                }
            });

            this.gv.dm().md(function (e) {
                var edge = _this2.gv.sm().ld();
                if (e.property === 'a:flowType') {
                    var val = e.newValue;
                    if (val === 'none') {
                        edge.s('flow', false);
                    } else {
                        if (val === 'lighting') {
                            edge.s("flow.element.image", null);
                            edge.s("flow.element.shadow.visible", true);
                            edge.s("flow.element.max", 7);
                            edge.s("flow.element.min", 0);
                            edge.s("flow.element.count", 10);
                            edge.s("flow.element.space", 3.5);
                        } else {
                            edge.s("flow.element.count", 1);
                            edge.s("flow.element.space", 20);
                            edge.s("flow.element.max", 18);
                            edge.s("flow.element.min", 18);
                            edge.s("flow.element.shadow.visible", false);
                            edge.s("flow.element.autorotate", true);
                            if (!edge.s("flow.element.image")) {
                                edge.s("flow.element.image", "arrow");
                            }
                        }
                        edge.s('flow', true);
                    }
                    _this2.propertyView.ivm();
                }
            });
        }
    }, {
        key: 'initDialog',
        value: function initDialog() {
            var _this3 = this;

            var dialog = this.dropDialog = new ht.widget.Dialog(),
                form = this.dropDialogForm = new FormPane();

            form.setHPadding(30);
            form.setVPadding(24);

            dialog.setConfig({
                title: "New Device",
                content: form,
                width: 410,
                height: 180,
                draggable: true,
                closable: true,
                resizeMode: "wh",
                buttons: [{
                    label: "Ok",
                    action: function action(button, e) {
                        _this3.handleSelectProductType();
                    }
                }, {
                    label: 'Cancel',
                    action: function action() {
                        _this3.dm.remove(_this3._lastAdd);
                        _this3._lastAdd = null;
                        _this3.listView.ivm();
                        dialog.hide();
                    }
                }],
                buttonsAlign: "right"
            });

            var formItems = [{
                id: 'productType',
                label: 'Product Type',
                comboBox: {
                    values: this.productInfos.map(function (d) {
                        return d.product_id;
                    }),
                    labels: this.productInfos.map(function (d) {
                        return d.product_name;
                    }),
                    icons: this.productInfos.map(function (d) {
                        return d.product_id + d.product_name;
                    })
                }
            }];
            var itemWidths = [80, 0.1];

            form.addFormItems(formItems, itemWidths, 26);
        }
    }, {
        key: 'handleSelectProductType',
        value: function handleSelectProductType() {
            var form = this.dropDialogForm,
                dialog = this.dropDialog,
                productId = form.v('productType');
            if (!productId) {
                form.showError('Please select product type');
                return;
            }
            this._lastAdd.a({ productId: productId });
            this._lastAdd.setImage(this.getProductImageById(productId));
            this.loadImagesForProduct(productId);
            dialog.hide();
        }
    }, {
        key: 'handleSelectLocalImage',
        value: function handleSelectLocalImage(callback) {
            var self = this;
            if (!self.fileDom) {
                var fileDom = self.fileDom = document.createElement('input');
                fileDom.setAttribute('type', 'file');
                fileDom.style.width = 0;
                fileDom.style.height = 0;
                fileDom.addEventListener('change', function (e) {
                    var file = e.target.files[0];
                    // is image
                    if (file && file.type.indexOf('image') === 0) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            if (callback) {
                                callback(e.target.result, file);
                            }
                            // remove dom
                            document.body.removeChild(self.fileDom);
                            self.fileDom = null;
                        };
                        reader.readAsDataURL(file);
                    }
                });
                document.body.appendChild(fileDom);
            }

            self.fileDom.click();
        }
    }, {
        key: 'initToolbar',
        value: function initToolbar() {
            var _this4 = this;

            var toolbar = this.toolbar;

            {
                toolbar.addRow(['', this.createToobarBtn({
                    icon: this.getToolbarIcon('editor.edit'),
                    togglable: true,
                    groupId: 't',
                    selected: true,
                    toolTip: 'Select',
                    onClicked: function onClicked() {
                        // event.globalEvent.fire({type: 'endCreateEdge'});
                        _this4.gv.setEditable(true);
                    }
                }), this.createToobarBtn({
                    icon: this.getToolbarIcon('editor.edge'),
                    togglable: true,
                    groupId: 't',
                    toolTip: 'Edge',
                    onClicked: function onClicked() {
                        _this4.gv.setInteractors(_this4.edgeEditInteractors);
                    }
                }), '', this.createToobarBtn({
                    icon: this.getToolbarIcon('editor.undo'),
                    toolTip: 'Undo',
                    onClicked: function onClicked() {
                        _this4.gv.dm().undo();
                    }
                }), this.createToobarBtn({
                    icon: this.getToolbarIcon('editor.redo'),
                    toolTip: 'Redo',
                    onClicked: function onClicked() {
                        _this4.gv.dm().redo();
                    }
                }), '', // padding


                this.createToobarBtn({
                    icon: this.getToolbarIcon('toolbar.new'),
                    toolTip: 'Reset Mapwidget',
                    onClicked: function onClicked() {
                        location.reload();
                    }
                }),

                /*this.createToobarBtn({
                    icon: this.getToolbarIcon('toolbar.save'),
                    toolTip: 'Save MapWidget',
                    onClicked: () =>{
                        this.handleSaveDCIMWidget(r => {
                         });
                    }
                }),'',*/
                '', this.createToobarBtn({
                    icon: this.getToolbarIcon('toolbar.save'),
                    toolTip: 'Save MapWidget',
                    onClicked: function onClicked() {
                        /*if(this.propertyForm.v('displayName')==='undefined'){
                        	alert('Please change Display Name');
                        }else*/
                        {
                            _this4.nodeAlarm.stop();
                            _this4.handleSaveDCIMWidget(function (r) {

                                if (!_this4.widgetId) {
                                    _this4.widgetId = r.id;
                                }
                                //window.open(`preview-map-widget.html?widget_id=${this.widgetId || r.id}`);
                            });
                        }
                    }
                }), ''], [0.1, 32, 32, 12, 32, 32, 12, 32, 12, 32, 0.1], 32);
            }
        }
    }, {
        key: 'handleSaveDCIMWidget',
        value: function handleSaveDCIMWidget(callback) {
            var content = this.dm.serialize().replace(/\n+/g, ''),
                url = API_HEAD + 'saveDCIMWidget';
            var data = {
                display_name: this.propertyForm.v('displayName'),
                content_data: content,
                option_data: this.areaId,
                widgettype_id: util.getUrlParamter('widgetType'),
                devices: this.getDevices()
                //submaps: this.getSubMapWidgets()
            };
            if (this.widgetId) {
                url += '/' + this.widgetId;
            }
            loading.show();
            util.ajax({
                url: url,
                data: JSON.stringify(data),
                type: 'post',
                dataType: 'json',
                success: function success(r) {
                    loading.hide();

                    if (callback) callback(r);
                }
            });
        }
    }, {
        key: 'getDevices',
        value: function getDevices() {
            var list = [];
            this.dm.each(function (d) {
                var type_name = d.a('type_name');
                if (type_name && type_name === RACK) {
                    list.push(d.getAttrObject());
                }
            });
            return list;
        }
    }, {
        key: 'createToobarBtn',
        value: function createToobarBtn(options) {
            var button = {
                background: btnBgColor,
                iconColor: btnIconColor,
                selectBackground: btnSelectColor,
                width: 32
            };

            for (var k in options) {
                button[k] = options[k];
            }

            return { button: button };
        }
    }, {
        key: 'getToolbarIcon',
        value: function getToolbarIcon(url, stateFunc) {
            return {
                width: ICON_SIZE + 6,
                height: ICON_SIZE + 6,
                comps: [{
                    type: 'image',
                    name: url,
                    color: {
                        func: function func() {
                            if (stateFunc) {
                                var state = stateFunc();
                                return state ? '#000' : '#ababab';
                            }
                            return '#000';
                        }
                    },
                    rect: [3, 3, ICON_SIZE, ICON_SIZE]
                }]
            };
        }
    }, {
        key: 'createFormItem',
        value: function createFormItem(type, options) {
            if (type === 'number') {
                return {
                    textField: {
                        type: 'number'
                    }
                };
            }
        }
    }, {
        key: 'getEdgeDevices',
        value: function getEdgeDevices(edge) {
            var _this5 = this;

            var source = edge.getSource().a('node_id'),
                target = edge.getTarget().a('node_id');
            var url = API_HEAD + 'getAvailableDevicesInRack?';
            if (source) {
                url += 'source=' + source;
            }
            if (target) {
                url += '&target=' + target;
            }
            loading.show();
            util.ajax({
                url: url,
                type: 'get',
                success: function success(r) {
                    loading.hide();
                    _this5.updateEdgeDevices(r);
                }
            });
        }
    }, {
        key: 'updateEdgeDevices',
        value: function updateEdgeDevices(list) {
            //
            var property = this.propertyView.getRows().get(9).property;
            property.setEnum(list.map(function (d) {
                return d.name;
            }), list.map(function (d) {
                return d.displayname;
            }));
        }
    }, {
        key: 'updateDeviceInterfaces',
        value: function updateDeviceInterfaces(list) {
            //
            var property = this.propertyView.getRows().get(10).property;
            property.setEnum(list.map(function (d) {
                return d.name;
            }), list.map(function (d) {
                return d.displayname;
            }));

            this.interfaceList = JSON.parse(JSON.stringify(list));
        }
    }, {
        key: 'getInterfaceDisplayName',
        value: function getInterfaceDisplayName(interfaceName) {
            var rtnVal = {};
            this.interfaceList.forEach(function (item) {
                for (var key in item) {
                    if (key === 'name' && item[key] === interfaceName) {
                        rtnVal = item['displayname'];
                        break;
                    }
                }
            });
            return rtnVal;
        }
    }, {
        key: 'getDeviceInterfaces',
        value: function getDeviceInterfaces(deviceName) {
            var self = this;
            var url = API_HEAD + 'getDeviceInterfaces';

            url += '/' + deviceName;
            loading.show();
            util.ajax({
                url: url,
                type: 'get',
                success: function success(r) {
                    loading.hide();
                    self.updateDeviceInterfaces(r);
                }
            });
        }
    }, {
        key: 'initListView',
        value: function initListView() {
            var _this6 = this;

            var self = this,
                listView = self.listView;
            ht.Default.setImage('productIcon', {
                width: self.LIST_ICON_SIZE,
                height: self.LIST_ICON_SIZE,
                comps: [{
                    type: 'image',
                    stretch: 'uniform',
                    rect: [0, 0, self.LIST_ICON_SIZE, self.LIST_ICON_SIZE],
                    name: { func: function func(data) {
                            return data.a('img');
                        } }
                }]
            });
            // list view
            listView.setRowHeight(25);
            listView.enableToolTip();
            listView.drawRowBackground = function (g, data, selected, x, y, width, height) {
                if (this.isSelected(data)) {
                    g.fillStyle = '#87A6CB';
                } else if (this.getRowIndex(data) % 2 === 0) {
                    g.fillStyle = '#FAFAFA';
                } else {
                    g.fillStyle = '#FFFFFF';
                }
                g.beginPath();
                g.rect(x, y, width, height);
                g.fill();
            };
            listView.setIndent(10);
            listView.getIcon = function (data) {
                return 'productIcon';
            };
            listView.getLabel = function (data) {
                return data.a('displayName');
            };
            listView.getLabelColor = function (data) {
                return _this6.isListDataDragable(data) ? '#000' : '#ddd';
            };
            // listView.setVisibleFunc(function(data){
            // 	var key = self.searchInput.getElement().value;
            // 	if (key) {
            // 		key = key.replace(/^\s?|\s?/g, '');
            // 		return data.a('name').toLowerCase().indexOf(key.toLowerCase()) >= 0;
            // 	}
            // 	return true;
            // })
            listView.handleDragAndDrop = this.handleListDND.bind(self);
        }
    }, {
        key: 'isListDataDragable',
        value: function isListDataDragable(data) {
            var list = this.dm.getDatas().toArray();

            for (var i = 0; i < list.length; i++) {
                if (list[i].a('deviceName') === data.a('deviceName')) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'handleIconDND',
        value: function handleIconDND(e, state) {
            var self = this,
                iconPane = self.iconPane,
                dm = self.gv.dm();
        }
    }, {
        key: 'handleListDND',
        value: function handleListDND(e, state) {
            var listView = this.listView,
                deviceTypes = this.deviceTypes,
                dnd = this.dnd;
            if (state === 'prepare') {
                var data = listView.getDataAt(e);
                listView.sm().ss(data);
                if (dnd.dragImage && dnd.dragImage.parentNode) {
                    document.body.removeChild(dnd.dragImage);
                }
                if (this.isListDataDragable(data)) {
                    dnd.dragImage = ht.Default.toCanvas(data.a('img') || 'node_image', this.LIST_ICON_SIZE, this.LIST_ICON_SIZE, 'centerUniform');
                }
            }

            if (!dnd.dragImage) return;
            if (state === 'begin') {
                if (dnd.dragImage) {
                    var pagePoint = ht.Default.getPagePoint(e);
                    dnd.dragImage.style.left = pagePoint.x - dnd.dragImage.width / 2 + 'px';
                    dnd.dragImage.style.top = pagePoint.y - dnd.dragImage.height / 2 + 'px';
                    document.body.appendChild(dnd.dragImage);
                }
            } else if (state === 'between') {
                var dragImage = dnd.dragImage;
                if (dragImage) {
                    var pagePoint = ht.Default.getPagePoint(e);
                    dragImage.style.left = pagePoint.x - dragImage.width / 2 + 'px';
                    dragImage.style.top = pagePoint.y - dragImage.height / 2 + 'px';
                }
            } else if (state === 'end') {
                if (ht.Default.containedInView(e, this.gv)) {
                    var node = this._lastAdd = new ht.Node(),
                        sd = this.listView.sm().ld();
                    if (sd.a('img')) {
                        node.setImage(sd.a('img'));
                    }
                    if (this.propertyForm.v('showLabel')) {
                        node.setName(sd.a('displayName') || null);
                    }
                    //    node.s('2d.editable', false);
                    node.a({
                        url: sd.a('url')
                    });
                    node.a(sd.getAttrObject());
                    node.p(this.gv.lp(e));
                    if (sd.a('type_name') === RACK) {
                        node.setImage('symbols/rack3d.json');
                    } else {
                        var imgname = undefined;
                        for (var key in deviceTypes) {
                            if (sd.a('type_name') === deviceTypes[key]) {
                                imgname = key;
                                break;
                            }
                        }
                        node.setImage('./imgs/deviceicons/' + imgname + '.png');
                        //node.setImage('./imgs/cisco/host.png');
                        //this.dropDialogForm.reset();
                        //this.dropDialog.show();
                    }
                    {
                        node.s('label.position', 31);
                        node.s('label.rotation', 0);
                    }
                    {
                        node.s('label.font', 'bold 14px sans-serif');
                        node.a('fontBold', 'bold');
                        node.a('fontFamily', 'sans-serif');
                        node.a('fontSize', 14);
                    }
                    {
                        node.s('label.color', 'rgb(0,0,0,1)');
                    }
                    {
                        node.s('label.scale', 1);
                    }
                    this.gv.dm().add(node);
                }
                if (dnd.dragImage && dnd.dragImage.parentNode) {
                    document.body.removeChild(dnd.dragImage);
                }
                dnd.dragImage = null;
            }
        }
    }, {
        key: 'loadListDatas',
        value: function loadListDatas() {
            var self = this,
                url = API_HEAD + 'searchRackListForDCIMWidget';

            {
                url += '?area_id=' + self.areaId;
            }
            util.ajax({
                url: url,
                type: 'get',
                success: function success(r) {
                    var dm = self.listView.dm();

                    dm.clear();
                    if (r.message) {
                        return;
                    }
                    r.forEach(function (d) {
                        var data = new ht.Data();
                        data.a(d);
                        data.setToolTip('<p>Display Name: ' + d.displayName + '</p>\n                            <p>Device Name:  ' + d.deviceName + '</p>\n                            <p>CI: ' + d.ci_name + '</p>');
                        dm.add(data);
                    });
                },
                error: function error(s) {
                    console.log(s);
                }
            });
        }
    }, {
        key: 'loadProductInfo',
        value: function loadProductInfo() {
            var _this7 = this;

            util.ajax({
                url: API_HEAD + 'getProductMapIcon',
                type: 'get',
                success: function success(r) {
                    var size = _this7.COMBOBOX_IMAGE_SIZE;
                    _this7.productInfos = r;
                    _this7.productInfos.forEach(function (pi) {
                        ht.Default.setImage(pi.product_id + pi.product_name, {
                            width: size,
                            height: size,
                            comps: [{
                                type: 'image',
                                stretch: 'uniform',
                                rect: [0, 0, size, size],
                                name: pi.image_map
                            }]
                        });
                        _this7.loadImagesForProduct(pi.product_id);
                    });
                    _this7.initDialog();
                }
            });
        }
    }, {
        key: 'getProductImageById',
        value: function getProductImageById(id) {
            var list = this.productInfos;
            for (var i = 0; i < list.length; i++) {
                if (list[i].product_id === id) {
                    return list[i].image_map;
                }
            }
        }
    }, {
        key: 'loadImagesForProduct',
        value: function loadImagesForProduct(id) {
            var _this8 = this;

            var imgs = this.productImgMap[id];

            if (!imgs) {
                util.ajax({
                    url: API_HEAD + 'getImagesForProduct/' + id,
                    type: 'get',
                    success: function success(r) {
                        var list = [];
                        r.forEach(function (item) {
                            for (var key in item) {
                                if (item[key][0] === '{') {
                                    ht.Default.setImage(key, ht.Default.parse(item[key]));
                                } else {
                                    ht.Default.setImage(key, item[key]);
                                }
                                list.push(key);
                            }
                        });
                        _this8.productImgMap[id] = list;
                    }
                });
            }
        }
    }, {
        key: 'dm',
        get: function get$$1() {
            return this.gv.dm();
        }
    }]);
    return CMS;
}();

window.cms = new CMS();

})));
