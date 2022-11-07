import React, { useCallback, useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TodoForm from "./components/TodoForm";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useHttp } from "./hooks/http.hook";

function Todo() {
  const { request } = useHttp();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setTodoDescription] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      const data = await request("todos");

      console.log(data);

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
        setTodos([...todos, data]);
        setTodoDescription("");
        setTitle("");
      }
    } catch (error) {}
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
      <CardContent>
        <TodoForm
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          addTodo={addTodo}
        ></TodoForm>

        {title && (
          <Paper
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter description"
              inputProps={{ "aria-label": "Enter description" }}
              value={description}
              onChange={(e) => {
                if (title !== "") {
                  setTodoDescription(e.target.value);
                } else setTodoDescription("");
              }}
            />
          </Paper>
        )}
      </CardContent>
      {/* {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40,
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : ( */}
      <CardContent>
        {todos &&
          todos.map((item) => (
            <TodoItem
              key={item.id}
              title={item.title}
              description={item.description}
              id={item.id}
              done={item.done}
              request={request}
              deleteTodo={() => deleteTodo(item.id)}
            />
          ))}
      </CardContent>
      {/* )} */}
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}

export default Todo;
