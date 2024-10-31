import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import {EntitiesPage} from './pages/EntitiesPage';
import { EntityDetailPage } from "./pages/EntityDetails/EntityDetailPage";
import Navbar from "./components/Navbar/Navbar";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/entities/:entityType" element={isAuthenticated ? <EntitiesPage /> : <Navigate to="/login" />} />
        <Route path="/entities/:entityType/:id" element={isAuthenticated ? <EntityDetailPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
