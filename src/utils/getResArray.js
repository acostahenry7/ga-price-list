function getItemsFromRes(arr) {
  let newArr = [];
  arr?.map((item) => {
    newArr.push({
      unit: item.item,
      shipment: item.shipment,
      cost: Math.ceil((parseFloat(item.price) + Number.EPSILON) * 100) / 100,
      price: Math.ceil((parseFloat(item.price) + Number.EPSILON) * 100) / 100,
      updatedPrice: parseFloat(item.price).toFixed(2),
      currency: item.currency,
      rate: item.rate,
    });
  });

  console.log(newArr);

  return newArr;
}

export { getItemsFromRes };
