import React, { Component } from "react"
import PropTypes from "prop-types";
import TaskList from './task-list'
import Footer from './footer'
import NewTaskForm from './new-task-form'
import './todo-app.css';

/* TodoApp - это основной, главенствующий, корневой компонент-контейнер,
содержащий другие компоненты и управляющий состоянием приложения в целом(список задач, текущий фильтр) */

/* Задачи и ответственность: управляет общим состоянием,
обрабатывает события, такие как добавление, редактирование и удаление задач, изменение фильтра,
координирует работу остальных компонентов и  подкомпонентов  */

export default class TodoApp extends Component {

  /* Минимальный набор состояний */

  state = {
    /* Массив объектов, представляющих задачи
    отображается в TaskList*/
    taskData: [
      this.createTask('сreate static To-Do'),
      this.createTask('add new tasks'),
      this.createTask('mark completed'),
      this.createTask('edit the task text'),
      this.createTask('remove tasks'),
      this.createTask('see number of tasks'),
      this.createTask('filter tasks by status'),
      this.createTask('clear completed'),
      this.createTask('break components'),
      this.createTask('separate'),
      this.createTask('use props'),
      this.createTask('use specific task'),
      this.createTask('respond single'),
      this.createTask('reverse data flow'),
      this.createTask('provide data flow'),
      this.createTask('update state up'),
      this.createTask('pass Callbacks'),
      this.createTask('use onChange event'),
      this.createTask('maintain modularity'),

      /* Модель данных представлена в виде массива объектов */

    ],
    /* Строка, представляющая текущий фильтр задач
    отображается в компоненте Footer */
    filter: 'All'
  };  

  static defaultProps = {    
    taskData: [],    
    filter: 'All',
  };

  static propTypes = {
    taskData: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.string.isRequired,
    })),
    filter: PropTypes.oneOf(["All", "Active", "Completed"]),
  };  

  /* отделить createTask?.. */

  createTask(label) {
    const created = new Date() ;
    return {
      /* текст задачи */
      label,
      /* флаг, указывающий на выполнение задачи */
      completed: false,
      /* флаг, указывающий на режим редактирования задачи */
      editing: false,
      /* дата создания задачи */
      created: created,
      /* уникальный идентификатор задачи */
      id: `${(+created).toString(16)}-${Math.random().toString(16).slice(2)}`,
    };
  }

  /* Управление состоянием через локальное состояние компонента */

  destroyTask = (id) => {
    this.setState(({ taskData }) => {
      return {taskData: taskData.filter((task) => task.id !== id)}
    })
  };

  addTask = (text) => {
    const newTask = this.createTask(text);
    this.setState(( {taskData} ) => {
      const newData = [...taskData, newTask];
      return {taskData: newData}
    })
  };  

  onToggleCompleted = (id) => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
  
      return {
        taskData: updatedTaskData,
      };
    });
  };

  onToggleEditing = (id) => {
    const taskToEdit = this.state.taskData.find((task) => task.id === id);
  
    if (taskToEdit.completed) {
      window.alert("Completed tasks cannot be edited.");
    } else {
      this.setState(({ taskData }) => {
        const updatedTaskData = taskData.map((task) => ({
          ...task,
          editing: task.id === id ? !task.editing : false,
        }));
  
        return {
          taskData: updatedTaskData,
        };
      });
    }
  };

  editTask = (text, id) => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => ({
        ...task,
        label: task.id === id ? text : task.label,
        editing: false,
      }));
  
      return {
        taskData: updatedTaskData,
      };
    });
  };  

setFilter = (filter) => {
  this.setState({ filter });
};

/* отделить filterTasks?.. */

filterTasks = (tasks) => {
  const { filter } = this.state;

  switch (filter) {
    case 'Active':
      return tasks.filter((task) => !task.completed);
    case 'Completed':
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

clearCompletedTasks = () => {
  this.setState(({ taskData }) => {
    const updatedTaskData = taskData.filter((task) => !task.completed);
    return { taskData: updatedTaskData };
  });
};


    render () {
      const { taskData, filter } = this.state;
      const filteredTasks = this.filterTasks(taskData);
      const taskCount = this.state.taskData.filter((el) => !el.completed).length;
    
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={ this.addTask}/>
        </header>
        {/* Данные передаются между компонентами через пропсы */}
        <TaskList          
        onDestroy={ this.destroyTask }
        onToggleCompleted = { this.onToggleCompleted }
        onToggleEditing = { this.onToggleEditing }
        editTask = { this.editTask }
        tasks={filteredTasks}
        onBlurEditing={this.handleBlurEditing} />
        <Footer
        taskCount = { taskCount }
        filter={filter} 
        setFilter={this.setFilter}
        clearCompletedTasks={this.clearCompletedTasks} />
      </section>
    );    
  }
}
