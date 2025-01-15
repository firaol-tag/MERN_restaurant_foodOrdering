
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Component/Navbar/Navbar';
import Sidebar from './Component/Sidebar/Sidebar';
import List from "./Pages/List/List"
import Add from "./Pages/Add/Add"
import Order from "./Pages/Order/Order"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add/>} />
          <Route path="/list" element={<List/>} />
          <Route path="/manageorder" element={<Order/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
