const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status !== 200) reject(response);
        resolve(response);
      }
    };

    xhr.onerror = () => reject(new Error('Ошибка запроса!'));

    xhr.open('GET', url);
    xhr.send();
  });
}

class GoodsItem {
  constructor(id, title = 'No name', price = 'No price') {
    this.id = id;
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item" >
      <h3>${this.title}</h3>
      <p>${this.price}</p>
      <button data-id="${this.id}">Добавить в корзину</button>
    </div>`;
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
  async fetchGoods() {
    try {
      this.goods = await makeGETRequest(`${BASE_URL}/catalogData.json`);
      console.log(this.goods);
      return this.goods;
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }
  addEvents(el = 'button', event = () => {}) {
    const container = document.querySelector(this.container);
    const elements = container.querySelectorAll(el);
    elements.forEach((currentEl) => {
      currentEl.addEventListener('click', event);
    })
  }
  render() {
    document.querySelector(this.container).innerHTML = this.goods.reduce((acc, item) => {
      const good = new GoodsItem(item.id_product, item.product_name, item.price);
      return acc += good.render();
    }, '');
  }
}

class Cart extends GoodsList {
  async add(good) {
    try {
      const { result } = await makeGETRequest(`${BASE_URL}/addToBasket.json`);
      if (!result) {
        throw new Error('Ошибка добавления товара!');
      }
	  console.log(good);
	  const item = new CartItem(good.id_product, good.product_name, good.price);
	  const el = this.goods.find(value => value.id === good.id_product);
      if (!el) {
		this.goods.push(item);
	  } else {
	    this.goods[this.goods.indexOf(el)].count++;
	  }
      console.log(this.goods);
    } catch (e) {
      throw new Error(e);
    }
  }
  remove(id) {
	const el = this.goods.find(value => value.id === id);
    if (el) {
      console.log('good');
	  if (el.count > 1) {
		this.goods[this.goods.indexOf(el)].count--;
	  } else {
		this.goods.splice(this.goods.indexOf(el), 1);
	  }
    }
  }
  show(goods) {
	console.log(goods);
	document.querySelector('.goods-list').innerHTML = goods.reduce((acc, item) => {
      const good = new CartItem(item.id, item.title, item.price, item.count);
      return acc += good.render();
    }, '');
  }
}

class CartItem extends GoodsItem {
  constructor(id, title = 'No name', price = 'No price', count = 1) {
    super(id, title, price);
    this.count = count;
  }
  render() {
	return `<div class="cart-goods-item" >
      <p>Наименование: ${this.title}, цена: ${this.price}, кол-во: ${this.count} <button data-id="${this.id}">-</button></p>
    </div>`;
  }
}

const cart = new Cart();
const list = new GoodsList('.goods-list', cart);
list.fetchGoods().then(() => {
  list.render();
  list.addEvents('button', (event) => {
    const buttonEl = event.target;
    const goodId = buttonEl.getAttribute('data-id');
    const good = list.goods.find((currentGood) => {
      return currentGood.id_product == goodId;
    });
    cart.add(good);
  });
  const cartBtn = document.querySelector('.cart-button');
  cartBtn.addEventListener("click", () => cart.show(cart.goods));
});