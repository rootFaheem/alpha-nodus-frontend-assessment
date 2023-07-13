import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { PATCH_LOCATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { FETCH_LOCATIONS_DETAILS } from "../GraphQL/Queries";
import { TENANT } from "./LocationList";

interface Props {
  label: string;
  value: string;
  name: string;
  ID: string;
}

const InputField: React.FC<Props> = ({ label, value, name, ID }) => {
  const [text, setText] = useState<string>(value);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [locationPatch, { error }] = useMutation(PATCH_LOCATION, {
    refetchQueries: [FETCH_LOCATIONS_DETAILS],
  });

  useEffect(() => setText(value), [value]);

  const handleUpdate = () => {
    locationPatch({
      variables: {
        tenant: TENANT,
        locationPatchId: ID,
        requestBody: {
          [name]: text,
        },
      },
    });

    if (!error) {
      setIsEdit(false);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      mb={2}
    >
      <Box fontSize={name == "name" ? "h6.fontSize" : "body1.fontSize"}>
        <b>{label}:</b> {!isEdit && value}
      </Box>

      {isEdit && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Box display="flex">
            <TextField
              label={label}
              name={name}
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>
        </Box>
      )}
      <Box>
        {isEdit ? (
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="Update" onClick={handleUpdate}>
              <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="Close" onClick={() => setIsEdit(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : (
          <IconButton aria-label="Edit" onClick={() => setIsEdit(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};

export default InputField;
