import React, { Component } from "react";
import PropTypes from "prop-types";

const replaceCaret = (el, activateAfterChange) => {
  const isTargetFocused = document.activeElement === el;

  // Place the caret at the end of the element
  const target = document.createTextNode("");

  // Put empty text node at the end of input
  el.appendChild(target);

  // do not move caret if element was not focused
  if (
    target !== null &&
    target.nodeValue !== null &&
    (isTargetFocused || activateAfterChange)
  ) {
    const sel = window.getSelection();
    if (sel !== null) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
};

export class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.msgRef = React.createRef();
  }

  handleKeyPress = (evt) => {
    const {
      props: { onKeyPress },
    } = this;
    onKeyPress?.(evt);
  };

  handleInput = (evt) => {
    const {
      props: { onChange },
    } = this;

    const target = evt.target;
    onChange?.(target.value);
  };

  // Public API
  focus() {
    if (typeof this.msgRef.current !== "undefined") {
      this.msgRef.current.focus();
    }
  }

  componentDidMount() {
    if (this.props.autoFocus === true) {
      this.msgRef.current.focus();
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      msgRef,
      props: { placeholder, disabled, activateAfterChange },
    } = this;

    if (typeof msgRef.current === "undefined") {
      return true;
    }

    if (nextProps.value !== msgRef.current.value) {
      return true;
    }

    // DO NOT place callbacks here in comparison!
    return (
      placeholder !== nextProps.placeholder ||
      disabled !== nextProps.disabled ||
      activateAfterChange !== nextProps.activateAfterChange
    );
  }

  componentDidUpdate() {
    const {
      msgRef,
      props: { value, activateAfterChange },
    } = this;

    if (value !== msgRef.current.value) {
      msgRef.current.value = typeof value === "string" ? value : "";
    }

    replaceCaret(msgRef.current, activateAfterChange);
  }

  render() {
    const {
        msgRef,
        handleInput,
        handleKeyPress,
        props: { placeholder, disabled, className, value: _value, activateAfterChange: _activateAfterChange, autoFocus: _autoFocus, onChange: _onChange, onKeyPress: _onKeyPress, ...rest },
      } = this,
      ph = typeof placeholder === "string" ? placeholder : "";

    return (
      <input
        ref={msgRef}
        className={className}
        disabled={disabled}
        placeholder={ph}
        onInput={handleInput}
        onKeyPress={handleKeyPress}
        {...rest}
      />
    );
  }
}

ContentEditable.propTypes = {
  /** Value. */
  value: PropTypes.string,

  /** Placeholder. */
  placeholder: PropTypes.string,

  /** A input can show it is currently unable to be interacted with. */
  disabled: PropTypes.bool,

  /**
   * Sets focus element and caret at the end of input
   * when value is changed programmatically (e.g) from button click and element is not active
   */
  activateAfterChange: PropTypes.bool,

  /** Set focus after mount. */
  autoFocus: PropTypes.bool,

  /**
   * onChange handler<br>
   * @param {String} value
   */
  onChange: PropTypes.func,

  /**
   * onKeyPress handler<br>
   * @param {String} value
   */
  onKeyPress: PropTypes.func,

  /** Additional classes. */
  className: PropTypes.string,
};

export default ContentEditable;
