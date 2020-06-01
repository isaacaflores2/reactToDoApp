import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.handleOnContextMenu = this.handleOnContextMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      mouseX: null,
      mouseY: null,
      targetId: null,
    };
  }

  handleOnContextMenu(event) {
    event.preventDefault();
    const id = Number(event.target.id);

    if (id == null) {
      throw 'handleOnContextMenu: Target does not contain an id property.';
    }

    this.setState({
      mouseX: event.clientX,
      mouseY: event.clientY,
      targetId: id,
    });
  }

  handleClose() {
    this.setState({
      mouseX: null,
      mouseY: null,
      targetId: null,
    });
  }

  render() {
    const { children, menu, showMenu } = this.props;
    const {
      mouseX, mouseY, targetId,
    } = this.state;

    return (
      <div data-testid="context-menu" onContextMenu={this.handleOnContextMenu} onClick={this.handleClose} onClose={this.handleClose}>
        { children }
        {
          ((mouseX != null && mouseY != null) && showMenu)
          && menu({ mouseX, mouseY, targetId })
        }
      </div>
    );
  }
}

ContextMenu.propTypes = {
  children: PropTypes.node.isRequired,
  menu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool,
};

ContextMenu.defaultProps = {
  showMenu: true,
};
