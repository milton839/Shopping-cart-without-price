//Modal part Start
const cart = document.getElementById('cart');
const modal = document.getElementById('modal-container');
const close = document.getElementById('close');

cart.addEventListener('click', () =>{
    modal.classList.add('show');
})

close.addEventListener('click', () =>{
    modal.classList.remove('show');
})
//Modal part End

const productsInCart = [];
const cartParentElement = document.querySelector('#buyItems');

const products = document.querySelectorAll('.item-a');

const updateShoppingCartHTML = function () {  
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			console.log(product);
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li><br>`
		});
		cartParentElement.innerHTML = result.join(' ');
	}
	else {
		cartParentElement.innerHTML = '<h6 class="empty">Your shopping cart is empty</h6>';
	}
}

const updateProductsInCart = (product) => {
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			return;
		}
	}
	productsInCart.push(product);
}
products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
        
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			
			const productName = item.querySelector('.ball').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

cartParentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();