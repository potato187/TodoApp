import * as React from 'react';

import cls from '../../assets/scss/styles.module.scss';


export default class ToDoItem extends React.Component {

  constructor() {
    super();
    this.toggleContainer = React.createRef();
    this.state = {
      isOpen: false,
    }
    this.onClickOuside = this.onClickOuside.bind(this);
    this.handleShowEditing = this.handleShowEditing.bind(this);
    this.onPressEscAndEnter = this.onPressEscAndEnter.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOuside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOuside);

  }

  onClickOuside(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({
        isOpen: false
      });
      this.toggleContainer.current.className = '';
    }
  }

  handleShowEditing(event) {
    event.target.parentNode.parentNode.className = `${cls.editing}`;
    this.setState({
      isOpen: true,
    });
  }

  onPressEscAndEnter(event) {
    if (event.keyCode === 27 || event.keyCode === 13) {
      this.setState({
        isOpen: false
      });
      this.toggleContainer.current.className = '';
    }
    return;
  }

  render() {
    let { item, handleIsCompleted, handleRemove, handleUpdate } = this.props;

    return (
      <li className={cls.Completed} ref={this.toggleContainer} >
        <div className={cls.view} >

          <input type="checkbox" className={cls.toggle}

            checked={item.isCompleted}

            onChange={() => {
              handleIsCompleted(item.id);
            }}

          />

          <label
            onDoubleClick={this.handleShowEditing}
          >{item.text}</label>

          <button className={cls.destroy}
            onClick={() => {
              handleRemove(item.id);
            }}
          ></button>

        </div>
        {
          this.state.isOpen && <input type="text"

            className={cls.edit}

            onKeyUp={(event) => {
              this.onPressEscAndEnter(event);
              handleUpdate(event, item.id);
            }}

            autoFocus
            defaultValue={item.text}

          />
        }
      </li>
    );
  }
}