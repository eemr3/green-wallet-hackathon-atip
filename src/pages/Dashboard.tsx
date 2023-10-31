import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AvatarDefault from '../assets/avatar-user-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase/firebase';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen w-full">
      <div className="container m-auto pt-5">
        <h1 className="text-center text-3xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <img
            className="w-20 h-20 rounded-full"
            src={`${user?.avatar ? user.avatar : AvatarDefault}`}
            alt="Foto do usuário"
          />
          <p className="font-semibold">{user?.name}</p>
        </div>
        <div>
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
