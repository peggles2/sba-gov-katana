import React from 'react';

class ButtonBase extends React.Component {
    handleClick(){
        document.location.href  = this.props.URL || this.props.url;
    }
  render() {
    let buttonProps = {
      id: this.props.id,
      className: this.props.buttonClassName,
      disabled: this.props.disabled,
      formtarget: this.props.newWindow
        ? "_blank"
        : "_self",
      onClick: this.props.onClick
        ? this.props.onClick
        : this.handleClick.bind(this)
    };
    return (
      <button {...buttonProps}>{this.props.text}</button>
    );
  }
}

export default ButtonBase;
