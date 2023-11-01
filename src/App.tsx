import { AppProvider } from './context/AppContext';
import { AuthContextProvider } from './context/AuthContext';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <AuthContextProvider>
      <AppProvider>
        <AppRoute />
      </AppProvider>
    </AuthContextProvider>
  );
}

export default App;
