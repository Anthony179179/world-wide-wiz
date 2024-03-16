import { useContext, useEffect, useState } from "react";
import Input from "@mui/joy/Input";
import "./../styles/index.css";
import { Button } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../authContext";
import NavBar from "./NavBar";

function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { auth, setAuth, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate("/dashboard");
  }, [auth]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function submitSignup() {
    if (username == "" || password == "") {
      setErrorMessage("Fill in all required fields");
      setOpen(true);
      return;
    }
    const signupRes = await axios.post("/api/signup", {
      username: username,
      password: password,
    });
    if (signupRes.status !== 201) {
      setErrorMessage(signupRes.data.error);
      setOpen(true);
    } else {
      const loginRes = await axios.post("/api/login", {
        username: username,
        password: password,
      });
      if (loginRes.status !== 201) {
        setErrorMessage(loginRes.data.error);
        setOpen(true);
      } else {
        setAuth(true);
        setUser(username);
        navigate("/dashboard");
      }
    }
  }

  return (
    <>
      <NavBar helloText="" loggedIn={false}></NavBar>
      <h2 style={{ textAlign: "start", paddingLeft: "1vw" }}>Sign Up</h2>
      <div
        style={{
          width: "20vw",
          height: "40vh",
          padding: "0px 2.5vw 0px 2.5vw",
          backgroundColor: "whitesmoke",
          boxShadow: "1vw 1vh",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "10px",
          borderColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ textAlign: "start" }}>
          <div>
            <h3>Username</h3>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
          </div>
          <div>
            <h3>Password</h3>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Username"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Button
            size="lg"
            onClick={submitSignup}
            style={{ backgroundColor: "#103060", borderColor: "black" }}
          >
            Sign Up
          </Button>
          <Link to={"/login"}>Already have an account?</Link>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignUp;
