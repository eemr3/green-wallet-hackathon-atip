import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ExpenseList from '../pages/MyExpenses';

interface RouteElementProps {
  children: JSX.Element;
}

const Private = ({ children }: RouteElementProps) => {
  const { user } = useContext(AuthContext);
  const userLocalStorage = localStorage.getItem('user') || '';
  if (!user && !userLocalStorage) {
    return <Navigate to="/" />;
  }

  return children;
};

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route
        path="/my-expenses"
        element={
          <Private>
            <ExpenseList />
          </Private>
        }
      />
    </Routes>
  );
}
