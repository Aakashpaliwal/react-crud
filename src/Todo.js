import React, { Component } from "react";
import "./App.css";
export class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      id: null,
      mockData: [
        { id: "1", title: "Buy Milk", done: false, date: new Date() },
        { id: "2", title: "Meeting with Ali", done: false, date: new Date() },
        { id: "3", title: "Tea break", done: false, date: new Date() },
        { id: "4", title: "Go for a run.", done: false, date: new Date() }
      ]
    };
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onDeleteHandle = this.onDeleteHandle.bind(this);
    this.onEditHandle = this.onEditHandle.bind(this);
    this.onCompleteHandle = this.onCompleteHandle.bind(this);
    this.onUpdateHandle = this.onUpdateHandle.bind(this);
  }
  componentDidMount() {
    console.log(this.state.mockData);
  }
  onDeleteHandle() {
    let id = arguments[0];
    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }
  onEditHandle(event) {
    console.log("editer");
    this.setState({ edit: true, id: arguments[0], title: arguments[1] });
  }
  onCompleteHandle(event) {
    event.target.parentNode.classList.add('done');
    let id = arguments[0];
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item["done"] = true;
          return item;
        }
        return item;
      })
    });
  }
  renderEditForm() {
    if (this.state.edit) {
      return (
        <form onSubmit={this.onUpdateHandle.bind(this)}>
          {" "}
          <input
            type="text"
            name="updatedItem"
            className="item"
            defaultValue={this.state.title}
          />{" "}
          <button className="update-add-item">Update</button>{" "}
        </form>
      );
    }
  }
  onSubmitHandle(event) {
    event.preventDefault();
    this.setState({
      mockData: [
        ...this.state.mockData,
        {
          id: Date.now(),
          title: event.target.item.value,
          done: false,
          date: new Date()
        }
      ]
    });
    event.target.item.value = "";
  }
  onUpdateHandle(event) {
    event.preventDefault();
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item["title"] = event.target.updatedItem.value;
          return item;
        }
        return item;
      })
    });
  }
  render() {
    return (
      <div>
        <h1>todo here</h1>
        <div>
          {this.renderEditForm()}
          <hr />
          <form onSubmit={this.onSubmitHandle.bind(this)}>
            <input type="text" name="item" className="item" />
            <button className="btn-add-item">Add</button>
          </form>
          <ul>
            {" "}
            {this.state.mockData.map(item => (
              <li key={item.id} className={item.done ? "done" : "hidden"}>
                {" "}
                {item.title}{" "}
                <button onClick={this.onDeleteHandle.bind(this, item.id)}>
                  Delete
                </button>{" "}
                <button
                  onClick={this.onEditHandle.bind(this, item.id, item.title)}
                >
                  Edit
                </button>{" "}
                <button onClick={this.onCompleteHandle}>Complete</button>{" "}
              </li>
            ))}{" "}
          </ul>
        </div>
      </div>
    );
  }
}

export default Todo;
