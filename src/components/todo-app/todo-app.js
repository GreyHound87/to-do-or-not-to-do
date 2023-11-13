import React, { Component } from 'react'

import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import NewTaskForm from '../new-task-form/new-task-form'
import './todo-app.css'

function createTask(label, timer) {
  const created = new Date()
  const tracking = timer !== null

  return {
    label,
    completed: false,
    editing: false,
    created,
    id: `${(+created).toString(16)}-${Math.random().toString(16).slice(2)}`,
    timer,
    tracking,
  }
}

export default class TodoApp extends Component {
  state = {
    taskData: [
      createTask('Example task without timer', null),
      createTask('Example task with 1 minute timer', 60000),
      createTask('Example task with 10 minutes timer', 600000),
    ],
    filter: 'All',
  }

  componentDidMount() {
    this.intervalId = setInterval(this.decrementTimers, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  decrementTimers = () => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => {
        if (task.tracking && task.timer !== null && !task.editing && !task.completed) {
          const updatedTimer = task.timer - 1000
          return {
            ...task,
            timer: updatedTimer >= 0 ? updatedTimer : 0,
          }
        }
        return task
      })

      return {
        taskData: updatedTaskData,
      }
    })
  }

  destroyTask = (id) => {
    this.setState(({ taskData }) => ({
      taskData: taskData.filter((task) => task.id !== id),
    }))
  }

  addTask = (text, timer) => {
    const newTask = createTask(text, timer)
    this.setState(({ taskData }) => {
      const newData = [...taskData, newTask]
      return { taskData: newData, filter: 'All' }
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

  editTask = (text, timer, id) => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => {
        let newTimer = task.timer
        let newText = task.label

        if (timer === 0) {
          newTimer = null
        } else if (timer !== null) {
          newTimer = timer
        }

        if (text !== null && text.trim() !== '') {
          newText = text
        }

        return {
          ...task,
          label: task.id === id ? newText : task.label,
          timer: task.id === id ? newTimer : task.timer,
          editing: false,
        }
      })

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

  onTogglePlay = (id) => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            tracking: true,
          }
        }
        return task
      })

      return {
        taskData: updatedTaskData,
      }
    })
  }

  onTogglePause = (id) => {
    this.setState(({ taskData }) => {
      const updatedTaskData = taskData.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            tracking: false,
          }
        }
        return task
      })

      return {
        taskData: updatedTaskData,
      }
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
        <TaskList
          onDestroy={this.destroyTask}
          onToggleCompleted={this.onToggleCompleted}
          onToggleEditing={this.onToggleEditing}
          editTask={this.editTask}
          tasks={filteredTasks}
          onBlur={this.onBlur}
          onTogglePlay={this.onTogglePlay}
          onTogglePause={this.onTogglePause}
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
