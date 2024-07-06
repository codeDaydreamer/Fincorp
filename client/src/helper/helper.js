import _ from "lodash";

export function getSum(transactions, type = null) {
  let grouped = _(transactions).groupBy("type").value();

  if (!type) {
    return _.map(grouped, objs => _.sumBy(objs, "amount"));
  }

  return _.map(grouped, (objs, key) => ({
    type: key,
    color: objs[0].color,
    total: _.sumBy(objs, "amount"),
  }));
}

export function getLabels(transactions) {
  let amountSum = getSum(transactions, 'type');
  let totalAmount = _.sumBy(transactions, 'amount');

  let percent = _.map(amountSum, obj => ({
    ...obj,
    percent: (100 * obj.total) / totalAmount,
  }));

  return percent;
}

export function chartData(transactions, custom) {
  const dataValue = getSum(transactions);
  let backgroundColors = _.map(transactions, 'color'); 
  backgroundColors = _.uniq(backgroundColors);

  const config = {
    data: {
      datasets: [{
        label: 'My First Dataset',
        data: dataValue,
        backgroundColor: backgroundColors,
        hoverOffset: 4,
        borderRadius: 30,
        spacing: 5,
      }]
    },
    options: {
      cutout: 115,
    },
  };

  return custom ?? config;
}

export function getTotal(transactions) {
  return _.sumBy(transactions, 'amount'); // Calculate total sum of amounts
}
