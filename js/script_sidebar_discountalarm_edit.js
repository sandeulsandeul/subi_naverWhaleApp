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

var d = new Date();
var year = d.getFullYear();
var month = (d.getMonth() + 1) ;

var discountalarm_setting_value = 1;
var startdate = d.toISOString().slice(0, 10);
var enddate = d.toISOString().slice(0, 10);

discountalarm_startdate.value = startdate ;
discountalarm_enddate.value = enddate ;

const tempvalue = ["","",discountalarm_startdate.value,discountalarm_enddate.value,"yes","",""];
console.log(tempvalue);

clear.addEventListener('click',function(event){
  form.reset();
});

form.addEventListener('change',function(event){
  switch (event.target.id) {
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

submit.addEventListener('click', function(event){
  var temparray=[];
  whale.storage.local.get(['discountalarm'], function(result) {
    if(!result.discountalarm){
      temparray=tempvalue;
    }else{
      temparray = result.discountalarm;
      temparray.push(tempvalue);
    }
    whale.storage.local.set({'discountalarm':temparray});
    location.replace('/sidebar_discountalarm.html');
  });
})

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
