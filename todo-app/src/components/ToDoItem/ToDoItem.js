import React from 'react';
import PropTypes from 'prop-types';
import './ToDoItem.css';
import Checkbox from '@material-ui/core/Checkbox';
import Item from '../../modules/Item';

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
    this.props.onRemoveItem(this.props.item.id);
  }

  render() {
    const { isChecked } = this.state;
    const { item } = this.props;
    const itemClass = isChecked ? 'item-complete' : '';

    return (
      <div className="row flex-nowrap align-items-center">
        <div className="col-1">
          <Checkbox
            className="px-0"
            data-testid={`checkbox-${item.id}`}
            id={`${item.id}`}
            value={item.name}
            checked={item.ischecked}
            size="small"
            color="primary"
            onChange={this.handleChange}
            inputProps={{ 'aria-label': 'primary checkbox', 'data-testid': `clickable-checkbox-${item.id}` }}
          />
        </div>
        <div data-testid="item-name" className={`col-10 text-truncate ${itemClass}`}>
          {`${item.name}`}
        </div>
      </div>
    );
  }
}

ToDoItem.propTypes = {
  item: PropTypes.instanceOf(Item).isRequired,
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
