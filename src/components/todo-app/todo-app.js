import React, { useState, useEffect } from 'react'

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

export default function TodoApp() {
  const [taskData, setTaskData] = useState([
    createTask('Example task without timer', null),
    createTask('Example task with 1 minute timer', 60000),
    createTask('Example task with 10 minutes timer', 600000),
  ])

  const [filter, setFilter] = useState('All')

  const decrementTimers = () => {
    setTaskData((prevTaskData) => {
      const updatedTaskData = prevTaskData.map((task) => {
        if (task.tracking && task.timer !== null && !task.editing && !task.completed) {
          const updatedTimer = task.timer - 1000
          return {
            ...task,
            timer: updatedTimer >= 0 ? updatedTimer : 0,
          }
        }
        return task
      })

      return updatedTaskData
    })
  }

  useEffect(() => {
    const intervalId = setInterval(decrementTimers, 1000)

    return () => clearInterval(intervalId)
  }, [taskData])

  const destroyTask = (id) => {
    setTaskData((prevTaskData) => ({
      taskData: prevTaskData.filter((task) => task.id !== id),
    }))
  }

  const addTask = (text, timer) => {
    const newTask = createTask(text, timer)
    setTaskData((prevTaskData) => ({
      taskData: [...prevTaskData, newTask],
      filter: 'All',
    }))
  }

  const onToggleCompleted = (id) => {
    setTaskData((prevTaskData) => {
      const updatedTaskData = prevTaskData.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          }
        }
        return task
      })

      return updatedTaskData
    })
  }

  const onToggleEditing = (id) => {
    setTaskData((prevTaskData) => {
      const updatedTaskData = prevTaskData.map((task) => ({
        ...task,
        editing: task.id === id ? !task.editing : false,
      }))

      return updatedTaskData
    })
  }

  const editTask = (text, timer, id) => {
    setTaskData((prevTaskData) => {
      const updatedTaskData = prevTaskData.map((task) => {
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

      return updatedTaskData
    })
  }

  const onBlur = (id) => {
    setTaskData((prevTaskData) => {
      const updatedTaskData = prevTaskData.map((task) => ({
        ...task,
        editing: task.id === id ? false : task.editing,
      }))
      return updatedTaskData
    })
  }

  const filterTasks = (tasks) => {
    const filters = {
      Active: (arr) => arr.filter((task) => !task.completed),
      Completed: (arr) => arr.filter((task) => task.completed),
    }

    return filters[filter] ? filters[filter](tasks) : tasks
  }

  const clearCompletedTasks = () => {
    setTaskData((prevTaskData) => ({
      taskData: prevTaskData.filter((task) => !task.completed),
    }))
  }

  const onTogglePlay = (id) => {
    setTaskData((prevTaskData) => {
      const updatedTaskData = prevTaskData.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            tracking: true,
          }
        }
        return task
      })

      return updatedTaskData
    })
  }

  const onTogglePause = (id) => {
    setTaskData((prevTaskData) => {
      const updatedTaskData = prevTaskData.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            tracking: false,
          }
        }
        return task
      })

      return updatedTaskData
    })
  }

  const filteredTasks = filterTasks(taskData)
  const taskCount = taskData.filter((el) => !el.completed).length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <TaskList
        onDestroy={destroyTask}
        onToggleCompleted={onToggleCompleted}
        onToggleEditing={onToggleEditing}
        editTask={editTask}
        tasks={filteredTasks}
        onBlur={onBlur}
        onTogglePlay={onTogglePlay}
        onTogglePause={onTogglePause}
      />
      <Footer taskCount={taskCount} filter={filter} setFilter={setFilter} clearCompletedTasks={clearCompletedTasks} />
    </section>
  )
}
