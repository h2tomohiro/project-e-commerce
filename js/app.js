(function () {
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', function () {
      cart.classList.toggle('show-cart');
    })
  })();

(function () {
  const cartItem = document.getElementsByClassName("cart-item");
  const clearButton = document.getElementById("clear-cart");

  clearButton.addEventListener('click', function () {
    while (cartItem.length) {
      cartItem.item(0).remove()
    }
    localStorage.clear();
    showTotals();
  });
})();


(function () {
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
          price: price
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

        // cartItems = []
        // cartItems.push(cartItem)
        // console.log(cartItems);

        localStorage.setItem("cart", cart);
        localStorage.setItem("totalContainer", total);
        localStorage.setItem("cartItem", cartItem.outerHTML);
        // localStorage.setItem("cartItems", cartItems);

        cart.insertBefore(cartItem, total);

        test = cart.insertBefore(cartItem, total);
        localStorage.setItem("test", cartItem.outerHTML);
        alert("item added to the cart");
        showTotals();
        removeItem();
      }
      localStorage.setItem("items", JSON.stringify(save_items));
    });
  });
})();

function showTotals() {
  const total = [];
  const items = document.querySelectorAll(".cart-item-price");

  items.forEach(function (item) {
    total.push(parseFloat(item.textContent));
  });

  const totalMoney = total.reduce(function (total, item) {
    total += item;
    return total;
  }, 0);
  const finalMoney = totalMoney.toFixed(2);
  localStorage.setItem("finalMoney", finalMoney);
  localStorage.setItem("total", total.length);

  document.getElementById("cart-total").textContent = finalMoney
  document.querySelector(".item-total").textContent = finalMoney;
  document.getElementById("item-count").textContent = total.length;
}

function removeItem() {
  const trashBtn = document.querySelectorAll(".cart-item-remove");

  trashBtn.forEach(function (trash) {
    trash.addEventListener('click', function (event) {
      if (event.target.parentElement.classList.contains('cart-item-remove')) {
        let itemToMove = event.target.parentElement.parentElement;
        itemToMove.remove();

        showTotals();
      }
    });
  });
};

const finalMoney = localStorage.getItem('finalMoney');
const total = localStorage.getItem('total');

document.getElementById("cart-total").textContent = finalMoney;
document.querySelector(".item-total").textContent = finalMoney;
document.getElementById("item-count").textContent = total;

// const cart = localStorage.getItem("cart");
// const totalContainer = localStorage.getItem("totalContainer");
// const cartItem = localStorage.getItem("cartItem");
// document.getElementById("cart-item").innerHTML = cartItem;

// cart.insertBefore(cartItem, totalContainer);



var items = JSON.parse(localStorage.getItem("items"))//ローカルストレージの商品データの配列
// ele = document.getElementById('js_shopping_list'),//カートの商品を追加する要素
// fragment = document.createDocumentFragment(),//DOMの追加処理用のフラグメント

if (items) {
  // カート商品の数分、要素を生成
  for (var i = 0; i < items.length; i++) {
    // var li = document.createElement('li'),
    // h2 = document.createElement('h2'),
    // price = document.createElement('div');
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
    // //生成した要素にクラスを追加
    // price.classList.add('price');

    // //要素に商品データを追加
    // h2.appendChild(document.createTextNode(items[i].name));
    // price.appendChild(document.createTextNode(items[i].price));

    // //商品名と価格の要素をliに追加
    // li.appendChild(h2);
    // li.appendChild(price);
    // fragment.appendChild(li);

  }
}
