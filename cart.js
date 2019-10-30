if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready2()
    update()
    ready()
}

function ready2(){
    console.log("this is from cart.js")
    displayCart()
}

function displayCart(){
    var itemList = JSON.parse(localStorage.getItem("savedItemList"))
    if (itemList != null){
        for (var i=0; i<itemList.length; i++){
            var productName = itemList[i].productName
            var price = itemList[i].price
            var glazing = itemList[i].glazing
            var quantity = itemList[i].quantity
            var imgPath = itemList[i].imgPath
            console.log("info", {productName})

            displayItem(productName, price, glazing, quantity, imgPath)
        }
    }
}

function removeCartItem(glazing){
    var totalAmountDisplay = JSON.parse(localStorage.getItem("savedTotalAmountDisplay"))
    var itemList = JSON.parse(localStorage.getItem("savedItemList"))
    if (itemList != null){
        for (var i=0; i<itemList.length; i++){
            if (itemList[i].glazing == glazing){
                var index = itemList.indexOf(itemList[i])
                if (index > -1){
                    itemList.splice(index, 1)
                }else{console.log("index<-1")}
            }
        }
    }
    localStorage.setItem('savedItemList', JSON.stringify(itemList))
    console.log("removeCalled")
    displayCartNumAfterRemoval()
}


function displayItem(productName, price, glazing, quantity, imgPath){
    
    var cart = document.getElementsByClassName("cartList")[0]
    var newItem = document.createElement("div")
    newItem.classList.add('item')

    var itemContent = `      
    <div class='cart-item-thumbnail'>
        <img class='item-img' "></div>
      </div>

      <div class='cart-item-name'>
          <h1>${productName}</h1>
          <div class='inline glazing'>
            <p class='inline'>Glazing: </p>
            <p class='inline glazing-option'>${glazing}</p>
          </div>
          <div class='quantity'>
            <p class='inline'>Quantity: </p>
            <input class='inline quantity-input' type='number' value=${quantity} min='1' onchange='update()'>
            <p class='inline'>x</p>
            <p class='inline item-price'>${price}</p>
          </div>
      </div>

      <div class='cart-item-remove'>
          <button class='btn' onclick="removeCartItem('${glazing}')">REMOVE</button>
      </div>
    </div>`


    newItem.innerHTML = itemContent
    cart.append(newItem)
}

function displayCartNumAfterRemoval(){
    console.log("displayCartNumAfterRemoval called")
    var totalAmountDisplay = document.getElementsByClassName("cart")[0].innerText.match(/(\d+)/)[0]
    console.log(totalAmountDisplay)
    var currentCartItems = JSON.parse(localStorage.getItem('savedItemList'))
    totalAmountDisplay = parseInt(totalAmountDisplay) - 1
    localStorage.setItem("savedTotalAmountDisplay", JSON.stringify(totalAmountDisplay))
    document.getElementsByClassName("cart")[0].innerText = "CART(" + parseInt(totalAmountDisplay, 10) + ")"
    console.log(totalAmountDisplay)
}
//parseInt(itemList[i].quantity, 10)
