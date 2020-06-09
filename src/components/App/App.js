import * as React from "react";
import ToDoItem from "../todoItem/todoItem";
import Footer from "../footer/footer";
import cls from "../../assets/scss/styles.module.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      toggleAll: false,
      status: "All",
      currentItem: {
        text: "",
        id: "",
        isCompleted: false,
      },
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleIsCompleted = this.handleIsCompleted.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  handleEnter(event) {
    let { items, currentItem } = this.state;

    if (event.keyCode === 13 && event.target.value.trim() !== "") {
      this.setState({
        items: [...items, currentItem],
        currentItem: {
          text: "",
          id: "",
          isCompleted: false,
        },
      });
    }

    return;
  }

  handleInput(event) {
    this.setState({
      currentItem: {
        text: event.target.value,
        id: Date.now(),
        isCompleted: false,
      },
    });
    return;
  }

  handleIsCompleted(id) {
    let { items } = this.state;
    let newItems = items.map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });

    let itemIsTrue = newItems.filter((item) => item.isCompleted === true);

    if (itemIsTrue.length === newItems.length) {
      this.setState({
        items: newItems,
        toggleAll: true,
      });
    } else {
      this.setState({
        items: newItems,
        toggleAll: false,
      });
    }

    return;
  }

  handleToggleAll() {
    let items = this.state.items;
    let newItems = items.map((item) => {
      item.isCompleted = !this.state.toggleAll;
      return item;
    });

    this.setState({
      items: newItems,
      toggleAll: !this.state.toggleAll,
    });
    return;
  }

  handleRemove(id) {
    let items = this.state.items;
    let newItems = items.filter((item) => item.id !== id);
    this.setState({
      items: newItems,
    });
    return;
  }

  handleUpdate(event, id) {
    if (event.keyCode === 13) {
      let { items } = this.state;
      let newItems = items.map((item) => {
        if (item.id === id) {
          item.text = event.target.value;
        }
        return item;
      });
      this.setState({
        items: newItems,
      });
    }
    return;
  }
  handleActive() {
    this.setState({
      status: "Active",
    });
    return;
  }
  handleAll() {
    this.setState({
      status: "All",
    });
    return;
  }
  handleCompleted(){
    this.setState({
      status: "Completed",
    });
    return;
  }

  handleClearCompleted(){ // clear isCompleted = true
    let { items } = this.state;
    let newItems = items.filter((item) => item.isCompleted !== true);

    this.setState({
      items: newItems,
      status: 'All'
    });
  }
  render() {
    let { items, currentItem, toggleAll, status } = this.state;
    let listActive = items.filter((item) => item.isCompleted !== true);
    let itemsLeft = listActive.length;
    let listCompleted = items.filter((item) => item.isCompleted === true);
    return (
      <section className={cls.todoapp}>
        <header className={cls.todoapp__header}>
          <h1>todos</h1>

          <input
            type="text"
            className={cls.new_todo}
            placeholder="What needs to be done?"
            value={currentItem.text}
            onChange={this.handleInput}
            onKeyUp={this.handleEnter}
          />
        </header>

        <div className={cls.todoapp__main}>
          <input
            className={cls.toggle_all}
            id="toggle_all"
            type="checkbox"
            checked={toggleAll}
            onChange={this.handleToggleAll}
          />
          {items.length > 0 && <label htmlFor="toggle_all"></label>}
          <ul className={cls.todoapp__list}>
            {items.length > 0 &&
              status === "All" &&
              items.map((item) => (
                <ToDoItem
                  key={item.id}
                  item={item}
                  handleIsCompleted={this.handleIsCompleted}
                  handleRemove={this.handleRemove}
                  handleUpdate={this.handleUpdate}
                />
              ))}
            {items.length > 0 &&
              status === "Active" &&
              listActive.map((item) => (
                <ToDoItem
                  key={item.id}
                  item={item}
                  handleIsCompleted={this.handleIsCompleted}
                  handleRemove={this.handleRemove}
                  handleUpdate={this.handleUpdate}
                />
              ))}
              {items.length > 0 &&
              status === "Completed" &&
              listCompleted.map((item) => (
                <ToDoItem
                  key={item.id}
                  item={item}
                  handleIsCompleted={this.handleIsCompleted}
                  handleRemove={this.handleRemove}
                  handleUpdate={this.handleUpdate}
                 
                />
              ))}
          </ul>
        </div>
        {items.length > 0 && (
          <Footer
            itemsLeft={itemsLeft}
            listCompleted={listCompleted.length}
            status={status}
            handleAll={this.handleAll}
            handleActive={this.handleActive}
            handleCompleted={this.handleCompleted} 
            handleClearCompleted={this.handleClearCompleted}
          />
        )}
      </section>
    );
  }
}
