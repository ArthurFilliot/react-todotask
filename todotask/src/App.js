import React , { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {action: "",done:false}
      ],
      showcompleted:false
    }
  }

  remainingtodos=() => 
    this.state.todos.filter(todo=>todo.done===false).length

  addtodo=(maction) => {
    console.log(maction)
    this.setState({todos : [...this.state.todos, {action:maction,done:false}]}) // spread period
  }

  toggletaskdone=(maction) => 
    this.setState({todos: this.state.todos.map(item=>(item.action===maction) ? {action:item.action, done:!item.done} : item)})
  
  toggleshowcompleted=() =>
    this.setState({showcompleted: !this.state.showcompleted})
    
  render=() => {
    return (
    <div>
      <div>
        <h4 className="bg-primary text-white text-center p-2">
          My Todo List {this.remainingtodos()}
        </h4>
      </div>
      <div className="container-fluid">
        <TodoAdder callback={this.addtodo} />
      </div>
      <div className="container-fluid">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Todo task name</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
          {this.state.todos.filter(item=>!item.done).map((item) => 
              <tr key={item.action}> 
                <td>{item.action}</td>
                <td>
                  <TodoTask maction={item.action} mdone={item.done} callback={this.toggletaskdone} />
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
      <div className="bg-danger text-white text-center p-2">
        <label>
        <input type="checkbox" checked={this.showcompleted} onChange={this.toggleshowcompleted}/>Show completed tasks
        </label>
      </div>
      {this.state.showcompleted ?       
        <div className="container-fluid" >
        <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {this.state.todos.filter(item=>item.done).map((item) => 
                <tr key="item.action"> 
                <td>{item.action}</td>
                <td>
                  <TodoTask maction={item.action} mdone={item.done} callback={this.toggletaskdone} />
                </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
        : ""
    }
    </div>)
  }
  
}

const TodoAdder=({callback}) => { 
  const [newTodoValue, setNewTodoValue] = useState("");

  return (
  <div className="m-1">
    <input className="form-control" value={newTodoValue} onChange={e => setNewTodoValue(e.target.value)} />
    <button className="btn btn-danger m-1" onClick={() => callback(newTodoValue)}>
      Add a new task
    </button>
  </div>) 
}

const TodoTask=(args) => 
  <input type="checkbox" value="maction" checked="mdone" onChange={()=>args.callback(args.maction)} />


