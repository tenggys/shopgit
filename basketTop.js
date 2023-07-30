const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');


// Открытия корзины при кликt на ее/

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});


const basket = {};

// Клика добавления в карзину
document.querySelector('.row').addEventListener('click', event => {

  if (!event.target.closest('.item__btm')) {
    return;
  }
  const featuredItemEl = event.target.closest('.card');
  const id = +featuredItemEl.dataset.id;
  const name = featuredItemEl.dataset.name;
  const price = +featuredItemEl.dataset.price;
 
  addToCart(id, name, price);
});


function addToCart(id, name, price) {
  //Создаем новый объект
  if (!(id in basket)) {
    basket[id] = {id: id, name: name, price: price, count: 0};
  }
  
  basket[id].count++;
  basketCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
  renderProductInBasket(id);
}

//Считает и возвращает количество продуктов в корзине
function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

//Итоговая цена по всем добавленным продуктам
function getTotalBasketPrice() {
  return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

// Отрисовка информации в карзине 
function renderProductInBasket(productId) {
  
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-id="${productId}"]`);
  
  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }

  
  const product = basket[productId];
  basketRowEl.querySelector('.productCount').textContent = product.count;
  basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}
