import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../service/firebase/firebase';
import { useState } from 'react';

export default function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
          await updateProfile(user, {
            displayName: fullName,
          });
        }
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('As senhas não são iguais');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao autenticar com o Google:', error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-green-700 uppercase">
          Criar conta
        </h1>
        <form onSubmit={handleSignUp} className="mt-6">
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Nome Completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Digite seu nome completo"
              className="block w-full px-4 py-2 mt-2 text-green-800 bg-white border rounded-md
               focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring 
               focus:ring-opacity-40"
            />
          </div>
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
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirme a Senha
            </label>
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              placeholder="Digite a senha novamente"
              className="block w-full px-4 py-2 mt-2 text-green-800 bg-white border rounded-md
               focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring 
               focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors 
            duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none
             focus:bg-green-600"
            >
              Criar conta
            </button>
          </div>
        </form>
        <div className="relative flex items-center justify-center w-full mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>
        <div className="flex mt-4 gap-x-2">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {' '}
          Já possui uma conta?{' '}
          <Link to="/" className="font-medium text-green-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
