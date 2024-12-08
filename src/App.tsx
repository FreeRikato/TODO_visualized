import SigninPage from './pages/Signin.page';
import SignupPage from './pages/Signup.page';
import DashboardPage from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<SigninPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
