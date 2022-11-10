import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Card } from "@mui/material";

export default React.memo(function TodoForm({ add }) {
  const [title, setTitle] = useState("");
  const [description, setTodoDescription] = useState("");

  const onKeyPress = async (event) => {
    try {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        await add(title, description);
        setTodoDescription("");
        setTitle("");
      }
    } catch (error) {}
  };

  const addTodo = async () => {
    try {
      await add(title, description);
      setTodoDescription("");
      setTitle("");
    } catch (error) {}
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter Todo"
          inputProps={{ "aria-label": "Enter ToDo" }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!title) {
              setTodoDescription("");
            }
          }}
          onKeyDown={onKeyPress}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="add"
          onClick={addTodo}
        >
          <AddCircleIcon style={{ fill: "purple" }} />
        </IconButton>
      </Paper>

      <Card
        component="form"
        sx={{
          mt: 1,
          zIndex: 1,
          p: "2px 4px",
          display: "flex",
          visibility: title ? "visible" : "hidden",
          alignItems: "center",
        }}
      >
        <InputBase
          multiline
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter description"
          inputProps={{ "aria-label": "Enter description" }}
          value={description}
          onKeyDown={onKeyPress}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
      </Card>
    </Box>
  );
});
