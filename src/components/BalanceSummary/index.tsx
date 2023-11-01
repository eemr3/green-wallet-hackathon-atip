import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../service/firebase/firebase'; // Importe sua instância do Firestore aqui
import { auth } from '../../service/firebase/firebase';

interface Expense {
  id: string;
  productName: string;
  amount: number;
  category: string;
  isEcoFriendly: boolean;
}

interface Income {
  id: string;
  incomeName: string;
  amount: number;
}

function BalanceSummary() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);

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

    // Consulta as receitas do usuário autenticado
    async function fetchIncomes() {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;

        const incomesRef = collection(db, 'incomes');
        const incomesQuery = query(incomesRef, where('userId', '==', userId));

        const incomesSnapshot = await getDocs(incomesQuery);

        const incomeList: Income[] = [];
        incomesSnapshot.forEach((doc) => {
          const income: Income = {
            id: doc.id,
            incomeName: doc.data().incomeName,
            amount: doc.data().amount,
          };
          incomeList.push(income);
        });

        setIncomes(incomeList);
      }
    }

    fetchExpenses();
    fetchIncomes();
  }, []);

  console.log('Despesas:', expenses);
  console.log('Receitas:', incomes);
  const calculateTotal = (items: Expense[] | Income[]) => {
    return items.reduce((total, item) => total + item.amount, 0);
  };

  const totalExpenses = calculateTotal(expenses);
  const totalIncomes = calculateTotal(incomes);
  const totalBalance = totalIncomes - totalExpenses;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resumo do Saldo</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 border rounded-lg shadow-md">
          <p className="text-lg font-semibold">
            Total de Despesas: R$ {totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <p className="text-lg font-semibold">
            Total de Receitas: R$ {totalIncomes.toFixed(2)}
          </p>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <p className="text-lg font-semibold">
            Saldo Total: R$ {totalBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BalanceSummary;
