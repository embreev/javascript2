const goods = [
  {
    title: 'Shirt', price: 150
  },
  {
    title: 'Socks', price: 50
  },
  {
    title: 'Jacket', price: 350
  },
  {
    title: 'Shoes', price: 250
  }
];

const renderGoodsItem = (title, price) => {
  return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list = [{title: 'Empty', price: 0}]) => {
  const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  let resultGoodsList = '';
  goodsList.forEach(function(elem){ resultGoodsList += elem; });
  document.querySelector('.goods-list').innerHTML = resultGoodsList;
};


document.addEventListener('DOMContentLoaded', () => {
  renderGoodsList(goods);
});