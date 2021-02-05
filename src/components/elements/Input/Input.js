// @flow
import React, { Component } from 'react';
import './Input.scss';

type Props = {
  disabled?: boolean,
  htmlFor: string,
  label: string,
  onChange: Function,
  placeholder: string,
  value: string,
  className?: string,
};

export default class Input extends Component<Props> {
  render() {
    const {
      disabled,
      htmlFor,
      label,
      onChange,
      placeholder,
      value,
      className,
    } = this.props;

    const classes = `container ${className}`;

    return (
      <div className={classes}>
        <label htmlFor={htmlFor} className="input__label">
          <p>{label}</p>
          <div className="input__row">
            <input
              disabled={disabled}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
          </div>
        </label>
      </div>
    );
  }
}
