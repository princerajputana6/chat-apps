import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Register";
import PhoneSignUp from "./Pages/Phone";
import ProtectedRoute from "./Pages/Routes";
import { UserAuthContextProvider } from "./context/UserAuthContext";
function App() {
  return (
    <UserAuthContextProvider>
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/phone" element={<PhoneSignUp />} />
    </Routes>
  </UserAuthContextProvider>
  );
}

export default App;
