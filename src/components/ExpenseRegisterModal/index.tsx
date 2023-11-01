import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const ExpenseRegisterModal = () => {
  //   const { openModal, setOpenModal } = useContext(AppContext);
  //   return (
  //     openModal && (
  //       <div
  //         className="bg-slate-800 bg-opacity-30 flex justify-center
  //          items-center absolute top-0 right-0 bottom-0 left-0"
  //       >
  //         <div className="bg-gray-600 px-16 py-14 rounded-md text-center">
  //           <h1 className="text-xl mb-4 font-bold text-slate-100">
  //             Tem certeza que deseja excluir este item?
  //           </h1>
  //           <button
  //             className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-md text-white"
  //             onClick={() => setOpenModal(false)}
  //           >
  //             Não
  //           </button>
  //           <button className="bg-primary-600 hover:bg-primary-700 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">
  //             Salvar despesa
  //           </button>
  //         </div>
  //       </div>
  //     )
  //   );
  // };
  return (
    <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
        Edit profile
      </Dialog.Title>
      <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
        Make changes to your profile here. Click save when you're done.
      </Dialog.Description>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
          Name
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="name"
          defaultValue="Pedro Duarte"
        />
      </fieldset>
      <fieldset className="mb-[15px] flex items-center gap-5">
        <label
          className="text-violet11 w-[90px] text-right text-[15px]"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          id="username"
          defaultValue="@peduarte"
        />
      </fieldset>
      <div className="mt-[25px] flex justify-end">
        <Dialog.Close asChild>
          <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
            Save changes
          </button>
        </Dialog.Close>
      </div>
      <Dialog.Close asChild>
        <button
          className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <Cross2Icon />
        </button>
      </Dialog.Close>
    </Dialog.Content>
  );
};

export default ExpenseRegisterModal;
