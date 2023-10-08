import React from "react";
import PropTypes from "prop-types";
import "./task-filter.css";

/* TaskFilter - компонент, отвечающий за фильтрацию задач */
/* Задачи и ответственность: позволяет выбирать фильтр для задач (All, Active, Completed)  */

function TaskFilter({ filter, setFilter }) {

  TaskFilter.defaultProps = {
    filter: "All",
    setFilter: () => {},
  };

  TaskFilter.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func,
  };

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filter === "All" ? "selected" : ""}
          onClick={() => setFilter("All")} >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === "Active" ? "selected" : ""}
          onClick={() => setFilter("Active")} >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === "Completed" ? "selected" : ""}
          onClick={() => setFilter("Completed")} >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default TaskFilter;



