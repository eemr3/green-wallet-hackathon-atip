import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

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
    return expenseList.map((expense) => {
      return {
        id: expense.id,
        name: expense.productName,
        amount: expense.amount,
        type: 'expense',
      };
    });
  }
}

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

    return incomeList.map((income) => {
      return {
        id: income.id,
        name: income.incomeName,
        amount: income.amount,
        type: 'income',
      };
    });
  }
}

export async function HistoryWallet() {
  const expenses = await fetchExpenses();
  const incomes = await fetchIncomes();

  if (!expenses || !incomes) {
    return [];
  }

  return [...expenses, ...incomes];
}

export async function Balance() {
  const expenses = await fetchExpenses();
  const incomes = await fetchIncomes();

  if (!expenses || !incomes) {
    return 0;
  }

  const totalExpenses = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  const totalIncomes = incomes.reduce((acc, income) => {
    return acc + income.amount;
  }, 0);

  const balance = totalIncomes - totalExpenses;

  return balance;
}

export async function totalMyExpenses() {
  const expenses = await fetchExpenses();

  if (!expenses) {
    return 0;
  }

  const totalExpenses = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  return totalExpenses;
}

export async function totalMyIncomes() {
  const incomes = await fetchIncomes();

  if (!incomes) {
    return 0;
  }

  const totalIncomes = incomes.reduce((acc, income) => {
    return acc + income.amount;
  }, 0);

  return totalIncomes;
}
