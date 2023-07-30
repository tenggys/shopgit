// Div внутри корзины, в который мы добавляем товары
const cartWrapper =  document.querySelector('.cart-wrapper');

// Отслеживаем клик на странице
window.addEventListener('click', function (event) {
	// Проверяем что клик был совершен по кнопке "Добавить в корзину"
	if (event.target.hasAttribute('data-cart')) {

		// Находим карточку с товаром, внутри котрой был совершен клик
		const card = event.target.closest('.card');

		// Собираем данные с этого товара и записываем их в единый объект productInfo
		const productInfo = {
			id: card.dataset.id,
			imgSrc: card.querySelector('.item__pic').getAttribute('src'),
			title: card.querySelector('.item__ttl').innerText,
			itemsInBox: card.querySelector('.item__dsc').innerText,
			price: card.querySelector('.item__price').innerText,
			counter: card.dataset.counter,	
			color: card.dataset.color,	
			size: card.dataset.size,	
		};

		// Проверять если ли уже такой товар в корзине
		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

		// Если товар есть в корзине
		if (itemInCart) {
			const counterElement = itemInCart.querySelector(`[data-counter="${productInfo.counter}"]`);
			counterElement.dataset = parseInt(counterElement.dataset) + parseInt(productInfo.counter);
		/*
			const counterElement = itemInCart.querySelector('[data-counter]');
			counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);*/
		} else {
			// Если товара нет в корзине

			// Собранные данные подставим в шаблон для товара в корзине
			const cartItemHTML = `
				<div class="product" data-id="${productInfo.id}">
					<button class="btn__del">Удалить
					</button>
					<div class="product__content">
						<img class="product__img" src="${productInfo.imgSrc}" alt="${productInfo.title}">
						<div class="product__desc">
							<h2 class="product__name">${productInfo.title}</h2>
							<p class="product__price_lable">Цена: <span class="product__price">${productInfo.price}</span> </p>
							<p class="product__color">Цвет: ${productInfo.color}</p>
							<p class="product__size">Размер: ${productInfo.size}</p>
							<div class="product__qty">
								<label class="input__lable">Количество:</label>
								<input class="input__quantity" type="text" value="${productInfo.counter}">
							</div>
						</div>
					</div>
				</div>`;

			// Отобразим товар в корзине
			cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
		}

		//Закрытие карточки
		const deleteBtn = document.querySelectorAll('.btn__del');
        deleteBtn.forEach((button) => {
            button.addEventListener('click', () => {
                const product = button.closest('.product');       
                product.remove();
            })
        })

		// Сбрасываем счетчик добавленного товара на "1"
		/*card.querySelector(`[data-counter="${productInfo.counter}"]`).dataset = 1;*/
	
	}
});
