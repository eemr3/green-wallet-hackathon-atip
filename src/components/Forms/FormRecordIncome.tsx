import { addDoc, collection } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { auth, db } from '../../service/firebase/firebase';
import { AppContext } from '../../context/AppContext';

export default function FormRecordIncome() {
  const { isCreated, setIsCreated } = useContext(AppContext);
  const [incomeData, setIncomeData] = useState({
    incomeName: '',
    amount: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const newValue = value;

    setIncomeData({
      ...incomeData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const incomesRef = collection(db, 'incomes');
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      const userId = user.uid;

      const income = {
        incomeName: incomeData.incomeName,
        amount: parseFloat(incomeData.amount),
        userId,
        timestamp: new Date(),
      };
      await addDoc(incomesRef, income);

      setIncomeData({
        incomeName: '',
        amount: '',
      });
      setIsCreated(!isCreated);
      console.info('Receitas registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar receitas:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="incomeName" className="block text-gray-700 font-semibold">
          Nome da receita:
        </label>
        <input
          type="text"
          id="incomeName"
          name="incomeName"
          value={incomeData.incomeName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-semibold">
          Valor:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={incomeData.amount}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
        Registrar Receitas
      </button>
    </form>
  );
}
