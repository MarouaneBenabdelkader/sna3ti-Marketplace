import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function CustomersSearchBar() {
  const [inputValue, setInputValue] = React.useState("");
  const { data: { data: options = [] } = {}, error } = useSWR(
    inputValue ? `/api/admins/customers?fullName=${inputValue}` : null,
    fetcher
  );
  // console.log(options);
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <Autocomplete
    
      options={options}
      getOptionLabel={(option) => option.fullName}
      renderOption={(props, option) => (
        <Link href={`/admin/dashboard/customers/${option._id}`}>
          <div {...props}>
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
          </div>
        </Link>
      )}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search For A Customer"
          fullWidth={true}
        />
      )}
    />
  );
}
