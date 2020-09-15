
/*1.폼 변수의 값 가져오기  */
var wishlist_name = document.getElementById('wishlist_name');
var form = document.getElementById('shoppingcart__item_plus_form');

var item_address = document.getElementById('shoppingcart_item_address');
var item_name = document.getElementById('shoppingcart_item_name');
var item_image = document.getElementById('shoppingcart_item_image');
var item_price = document.getElementById('shoppingcart_item_price');
var item_memo = document.getElementById('shoppingcart_item_memo');

var submit = document.getElementById('submit');
var clear = document.getElementById('clear');

/*2. params 는 해당 아이템이 어떠한 wishlist 항목의 default인지의 잢을 주소를 통해서 전달한다. */
var params = location.search.substr(location.search.indexOf("?") + 1).split('=')[1];
var wishlist = "";

/*3. 임시 배열 tempvalue를 통해서 값을 저장한 뒤 storage.local의 shoppingcartItem에 데이터 저장 */
const tempvalue = [params,"","","images/star.png" ,"0",""];


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

/* 제출하기 버튼을 누르면 tempvalue의 값이
   storage.local의 shoppingcartItem에 저장된다. */
submit.addEventListener('click', function(event){
      var temparray=[];

      whale.storage.local.get(['shoppingcartItem'], function(result) {
        if(!result.shoppingcartItem){
          //shoppingcartItem의 값이 없을 경우에는  temparray가
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


/*취소 버튼을 누르면 폼 초기화*/
clear.addEventListener('click',function(event){
  form.reset();
});
