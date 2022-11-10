import React, { useCallback, useEffect, useMemo, useState } from "react";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import { useHttp } from "./hooks/http.hook";
import {
  Checkbox,
  FormControlLabel,
  CardActions,
  CardContent,
  Card,
  Typography,
  CircularProgress,
} from "@mui/material";

function Todo() {
  const { loading, request } = useHttp();
  const [todos, setTodos] = useState([]);
  const [hidden, setHidden] = useState(false);

  const fetchTodos = async () => {
    try {
      const data = await request("todos");
      setTodos(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await request(`todos/${id}`, "DELETE");
      setTodos(todos.filter((el) => el.id !== id));
    } catch (error) {}
  };

  const add = useCallback(
    async (title, description) => {
      try {
        if (title) {
          const data = await request("todos", "POST", { title, description });
          setTodos([data, ...todos]);
        }
      } catch (error) {}
    },
    [todos]
  );

  const update = async (id, { title, description, done }) => {
    try {
      const todo = await request(`todos/${id}`, "PATCH", {
        title,
        description,
        done,
      });
      console.log(todo);
      const newTodos = [...todos];
      const index = todos.findIndex((el) => el.id === id);
      newTodos[index] = todo;
      setTodos(newTodos);
    } catch (error) {
      throw error;
    }
  };

  const filteredTodos = useMemo(
    () =>
      todos
        .sort((a, b) => (a.id > b.id ? -1 : 1))
        .filter((item) => {
          if (hidden) {
            return item.done === false;
          }
          return true;
        }),
    [todos, hidden]
  );

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
      <CardContent sx={{ position: "relative", display: "flex" }}>
        <TodoForm add={add}></TodoForm>
      </CardContent>
      <CardContent>
        <FormControlLabel
          label="Скрыть выполненные"
          control={
            <Checkbox checked={hidden} onChange={() => setHidden(!hidden)} />
          }
        />
      </CardContent>
      <CardContent sx={{ height: 400, overflowY: "scroll" }}>
        {todos.length ? (
          filteredTodos.map((item) => (
            <TodoItem
              key={item.id}
              title={item.title}
              description={item.description}
              id={item.id}
              done={item.done}
              deleteTodo={() => deleteTodo(item.id)}
              update={update}
            />
          ))
        ) : (
          <Typography sx={{ textAlign: "center" }} variant="h4" component="div">
            List is Empty...
          </Typography>
        )}
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}

export default Todo;
