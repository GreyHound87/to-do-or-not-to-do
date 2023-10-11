import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

/* NewTaskForm - компонент-представление для создания новой задачи */
/* Задачи и ответственность: отображает форму для создания новой задачи,
 отвечает за создание новых задач и управления вводом текста  */

export default class NewTaskForm extends Component {
  newTaskRef = React.createRef()

  state = {
    label: '',
  }

  componentDidMount() {
    this.focusNewTask()
  }

  /* Управление состоянием через локальное состояние компонента */

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label } = this.state
    if (label.trim() !== '') {
      /* Обновление состояния происходит через обратные вызовы */
      const { onTaskAdded } = this.props
      onTaskAdded(label)
      this.setState({
        label: '',
      })
    }
  }

  focusNewTask() {
    if (this.newTaskRef.current) {
      this.newTaskRef.current.focus()
    }
  }

  render() {
    const { label } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          <span className="visually-hidden">What needs to be done?</span>
          <input
            type="text"
            className="new-todo"
            id="new-todo"
            name="new-todo"
            placeholder="What needs to be done?"
            maxLength="20"
            onChange={this.onLabelChange}
            value={label}
            pattern=".{1,}"
            required
            ref={this.newTaskRef}
            style={{
              backgroundColor: label.length > 0 && label.trim() === '' ? 'rgba(175, 47, 47, 0.15)' : 'initial',
            }}
          />
        </label>
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
}
