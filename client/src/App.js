import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos())
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todos) => {
        if (todos.id === data._id) {
          todos.complete = data.complete;
        }

        return todos;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  return (
    <div className="App">
      <h1> Welcome, Kevin</h1>
      <h4> Your Tasks</h4>

      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo" + (todo.complete ? "is-complete" : "")}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"></div>

            <div className="text">{todo.text} </div>

            <div className="delete-todo" onClick={() => deleteTodo(todo.id)}>
              x
            </div>
          </div>
        ))}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        {" "}
        +{" "}
      </div>
    </div>
  );
}

export default App;
