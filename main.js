let myStorage = window.localStorage;

let mainList = [];
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

    if(myStorage.getItem('data') == null){
      myStorage.setItem('data', '[]');
    }

    if (item != null) {
      if (item == ''){
        alert('내용을 입력해주세요.\nInvalid input, try again.');
        return false;
      }
        var timestamp = timeStamp();
        let dataList = [item, timestamp];
        if(mainList == ''){
          mainList[0] = dataList;
        }
        else{
          mainList.push(dataList);
        }
        let new_data = item + ',' + timestamp;
        var old_data = JSON.parse(myStorage.getItem('data'));
        old_data.push(new_data);
        myStorage.setItem('data', JSON.stringify(old_data));
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
    var current_data = JSON.parse(myStorage.getItem('data'));
    current_data.splice(id, 1);
    myStorage.setItem('data', JSON.stringify(current_data));
    showList();
}

function storageLoad() {
  if(myStorage.getItem('data') != null){
    var raw_data = myStorage.getItem('data');
    var first_data = raw_data.replace(/[\[\]']+/g,'').replace(/\"/gi, '');
    rawList = first_data.split(',');
    for(let i = 0; i < rawList.length; i += 2) mainList.push(rawList.slice(i, i+2));
  }
}

window.onload = function() {

  storageLoad();
  if(mainList != ''){
    showList();
  }
}
