import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../service/firebase/firebase';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const ExpenseForm = () => {
  const { isCreated, setIsCreated } = useContext(AppContext);
  const [expenseData, setExpenseData] = useState({
    productName: '',
    amount: '',
    category: 'Alimentação',
    isEcoFriendly: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setExpenseData({
      ...expenseData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const expesneRef = collection(db, 'expenses');
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      const id = user.uid;

      const expense = {
        productName: expenseData.productName,
        amount: parseFloat(expenseData.amount),
        category: expenseData.category,
        isEcoFriendly: expenseData.isEcoFriendly,
        userId: id,
        timestamp: new Date(),
      };
      await addDoc(expesneRef, expense);

      setExpenseData({
        productName: '',
        amount: '',
        category: 'Alimentação',
        isEcoFriendly: false,
      });
      setIsCreated(!isCreated);
      console.info('Despesa registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar despesa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="productName" className="block text-gray-700 font-semibold">
          Nome do Produto:
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={expenseData.productName}
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
          value={expenseData.amount}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-semibold">
          Categoria:
        </label>
        <select
          id="category"
          name="category"
          value={expenseData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Transporte">Transporte</option>
          <option value="Recicláveis">Recicláveis</option>
          {/* Adicione outras categorias conforme necessário */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          <input
            type="checkbox"
            name="isEcoFriendly"
            checked={expenseData.isEcoFriendly}
            onChange={handleChange}
            className="mr-2"
          />
          É Ecologicamente Correto
        </label>
      </div>

      <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
        Registrar Despesa
      </button>
    </form>
  );
};

export default ExpenseForm;
