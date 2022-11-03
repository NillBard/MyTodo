import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TodoForm from "./components/TodoForm";

function Todo() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Accordion1",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`,
      done: false,
    },
    {
      id: 2,
      title: "Accordion2",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`,
      done: false,
    },
    {
      id: 3,
      title: "Accordion3",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.`,
      done: false,
    },
  ]);

  useEffect(() => {
    async function fetchTodos(url) {
      const response = await fetch(url);
      const { data } = await response.json();
      setTodos([...data]);
      return data;
    }
    fetchTodos("http://localhost:5000/todos").then((data) => console.log(data));
  }, []);

  const [newTodo, setNewTodo] = useState("");

  const addTodo = (todo) => {
    if (todo) {
      setTodos([
        ...todos,
        { id: todos.length + 1, title: todo, description: "" },
      ]);
    }
  };

  // const onCheked = (done) => {};

  return (
    <Card
      sx={{
        width: 800,
        borderRadius: 4,
      }}
    >
      <CardContent sx={{ bgcolor: "#9C3083", color: "white" }}>
        <Typography sx={{ textAlign: "center" }} variant="h2" component="div">
          My Todo
        </Typography>
      </CardContent>
      <CardContent>
        <TodoForm
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          addTodo={addTodo}
        ></TodoForm>
      </CardContent>

      <CardContent>
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            title={item.title}
            description={item.description}
            id={item.id}
            done={item.done}
          />
        ))}
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}

export default Todo;
