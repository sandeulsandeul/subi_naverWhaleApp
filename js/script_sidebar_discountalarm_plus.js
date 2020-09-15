/* 1. 폼 변수 가져오기 */
var form = document.getElementById('discountalarm_plus_form');
var discountalarm_name= document.getElementById('discountalarm_name');
var discountalarm_site = document.getElementById('discountalarm_site');
var discountalarm_startdate = document.getElementById('discountalarm_startdate');
var discountalarm_enddate = document.getElementById('discountalarm_enddate');
var discountalarm_setting = document.getElementById('discountalarm_setting');
var discountalarm_percentage = document.getElementById('discountalarm_percentage');
var discountalarm_memo = document.getElementById('discountalarm_memo');

var submit = document.getElementById('submit');
var clear = document.getElementById('clear');


/*2. 날짜 데이터 가져오기 */
var d = new Date();
var year = d.getFullYear();
var month = (d.getMonth() + 1) ;

var discountalarm_setting_value = 1;
var startdate = d.toISOString().slice(0, 10);
var enddate = d.toISOString().slice(0, 10);

discountalarm_startdate.value = startdate ;
discountalarm_enddate.value = enddate ;

/* 3. 임시 배열 tempvalue로  storage.local의 discountalarm 의 default 값이다. */
const tempvalue = ["","",discountalarm_startdate.value,discountalarm_enddate.value,"yes","",""];

/* 4. 폼에서 discountalarm_setting 버튼을 누름에 따라서   임시 배열 tempvalue의 값이 달라진다.*/
discountalarm_setting.addEventListener('click', function(event){
  if(discountalarm_setting_value == 1 ){
    discountalarm_setting_value = 0 ;
    discountalarm_setting.setAttribute("value","no");
    tempvalue[4]  = "no";
  }else{
    discountalarm_setting_value = 1 ;
    discountalarm_setting.setAttribute("value","yes");
    tempvalue[4]  = "yes";
  }
});

/* 5. 폼의 값의 변하면 tempvalue의 값이 변화한다.  */
form.addEventListener('change',function(event){
  switch (event.target.id)  {
    // 변화한 값의 id를 switch 문으로 탐색후 데이터 대입
     case 'discountalarm_name':
      tempvalue[0]  = event.target.value;
      break;
    case 'discountalarm_site':
        tempvalue[1]  = event.target.value;
        break;
    case 'discountalarm_startdate' :
      tempvalue[2]  = event.target.value;
      break;
    case 'discountalarm_enddate' :
      tempvalue[3]  = event.target.value;
      break;
    case 'discountalarm_percentage' :
      tempvalue[5]  = event.target.value;
      break;
    case 'discountalarm_memo' :
      tempvalue[6]  = event.target.value;
      break;
  }
});

/* 6. 제출하기 버튼을 누르면 폼의 내용이 storage.local 의 discountalarm 에 저장되고
       ''/sidebar_discountalarm.html' 로 이동한다 .*/
submit.addEventListener('click', function(event){
  var temparray=[]; // 변수 설정

  whale.storage.local.get(['discountalarm'], function(result) {
    if(!result.discountalarm){
       // discountalarm 의 데이터가 없는 상태라면 현재 데이터를 첫번째 데이터로 설정한다.
      temparray=tempvalue;
    }else{
      // discountalarm 의 데이터가 있다면 이어 데이터를 추가한다.
      temparray = result.discountalarm;
      temparray.push(tempvalue);
    }

    whale.storage.local.set({'discountalarm':temparray}); // storage.local 의 discountalarm 에 저장
    location.replace('/sidebar_discountalarm.html'); // 주소 이동
  });
})

/* 7. 취소 버튼을 누르면 폼 초기화 */
clear.addEventListener('click',function(event){
  form.reset(); // 폼 초기화 함수
});
