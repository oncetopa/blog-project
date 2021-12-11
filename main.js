let myStorage = window.localStorage;

let itemList = [];
let timeList = [];
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
        itemList.push(item);
        myStorage.setItem(itemList.length, JSON.stringify(item));
        document.querySelector(".item").value = "";
        document.querySelector(".item").focus();
        showList();
    }
}

function showList() {
    var timestamp = timeStamp();
    timeList.push(timestamp);
    let list = "<ul>"
    for (let i = 0; i <itemList.length; i++) {
        list += "<li>" + itemList[i] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span>" + "<br><br>" + "<div id='timestamp'>" + timeList[i] + "</div></li>";
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
    myStorage.removeItem(id);
    itemList.splice(id, 1);
    timeList.splice(id, 1);
    showList();
}

window.onload = function() {
  for(let i = 0, len = myStorage.length; i < len; i++){
    let k = myStorage.key(i);
    let v = JSON.parse(myStorage[k]);
    itemList.push(v);
  }
  showList();
}
