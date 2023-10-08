import React, { Component } from "react"
import PropTypes from "prop-types";
import './new-task-form.css';

/* NewTaskForm - компонент-представление для создания новой задачи */
/* Задачи и ответственность: отображает форму для создания новой задачи,
 отвечает за создание новых задач и управления вводом текста  */

export default class NewTaskForm extends Component {    

    state = {
        label: ''
    };

    static defaultProps = {
        onTaskAdded: () => {}
    };

    static propTypes = {
        onTaskAdded: PropTypes.func,
    };

    /* Управление состоянием через локальное состояние компонента */

    onLabelChange = (e) => {
        this.setState({ 
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.label.trim() !== '') {
        /* Обновление состояния происходит через обратные вызовы */
          this.props.onTaskAdded(this.state.label);
          this.setState({
            label: ''
          });
        } else window.alert('Enter task text!');
      };

    render() {
        return (
            <form onSubmit={this.onSubmit} >
                <label>
                    <span className="visually-hidden">
                        What needs to be done?
                    </span>
                    <input 
                    type="text"
                    className="new-todo"
                    id="new-todo"
                    name="new-todo" 
                    placeholder="What needs to be done?" 
                    autoFocus
                    onChange={this.onLabelChange}
                    value={this.state.label}
                    ></input>                    
                </label>
            </form>
        );
    }
  }
  