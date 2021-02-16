cartToggle()
clearItems();
addItems()

function cartToggle() {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');

  cartInfo.addEventListener('click', function () {
    cart.classList.toggle('show-cart');
  })
}

function clearItems(){
  const cartItem = document.getElementsByClassName("cart-item");
  const clearButton = document.getElementById("clear-cart");

  clearButton.addEventListener('click', function () {
    while (cartItem.length) {
      cartItem.item(0).remove()
    }
    localStorage.clear();
    showTotals();
  });
}

function addItems() {
  const cartBtn = document.querySelectorAll(".store-item-icon");
  save_items = [];
  cartBtn.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      if (event.target.parentElement.classList.contains('store-item-icon')) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf('img') + 3;
        let parthPath = fullPath.slice(pos);

        const item = {};
        item.img = `img-cart${parthPath}`;
        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        item.name = name
        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice

        save_items.push({
          img: item.img,
          name: name,
          price: finalPrice
        });

        const cartItem = document.createElement("div");
        cartItem.classList.add(
          'cart-item',
          'd-flex',
          'justify-content-between',
          'text-capitalize',
          'my-3'
        );

        cartItem.innerHTML = `
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">
              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
          </div>
        `;
        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");

        cart.insertBefore(cartItem, total);

        alert("item added to the cart");
        showTotals();
        removeItem();
      }
      localStorage.setItem("items", JSON.stringify(save_items));
    });
  });
}

function showTotals() {
  const total = [];
  // const moneyTotal = [];
  const items = document.querySelectorAll(".cart-item-price");

  items.forEach(function (item) {
    total.push(parseFloat(item.textContent));
  });

  const totalMoney = total.reduce(function (total, item) {
    total += item;
    return total;
  }, 0);

  const finalMoney = totalMoney;
  localStorage.setItem("finalMoney", finalMoney);
  localStorage.setItem("total", total.length);
  localStorage.setItem("totalMoney", totalMoney);

  document.getElementById("cart-total").textContent = finalMoney
  document.querySelector(".item-total").textContent = finalMoney;
  document.getElementById("item-count").textContent = total.length;
}

const finalMoney = localStorage.getItem('finalMoney');
const total = localStorage.getItem('total');

document.getElementById("cart-total").textContent = finalMoney;
document.querySelector(".item-total").textContent = finalMoney;
document.getElementById("item-count").textContent = total;


let items = JSON.parse(localStorage.getItem("items"))

for (var i = 0; i < items.length; i++) {
  const cartItem = document.createElement("div");
  cartItem.classList.add(
    'cart-item',
    'd-flex',
    'justify-content-between',
    'text-capitalize',
    'my-3'
  );

  cartItem.innerHTML = `
    <img src="${items[i].img}" class="img-fluid rounded-circle" id="item-img" alt="">
    <div class="item-text">
      <p id="cart-item-title" class="font-weight-bold mb-0">${items[i].name}</p>
      <span>$</span>
      <span id="cart-item-price" class="cart-item-price" class="mb-0">${items[i].price}</span>
    </div>
    <a href="#" id='cart-item-remove' class="cart-item-remove">
      <i class="fas fa-trash"></i>
    </a>
  </div>
`;
  const cart = document.getElementById("cart");
  const total = document.querySelector(".cart-total-container");
  cart.insertBefore(cartItem, total);
  removeItem()
}


function removeItem() {
  const trashBtn = document.querySelectorAll(".cart-item-remove");

  trashBtn.forEach(function (trash, index) {
    trash.addEventListener('click', function (event) {
      if (event.target.parentElement.classList.contains('cart-item-remove')) {
        let itemToMove = event.target.parentElement.parentElement;
        itemToMove.remove();
        save_items.splice(index);
        localStorage.setItem("items", JSON.stringify(save_items));
        showTotals();
      }
    });
  });
};
