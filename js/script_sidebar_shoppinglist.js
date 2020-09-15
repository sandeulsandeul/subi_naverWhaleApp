var plus = document.getElementById('plus');
var sub = document.getElementById('sub');
var checklist = document.getElementById('shoppinglist_checklist');
var arr_shoppingL =  document.getElementsByName('arr_shoppingL');
// plus 버튼
plus.addEventListener('click',function(event){
  whale.storage.sync.get(['wishlist'], function(result) {
    var temparray ;
    var tempnum ;
    if(typeof result.wishlist === "undefined"){
      tempnum = 0 ;
      whale.storage.sync.set({'wishlist':[""]});
    }else{
      temparray = result.wishlist;
      tempnum = result.wishlist.length;
      temparray.push("");
      whale.storage.sync.set({'wishlist':temparray});
    }
    var htmlvalue = "<li><p><input type='checkbox' class='shoppinglist' name = 'arr_shoppingL'><input type='text' value=' ' name='shoppingListItems' class='checklist_item_name'></p></li>";
    checklist.innerHTML =  checklist.innerHTML + htmlvalue;
    valueUpdate();
  });
});

//- 버튼
sub.addEventListener('click',function(event){
  whale.storage.sync.get(['wishlist'], function(result) {
    if(typeof result.wishlist === "undefined"){
    }else{
        var temparray = result.wishlist;
        var tempnum = result.wishlist.length;
        var checkarray = [] ;
        for(var i=0;i< tempnum;i++){
          if(arr_shoppingL[i].checked) {
            checkarray.push(i);
         }
       }
       for (var i = 0; i < checkarray.length; i++) {
         temparray.splice(checkarray[i], 1);
         whale.storage.sync.set({'wishlist':temparray});
       }
    }
    valueUpdate();
  });
});

htmlUpate();

whale.storage.onChanged.addListener(function (changes, sync) {
         for (wishlist in changes) {
           htmlUpate();
         }
});
function htmlUpate(){
  whale.storage.sync.get(['wishlist'], function(result) {
    var htmlvalue ="";
    if(result.wishlist != undefined){
      for (var i = 0; i < result.wishlist.length; i++) {
        htmlvalue += "<li><p><input type='checkbox' class='shoppinglist' name = 'arr_shoppingL'><input type='text' value='"+result.wishlist[i]+"' name='shoppingListItems' class='checklist_item_name'></p></li>";
      }
      checklist.innerHTML = htmlvalue;
      valueUpdate();
    }
  });
}

function valueUpdate(){
  var temparray ;
  whale.storage.sync.get(['wishlist'], function(result) {
    temparray = result.wishlist;
    console.log(temparray);
  });
  console.log(temparray);
  var shoppingListItems =document.getElementsByName('shoppingListItems');
  for (var i in shoppingListItems) {
    if (shoppingListItems.hasOwnProperty(i)) {
      const tempnum = i ;
      shoppingListItems[i].addEventListener('change',function(event){
          temparray[tempnum] = event.target.value;
          whale.storage.sync.set({'wishlist':temparray});
        });
      }
    }
}
