var wishlist_name = document.getElementById('wishlist_name');
var form = document.getElementById('shoppingcart__item_plus_form');

var item_address = document.getElementById('shoppingcart_item_address');
var item_name = document.getElementById('shoppingcart_item_name');
var item_image = document.getElementById('shoppingcart_item_image');
var item_price = document.getElementById('shoppingcart_item_price');
var item_memo = document.getElementById('shoppingcart_item_memo');

var submit = document.getElementById('submit');
var clear = document.getElementById('clear');
var params = location.search.substr(location.search.indexOf("?") + 1).split('=')[1];
form.reset();
var wishlist = "";
const tempvalue = [params,"","","images/star.png" ,"0",""];


clear.addEventListener('click',function(event){
  form.reset();
});

form.addEventListener('change',function(event){
  switch (event.target.id) {
    case 'shoppingcart_item_address':
      tempvalue[1]  = event.target.value;
      break;
    case 'shoppingcart_item_name':
      tempvalue[2]  = event.target.value;
      break;
    case 'shoppingcart_item_image':
      tempvalue[3]  = event.target.value;
      break;
    case 'shoppingcart_item_price':
      tempvalue[4]  = event.target.value;
      break;
    case 'shoppingcart_item_memo':
      tempvalue[5]  = event.target.value;
      break;
    }});


submit.addEventListener('click', function(event){
      var temparray=[];
      whale.storage.local.get(['shoppingcartItem'], function(result) {

        if(!result.shoppingcartItem){
          temparray.push(tempvalue);
        }else{
          temparray = result.shoppingcartItem;
          temparray.push(tempvalue);
        }
        whale.storage.local.set({'shoppingcartItem':temparray});
      });
      tempaddress = "sidebar_shoppingcart_item.html?item="+params;
      location.replace(tempaddress);
})
