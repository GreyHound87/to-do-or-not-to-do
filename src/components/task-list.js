import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from './task'
import './task-list.css'

/* TaskList - компонент-контейнер, отображающий список задач */

/* Задачи и ответственность: отвечает за фильтрацию и отображение списка задач,
решает задачу управления отдельными тасками, включая редактирование и удаление,
включает в себя компоненты Task, каждый из которых представляет отдельную задачу
  */

/* Возможно, рационально было бы разделить TaskList на несколько более мелких компонентов */

export default class TaskList extends Component {
  /* хранит локальное состояние editedLabel и editedId,
  Возможно, стоит переместить в TodoApp ?.. */

  inputRef = React.createRef() // Create a ref for the input element

  state = {
    /* null для установки исходника в инпут при редактировании */
    editedLabel: null,
    editedId: '',
  }

  componentDidMount() {
    this.focusInput()
  }

  componentDidUpdate(prevProps) {
    const { tasks } = this.props
    if (tasks.some((task) => task.editing !== prevProps.tasks.find((prevTask) => prevTask.id === task.id)?.editing)) {
      this.focusInput()
    }
  }

  /* Управление состоянием через локальное состояние компонента */

  onLabelChange = (e, id) => {
    this.setState({
      editedLabel: e.target.value,
      editedId: id,
    })
  }

  onSubmit = (e) => {
    const { editedLabel, editedId } = this.state
    const { editTask } = this.props
    if (e.key === 'Enter' && editedLabel === null) {
      this.setState({ editedLabel: null, editedId: '' })
    } else if (e.key === 'Enter' && editedLabel.trim() === '') {
      this.setState({ editedLabel: null, editedId: '' })
    } else if (e.key === 'Enter') {
      editTask(editedLabel, editedId)
      this.setState({ editedLabel: null, editedId: '' })
    }
  }

  onBlur = (id) => {
    const { onBlur } = this.props
    this.setState({
      editedLabel: null,
      editedId: '',
    })
    onBlur(id)
  }

  focusInput() {
    if (this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }

  render() {
    const { editedLabel } = this.state
    const { tasks, onDestroy, onToggleCompleted, onToggleEditing } = this.props
    const elements = tasks.map((item) => (
      <li
        key={item.id}
        className={`${item.completed ? 'completed' : ''}
        ${item.editing ? 'editing' : ''}`}
      >
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
            pattern=".{1,}"
            required
            maxLength="20"
            /* null для исходника при редактировании */
            value={editedLabel === null ? item.label : editedLabel}
            placeholder={item.label}
            onChange={(e) => this.onLabelChange(e, item.id)}
            onKeyDown={this.onSubmit}
            onBlur={() => this.onBlur(item.id)}
            ref={this.inputRef}
            style={{
              backgroundColor:
                typeof editedLabel === 'string' && editedLabel.trim() === '' ? 'rgba(175, 47, 47, 0.15)' : 'initial',
            }}
          />
        )}
      </li>
    ))

    return (
      <main className="main">
        <ul className="todo-list">{elements}</ul>
      </main>
    )
  }
}

TaskList.defaultProps = {
  tasks: [],
  onDestroy: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  editTask: () => {},
  onBlur: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
      completed: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
    })
  ),
  onDestroy: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  editTask: PropTypes.func,
  onBlur: PropTypes.func,
}
