import React from 'react';
import 'boxicons';
import { useGetLabelsQuery, useDeleteTransactionMutation } from "../store/apiSlice";

function List() {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();
  const [deleteTransaction] = useDeleteTransactionMutation(); // Assuming useDeleteTransactionMutation is correctly imported

  const handleClick = async (e) => {
    const transactionId = e.target.dataset.id;
    if (!transactionId) return;
    
    try {
      await deleteTransaction({ _id: transactionId });
      // Optionally, you can handle success response or re-fetch data here
    } catch (error) {
      console.error('Error deleting transaction:', error);
      // Handle error state
    }
  };

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((item, index) => (
      <Transaction key={index} category={item} handler={handleClick} />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}>
      <button className="px-3" onClick={handler} data-id={category._id}>
        <box-icon name="trash" size="15px" color={category.color ?? "#e5e5e5"}></box-icon>
      </button>
      <span className="block w-full">{category.name ?? ''}</span>
    </div>
  );
}

export default List;
