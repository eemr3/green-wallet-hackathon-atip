import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../service/firebase/firebase';
import Google from '../assets/logo_google.svg';

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        id: response.user.uid,
        name: response.user.displayName,
        avatar: response.user.photoURL,
        email: response.user.email,
      });
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      if (!response.user) {
        return;
      }
      setUser({
        id: response.user.uid,
        name: response.user.displayName,
        avatar: response.user.photoURL,
        email: response.user.email,
      });
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao autenticar com o Google:', error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">
          Entrar
        </h1>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Digite o email"
              className="block w-full px-4 py-2 mt-2 text-green-800 bg-white border rounded-md
               focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring 
               focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Senha
            </label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Digite a senha"
              className="block w-full px-4 py-2 mt-2 text-green-800 bg-white border rounded-md
               focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring 
               focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors 
            duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none
             focus:bg-green-600"
            >
              Entrar
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Ou</div>
        </div>
        <div className="flex mt-4 gap-x-2">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center justify-center w-full 
            border border-gray-600 rounded-md focus:ring-2 
            focus:ring-offset-1 focus:ring-green-600"
          >
            <img src={`${Google}`} alt="" className="w-10" />
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {' '}
          Não possui uma conta?{' '}
          <Link to="/signup" className="font-medium text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
