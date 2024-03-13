import { useState, useEffect, Fragment } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
}

interface UserLink {
  username: string;
  link: string;
}

function ProfilesSearchBar() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly UserLink[]>([]);
  const loading = open && options.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        let response = await axios.get("/api/users");

        if (response.status == 200) {
          const quizzes: UserLink[] = response.data.users.map((user: User) => ({
            username: user.username,
            link: `/profile/${user.username}`,
          }));

          if (active) {
            setOptions([...quizzes]);
          }
        }
      } catch (error) {
        //TODO: Implement error handling
        console.log("ERROR HAS BEEN ENCOUNTERED:");
        console.log(error);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(_, option) => {
        if (option) {
          navigate(option.link);
        }
      }}
      isOptionEqualToValue={(option, value) =>
        option.username === value.username
      }
      getOptionLabel={(option) => option.username}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for users"
          sx={{
            input: {
              color: "black",
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default ProfilesSearchBar;
