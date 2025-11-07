"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ContentEditable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _excluded = ["placeholder", "disabled", "className", "value", "activateAfterChange", "autoFocus", "onChange", "onKeyPress"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var replaceCaret = function replaceCaret(el, activateAfterChange) {
  var isTargetFocused = document.activeElement === el;

  // Place the caret at the end of the element
  var target = document.createTextNode("");

  // Put empty text node at the end of input
  el.appendChild(target);

  // do not move caret if element was not focused
  if (target !== null && target.nodeValue !== null && (isTargetFocused || activateAfterChange)) {
    var sel = window.getSelection();
    if (sel !== null) {
      var range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
};
var ContentEditable = exports.ContentEditable = /*#__PURE__*/function (_Component) {
  function ContentEditable(props) {
    var _this;
    _classCallCheck(this, ContentEditable);
    _this = _callSuper(this, ContentEditable, [props]);
    _defineProperty(_this, "handleKeyPress", function (evt) {
      var _this2 = _this,
        onKeyPress = _this2.props.onKeyPress;
      onKeyPress === null || onKeyPress === void 0 ? void 0 : onKeyPress(evt);
    });
    _defineProperty(_this, "handleInput", function (evt) {
      var _this3 = _this,
        onChange = _this3.props.onChange;
      var target = evt.target;
      onChange === null || onChange === void 0 ? void 0 : onChange(target.value);
    });
    _this.msgRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  _inherits(ContentEditable, _Component);
  return _createClass(ContentEditable, [{
    key: "focus",
    value:
    // Public API
    function focus() {
      if (typeof this.msgRef.current !== "undefined") {
        this.msgRef.current.focus();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.autoFocus === true) {
        this.msgRef.current.focus();
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var msgRef = this.msgRef,
        _this$props = this.props,
        placeholder = _this$props.placeholder,
        disabled = _this$props.disabled,
        activateAfterChange = _this$props.activateAfterChange;
      if (typeof msgRef.current === "undefined") {
        return true;
      }
      if (nextProps.value !== msgRef.current.value) {
        return true;
      }

      // DO NOT place callbacks here in comparison!
      return placeholder !== nextProps.placeholder || disabled !== nextProps.disabled || activateAfterChange !== nextProps.activateAfterChange;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var msgRef = this.msgRef,
        _this$props2 = this.props,
        value = _this$props2.value,
        activateAfterChange = _this$props2.activateAfterChange;
      if (value !== msgRef.current.value) {
        msgRef.current.value = typeof value === "string" ? value : "";
      }
      replaceCaret(msgRef.current, activateAfterChange);
    }
  }, {
    key: "render",
    value: function render() {
      var msgRef = this.msgRef,
        handleInput = this.handleInput,
        handleKeyPress = this.handleKeyPress,
        _this$props3 = this.props,
        placeholder = _this$props3.placeholder,
        disabled = _this$props3.disabled,
        className = _this$props3.className,
        _value = _this$props3.value,
        _activateAfterChange = _this$props3.activateAfterChange,
        _autoFocus = _this$props3.autoFocus,
        _onChange = _this$props3.onChange,
        _onKeyPress = _this$props3.onKeyPress,
        rest = _objectWithoutProperties(_this$props3, _excluded),
        ph = typeof placeholder === "string" ? placeholder : "";
      return /*#__PURE__*/_react["default"].createElement("input", _extends({
        ref: msgRef,
        className: className,
        disabled: disabled,
        placeholder: ph,
        onInput: handleInput,
        onKeyPress: handleKeyPress
      }, rest));
    }
  }]);
}(_react.Component);
process.env.NODE_ENV !== "production" ? ContentEditable.propTypes = {
  /** Value. */
  value: _propTypes["default"].string,
  /** Placeholder. */
  placeholder: _propTypes["default"].string,
  /** A input can show it is currently unable to be interacted with. */
  disabled: _propTypes["default"].bool,
  /**
   * Sets focus element and caret at the end of input
   * when value is changed programmatically (e.g) from button click and element is not active
   */
  activateAfterChange: _propTypes["default"].bool,
  /** Set focus after mount. */
  autoFocus: _propTypes["default"].bool,
  /**
   * onChange handler<br>
   * @param {String} value
   */
  onChange: _propTypes["default"].func,
  /**
   * onKeyPress handler<br>
   * @param {String} value
   */
  onKeyPress: _propTypes["default"].func,
  /** Additional classes. */
  className: _propTypes["default"].string
} : void 0;
var _default = exports["default"] = ContentEditable;