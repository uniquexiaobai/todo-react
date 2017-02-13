import React, { Component } from 'react';
import TodoItem from './todo_item';
import TodoFooter from './footer';

const ENTER_KEY = 13;
const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null,
      todos: [],
      newTodo: ''
    };
  }

  render() {
    let footer, main;
    const todos = this.state.todos;

    const showTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

    const todoItems = showTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel.bind(this)}        
        >
        </TodoItem>
      );
    });

    const activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer = (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onToggleShowing={this.toggleShowing.bind(this)}
          onClearCompleted={this.clearCompleted.bind(this)}
        />
      );
    }

    if (todos.length) {
      main = (
        <div className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll.bind(this)}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }

  handleChange(e) {
    this.setState({newTodo: e.target.value});
  }

  handleNewTodoKeyDown(e) {
    if (e.keyCode !== ENTER_KEY) return;
    e.preventDefault();
    const newTodo = this.state.newTodo.trim();

    if (newTodo) {
      const newTodoObj = {
        id: Date.now(),
        title: newTodo,
        completed: false
      };
      const newTodos = this.state.todos.slice().concat(newTodoObj);
      
      this.setState({
        todos: newTodos,
        newTodo: ''
      });
    }
  }

  toggleAll(e) {
    const checked = e.target.checked;
    const todos = this.state.todos;

    const newTodos = todos.map((todo) => {
      return Object.assign({}, todo, {completed: checked});
    });
    this.setState({todos: newTodos});
  }

  toggle(todoToToggle) {
    const todos = this.state.todos;

    const newTodos = todos.map((todo) => {
      return todo !== todoToToggle ?
        todo :
        Object.assign({}, todo, {completed: !todo.completed});
    });
    this.setState({todos: newTodos});
  }

  destroy(todoToDestroy) {
    const newTodos = this.state.todos.filter((todo) => {
      return todo !== todoToDestroy;
    });
    this.setState({todos: newTodos});
  }

  edit(todoToEdit) {
    this.setState({editing: todoToEdit.id});
  }

  save(todoToSave, text) {
    const newTodos = this.state.todos.map((todo) => {
      return todo !== todoToSave ? todo : Object.assign({}, todo, {title: text});
    });
    this.setState({todos: newTodos, editing: null});
  }

  cancel() {
    this.setState({editing: null});
  }

  toggleShowing(nowShowing) {
    this.setState({nowShowing: nowShowing});
  }

  clearCompleted() {
    const newTodos = this.state.todos.filter((todo) => {
      return !todo.completed;
    });

    this.setState({todos: newTodos});
  }
}

export default App;
