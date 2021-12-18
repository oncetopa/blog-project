let myStorage = window.localStorage;

let mainList = [];
let itemtimeList = [];
let inputButton = document.querySelector(".input_button");
inputButton.addEventListener("click", addItem);

$(".input_section").keyup(function(event) {
    if (event.keyCode === 13) {
        $(".input_button").click();
    }
});

function timeStamp() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();
  const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var day = WEEKDAY[now.getDay()];
  var hours = now.getHours();
  var minutes = ("0"+now.getMinutes()).slice(-2);

  return year + '.' + (month+1) + '.' + date + '<br>' + '(' + day + ') ' + hours + ':' + minutes;
}

function addItem() {
    let item = document.querySelector(".item").value;
    if (item != null) {
      if (item == ''){
        alert('내용을 입력해주세요.\nInvalid input, try again.');
        return false;
      }
        var timestamp = timeStamp();
        let dataList = [item, timestamp];
        mainList.push(dataList);
        var key = String((mainList.length)-1);
        myStorage.setItem(key, JSON.stringify(dataList));
        document.querySelector(".item").value = "";
        document.querySelector(".item").focus();
        showList();
    }
}

function showList() {
    let list = "<ul>"
    for (let i = 0; i < mainList.length; i++) {
        list += "<li>" + mainList[i][0] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span>" + "<br><br>" + "<div id='timestamp'>" + mainList[i][1] + "</div></li>";
    }
    list += "</ul>";
    document.querySelector(".item_list").innerHTML = list;

    let deleteButtons = document.querySelectorAll(".close");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteItem);
    }

}

function deleteItem() {
    let id = this.getAttribute("id");
    mainList.splice(id, 1);
    let key = String(id);
    myStorage.removeItem(key);
    alert(key);
    showList();
}

function storageLoad(){
  if(myStorage.length > 0){
    var localStorageArray = new Array();
    for (let i = 0; i < myStorage.length; i++){
      localStorageArray[i] = myStorage.key(i)+myStorage.getItem(myStorage.key(i));
    }
  }
  var sortedArray = localStorageArray.sort();

  for (let k = 0; k < sortedArray.length; k++) {
    let key = String(k);
    const tempList = JSON.parse(sortedArray[k]);
    wholeList.push(tempList);
  }

  for (let m = 0; m < wholeList.length; m++) {
    let item = wholeList[m][0];
    let time = wholeList[m][1];
    let loadList = [item, time];
    mainList.push(loadList);
  }
}

window.onload = function() {
  storageLoad();
  showList();
}
