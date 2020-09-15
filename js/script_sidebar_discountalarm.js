var alarmplus = document.getElementById('plus');
var alarmsub = document.getElementById('sub');
var alarmsection = document.getElementById('alarmsection');

//기본적을 실행하는 함수
valueUpdate();
//plus 버튼을 눌렀을 때
alarmplus.addEventListener('click',function(event){
  location.replace('/sidebar_discountalarm_plus.html');
});

//sub 버튼을 눌렀을 때
alarmsub.addEventListener('click',function(event){
  var arr_discountalarmL= document.getElementsByName("discountalarmL[]");
  whale.storage.local.get(['discountalarm'], function(result) {
    var array = result.discountalarm;
    var temparray = [] ;
    var count = 0 ;
    for(var i=0;i<arr_discountalarmL.length;i++){
      if(arr_discountalarmL[i].checked == true) {
        temparray.push(i);
        count++;
     }
   }
   for (var i = 0; i < temparray.length; i++) {
     array.splice(temparray[i-(temparray.length -count)], 1);
     count--;
     whale.storage.local.set({'discountalarm':array});
   }
 });
 valueUpdate();
});

whale.storage.onChanged.addListener(function (changes, local) {
         for (discountalarm in changes) {
           valueUpdate();
        }
});




// html 값 업데이트
function valueUpdate(){
  whale.storage.local.get(['discountalarm'], function(result) {
    var changehtmlvalue ="";
    var temparray = result.discountalarm;
    var length = result.discountalarm.length;
    for (var i = 0; i < result.discountalarm.length; i++) {
      var name = result.discountalarm[i][0];
      var sdate = result.discountalarm[i][2];
      var edate =  result.discountalarm[i][3];
      var setting = result.discountalarm[i][4];
      var discountalarm_percentage = result.discountalarm[i][5];
      if(setting =='yes'){
        var htmlvalue = "<div class='alarmitem'><div class = 'alarmname'><input type='checkbox' name='discountalarmL[]'><h1>"+ name + "</h1></div><div class='alarmvalue'><button type='button' id='alarmonoff=" +i+ "'><img src='images/alarmon.png'></button><p>"+discountalarm_percentage+"</p><p>"+ sdate+" 부터 " + edate + "</p></div></div>";
      }else {
        var htmlvalue = "<div class='alarmitem'><div class = 'alarmname'><input type='checkbox' name='discountalarmL[]'><h1>"+ name + "</h1></div><div class='alarmvalue'><button type='button' id='alarmonoff=" + i+ "'><img src='images/alarmoff.png'></button><p>"+discountalarm_percentage+"</p><p>"+ sdate+" 부터 " + edate + "</p></div></div>";
      }
      changehtmlvalue  += htmlvalue;
    }
      alarmsection.innerHTML = changehtmlvalue; // 값변경시 html 업데이트

      for (var i = 0; i < result.discountalarm.length; i++) {
        var tempvalue = "alarmonoff="+i;
        var temp = document.getElementById(tempvalue);
        temp.addEventListener('click',alarmbtn_listener);
      }
    })

  }

function alarmbtn_listener(event){
  var tempid = event.target.parentElement.id.split('=')[1];
  whale.storage.local.get(['discountalarm'], function(result) {
    var temparray = result.discountalarm;
    if ( temparray[tempid][4] == 'yes' ) {
       temparray[tempid][4] = 'no';
       whale.storage.local.set({'discountalarm':temparray},valueUpdate);
    }else{
      temparray[tempid][4] = 'yes';
      whale.storage.local.set({'discountalarm':temparray},valueUpdate);
    }
  });
}
