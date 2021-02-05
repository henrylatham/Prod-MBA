// @flow
import React, { Component } from 'react';
import './Button.scss';

// render with <Button secondary/tertiary /> for different style classes
// btnContainer used in instances where necessary e.g. ConfirmationModal

type Props = {
  onClick: Function,
  label: string,
  secondary?: boolean,
  tertiary?: boolean,
  quarternary?: boolean,
  disabled?: boolean,
  classOverride: string,
};

export default class Button extends Component<Props> {
  render() {
    const {
      onClick,
      label,
      secondary,
      tertiary,
      quarternary,
      disabled,
      classOverride,
      type,
    } = this.props;
    const buttonType = type || 'primary';

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
