/*1. 변수값 가져오기 */
// 날짜 값 가져오기
var d = new Date();
var year = d.getFullYear();
var month = (d.getMonth() + 1) ;
 //dom 값 가져오기
var budget = document.getElementById('budget');
var headline = document.getElementById('headline');
var lastsaving = document.getElementById('lastsaving');
var thissaving = document.getElementById('thissaving');

/* 2. headline을 해당 월 별로 바꾼다.*/
headline.innerHTML = year +" 년 "+month+" 월 예산을 설정해주세요."

/* 3. budget의 값을 업로드한다. */
whale.storage.local.get(['budget'], function(result) {
  if(typeof result.budget === "undefined"){
    var temparray = ['0','0','0','0','0','0','0','0','0','0','0','0','0'];
    whale.storage.local.set({budget:{'year':year,'monthbudget':temparray}});
  }else{
    var budgetvalue = result.budget.monthbudget[month];
    budget.setAttribute("value",budgetvalue);
  }
});

/* 4. budget 값이 바뀌면 그에 따라서 storage.local의 값이 변한다. */
budget.addEventListener('change',function(event){ // 예산의 input 의 변화가 감지도면
  budget.setAttribute("value",event.target.value); // 변화된 값으로 value를 셋팅 후에
  // storage.local의 budget이 변한다.
  whale.storage.local.get(['budget'], function(result) {

    // 만약 budget이 undefined이면 storage.local에 budget을 셋팅한다.
    if(typeof result.budget === "undefined"){
      var temparray = ['0','0','0','0','0','0','0','0','0','0','0','0','0'];
      temparray[month] = event.target.value;
      whale.storage.local.set({budget:{'year':year,'monthbudget':temparray}});
    }else{
    // 만약 budget이 undefined이 아니면 storage.local의 budget의 값을 가져온다.
        var tempyear = result.budget.year;  //storage.local에 저장된 budget 데이터의 날짜
        var temparray = result.budget.monthbudget; //storage.local에 저장된 budget 데이터의 월별 예산

         // 현재와 storage.local에 저장된 budget의 년도가 일치한다.
        if (tempyear == year) {
          //storage.local에 저장된 budget의 현재 월에 해당하는 데이터 값에
          // 변화된 input값을 대입한 뒤에 budget을 업데이트한다.
          temparray[month] =  event.target.value;
          whale.storage.local.set({budget:{'year':year,'monthbudget':temparray}});
          save();
        }else{
        // 현재와 storage.local에 저장된 budget의 년도가 다르다.
            result.budget.remove(); // 매해 데이터가 업데이트 되도록 한다
            temparray[month] =  event.target.value;
            whale.storage.local.set({budget:{'year':year,'monthbudget':temparray}});
            save();
        }
    }
  });
});

/* 5. storage에 변화가 감지 되면 값을 업데이트 한다.  */
whale.storage.onChanged.addListener(function (changes, sync) {
         for (budget in changes) {
           save();
         }
         for (expense in changes) {
           save();
         }
});


save();

/* 6. 저축 금액을 계산하여 보여준다. */
function save(){
  //변수를 설정한다.
  var lastmonth ; // 지난 달
  var lastbudget = 0; // 지난 달 예산
  var lastexpense = 0; // 지난 달 소비
  var thisbudget = 0; // 이번 달 예산
  var thisexpense = 0; //이번 달 예상소비

  //storage.local 에서 budget의 값을 가져온다.
  whale.storage.local.get(['budget'], function(result1) {
    //storage.local 에서 expense의 값을 가져온다.
    whale.storage.local.get(['expense'], function(result2) {

      // 1월 달의 경우 지난 달이 없다.
      if(month == '1'){
        lastmonth = 0; // 배열의 [0] 의 값은 항상 0이다.
      }else{
      // 1월 달이 아닌 달은 현재 달에서 -1 한 달이 지난 달이다.
        lastmonth = month-1;
      }

      // storage.local 에 budget  의 값이 없거나 올 해의 데이터 값이 아니라면
      if(typeof result1.budget === "undefined"|| result1.budget.year != year){
        // storage.local expense 데이터를 모두 지우고
        result1.budget.remove();

        // storage.local 에 budget을 할당한다.
        var temparray = ['0','0','0','0','0','0','0','0','0','0','0','0','0'];
        whale.storage.local.set({budget:{'year':year,'monthbudget':temparray}});

        lastbudget = 0;
        thisbudget = 0;

      }else {
      // storage.local 에 budget 의 값이 있다면 해당하는 값을 각각 가져온다.
           lastbudget= result1.budget.monthbudget[lastmonth];
           thisbudget = result1.budget.monthbudget[month];
      }


      // storage.local 에 expense 의 값이 없거나 올 해의 데이터 값이 아니라면
      if(typeof result2.expense === "undefined" || result2.expense.year != year){
        // storage.local expense 데이터를 모두 지우고
        result2.expense.remove();

        // storage.locald에 다시 저장 한다.
        var temparray = ['0','0','0','0','0','0','0','0','0','0','0','0','0'];
        whale.storage.local.set({expense:{'year':year,'monthexpense':temparray}});
        lastexpense = 0;
        thisexpense  = 0;

      }else {
        // storage.local 에 expense 의 값이 있다면 해당하는 값을 각각 가져온다.
        console.log(result2.expense.monthexpense);
           lastexpense = result2.expense.monthexpense[lastmonth];
           thisexpense = result2.expense.monthexpense[month];
      }


      console.log((Number(lastbudget) - Number(lastexpense)));
      console.log(Number(lastbudget));
      console.log( Number(thisexpense));

      // 지난 달 저축 금액을 html에 표시한다.
      lastsaving.innerHTML = (Number(lastbudget) - Number(lastexpense)) + " 원";
      // 이번 달 저축 금액을 html에 표시한다.
      thissaving.innerHTML = (Number(thisbudget) - Number(thisexpense)) + " 원";
      });
  });
}
