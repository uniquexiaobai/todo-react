import React, { Component } from 'react';
import classNames from 'classnames';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItem extends Component {
  state = {
    editText: this.props.todo.title
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.eidting && this.props.editing) {
      const len = this.editField.value.length;

      this.editField.focus();
      this.editField.setSelectionRange(len, len);
    }
  }

  render() {
    return(
      <li className={classNames({
        completed: this.props.todo.completed,
        editing: this.props.editing
      })}>
        <div className="view">
          <input 
            className="toggle"
            type="checkbox" 
            checked={this.props.todo.completed}
            onChange={this.props.onToggle.bind(this)}
          />
          <label onDoubleClick={this.handleEdit.bind(this)}>
            {this.props.todo.title}
          </label>
          <button className="destroy" onClick={this.props.onDestroy.bind(this)} />
        </div>
        <input 
          ref={(input) => this.editField = input}
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </li>
    );
  }

  handleEdit() {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  }
  
  handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel();
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const val = this.state.editText.trim();

    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  }

  handleChange(e) {
    if (this.props.editing) {
      this.setState({editText: e.target.value});
    }
  }
}

export default TodoItem;
