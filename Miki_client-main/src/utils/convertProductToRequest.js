import uniqid from 'uniqid';

export const convertProductToRequest = (dataForm, idProduct) => {
  let minPrice = dataForm.stock[0].price;
  const productId = idProduct ? idProduct : uniqid();
  const stock = dataForm.stock.map((item) => {
    if (item.price < minPrice) minPrice = item.price;
    return {
      sizeId: parseInt(item.sizeId),
      quantity: parseInt(item.quantity),
      price: item.price,
    };
  });
  const productToAdd = {
    id: productId,
    name: dataForm.name,
    categoryId: parseInt(dataForm.category),
    stock: stock,
    sale: dataForm.sale,
    desc: dataForm.desc,
    minPrice,
  };
  return productToAdd;
};
