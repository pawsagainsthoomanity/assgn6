if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
    update()
}

function ready()
{
  var removeBtns = document.getElementsByClassName('btn')
  console.log(removeBtns)
  for (var i=0; i<removeBtns.length; i++){
  var btn = removeBtns[i]
  btn.addEventListener('click', function(event){
    var btnClicked = event.target
    btnClicked.parentElement.parentElement.remove()
    update()
  })
  }
  var addButtons = document.getElementsByClassName('blk')
  console.log(addButtons)
  if (localStorage.getItem('savedTotalAmountDisplay') != null){
    var x = parseInt(JSON.parse(localStorage.getItem('savedTotalAmountDisplay')),10)
    if (x != 0){
    document.getElementsByClassName("cart")[0].innerText = "CART(" + x + ")"
    }
  }
}

// add a product to cart
function addItem(event){
  var itemList = JSON.parse(localStorage.getItem('savedItemList'))
  if (itemList == null){
    itemList = []
  }
  event.preventDefault()
  let cartItem = {
    productName: document.getElementsByClassName("headline")[0].innerText,
    price: document.getElementsByClassName("price")[0].innerText,
    glazing: document.querySelector('input[name="glazing"]:checked').value,
    quantity: document.querySelector('input[name="quantity"]:checked').value,
    imgPath: document.getElementById('disp').src
  }
  if (isDuplicate(cartItem)[0]){
    alert("You've already added it with same glazing to your cart! Go to cart to modify the amount.")
    itemList = isDuplicate(cartItem)[1]
    console.log('updatedNum', {itemList})
  }else{
    itemList.push(cartItem)
    console.warn('added', {cartItem})
    updateCartNum()
  }
  document.forms[0].reset()
  localStorage.setItem('savedItemList', JSON.stringify(itemList))
  //window.location.href = "cart.html"
}

// update the total price, and cart num display
function update(){
  var items = document.getElementsByClassName('item')
  var totalPrice = 0
  for (var i = 0; i<items.length; i++){
    var item = items[i]
    var itemPrice = parseFloat(item.getElementsByClassName('quantity')[0].getElementsByClassName('item-price')[0].innerText.replace('$',''))
    var itemQuantity = item.getElementsByClassName('quantity')[0].getElementsByClassName('quantity-input')[0].value
    totalPrice += itemPrice * itemQuantity
  }
  if (document.getElementsByClassName('amount').length != 0){
    document.getElementsByClassName('amount')[0].innerText = '$' + totalPrice
  }
}

function changeImg(path){
  document.getElementById('disp').src = path
}

// click thumbnails and display the chosen image 
function changeImg2(val){
  var dispImg = document.getElementById('disp')
  if (val=="Sugar-Milk"){
    dispImg.src = "./details/sugar_milk.jpg"
  }
  else if (val=="Vanilla-Milk"){
    dispImg.src = "./details/vanilla_milk.jpg"
  }
  else if (val=="Double-Chocolate"){
    dispImg.src = "./details/chocolate.jpg"
  }
}

// update cart display num
function updateCartNum(){
  console.log("updateCartNum called")
  var totalAmountDisplay = document.getElementsByClassName("cart")[0].innerText.match(/(\d+)/)[0]
  console.log(totalAmountDisplay)
  var currentCartItems = JSON.parse(localStorage.getItem('savedItemList'))
  totalAmountDisplay = parseInt(totalAmountDisplay) + 1
  localStorage.setItem("savedTotalAmountDisplay", JSON.stringify(totalAmountDisplay))
  document.getElementsByClassName("cart")[0].innerText = "CART(" + parseInt(totalAmountDisplay, 10) + ")"
  console.log(totalAmountDisplay)
}

function isDuplicate(item){
  var itemList = JSON.parse(localStorage.getItem('savedItemList'))
  if (itemList != null){
    for (var i=0; i<itemList.length; i++){
      if (itemList[i].productName == item.productName && itemList[i].glazing == item.glazing){
        var num = parseInt(itemList[i].quantity, 10) + parseInt(item.quantity, 10)
        itemList[i].quantity = num.toString()
        return [true, itemList]
      }
    }
  }
  return [false, null]
}

//document.getElementsByClassName("cart")[0].innerText = "CART(" + parseInt(JSON.parse(localStorage.getItem('savedTotalAmountDisplay')),10) + ")"

























