import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'

export default class TaskList extends Component {
  static convertToMilliseconds(unit, value) {
    const unitToMilliseconds = {
      months: 30 * 24 * 60 * 60 * 1000,
      days: 24 * 60 * 60 * 1000,
      hours: 60 * 60 * 1000,
      minutes: 60 * 1000,
      seconds: 1000,
    }

    return unitToMilliseconds[unit] * value || 0
  }

  inputRef = React.createRef()

  state = {
    editedId: '',
    editedLabel: null,
    editedTimer: {
      months: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      total: null,
    },
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

  onLabelChange = (e, id) => {
    this.setState({
      editedLabel: e.target.value,
      editedId: id,
    })
  }

  onTimerChange = (id, unit, value) => {
    const { editedTimer } = this.state
    const updatedTimer = { ...editedTimer }
    const milliseconds = TaskList.convertToMilliseconds(unit, parseInt(value, 10))
    updatedTimer[unit] = milliseconds
    this.setState(() => ({
      editedTimer: updatedTimer,
      editedId: id,
    }))
  }

  onSubmit = (e, label, timer, id) => {
    e.preventDefault()
    let { editedId, editedLabel } = this.state
    const { editedTimer } = this.state
    const { editTask } = this.props

    if (editedLabel === null || editedLabel.trim() === '') {
      editedLabel = label
    }
    if (Object.values(editedTimer).some((time) => time !== null)) {
      editedTimer.total = Object.values(editedTimer).reduce((acc, time) => acc + (time || 0), 0)
    } else {
      editedTimer.total = timer
    }

    if (editedId === null || editedId.trim() === '') {
      editedId = id
    }

    const finalTimer = editedTimer.total
    editTask(editedLabel, finalTimer, editedId)

    this.setState({
      editedId: '',
      editedLabel: null,
      editedTimer: {
        months: null,
        days: null,
        hours: null,
        minutes: null,
        seconds: null,
        total: null,
      },
    })
  }

  onBlur = (e, id) => {
    const { onBlur } = this.props
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return
    }
    this.setState({
      editedId: '',
      editedLabel: null,
      editedTimer: {
        months: null,
        days: null,
        hours: null,
        minutes: null,
        seconds: null,
        total: null,
      },
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
    const { tasks, onDestroy, onToggleCompleted, onToggleEditing, onTogglePlay, onTogglePause } = this.props
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
          timer={item.timer}
          tracking={item.tracking}
          onDestroy={() => onDestroy(item.id)}
          onToggleCompleted={() => onToggleCompleted(item.id)}
          onToggleEditing={() => onToggleEditing(item.id)}
          onTogglePlay={() => onTogglePlay(item.id)}
          onTogglePause={() => onTogglePause(item.id)}
        />
        {item.editing && (
          <form
            onBlur={(e) => this.onBlur(e, item.id)}
            onSubmit={(e) => {
              e.preventDefault()
              this.onSubmit(e, item.label, item.timer, item.id)
            }}
          >
            <input
              type="text"
              className="edit"
              id={`edit-text-${item.id}`}
              name={`edit-text-${item.id}`}
              pattern=".{1,}"
              required
              maxLength="100"
              value={editedLabel === null ? item.label : editedLabel}
              placeholder={item.label}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  this.onSubmit(e, item.label, item.timer, item.id)
                }
              }}
              onChange={(e) => this.onLabelChange(e, item.id)}
              ref={this.inputRef}
              style={{
                backgroundColor:
                  typeof editedLabel === 'string' && editedLabel.trim() === '' ? 'rgba(175, 47, 47, 0.15)' : 'initial',
              }}
            />
            <div className="edit-timer-container">
              <p className="edit-timer-mess">You can reset the task timer.</p>
              <select
                className="edit-todo-form__timer"
                id={`edit-months-${item.id}`}
                name={`edit-months-${item.id}`}
                onChange={(e) => this.onTimerChange(item.id, 'months', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    this.onSubmit(e, item.label, item.timer, item.id)
                  }
                }}
              >
                <option value="null">set months</option>
                <option value="null">0</option>
                <option value="1">1 month</option>
                <option value="2">2 months</option>
                <option value="3">3 months</option>
                <option value="4">4 months</option>
                <option value="5">5 months</option>
                <option value="6">6 months</option>
                <option value="7">7 months</option>
                <option value="8">8 months</option>
                <option value="9">9 months</option>
                <option value="10">10 months</option>
                <option value="11">11 months</option>
                <option value="12">12 months</option>
              </select>
              <select
                className="edit-todo-form__timer"
                id={`edit-days-${item.id}`}
                name={`edit-days-${item.id}`}
                onChange={(e) => this.onTimerChange(item.id, 'days', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    this.onSubmit(e, item.label, item.timer, item.id)
                  }
                }}
              >
                <option value="null">set days</option>
                <option value="null">0</option>
                <option value="1">1 day</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="4">4 days</option>
                <option value="5">5 days</option>
                <option value="6">6 days</option>
                <option value="7">7 days</option>
                <option value="8">8 days</option>
                <option value="9">9 days</option>
                <option value="10">10 days</option>
                <option value="11">11 days</option>
                <option value="12">12 days</option>
                <option value="13">13 days</option>
                <option value="14">14 days</option>
                <option value="15">15 days</option>
                <option value="16">16 days</option>
                <option value="17">17 days</option>
                <option value="18">18 days</option>
                <option value="19">19 days</option>
                <option value="20">20 days</option>
                <option value="21">21 days</option>
                <option value="22">22 days</option>
                <option value="23">23 days</option>
                <option value="24">24 days</option>
                <option value="25">25 days</option>
                <option value="26">26 days</option>
                <option value="27">27 days</option>
                <option value="28">28 days</option>
                <option value="29">29 days</option>
                <option value="30">30 days</option>
                <option value="31">31 days</option>
              </select>

