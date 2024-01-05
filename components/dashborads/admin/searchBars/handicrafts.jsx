import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import { Button, Stack } from "@mui/material";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function HandicraftSearchBar() {
  const [inputValue, setInputValue] = React.useState("");
  const {
    data: { data: options = [] } = {},
    error,
    isLoading,
  } = useSWR(
    inputValue ? `/api/admins/handicrafts?fullName=${inputValue}` : null,
    fetcher
  );
  // console.log(options);
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <Autocomplete
      noOptionsText={isLoading ? "Searching..." : inputValue ? "No Match" : ""}
      options={options}
      getOptionLabel={(option) => option.fullName}
      renderOption={(props, option) => (
        <div {...props} key={option._id} style={{width:'100%'}} >
          <Stack flexDirection={"row"} gap={1} flexGrow={1} alignItems={"center"}>
            <Stack flexDirection={'row'} flexGrow={1} alignItems={'center'} gap={1}>
            <img
              src={option.profileImage}
              alt={option.fullName}
              style={{
                width: "50px",
                marginRight: "10px",
                borderRadius: "50%",
              }}
            />
            {option.fullName}
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-end",
                justifySelf: "flex-end",
              }}
              gap={1}
            >
              <Button
                component={Link}
                href={`/admin/dashboard/handicrafts/${option._id}`}
                variant="contained"
                color="info"
                onClick={() => {}}
              >
                view profile
              </Button>
              <Button variant="contained" color="secondary" onClick={() => {}}>
                remove
              </Button>
            </Stack>
          </Stack>
        </div>
      )}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search For A Handicraft"
          fullWidth={true}
        />
      )}
    />
  );
}
