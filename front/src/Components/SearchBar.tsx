import { useState, useEffect, Fragment } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { quizIds } from "./utils";
import { useNavigate } from "react-router-dom";

interface Quiz {
  id: number;
  name: string;
  description: string;
  pregenerated: boolean;
  username: string | null;
}

interface QuizLink {
  id: number;
  name: string;
  link: string;
}

function SearchBar() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly QuizLink[]>([]);
  const loading = open && options.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        let response = await axios.get("/api/quizzes");

        if (response.status == 200) {
          const quizzes: QuizLink[] = response.data.quizzes.map(
            (quiz: Quiz) => ({
              id: quiz.id,
              name: quiz.name,
              link: Object.values(quizIds).includes(quiz.id)
                ? `/quiz/${Object.keys(quizIds)
                    .find((key) => quizIds[key] === quiz.id)
                    ?.replace("_", "/")}`
                : `/quiz/${quiz.id}`,
            })
          );

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
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for quizzes"
          sx={{
            input: {
              color: "white",
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

export default SearchBar;
