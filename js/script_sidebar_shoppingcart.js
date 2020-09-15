var plus = document.getElementById('plus');
var sub = document.getElementById('sub');
var whishlist = document.getElementById('wishlist');
var wishlist_name = document.getElementsByName('wishlist_name');


htmlUpate();
valueUpdate();

whale.storage.onChanged.addListener(function (changes, sync) {
         for (wishlist in changes) {
           valueUpdate();
           htmlUpate();
         }
});

function valueUpdate(){
  whale.storage.sync.get(['wishlist'], function(result) {
    var temparray = result.wishlist;
    var temparray2 = [];
    var templength = 0;
    if(temparray === undefined ){
      templength  = 0;
    }else if(temparray != undefined ){
      templength  = temparray.length;
    }
      for (var i = 0; i < templength; i++) {
        if (temparray.hasOwnProperty(i) && temparray[i] && temparray[i] != " ") {
            temparray2.push(temparray[i]);
          }
      }
    whale.storage.local.set({'cartlist' : temparray2});
  });
}


function htmlUpate(){
  whale.storage.local.get(['cartlist'], function(result) {
    var temparray = result.cartlist;
    var tempaddress = "sidebar_shoppingcart_item.html?item=";
    var temphtml="";
    for (var i in result.cartlist) {
      if (result.cartlist.hasOwnProperty(i)) {
        tempaddress = tempaddress+i;
        temphtml += "<li name = 'wishlist_name'><a href= '" + tempaddress +"'> " +temparray[i] +"</a></li>"
      }
    }
    whishlist.innerHTML = temphtml;
  });

var d = new Date();
var year = d.getFullYear();
var month = (d.getMonth() + 1) ;
var expense = 0;
var budget = 0;
whale.storage.local.get(['shoppingcartItem'], function(result) {
  var temp =  result.shoppingcartItem ;
  if(temp === undefined ){
    templength  = 0;
  }else if(temp != undefined ){
    templength  = temp.length;
  }
  for (var i = 0; i < templength ; i++) {
    expense += Number (result.shoppingcartItem[i][4]);
  }
  var expense_value = document.getElementById('expense_value');
  expense_value.innerHTML = expense + "원";

  whale.storage.local.get(['expense'], function(result2) {
    if(typeof result2.expense === "undefined"){
      var temparray = ['0','0','0','0','0','0','0','0','0','0','0','0','0'];
      whale.storage.local.set({expense:{'year':year,'monthexpense':temparray}});
    }else{
      var temparray = result2.expense;
      if(result2.expense.year == year){
        temparray.monthexpense[month] = expense;
        whale.storage.local.set({expense:{'year':year,'monthexpense':temparray}});
      } else{
          var temparray = ['0','0','0','0','0','0','0','0','0','0','0','0','0'];
          temparray.monthexpense[month] = expense;
          whale.storage.local.set({expense:{'year':year,'monthexpense':temparray}});
      }
    }
  });
   whale.storage.local.get(['budget'], function(result3) {
     budget = Number( result3.budget.monthbudget[month] );
     var expense_background = document.getElementById('expense_background');
     if(expense > budget){
       expense_background.src = "images/bad.png";
     }else if(expense == budget){
       expense_background.src = "images/soso.png";
     }else{
       expense_background.src = "images/good.png";
     }
   });
});}
