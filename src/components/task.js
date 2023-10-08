import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from 'date-fns';
import './task.css';

/* Task - функциональный компонент-представление, отдельная задача списка */

const Task = ({ label, id, completed, created, onToggleCompleted, onToggleEditing, onDestroy }) => {
  
  Task.defaultProps = {
    label: '',
    id: '',
    completed: false,
    created: new Date(),
    onToggleCompleted: () => {},
    onToggleEditing: () => {},
    onDestroy: () => {},
  };

  Task.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
    created: PropTypes.instanceOf(Date),
    onToggleCompleted: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onDestroy: PropTypes.func,
  };

  return (
    <div className={"view"}>
      <input  className="toggle" 
              type="checkbox" 
              id={`task-${id}`}
              name={`task-${id}`}
              checked={completed}
              onChange={onToggleCompleted} />
      <label htmlFor={`task-${id}`}>
        <span className="description">{label}</span>
        <span className="created">{`created ${formatDistanceToNow(created, { includeSeconds: true })} ago`}</span>
      </label>
      <button className="icon icon-edit" type="button" onClick={onToggleEditing}></button>
      <button className="icon icon-destroy" type="button" onClick={onDestroy}></button>
    </div>
  );
};

export default Task;
