/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';

class FormWithIcon extends Component {
  render() {
    const {
      onSubmit, onChange, text, inputClassName, isCollapsed, placeholder,
    } = this.props;
    const display = isCollapsed ? 'd-none' : '';
    return (
      <div className="row align-items-center">
        <div className="col-1">
          <AddIcon data-testid={`add-icon-for-${placeholder}`} onClick={onSubmit} />
        </div>
        <div className={`${display} col-10`}>
          <form onSubmit={onSubmit} noValidate autoComplete="off">
            <InputBase
              id="input for new list"
              placeholder={placeholder}
              onChange={onChange}
              value={text}
              className={`${inputClassName}`}
            />
          </form>
        </div>
      </div>
    );
  }
}

FormWithIcon.propTypes = {
  text: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputClassName: PropTypes.string,
  isCollapsed: PropTypes.bool,
};

FormWithIcon.defaultProps = {
  inputClassName: '',
  isCollapsed: false,
};

export default FormWithIcon;
