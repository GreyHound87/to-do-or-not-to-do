import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
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

  newTaskRef = React.createRef()

  state = {
    label: '',
    timer: {
      months: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      total: null,
    },
  }

  componentDidMount() {
    this.focusNewTask()
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onTimerChange = (unit, value) => {
    const { timer } = this.state
    const updatedTimer = { ...timer }
    const milliseconds = NewTaskForm.convertToMilliseconds(unit, parseInt(value, 10))
    updatedTimer[unit] = milliseconds
    this.setState(() => ({
      timer: updatedTimer,
    }))
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label, timer } = this.state
    timer.total = Object.values(timer).reduce((acc, time) => acc + (time || 0), 0)

    const finalTimer = timer.total === 0 ? null : timer.total
    if (label.trim() !== '') {
      const { onTaskAdded } = this.props
      onTaskAdded(label, finalTimer)
      this.setState({
        label: '',
        timer: {
          months: null,
          days: null,
          hours: null,
          minutes: null,
          seconds: null,
          total: null,
        },
      })
    }
  }

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e)
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
      <form
        className="main-form"
        onSubmit={(e) => {
          e.preventDefault()
          this.onSubmit(e)
        }}
      >
        <label>
          <span className="visually-hidden">What needs to be done?</span>
          <input
            type="text"
            className="new-todo"
            id="new-todo"
            name="new-todo"
            placeholder="What needs to be done?"
            maxLength="100"
            onChange={this.onLabelChange}
            value={label}
            pattern=".{1,}"
            required
            ref={this.newTaskRef}
            style={{
              backgroundColor: label.length > 0 && label.trim() === '' ? 'rgba(175, 47, 47, 0.15)' : 'initial',
            }}
          />
          {label.trim() !== '' && (
            <div className="timer-container">
              <p className="timer-mess">You can add a timer to the task to track time.</p>
              <select
                className="new-todo-form__timer"
                id="months"
                onKeyDown={this.handleSubmit}
                onChange={(e) => this.onTimerChange('months', e.target.value)}
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
                className="new-todo-form__timer"
                id="days"
                onKeyDown={this.handleSubmit}
                onChange={(e) => this.onTimerChange('days', e.target.value)}
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
                className="new-todo-form__timer"
                id="hours"
                onKeyDown={this.handleSubmit}
                onChange={(e) => this.onTimerChange('hours', e.target.value)}
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
                className="new-todo-form__timer"
                id="minutes"
                onKeyDown={this.handleSubmit}
                onChange={(e) => this.onTimerChange('minutes', e.target.value)}
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
                className="new-todo-form__timer"
                id="seconds"
                onKeyDown={this.handleSubmit}
                onChange={(e) => this.onTimerChange('seconds', e.target.value)}
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
              <button className="new-todo-form__submit" type="submit">
                ⏎
              </button>
            </div>
          )}
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
