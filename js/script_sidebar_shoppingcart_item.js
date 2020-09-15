var wishlist_name = document.getElementById('wishlist_name');
var wishlistItem = document.getElementById('wishlistItem');
var params = location.search.substr(location.search.indexOf("?") + 1).split('=')[1];
var plus = document.getElementById('plus');
var sub = document.getElementById('sub');
var editbutton = document.getElementById('editbutton');
var wishlist;

function valueUpdate(){
whale.storage.local.get(['cartlist'], function(result1) {
    wishlist_name.innerHTML = result1.cartlist[params];
    whale.storage.local.get(['shoppingcartItem'], function(result2) {
        var temphtml ="";
        for (var i = 0; i < result2.shoppingcartItem.length; i++) {
          if (result2.shoppingcartItem[i] != undefined) {
            var item_image = result2.shoppingcartItem[i][3];
            var item_name = result2.shoppingcartItem[i][2];
            var item_address = result2.shoppingcartItem[i][1];
            var item_price = result2.shoppingcartItem[i][4];
            if(result2.shoppingcartItem[i][0] == params){
                temphtml+= "<div class='item'><input type='checkbox' name='itemcheckL[]' ><div class='item_info'><img src='" + item_image + "'><div class='item_info_text'><p class = 'item_name'><a href='" + item_address + "' target='_blank' >" +item_name +"</a></p><p class='item_price'>"+item_price+" 원</p></div></div></div>"
            }
            wishlistItem.innerHTML =  temphtml;
          }
        }
    });
});
}

plus.addEventListener('click',function(event){
  whale.storage.local.get(['cartlist'], function(result) {
  var tempaddress = "/sidebar_shoppingcart_item_plus.html?wishlist="+params;
  location.replace(tempaddress);
  });
});

valueUpdate();

whale.storage.onChanged.addListener(function (changes, local) {
         for (shoppingcartItem in changes) {
           valueUpdate();
        }
});

sub.addEventListener('click',function(event){
  var itemcheckL= document.getElementsByName("itemcheckL[]");
  whale.storage.local.get(['shoppingcartItem'], function(result) {
    var array = result.shoppingcartItem;
    var temparray = [] ;
    var count = 0 ;
    for(var i=0;i<itemcheckL.length;i++){
      if(itemcheckL[i].checked == true) {
        temparray.push(i);
        count++;
     }
   }
   for (var i = 0; i < temparray.length; i++) {
     array.splice(temparray[i-(temparray.length -count)], 1);
     count--;
     whale.storage.local.set({'shoppingcartItem':array},function(){
       valueUpdate();
     });
   }
 });
 valueUpdate();
});
