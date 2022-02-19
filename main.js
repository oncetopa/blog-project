let myStorage = window.localStorage;

let mainList = [];
let inputButton = document.querySelector(".input_button");
inputButton.addEventListener("click", getCategory);
inputButton.addEventListener("click", addItem);

let applyButton = document.querySelector(".apply_button");
applyButton.addEventListener("click", getFilter);

$(".input_section").keyup(function(event) {
    if (event.keyCode === 13) {
        $(".input_button").click();
    }
});

var categoryVar = null;
function getCategory() {
  const categoryNodeList = document.getElementsByName('category');

  categoryNodeList.forEach((node) => {
    if(node.checked){
      categoryVar = node.value;
    }
  });
}

var filterVar = JSON.parse(myStorage.getItem('filterdata'));
function getFilter() {
  const filterNodeList = document.getElementsByName('filter');

  filterNodeList.forEach((node) => {
    if(node.checked){
      filterVar = node.value;
    }
  });

  myStorage.setItem('filterdata', JSON.stringify(filterVar));

  window.location.reload();
}

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
        let dataList = [item, timestamp, categoryVar];
        if(mainList == ''){
          mainList[0] = dataList;
        }
        else{
          mainList.push(dataList);
        }
        let new_data = item + '/' + timestamp + '/' + categoryVar;
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
    let categoryList = ['♪', '✒', '☮'];
    for (let i = 0; i < mainList.length; i++) {
        if(filterVar == 'music'){
          if(mainList[i][2] == 'music'){
            list += "<li id='text" + i + "' class=" + mainList[i][2] + '>' + mainList[i][0] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span>" + "<br><br>" + "<div id='timestamp'>" + mainList[i][1] + "</div>";

            list += "<div id='hashtag'>" + categoryList[0] + "</div>";

            list += "<div id='edit'> <button onclick='editItem(" + i + ")' class='edit-button'>edit</button>";

            list += "<span id='edit-box" + i + "' role='aria-hidden' class='edit-box'> <form action='javascript:void(0);' method='post' id='save-edit" + i + "'> <input type='text' class='edit" + i + "' id='edit-page'> <input type='submit' value='save' class='save-button'> <a onclick='CloseInput(" + i + ")' aria-label='close'> \u00D7 </a> </form> </span> </div>";

            list += "</li>";
          }
        }

        else if(filterVar == 'still'){
          if(mainList[i][2] == 'still'){
            list += "<li id='text" + i + "' class=" + mainList[i][2] + '>' + mainList[i][0] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span>" + "<br><br>" + "<div id='timestamp'>" + mainList[i][1] + "</div>";

            list += "<div id='hashtag'>" + categoryList[1] + "</div>";

            list += "<div id='edit'> <button onclick='editItem(" + i + ")' class='edit-button'>edit</button>";

            list += "<span id='edit-box" + i + "' role='aria-hidden' class='edit-box'> <form action='javascript:void(0);' method='post' id='save-edit" + i + "'> <input type='text' class='edit" + i + "' id='edit-page'> <input type='submit' value='save' class='save-button'> <a onclick='CloseInput(" + i + ")' aria-label='close'> \u00D7 </a> </form> </span> </div>";

            list += "</li>";
          }
        }

        else if(filterVar == 'sports'){
          if(mainList[i][2] == 'sports'){
            list += "<li id='text" + i + "' class=" + mainList[i][2] + '>' + mainList[i][0] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span>" + "<br><br>" + "<div id='timestamp'>" + mainList[i][1] + "</div>";

            list += "<div id='hashtag'>" + categoryList[2] + "</div>";

            list += "<div id='edit'> <button onclick='editItem(" + i + ")' class='edit-button'>edit</button>";

            list += "<span id='edit-box" + i + "' role='aria-hidden' class='edit-box'> <form action='javascript:void(0);' method='post' id='save-edit" + i + "'> <input type='text' class='edit" + i + "' id='edit-page'> <input type='submit' value='save' class='save-button'> <a onclick='CloseInput(" + i + ")' aria-label='close'> \u00D7 </a> </form> </span> </div>";

            list += "</li>";
          }
        }

        else{
          list += "<li id='text" + i + "' class=" + mainList[i][2] + '>' + mainList[i][0] + "<span class='close' id=" + i + ">" + "\u00D7" + "</span>" + "<br><br>" + "<div id='timestamp'>" + mainList[i][1] + "</div>";

          if(mainList[i][2] == 'music'){
            list += "<div id='hashtag'>" + categoryList[0] + "</div>";
          }

          else if(mainList[i][2] == 'still'){
            list += "<div id='hashtag'>" + categoryList[1] + "</div>";
          }

          else if(mainList[i][2] == 'sports'){
            list += "<div id='hashtag'>" + categoryList[2] + "</div>";
          }

          list += "<div id='edit'> <button onclick='editItem(" + i + ")' class='edit-button'>edit</button>";

          list += "<span id='edit-box" + i + "' role='aria-hidden' class='edit-box'> <form action='javascript:void(0);' method='post' id='save-edit" + i + "'> <input type='text' class='edit" + i + "' id='edit-page'> <input type='submit' value='save' class='save-button'> <a onclick='CloseInput(" + i + ")' aria-label='close'> \u00D7 </a> </form> </span> </div>";

          list += "</li>";
        }
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

function CloseInput(index) {
  var realId = 'edit-box';
  realId += index;
  document.getElementById(realId).style.display = 'none';
}

function editItem(index) {
  var forBlock = 'edit-box';
  forBlock += index;
  document.getElementById(forBlock).style.display = 'block';

  var forText = 'save-edit';
  forText += index;
  document.getElementById(forText).onsubmit = function(){
    var forValue = '.edit';
    forValue += index;
    let editValue = document.querySelector(forValue).value;
    if(editValue != ''){
      mainList[index][0] = editValue;

      var edit_timestamp = timeStamp();
      edit_timestamp += "<br> <span class='edited-mark'>Edited</span>";
      mainList[index][1] = edit_timestamp;
    }
    CloseInput(index);

    myStorage.clear();
    myStorage.setItem('data', '[]');

    for (let i = 0; i < mainList.length; i++){
      let edit_data = mainList[i][0] + '/' + mainList[i][1] + '/' + mainList[i][2];
      var old_data = JSON.parse(myStorage.getItem('data'));
      old_data.push(edit_data);
      myStorage.setItem('data', JSON.stringify(old_data));
    }

    showList();
  }
}

function storageLoad() {
  if(myStorage.getItem('data') != null){
    var raw_data = myStorage.getItem('data');
    var first_data = raw_data.replace(/[\[\]']+/g,'').replace(/\"/gi, '');
    rawList = first_data.split('/');
    for(let i = 0; i < rawList.length; i += 3) mainList.push(rawList.slice(i, i+3));
  }
}

window.onload = function() {

  storageLoad();
  if(mainList != ''){
    showList();
  }
}
