import { AuthContextProvider } from './context/AuthContext';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <AuthContextProvider>
      <AppRoute />
    </AuthContextProvider>
  );
}

export default App;
