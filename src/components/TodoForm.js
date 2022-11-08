import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Card } from "@mui/material";

export default function TodoForm({
  title,
  description,
  titleChange,
  descriptionChange,
  addTodo,
  onKeyPress,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter Todo"
          inputProps={{ "aria-label": "Enter ToDo" }}
          value={title}
          onChange={titleChange}
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
          onChange={descriptionChange}
        />
      </Card>
    </Box>
  );
}
