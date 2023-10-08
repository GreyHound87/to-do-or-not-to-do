import React, { Component } from "react";
import PropTypes from "prop-types";
import Task from './task';
import './task-list.css';

/* TaskList - компонент-контейнер, отображающий список задач */

/* Задачи и ответственность: отвечает за фильтрацию и отображение списка задач,
решает задачу управления отдельными тасками, включая редактирование и удаление,
включает в себя компоненты Task, каждый из которых представляет отдельную задачу
  */

/* Возможно, рационально было бы разделить TaskList на несколько более мелких компонентов */

export default class TaskList extends Component {

  /* хранит локальное состояние editedLabel и editedId,
  Возможно, стоит переместить в TodoApp ?.. */

  state = {
    /* null для исходника при редактировании */
    editedLabel: null,
    editedId: '',
  };  

  static defaultProps = {
    tasks: [],
    onDestroy: () => {},
    onToggleCompleted: () => {},
    onToggleEditing: () => {},
    editTask: () => {},
    onBlurEditing: () => {}
  };

  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        completed: PropTypes.bool.isRequired,
        editing: PropTypes.bool.isRequired,
    })),
    onDestroy: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    editTask: PropTypes.func,
    onBlurEditing: PropTypes.func,
  };

  /* Управление состоянием через локальное состояние компонента */

  onLabelChange = (e, id) => {
    this.setState({ 
      editedLabel: e.target.value,
      editedId: id
    });
  };

  onSubmit = (e) => {
    if (e.key === 'Enter' && this.state.editedLabel === null) {
      window.alert('Enter task text!');
    } else if (e.key === 'Enter' && this.state.editedLabel.trim() === '') {
      window.alert('Enter task text!');
    } else if (e.key === 'Enter') {
      this.props.editTask(this.state.editedLabel, this.state.editedId);
      this.setState({ editedLabel: null, editedId: '' });
    }
  };  

  render() {
    const { tasks, onDestroy, onToggleCompleted, onToggleEditing } = this.props;
    const elements = tasks.map((item) => (
     
      <li key={item.id} className={`${item.completed ? "completed" : ""} ${item.editing ? "editing" : ""}`}>
        <Task
          label={item.label}
          id={item.id}
          created={item.created}
          completed={item.completed}
          onDestroy={() => onDestroy(item.id)}
          onToggleCompleted={() => onToggleCompleted(item.id)}
          onToggleEditing={() => onToggleEditing(item.id)}
        />
        {/* для автофокуса при редактировании */}
        {item.editing && (
          <input
            type="text"
            className="edit"
            id={`edit-${item.id}`}
            name={`edit-${item.id}`} 
            autoFocus
            /* null для исходника при редактировании */
            value={this.state.editedLabel === null ? item.label : this.state.editedLabel}
            placeholder={ item.label }
            onChange={(e) => this.onLabelChange(e, item.id)}
            onKeyDown={this.onSubmit}
            onBlur={() => this.props.editTask(item.label, item.id)}
          />
        )}
      </li>
    ));

    return (
      <main className="main">
        <ul className="todo-list">
          {elements}
        </ul>
      </main>
    );
  }
}
