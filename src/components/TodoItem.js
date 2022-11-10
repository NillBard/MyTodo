import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Checkbox,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  AccordionActions,
  Button,
  Divider,
  Typography,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  input: { color: "white" },
  textarea: { color: "white" },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
    opacity: 0.4,
  },
});

export default function TodoItem({
  title,
  description,
  id,
  done,
  deleteTodo,
  update,
}) {
  const [todoTitle, setTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [edit, setEdit] = useState(false);

  const updateTodo = async () => {
    try {
      if (edit) {
        if (todoTitle) {
          await update(id, {
            title: todoTitle,
            description: todoDescription,
          });
        }
      }
      setEdit(!edit);
    } catch (error) {
      setTodoDescription(description);
      setTitle(title);
    }
  };

  const todoMark = async () => {
    try {
      if (todoTitle) {
        await update(id, { done: !done });
      }
    } catch (error) {}
  };

  return (
    <Accordion component="form" sx={{ bgcolor: "#9C3083", color: "white" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        aria-controls={`panel${id}-content`}
        id={`panel${id}-header`}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "white",
              },
            }}
            disabled={!todoTitle}
            onClick={(event) => event.stopPropagation()}
            checked={done}
            onChange={todoMark}
          />

          {edit ? (
            <CssTextField
              variant="standard"
              fullWidth
              multiline
              sx={{
                maxWidth: 300,
                textDecoration: done ? "line-through" : "none",
              }}
              autoFocus
              placeholder="Enter title"
              readOnly={!edit}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={todoTitle}
            ></CssTextField>
          ) : (
            <Typography
              style={{
                maxWidth: "500px",
              }}
              sx={{
                overflow: "hidden",
                maxWidth: "500px",
                wordWrap: "break-word",
                color: "white",
                textDecoration: done ? "line-through" : "none",
              }}
            >
              {todoTitle}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {edit ? (
          <CssTextField
            fullWidth
            multiline
            variant="standard"
            sx={{
              textDecoration: done ? "line-through" : "none",
            }}
            readOnly={!edit}
            placeholder="Enter description"
            onChange={(e) => {
              setTodoDescription(e.target.value);
            }}
            value={todoDescription}
          ></CssTextField>
        ) : (
          <Typography
            sx={{
              color: "white",
              textDecoration: done ? "line-through" : "none",
              wordWrap: "break-word",
              whiteSpace: "wrap",
              opacity: 0.8,
            }}
          >
            {todoDescription || "No description"}
          </Typography>
        )}
      </AccordionDetails>
      <Divider color="white" />
      <AccordionActions>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={deleteTodo}
        >
          Delete
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "purple",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          disabled={!todoTitle}
          onClick={() => updateTodo(todoTitle, todoDescription)}
          endIcon={<EditIcon />}
        >
          {edit ? "Save" : "Edit"}
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
