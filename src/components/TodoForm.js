import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function TodoForm({ value, onChange, addTodo }) {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter Todo"
        inputProps={{ "aria-label": "Enter ToDo" }}
        value={value}
        onChange={onChange}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="add"
        onClick={() => addTodo(value)}
      >
        <AddCircleIcon style={{ fill: "purple" }} />
      </IconButton>
    </Paper>
  );
}
