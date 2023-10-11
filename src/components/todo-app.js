import React, { Component } from 'react'

import TaskList from './task-list'
import Footer from './footer'
import NewTaskForm from './new-task-form'
import './todo-app.css'

/* TodoApp - это основной, главенствующий, корневой компонент-контейнер,
содержащий другие компоненты и управляющий состоянием приложения в целом(список задач, текущий фильтр) */

/* Задачи и ответственность: управляет общим состоянием,
обрабатывает события, такие как добавление, редактирование и удаление задач, изменение фильтра,
координирует работу остальных компонентов и  подкомпонентов  */

function createTask(label) {
  const created = new Date()
  return {
    /* текст задачи */
    label,
    /* флаг, указывающий на выполнение задачи */
    completed: false,
    /* флаг, указывающий на режим редактирования задачи */
    editing: false,
    /* дата создания задачи */
    created,
    /* уникальный идентификатор задачи */
    id: `${(+created).toString(16)}-${Math.random().toString(16).slice(2)}`,
  }
}
export default class TodoApp extends Component {
  /* Минимальный набор состояний */

  state = {
    /* Массив объектов, представляющих задачи
    отображается в TaskList */
    taskData: [
      createTask('сreate static To-Do'),
      createTask('add new task'),
      createTask('mark completed'),
      createTask('edit task text'),
      createTask('remove task'),
      createTask('filter by status'),
      createTask('clear completed'),
      createTask('use props'),

      /* Модель данных представлена в виде массива объектов */
    ],
    /* Строка, представляющая текущий фильтр задач
    отображается в компоненте Footer */
    filter: 'All',
  }

  /* Управление состоянием через локальное состояние компонента */

  destroyTask = (id) => {
    this.setState(({ taskData }) => ({
      taskData: taskData.filter((task) => task.id !== id),
    }))
  }

  addTask = (text) => {
    const newTask = createTask(text)
    this.setState(({ taskData }) => {
      const newData = [...taskData, newTask]
      return { taskData: newData }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          }
        }
        return task
      })

      return {
        taskData: updatedTaskData,
      }
    })
  }

  onToggleEditing = (id) => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => ({
        ...task,
        editing: task.id === id ? !task.editing : false,
      }))

      return {
        taskData: updatedTaskData,
      }
    })
  }

  editTask = (text, id) => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => ({
        ...task,
        label: task.id === id ? text : task.label,
        editing: false,
      }))

      return {
        taskData: updatedTaskData,
      }
    })
  }

  onBlur = (id) => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => ({
        ...task,
        editing: task.id === id ? false : task.editing,
      }))
      return {
        taskData: updatedTaskData,
      }
    })
  }

  setFilter = (filter) => {
    this.setState({ filter })
  }

  /* отделить filterTasks?.. */

  filterTasks = (tasks) => {
    const { filter } = this.state

    const filters = {
      Active: (arr) => arr.filter((task) => !task.completed),
      Completed: (arr) => arr.filter((task) => task.completed),
    }

    return filters[filter] ? filters[filter](tasks) : tasks
  }

  clearCompletedTasks = () => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.filter((task) => !task.completed)
      return { taskData: updatedTaskData }
    })
  }

  render() {
    const { taskData, filter } = this.state
    const filteredTasks = this.filterTasks(taskData)
    const taskCount = taskData.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        {/* Данные передаются между компонентами через пропсы */}
        <TaskList
          onDestroy={this.destroyTask}
          onToggleCompleted={this.onToggleCompleted}
          onToggleEditing={this.onToggleEditing}
          editTask={this.editTask}
          tasks={filteredTasks}
          onBlur={this.onBlur}
        />
        <Footer
          taskCount={taskCount}
          filter={filter}
          setFilter={this.setFilter}
          clearCompletedTasks={this.clearCompletedTasks}
        />
      </section>
    )
  }
}
