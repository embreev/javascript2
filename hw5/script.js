const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		good: {},
		filteredGoods: [],
        cart: [],
		searchLine: '',
        isVisibleCart: false,
	},
	methods: {
		makeGETRequest(url) {
			return new Promise((resolve, reject) => {
				const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

				xhr.onreadystatechange = function () {
				  if (xhr.readyState === 4) {
					const response = JSON.parse(xhr.responseText);
					if (xhr.status !== 200) reject(response);
					resolve(response);
				  }
				};

				xhr.onerror = function (e) {
				  reject(e);
				};

				xhr.open('GET', url);
				xhr.send();
			});
		},
        searchHandler() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter((good) => {
                return regexp.test(good.product_name);
            });
        },
        add() {
//            try {
//              const { result } = makeGETRequest(`${BASE_URL}/catalogData.json`);
//              if (!result) {
//                throw new Error('Ошибка добавления товара!');
//              }
//	          const item = new CartItem(this.good.id_product, this.good.product_name, this.good.price);
//	          const el = this.goods.find(value => value.id === this.good.id_product);
//              if (!el) {
//		        this.goods.push(item);
//	          } else {
//	            this.goods[this.goods.indexOf(el)].count++;
//	          }
//            } catch (e) {
//              throw new Error(e);
//            }
          },
        remove() {
            const el = this.goods.find(value => value.id === id);
            if (el) {
              console.log('good');
              if (el.count > 1) {
                this.goods[this.goods.indexOf(el)].count--;
              } else {
                this.goods.splice(this.goods.indexOf(el), 1);
              }
            }
        },
        showCart() {
            const cartObj = document.querySelector('.cart');
            this.isVisibleCart = !this.isVisibleCart;
            cartObj.style.display = this.isVisibleCart ? "block" : "none";
//            cartObj.innerHTML = goods.reduce((acc, item) => {
//              const good = new CartItem(item.id, item.title, item.price, item.count);
//              return acc += good.render();
//            }, '');
        }
    },
    mounted() {
	    this.makeGETRequest(`${BASE_URL}/catalogData.json`).then( (goods) => {
		    this.goods = goods;
		    this.filteredGoods = goods;
        });
    }
});

/*
class GoodsItem {
  constructor(id, title = 'No name', price = 'No price') {
    this.id = id;
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item" >
      <h3>{{ this.title }}</h3>
      <p>{{ this.price }}</p>
      <button data-id="${this.id}">Добавить в корзину</button>
    </div>`;
  }
}

class GoodsList {
  constructor(container = '.container') {
    this.container = container;
    this.goods = [];
    this.filteredGoods = [];
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
      this.filteredGoods = [...this.goods];
      console.log(this.goods);
      return this.goods;
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }
  filterGoods(value) {
    console.log(value);
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter((good) => {
      return regexp.test(good.product_name);
    });
    this.render();
  }
  addEvents(el = 'button', event = () => {}) {
    const container = document.querySelector(this.container);
    const elements = container.querySelectorAll(el);
    elements.forEach((currentEl) => {
      currentEl.addEventListener('click', event);
    })
  }
  render() {
    document.querySelector(this.container).innerHTML = this.filteredGoods.reduce((acc, item) => {
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
  constructor(title = 'No name', price = 'No price', count = 1) {
    super(title, price);
    this.count = count;
  }
}



const cart = new Cart();
const list = new GoodsList('.goods-list', cart);
const searchForm = document.querySelector('.goods-search-from');
const searchInput = document.querySelector('.goods-search');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = searchLine.value;
  list.filterGoods(value);
});
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
});
*/