              <select
                className="edit-todo-form__timer"
                id={`edit-hours-${item.id}`}
                name={`edit-hours-${item.id}`}
                onChange={(e) => this.onTimerChange(item.id, 'hours', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    this.onSubmit(e, item.label, item.timer, item.id)
                  }
                }}
              >
                <option value="null">set hours</option>
                <option value="null">0</option>
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
                <option value="5">5 hours</option>
                <option value="6">6 hours</option>
                <option value="7">7 hours</option>
                <option value="8">8 hours</option>
                <option value="9">9 hours</option>
                <option value="10">10 hours</option>
                <option value="11">11 hours</option>
                <option value="12">12 hours</option>
                <option value="13">13 hours</option>
                <option value="14">14 hours</option>
                <option value="15">15 hours</option>
                <option value="16">16 hours</option>
                <option value="17">17 hours</option>
                <option value="18">18 hours</option>
                <option value="19">19 hours</option>
                <option value="20">20 hours</option>
                <option value="21">21 hours</option>
                <option value="22">22 hours</option>
                <option value="23">23 hours</option>
                <option value="24">24 hours</option>
              </select>

              <select
                className="edit-todo-form__timer"
                id={`edit-minutes-${item.id}`}
                name={`edit-minutes-${item.id}`}
                onChange={(e) => this.onTimerChange(item.id, 'minutes', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    this.onSubmit(e, item.label, item.timer, item.id)
                  }
                }}
              >
                <option value="null">set minutes</option>
                <option value="null">0</option>
                <option value="1">1 minute</option>
                <option value="2">2 minutes</option>
                <option value="3">3 minutes</option>
                <option value="4">4 minutes</option>
                <option value="5">5 minutes</option>
                <option value="6">6 minutes</option>
                <option value="7">7 minutes</option>
                <option value="8">8 minutes</option>
                <option value="9">9 minutes</option>
                <option value="10">10 minutes</option>
                <option value="11">11 minutes</option>
                <option value="12">12 minutes</option>
                <option value="13">13 minutes</option>
                <option value="14">14 minutes</option>
                <option value="15">15 minutes</option>
                <option value="16">16 minutes</option>
                <option value="17">17 minutes</option>
                <option value="18">18 minutes</option>
                <option value="19">19 minutes</option>
                <option value="20">20 minutes</option>
                <option value="21">21 minutes</option>
                <option value="22">22 minutes</option>
                <option value="23">23 minutes</option>
                <option value="24">24 minutes</option>
                <option value="25">25 minutes</option>
                <option value="26">26 minutes</option>
                <option value="27">27 minutes</option>
                <option value="28">28 minutes</option>
                <option value="29">29 minutes</option>
                <option value="30">30 minutes</option>
                <option value="31">31 minutes</option>
                <option value="32">32 minutes</option>
                <option value="33">33 minutes</option>
                <option value="34">34 minutes</option>
                <option value="35">35 minutes</option>
                <option value="36">36 minutes</option>
                <option value="37">37 minutes</option>
                <option value="38">38 minutes</option>
                <option value="39">39 minutes</option>
                <option value="40">40 minutes</option>
                <option value="41">41 minutes</option>
                <option value="42">42 minutes</option>
                <option value="43">43 minutes</option>
                <option value="44">44 minutes</option>
                <option value="45">45 minutes</option>
                <option value="46">46 minutes</option>
                <option value="47">47 minutes</option>
                <option value="48">48 minutes</option>
                <option value="49">49 minutes</option>
                <option value="50">50 minutes</option>
                <option value="51">51 minutes</option>
                <option value="52">52 minutes</option>
                <option value="53">53 minutes</option>
                <option value="54">54 minutes</option>
                <option value="55">55 minutes</option>
                <option value="56">56 minutes</option>
                <option value="57">57 minutes</option>
                <option value="58">58 minutes</option>
                <option value="59">59 minutes</option>
                <option value="60">60 minutes</option>
              </select>
              <select
                className="edit-todo-form__timer"
                id={`edit-seconds-${item.id}`}
                name={`edit-seconds-${item.id}`}
                onChange={(e) => this.onTimerChange(item.id, 'seconds', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    this.onSubmit(e, item.label, item.timer, item.id)
                  }
                }}
              >
                <option value="null">set seconds</option>
                <option value="null">0</option>
                <option value="1">1 second</option>
                <option value="2">2 seconds</option>
                <option value="3">3 seconds</option>
                <option value="4">4 seconds</option>
                <option value="5">5 seconds</option>
                <option value="6">6 seconds</option>
                <option value="7">7 seconds</option>
                <option value="8">8 seconds</option>
                <option value="9">9 seconds</option>
                <option value="10">10 seconds</option>
                <option value="11">11 seconds</option>
                <option value="12">12 seconds</option>
                <option value="13">13 seconds</option>
                <option value="14">14 seconds</option>
                <option value="15">15 seconds</option>
                <option value="16">16 seconds</option>
                <option value="17">17 seconds</option>
                <option value="18">18 seconds</option>
                <option value="19">19 seconds</option>
                <option value="20">20 seconds</option>
                <option value="21">21 seconds</option>
                <option value="22">22 seconds</option>
                <option value="23">23 seconds</option>
                <option value="24">24 seconds</option>
                <option value="25">25 seconds</option>
                <option value="26">26 seconds</option>
                <option value="27">27 seconds</option>
                <option value="28">28 seconds</option>
                <option value="29">29 seconds</option>
                <option value="30">30 seconds</option>
                <option value="31">31 seconds</option>
                <option value="32">32 seconds</option>
                <option value="33">33 seconds</option>
                <option value="34">34 seconds</option>
                <option value="35">35 seconds</option>
                <option value="36">36 seconds</option>
                <option value="37">37 seconds</option>
                <option value="38">38 seconds</option>
                <option value="39">39 seconds</option>
                <option value="40">40 seconds</option>
                <option value="41">41 seconds</option>
                <option value="42">42 seconds</option>
                <option value="43">43 seconds</option>
                <option value="44">44 seconds</option>
                <option value="45">45 seconds</option>
                <option value="46">46 seconds</option>
                <option value="47">47 seconds</option>
                <option value="48">48 seconds</option>
                <option value="49">49 seconds</option>
                <option value="50">50 seconds</option>
                <option value="51">51 seconds</option>
                <option value="52">52 seconds</option>
                <option value="53">53 seconds</option>
                <option value="54">54 seconds</option>
                <option value="55">55 seconds</option>
                <option value="56">56 seconds</option>
                <option value="57">57 seconds</option>
                <option value="58">58 seconds</option>
                <option value="59">59 seconds</option>
                <option value="60">60 seconds</option>
              </select>
            </div>
            <button
              className="edit-todo-form__submit"
              type="submit"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  this.onSubmit(e, item.label, item.timer, item.id)
                }
              }}
              onClick={(e) => {
                this.onSubmit(e, item.label, item.timer, item.id)
              }}
            >
              ⏎
            </button>
          </form>
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
  onTogglePlay: () => {},
  onTogglePause: () => {},
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
  onTogglePlay: PropTypes.func,
  onTogglePause: PropTypes.func,
}
