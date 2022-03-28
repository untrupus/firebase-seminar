import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getTodos, addTodo, deleteTodo, doneTodo} from "../../store/actions";
import {CheckOutlined, CloseOutlined, DeleteOutlined} from "@ant-design/icons";
import './style.css';

const TodoList = () => {
  const [todoText, setTodoText] = useState('');
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const todoDone = (id) => {
    const todosCopy = [...todos];
    const todo = todosCopy.find((item) => item.id === id);
    todo.done = !todo.done
    dispatch(doneTodo(id, {done: todo.done}, todosCopy))
  }

  const todosJSX = todos?.map((todo) => {
    return (
      <div className='todoItem' key={todo.id}>
        <p className={todo.done ? 'todoTitle todoDone' : 'todoTitle'}>{todo.text}</p>
        {todo.done ?
          <button onClick={() => todoDone(todo.id)}>
            <CloseOutlined style={{color: 'red'}}/>
          </button> :
          <button onClick={() => todoDone(todo.id)}>
            <CheckOutlined style={{color: 'green'}}/>
          </button>}
        <button onClick={() => dispatch(deleteTodo(todo.id))}>
          <DeleteOutlined style={{color: 'tomato'}}/>
        </button>
      </div>
    )
  })

  const formSubmit = (e) => {
    e.preventDefault();
    if (todoText !== '') {
      dispatch(addTodo({text: todoText}));
      setTodoText('');
    }
  };
  return (
    <div className="todoList container">
      <form className="addTodo" onSubmit={formSubmit}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder='Add todo'/>
        <button>submit</button>
      </form>
      {todosJSX}
    </div>
  );
};

export default TodoList;
