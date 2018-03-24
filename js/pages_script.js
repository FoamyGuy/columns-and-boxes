/**
 * Created by o_0 on 3/24/2018.
 */


var myStorage;
var pages;
function save() {
  myStorage = window.localStorage;
  myStorage.setItem('pages', JSON.stringify(pages));
}

function load() {
  myStorage = window.localStorage;
  pages = JSON.parse(myStorage.getItem('pages'));

  if (pages === null) {
    pages = {'pages': []};
  }
  console.log(pages);
  console.log(pages['pages'].length);
  for (var page_index = 0; page_index < pages['pages'].length; page_index++) {
    // console.log(data['columns'][i]);
    add_page(pages['pages'][page_index]['name']);
  }

}

function add_page(page_name) {
  console.log("adding page: " + page_name);
  var $new_page = $('<li>');
  var $new_link = $('<a>');
  $new_link.attr("href", "index.html?page=" + page_name);
  $new_link.text(page_name);
  $new_page.append($new_link);

  $("#pages_container").append($new_page);

}

$("#add_page_btn").click(function () {
  console.log("click");
  add_page($("#new_page_name_txt").val());
  pages['pages'].push({'name': $("#new_page_name_txt").val()});
  save();
});

$(document).ready(function () {
  load();
});