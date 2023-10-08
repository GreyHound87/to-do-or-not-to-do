import React from "react"
import PropTypes from "prop-types";
import TaskFilter from './task-filter'
import './footer.css';

/* Footer - компонент-представление, отображающий информацию о задачах и позволяющий фильтровать их */
/* Задачи и ответственность:  отображает количество задач и фильтры,
предоставляет функциональность фильтрации и очистки завершенных задач  */

function Footer({ taskCount, filter, setFilter, clearCompletedTasks }) {

  Footer.defaultProps = {
    taskCount: 0, 
    filter: "All", 
    setFilter: () => {}, 
    clearCompletedTasks: () => {}, 
  };

  Footer.propTypes = {
    taskCount: PropTypes.number,
    filter: PropTypes.string,
    setFilter: PropTypes.func,
    clearCompletedTasks: PropTypes.func,
  };

    return (
        <footer className="footer">
          <span className="todo-count">{taskCount} items left</span>          
          <TaskFilter filter={filter} setFilter={setFilter} />          
          <button className="clear-completed" type="button" onClick={clearCompletedTasks}>
              Clear completed
          </button>
        </footer>
    );
  }
  
  export default Footer;