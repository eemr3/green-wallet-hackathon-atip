import { useContext, useEffect, useState } from 'react';
import {
  Balance,
  HistoryWallet,
  totalMyExpenses,
  totalMyIncomes,
} from '../../service/history-wallet';
import { currencyFormat } from '../../service/currency-format';
import { AppContext } from '../../context/AppContext';

interface IHistory {
  id: string;
  name: string;
  amount: number;
  type: string;
}

export default function ExpensesTrack() {
  const { isCreated } = useContext(AppContext);
  const [history, setHistory] = useState<IHistory[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getHistory = async () => {
      const history = await HistoryWallet();
      setHistory(history);
    };
    const getBalance = async () => {
      const balance = await Balance();
      setBalance(balance);
    };
    const getTotalExpenses = async () => {
      const total = await totalMyExpenses();
      setTotalExpenses(total);
    };

    const getTotalIncome = async () => {
      const total = await totalMyIncomes();
      setTotalIncome(total);
    };

    getTotalIncome();
    getTotalExpenses();
    getBalance();
    getHistory();
  }, [isCreated]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="grid grid-cols-12 gap-0 ">
          <div
            className="bg-fixed relative col-span-12 sm:col-span-12 md:col-span-7 
            lg:col-span-8 xxl:col-span-8 hidden md:block"
          >
            <div
              className="absolute inset-0 z-20 flex items-center justify-center h-full 
              bg-opacity-50"
            >
              <div className="flex justify-center h-full items-center fixed top-0">
                <p className="text-gray-700 text-5xl lg:text-7xl">
                  <span className="border-2 p-4 rounded-md" id="time">
                    {date.toLocaleTimeString('pt-BR')}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
            <div>
              <div className="border-b">
                <div className="my-4 px-6">
                  <h2 className="font-semibold text-2xl uppercase">Rastreamento</h2>
                </div>
              </div>
              <div className="px-8 py-2">
                <h4 className="text-lg text-gray-400 font-normal uppercase">Meu saldo</h4>
                <h4 className="text-2xl font-semibold">{currencyFormat(balance)}</h4>
              </div>
              <div className="flex space-x-0 flex-col lg:flex-row lg:space-x-2 my-2 px-6">
                <div className="bg-green-600 p-4 border-2 rounded-md shadow-lg  w-full text-white text-center">
                  <h1 className="text-xl font-light uppercase">Receitas</h1>
                  <h1 className="text-2xl text-green-100 font-semibold">
                    {currencyFormat(totalIncome)}
                  </h1>
                </div>
                <div className="bg-red-600 p-4 border-2 rounded-md shadow-lg  w-full text-white text-center">
                  <h1 className="text-xl font-light uppercase">Despesas</h1>
                  <h1 className="text-2xl text-red-100 font-semibold">
                    {currencyFormat(totalExpenses)}
                  </h1>
                </div>
              </div>
              <div className="px-8 my-6">
                <div className="my-4 border-b w-full">
                  <h2 className="font-semibold text-lg">Histórico</h2>
                </div>
                {history.map((item) => (
                  <div
                    key={item.id}
                    className={`relative bg-white p-4 border-l-8 border-r-8 shadow-md my-4 flex 
                justify-between ${
                  item.type === 'income' ? 'border-green-500' : 'border-red-500'
                }`}
                  >
                    <div>
                      <p>{item.name}</p>
                    </div>
                    <div>
                      <p>{currencyFormat(item.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
