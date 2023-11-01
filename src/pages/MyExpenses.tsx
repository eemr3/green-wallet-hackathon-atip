import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../service/firebase/firebase';
import { Link } from 'react-router-dom';

interface Expense {
  id: string;
  productName: string;
  amount: number;
  category: string;
  isEcoFriendly: boolean;
}

function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    // Consulta as despesas do usuário autenticado
    async function fetchExpenses() {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;

        const expensesRef = collection(db, 'expenses');
        const expensesQuery = query(expensesRef, where('userId', '==', userId));

        const expensesSnapshot = await getDocs(expensesQuery);

        const expenseList: Expense[] = [];
        expensesSnapshot.forEach((doc) => {
          const expense: Expense = {
            id: doc.id,
            productName: doc.data().productName || '',
            amount: doc.data().amount || 0,
            category: doc.data().category || '',
            isEcoFriendly: doc.data().isEcoFriendly || false,
          };
          expenseList.push(expense);
        });
        setExpenses(expenseList);
      }
    }

    fetchExpenses();
  }, []);

  return (
    <div className="p-4 w-full">
      <div className="flex justify-around">
        <h1 className="text-2xl font-bold mb-4">Minhas Despesas</h1>
        <Link to="/dashboard">Voltar</Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="p-4 border rounded-lg shadow-md">
            {/* Exiba os detalhes da despesa aqui */}
            <p className="text-lg font-semibold">
              Nome do Produto: {expense.productName}
            </p>
            <p className="text-base">Valor: R$ {expense.amount.toFixed(2)}</p>
            <p className="text-base">Categoria: {expense.category}</p>
            <p className="text-base">
              Ecológico: {expense.isEcoFriendly ? 'Sim' : 'Não'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
