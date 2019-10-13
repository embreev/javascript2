//const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const BASE_URL = 'http://localhost:3000';

Vue.component('search', {
	template: `
		<div class="search">
			<form class="goods-search-from" @submit.prevent>
				<input type="text" class="goods-search" @input="$emit('input', $event.target.value)" />
			</form>
		</div>
  `,
});

Vue.component('cart', {
	data: function () {
		return {
			isVisibleCart: false
		}
	},
	methods: {
	    toggleCartVisibility() {
			this.isVisibleCart = !this.isVisibleCart;
		},
	},
	template: `
		<div class="cart">
			<button class="cart-button" @click="toggleCartVisibility">Корзина</button>
			<div class="cart-container" v-if="isVisibleCart">Товары в корзине</div>
		</div>
	`,
});

Vue.component('goods-item', {
  props: ['good'],
  methods: {
    add() {
      this.$emit('add', this.good.id_product);
    }
  },
  template: `
    <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button @click="add">Добавить в корзину</button>
    </div>
  `
});

Vue.component('goods-list', {
  props: ['goods'],
  computed: {
    isGoodsNotEmpty() {
      return this.goods.length > 0;
    }
  },
  methods: {
    addTo(productId) {
      this.$emit('add', productId)
    }
  },
  template: `
    <div class="goods-list" v-if="isGoodsNotEmpty">
      <goods-item v-for="good in goods" @add="addTo"
          :good="good" :key="good.id_product"></goods-item>
    </div>
    <div class="goods-empty" v-else>
       Нет данных
    </div>
  `
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    searchLine: '',
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      return this.goods.filter((good) => {
        return regexp.test(good.product_name);
      });
    },
  },
  mounted() {
    this.makeGETRequest(`${BASE_URL}/catalogData`).then((goods) => {
      this.goods = JSON.parse(goods);
      console.log(goods);
    }).catch(err => console.error(err));
  },
  methods: {
    addToCart(productId) {
      console.log('add product', productId);
    },
    makeGETRequest(url) {
      return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
		xhr.open('GET', 'http://localhost:3000', true);
		xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
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
	makePOSTRequest(url, data, callback) {
		let xhr;

		if (window.XMLHttpRequest) {
		  xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) { 
		  xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.onreadystatechange = function () {
		  if (xhr.readyState === 4) {
			callback(xhr.responseText);
		  }
		}

		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

		xhr.send(data);
	}
  }
});