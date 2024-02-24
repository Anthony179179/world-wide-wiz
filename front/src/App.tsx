import MyMap from "./components/MyMap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />} path="/" />
        <Route element={<MyMap />} path="/quiz/:region" />
      </Routes>
    </Router>
  );
}

export default App;
