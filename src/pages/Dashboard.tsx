import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AvatarDefault from '../assets/avatar-user-svgrepo-com.svg';
import ExpenseForm from '../components/Forms/FormExpense';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../service/firebase/firebase';
import FormRecordIncome from '../components/Forms/FormRecordIncome';
import BalanceSummary from '../components/BalanceSummary';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // const { setOpenModal } = useContext(AppContext);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  const ExpenseRegisterModal = () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="text-green11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Registrar despesas
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className="data-[state=open]:animate-contentShow fixed top-[50%] 
          left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%]
          rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          >
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Registrar despesas
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
            <ExpenseForm />
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };
  const RecordIncomeModal = () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="text-green11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Registrar receitas
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content
            className="data-[state=open]:animate-contentShow fixed top-[50%] 
          left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%]
          rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          >
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Registrar receitas
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Registre suas receitas aqui. Clique em salvar quando terminar.
            </Dialog.Description>
            <FormRecordIncome />
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };
  return (
    <>
      {/* <ExpenseRegisterModal /> */}
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
          <div className="flex justify-around">
            <button type="button" onClick={handleLogout}>
              Sair
            </button>
            {/* <button type="button" onClick={() => setOpenModal(true)}>
              Registrar Despesas
            </button> */}
            <ExpenseRegisterModal />
            <RecordIncomeModal />
            <Link to="/my-expenses">Minhas despesas</Link>
          </div>
          <BalanceSummary />
        </div>
      </div>
    </>
  );
}
