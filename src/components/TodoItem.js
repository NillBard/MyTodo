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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function TodoItem({
  title,
  description,
  id,
  done,
  handleChange,
  handleUpdate,
  handleDelete,
}) {
  const [todoTitle, setTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [todoDone, setTodoDone] = useState(done);
  const [edit, setEdit] = useState(false);

  return (
    <Accordion
      component="form"
      sx={{ bgcolor: "#9C3083", color: "white" }}
      // onSubmit={() => {handleUpdate()}}
    >
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
            onChange={() => {
              setTodoDone(!todoDone);
              // setChecked(!checked);
            }}
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
        <InputBase
          fullWidth
          multiline
          sx={{
            color: "white",
            textDecoration: todoDone ? "line-through" : "none",
          }}
          readOnly={!edit}
          onChange={(e) => {
            setTodoDescription(e.target.value);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={todoDescription}
        ></InputBase>
      </AccordionDetails>
      <Divider color="white" />
      <AccordionActions>
        <Button size="small" variant="contained" color="error">
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
          onClick={() => {
            setEdit(!edit);
          }}
          endIcon={<EditIcon />}
        >
          {edit ? "Save" : "Edit"}
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
