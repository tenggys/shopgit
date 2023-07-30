const productsContainer = document.querySelector('#products-container');


getProducts();

async function getProducts() {
	
    const response = await fetch('products.json');
    
    const productsArray = await response.json();
    
	renderProducts(productsArray);
}

function renderProducts(productsArray) {
    productsArray.forEach(function (item) {
        const productHTML = `
						<div class="card" data-id="${item.id}" data-counter="${item.counter}"
						  data-color="${item.color}" data-size="${item.size}" data-name="${item.name}" data-price="${item.price}">
							<div class="item__link">
								<img class="item__pic" src="img/${item.imgSrc}" alt="${item.title}">
								<div class="txt__box">
									<h3 class="item__ttl">${item.title}</h3>
									<p class="item__dsc">${item.itemsInBox}</p>
									<p class="item__price">$${item.price}</p>
								</div>
							</div>
							<div class="add__box">
								<button data-cart class="item__btm">
									<img src="img/tobasket.svg" alt="карзина">
									<p class="add__txt">Add to Cart</p>
								</button>
							</div>
							

							
						</div>
					`;
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}
