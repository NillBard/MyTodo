import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FormControl,
  Checkbox,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  InputBase,
  AccordionActions,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useHttp } from "../hooks/http.hook";

export default function TodoItem({ title, description, id, done, deleteTodo }) {
  const [todoTitle, setTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [todoDone, setTodoDone] = useState(done);
  const [edit, setEdit] = useState(false);
  const { loading, request } = useHttp();

  const todoMark = async () => {
    try {
      await request(`todos/${id}`, "PATCH", {
        done: !todoDone,
      });
      setTodoDone(!todoDone);
    } catch (error) {}
  };

  const updateTodo = async () => {
    try {
      if (edit) {
        const data = await request(`todos/${id}`, "PATCH", {
          title: todoTitle,
          description: todoDescription,
        });
        console.log(data);

        setTitle(data.title);
        setTodoDescription(data.description);
      }

      setEdit(!edit);
    } catch (error) {}
  };

  return (
    <Accordion component="form" sx={{ bgcolor: "#9C3083", color: "white" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ fill: "white" }} />}
        aria-controls={`panel${id}-content`}
        id={`panel${id}-header`}
      >
        <FormControl
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Checkbox
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "white",
              },
            }}
            onClick={(event) => event.stopPropagation()}
            checked={todoDone}
            onChange={todoMark}
          />

          <InputBase
            sx={{
              color: "white",
              textDecoration: todoDone ? "line-through" : "none",
            }}
            readOnly={!edit}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            value={todoTitle}
          ></InputBase>
        </FormControl>
      </AccordionSummary>
      <AccordionDetails>
        {todoDescription || edit ? (
          <InputBase
            fullWidth
            multiline
            sx={{
              color: "white",
              textDecoration: todoDone ? "line-through" : "none",
            }}
            readOnly={!edit}
            placeholder="Enter description"
            onChange={(e) => {
              setTodoDescription(e.target.value);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            value={todoDescription}
          ></InputBase>
        ) : (
          <Typography> No description</Typography>
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
          onClick={updateTodo}
          endIcon={<EditIcon />}
        >
          {edit ? "Save" : "Edit"}
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
