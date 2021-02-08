// @flow
import React, { Component } from 'react';
import './Button.scss';

// render with <Button secondary/tertiary /> for different style classes
// btnContainer used in instances where necessary e.g. ConfirmationModal

type Props = {
  onClick: Function,
  label: string,
  disabled?: boolean,
  classOverride: string,
  type?: string,
  isHidden?: boolean,
};

export default class Button extends Component<Props> {
  render() {
    const {
      onClick,
      label,
      disabled,
      classOverride,
      type,
      isHidden,
    } = this.props;
    const buttonType = isHidden ? 'hidden' : '' || type || 'primary';

    return (
      <div onClick={onClick} className="btnContainer" role="presentation">
        <button
          className={`${String(buttonType)} ${String(classOverride)}`}
          disabled={disabled}
        >
          {label}
        </button>
      </div>
    );
  }
}
