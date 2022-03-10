import './App.css';
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Compress from "./Components/Compress";
import Decompress from "./Components/Decompress";


function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Compress />} />
            <Route path="compress" element={<Compress />} />
            <Route path="decompress" element={<Decompress />} />
        </Routes>
    </div>
  );
}

export default App;
