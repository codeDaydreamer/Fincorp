import React, { useEffect, useState } from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Labels from './Labels';
import { chartData , getTotal} from '../helper/helper';
import { useGetLabelsQuery } from "../store/apiSlice";

Chart.register(ArcElement);

function Graph() {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();
  const [config, setConfig] = useState({ data: { datasets: [] }, options: {} });

  useEffect(() => {
    if (isSuccess && data) {
      const updatedConfig = chartData(data);
      setConfig(updatedConfig);
    }
  }, [data, isSuccess]);

  let graphContent;

  if (isFetching) {
    graphContent = <div>Fetching</div>;
  } else if (isError) {
    graphContent = <div>Error</div>;
  } else if (isSuccess) {
    graphContent = <Doughnut {...config} />;
  }

  return (
    <div className='flex-justify-content max-width-xs mx-auto'>
      <div className="item">
        <div className="chart relative">
          {graphContent}
          <h4 className='mb-4 font-bold title'>
            Title
            <span className='block text-3xl text-emerald-400'>ksh {getTotal(data) ?? 0}</span>
          </h4>
        </div>
        <div className="flex flex-col py-10 gap-4">
          <Labels />
        </div>
      </div>
    </div>
  );
}

export default Graph;
