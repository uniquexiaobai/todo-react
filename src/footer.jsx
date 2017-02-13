import React, { Component } from 'react';
import classNames from 'classnames';

const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

class TodoFooter extends Component {
  render() {
    const activeTodoWord = this.props.count === 1 ? 'item' : 'items';
    let clearButton = null;

    if (this.props.completedCount) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}
        >
          Clear completed
        </button>
      );
    }
    const nowShowing = this.props.nowShowing;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a 
              onClick={this.props.onToggleShowing.bind(this, ALL_TODOS)}
              className={classNames({selected: nowShowing === ALL_TODOS})}
            >All</a>
          </li>
          {' '}
          <li>
            <a 
              onClick={this.props.onToggleShowing.bind(this, ACTIVE_TODOS)}
              className={classNames({selected: nowShowing === ACTIVE_TODOS})}
            >Active</a>
          </li>
          {' '}
          <li>
            <a 
              onClick={this.props.onToggleShowing.bind(this, COMPLETED_TODOS)}
              className={classNames({selected: nowShowing === COMPLETED_TODOS})}
            >Completed</a>
          </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}

export default TodoFooter;
