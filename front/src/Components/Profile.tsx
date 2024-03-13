import {
  useState,
  useEffect,
  useContext,
  ReactNode,
  SyntheticEvent,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, Tab, Typography, Box, IconButton } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import { AuthContext } from "../authContext";
import AccountCircle from "@mui/icons-material/AccountCircle";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

function Profile() {
  const [value, setValue] = useState(0);
  const { auth, user } = useContext(AuthContext);
  const [helloText, setHelloText] = useState<string>("");

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  useEffect(() => {
    // auth ? setHelloText(`Hello, ${user}!`) : navigate("/dashboard");
    setHelloText(`Hello, ${user}!`);
  }, [auth]);

  const { username } = useParams(); //username of the user being searched

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`/api/quizzes/${username}`); //may need to change if added drafted quizzes

        if (response.status == 200) {
          console.log(response.data);
        }
      } catch (error) {
        //TODO: Implement error handling
        console.log("ERROR HAS BEEN ENCOUNTERED:");
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <NavBar helloText={helloText}></NavBar>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AccountCircle sx={{ fontSize: 50 }} />
        <Typography variant="h6" noWrap component="div" sx={{ marginLeft: 1 }}>
          {username}
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Quizzes" {...a11yProps(0)} />
            <Tab label="Scores" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Quiz 1
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Quiz 2
        </CustomTabPanel>
      </Box>
    </>
  );
}

export default Profile;
