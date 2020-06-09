import * as React from "react";
import cls from "../../assets/scss/styles.module.scss";

export default class Footer extends React.Component {
  render() {
    let {
      itemsLeft,
      listCompleted,
      handleActive,
      handleAll,
      handleCompleted,
      handleClearCompleted,
      status,
    } = this.props;

    let classAll = status === "All" ? `${cls.selected}` : "";
    let classActive = status === "Active" ? `${cls.selected}` : "";
    let classCompleted = status === "Completed" ? `${cls.selected}` : "";
    return (
      <footer className={cls.footer}>
        <span className={cls.todo_count}>
          <strong>{itemsLeft}</strong> left
        </span>
        <ul className={cls.filter}>
          <li>
            <button className={classAll} onClick={handleAll}>
              All
            </button>
          </li>
          <li>
            <button className={classActive} onClick={handleActive}>
              Active
            </button>
          </li>
          <li>
            <button className={classCompleted} onClick={handleCompleted}>
              Completed
            </button>
          </li>
          {listCompleted > 0 && (
            <li>
              <button onClick={handleClearCompleted}>Clear Completed</button>
            </li>
          )}
        </ul>
      </footer>
    );
  }
}
