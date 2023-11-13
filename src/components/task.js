import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import classnames from 'classnames'

import formatTimeLeft from '../helpers/format-time-left'

import './task.css'

function Task({
  label,
  id,
  completed,
  created,
  timer,
  tracking,
  onToggleCompleted,
  onToggleEditing,
  onDestroy,
  onTogglePlay,
  onTogglePause,
}) {
  Task.defaultProps = {
    label: '',
    id: '',
    completed: false,
    created: new Date(),
    timer: null,
    tracking: false,
    onToggleCompleted: () => {},
    onToggleEditing: () => {},
    onDestroy: () => {},
    onTogglePlay: () => {},
    onTogglePause: () => {},
  }

  Task.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
    created: PropTypes.instanceOf(Date),
    timer: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
    tracking: PropTypes.bool,
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onDestroy: PropTypes.func,
    onTogglePlay: PropTypes.func,
    onTogglePause: PropTypes.func,
  }

  const formattedTimeLeft = formatTimeLeft(timer)

  const timeLeftMod = classnames({
    'time-left--very-low': timer <= 86400000,
    'time-left--low': timer > 86400000 && timer <= 604800000,
    'time-left--medium': timer > 604800000 && timer <= 2592000000,
    'time-left--sufficient': timer > 2592000000,
  })

  return (
    <div
      className="view"
      style={{
        backgroundColor: timer === 0 ? 'rgba(175, 47, 47, 0.15)' : 'initial',
      }}
    >
      <div className="task-wrapper">
        <input
          className="toggle visually-hidden"
          type="checkbox"
          id={`task-${id}`}
          name={`task-${id}`}
          checked={completed}
          onChange={onToggleCompleted}
        />
        <label htmlFor={`task-${id}`}>
          <span className="description">{label}</span>
          <span className="created">{`created ${formatDistanceToNow(created, {
            includeSeconds: true,
          })} ago`}</span>
          {timer !== null && (
            <span
              className={classnames('time-left', { 'blinking-text': tracking && timer && !completed }, timeLeftMod)}
            >
              {formattedTimeLeft}
            </span>
          )}
        </label>
      </div>
      <div className="btn-wrapper">
        <button
          id={`play-btn-${id}`}
          className="icon icon-play"
          type="button"
          onClick={onTogglePlay}
          disabled={completed}
          style={{
            display: timer !== null && timer > 0 && !tracking && !completed ? 'flex' : 'none',
          }}
        >
          <span className="visually-hidden">play task</span>
        </button>

        <button
          id={`pause-btn-${id}`}
          className="icon icon-pause"
          type="button"
          onClick={onTogglePause}
          disabled={completed}
          style={{
            display: timer !== null && timer > 0 && tracking && !completed ? 'flex' : 'none',
          }}
        >
          <span className="visually-hidden">pause task</span>
        </button>

        <button
          id={`edit-btn-${id}`}
          className="icon icon-edit"
          type="button"
          onClick={onToggleEditing}
          disabled={completed}
          style={{ display: completed ? 'none' : 'initial' }}
        >
          <span className="visually-hidden">edit task</span>
        </button>

        <button id={`delete-btn-${id}`} className="icon icon-destroy" type="button" onClick={onDestroy}>
          <span className="visually-hidden">delete task</span>
        </button>
      </div>
    </div>
  )
}

export default Task
