import React, { useEffect } from 'react';
import { useGetLabelsQuery } from "../store/apiSlice";
import { getLabels } from '../helper/helper';

function Labels() {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();

  useEffect(() => {
    if (isSuccess && data) {
      getLabels(data , `type`);
    }
  }, [data, isSuccess]);

  let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = getLabels(data , `type`).map((item, index) => (
      <Label key={index} data={item} />
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="labels">
      {Transactions}
    </div>
  );
}

function Label({ data }) {
  if (!data) return null; // Handle null or undefined data gracefully

  return (
    <div className="label flex justify-between">
      <div className="flex gap-2">
        <div className="w-3 h-10 mb-4 rounded" style={{ background: data.color ?? '#f9c74f' }}></div>
        <h3 className='text-md'>{data.type ?? ""}</h3>
      </div>
      <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
}

export default Labels;
