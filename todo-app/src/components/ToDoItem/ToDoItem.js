import React from 'react';
import PropTypes from 'prop-types';
import './ToDoItem.css';
import Checkbox from '@material-ui/core/Checkbox';

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.state = { isChecked: false };
  }

  handleChange(event) {
    this.setState({ isChecked: event.target.checked });
  }

  handleRemoveItem() {
    this.props.onRemoveItem(this.props.id);
  }

  render() {
    const { isChecked } = this.state;
    const { id, name } = this.props;
    const itemClass = isChecked ? 'item-complete' : '';

    return (
      <div className="row flex-nowrap align-items-center">
        <div className="col-1">
          <Checkbox
            className="px-0"
            data-testid={`checkbox-${id}`}
            id={`${id}`}
            value={name}
            checked={isChecked}
            size="small"
            color="primary"
            onChange={this.handleChange}
            inputProps={{ 'aria-label': 'primary checkbox', 'data-testid': `clickable-checkbox-${id}` }}
          />
        </div>
        <div data-testid="item-name" className={`col-10 text-truncate ${itemClass}`}>
          {name}
        </div>
      </div>
    );
  }
}

ToDoItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default ToDoItem;


{ /* <Grid container spacing={1} alignItems="center" wrap="nowrap">
            <Grid item>
              <Checkbox
                data-testid="checkbox"
                id={id}
                value={name}
                checked={isChecked}
                size="small"
                color="primary"
                onChange={this.handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item xs zeroMinWidth className={`${itemClass}`}>
              <Typography noWrap>
                {name}
              </Typography>
            </Grid>
          </Grid> */ }
