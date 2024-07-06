import React from "react";
import { useForm } from 'react-hook-form';
import List from './List';
import { useAddTransactionMutation } from '../store/apiSlice';

function Form() {
  const { register, handleSubmit, reset } = useForm();
  const [addTransaction] = useAddTransactionMutation();

  const onSubmit = async (data) => {
    if (!data) return; // Ensure data exists
    try {
      // Send transaction data to backend
      await addTransaction({
        name: data.name,
        type: data.type,
        amount: parseFloat(data.amount) // Ensure amount is parsed as a number
      }).unwrap();

      reset(); // Reset the entire form after successful submission
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <div className="Form max-w-sm mx-auto w-full">
      <h1 className="font-bold pb-4 text-xl">Transaction</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input type="text" {...register('name', { required: true })} placeholder="Transaction name eg food / busfare / deposit" className="form-input" />
          </div>
          <select className="form-input" {...register('type', { required: true })}>
            <option value="Investment">Investment</option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input type="number" {...register('amount', { required: true })} placeholder="Amount" className="form-input" />
          </div>
          <div className="submit-btn">
            <button type="submit" className="border py-2 text-white bg-indigo-500 w-full">Make Transaction</button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
}

export default Form;
