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
  totalPrice() {
    return this.goods.reduce((total, good) => {
      if (!good.price) return total;
      return total += good.price;
    }, 0);
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
  render() {
    document.querySelector(this.container).innerHTML = this.goods.reduce((acc, item) => {
      const good = new GoodsItem(item.title, item.price);
      return acc += good.render();
    }, '');
  }
}

class Cart extends GoodsList {
  add(good) {}
  remove(id) {
    if (!id) {
      // clean cart
      return;
    }
  }
  update(id, good) {}
}

class CartItem extends GoodsItem {
  constructor(title = 'No name', price = 'No price', count = 1) {
    super(title, price);
    this.count = count;
  }
}


const list = new GoodsList('.goods-list');
list.fetchGoods();
console.log(list.totalPrice());
list.render();