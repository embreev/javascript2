class GoodsItem {
  constructor(title = 'No name', price = 'No price') {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor(container = '.container') {
    this.container = container;
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
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
      },
      {
        price: 350
      }
    ];
  }
  sumAllGoods() {
	let sum = 0;
	this.goods.forEach((goods) => sum += goods.price);
	return sum;
  }
  render() {
    document.querySelector(this.container).innerHTML = this.goods.reduce((acc, item) => {
      const good = new GoodsItem(item.title, item.price);
      return acc += good.render();
    }, '');
  }
}

class Basket {
	constructor() {
    this.goodsInBasket = [];
  }
  sumBasket() {
	let sum = 0;
	this.goodsInBasket.forEach((goodsInBasket) => sum += (goodsInBasket.price * goodsInBasket.count));
	return sum;
  }
  addItem() {
    this.goodsInBasket.push(new BasketItem(title, price, count));
  }
  clearBasket() {
	this.goodsInBasket.forEach((goodsInBasket) => goodsInBasket.pop());  
  }
}

class BasketItem {
  constructor(title, price, count) {
    this.title = title;
    this.price = price;
	this.count = count;
  }
  //тут нужно подумать про дублирование товаров, чтобы не добавлять новый, а увеличивать count.
}


const list = new GoodsList('.goods-list');
list.fetchGoods();
list.render();
console.log(list.sumAllGoods());