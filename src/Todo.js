import React, { useCallback, useEffect, useState } from "react";
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
} from "@mui/material";

function Todo() {
  const { request } = useHttp();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setTodoDescription] = useState("");
  const [hidden, setHidden] = useState(false);

  const fetchTodos = useCallback(async () => {
    try {
      const data = await request("todos");
      setTodos(data);
    } catch (error) {}
  }, [request]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const deleteTodo = async (id) => {
    try {
      await request(`todos/${id}`, "DELETE", {});
      setTodos(todos.filter((el) => el.id !== id));
    } catch (error) {}
  };

  const addTodo = async () => {
    try {
      if (title) {
        const data = await request("todos", "POST", { title, description });
        setTodos([data, ...todos]);
        setTodoDescription("");
        setTitle("");
      }
    } catch (error) {}
  };

  const mark = async (id, done) => {
    try {
      await request(`todos/${id}`, "PATCH", {
        done: !done,
      });
      const item = todos.find((el) => el.id === id);
      item.done = !done;
    } catch (error) {}
  };

  const update = async (id, title, description) => {
    try {
      await request(`todos/${id}`, "PATCH", {
        title,
        description,
      });
    } catch (error) {}
  };

  const handlePressKey = async (event) => {
    try {
      if (event.key === "Enter") {
        await addTodo();
      }
    } catch (error) {}
  };

  const hiddenDone = async () => {
    setHidden(!hidden);
  };

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
        <TodoForm
          onKeyPress={handlePressKey}
          title={title}
          description={description}
          titleChange={(e) => {
            setTitle(e.target.value);
            if (title.length === 0) {
              setTodoDescription("");
            }
          }}
          descriptionChange={(e) => setTodoDescription(e.target.value)}
          addTodo={addTodo}
        ></TodoForm>
      </CardContent>
      <CardContent>
        <FormControlLabel
          label="Скрыть выполненные"
          control={<Checkbox checked={hidden} onChange={hiddenDone} />}
        />
      </CardContent>
      <CardContent sx={{ height: 400, overflowY: "scroll" }}>
        {todos &&
          todos
            .sort((a, b) => (a.id > b.id ? -1 : 1))
            .filter((item) => {
              if (hidden) {
                return item.done === false;
              }
              return true;
            })
            .map((item) => (
              <TodoItem
                key={item.id}
                title={item.title}
                description={item.description}
                id={item.id}
                done={item.done}
                deleteTodo={() => deleteTodo(item.id)}
                mark={mark}
                update={update}
              />
            ))}
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}

export default Todo;
