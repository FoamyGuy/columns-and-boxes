var col_container = $("#column_container");


function add_column(col_data) {
  var col = $('<li class="is-one-fifth column"><ul class=""></li>');
  var add_box_btn = $('<a class="is-fixed-bottom button add_box_btn">Add Box</a>');

  add_box_btn.click(function () {
    console.log("addbox");
    var box = $('<li class="box">');
    var auto_grow_text_str = '<div class="textarea-container"><textarea></textarea><div class="textarea-size"></div></div>';
    var input = $(auto_grow_text_str);
    box.append(input);
    $(this).after(box);

    var textContainer = document.querySelector('.textarea-container');
    var textareaSize = textContainer.querySelector('.textarea-size');
    var input = textContainer.querySelector('textarea');


    input.addEventListener('input', function (evt) {
      autoSize(textContainer, textareaSize, input)
    });
  });

  col.append(add_box_btn);
  col_container.append(col);

  if (col_data) {
    for (var box_index = 0; box_index < col_data['column']['list'].length; box_index++) {
      console.log(col_data['column']['list'][box_index]);
      var box = $('<li class="box">');
      var auto_grow_text_str = '<div class="textarea-container"><textarea></textarea><div class="textarea-size"></div></div>';

      var input = $(auto_grow_text_str);
      box.append(input);

      col.append(box);

      input.find('textarea').val(col_data['column']['list'][box_index]);
      var textContainer = document.querySelector('.textarea-container');
      var textareaSize = textContainer.querySelector('.textarea-size');
      var input = textContainer.querySelector('textarea');


      input.addEventListener('input', function (evt) {
        autoSize(textContainer, textareaSize, input)
      });
    }
  }

  console.log("calling sortable");
  $(function () {
    col.sortable({
      connectWith: ".column"
    });
    col.disableSelection();
  });
}


$("#add_column_btn").click(function () {
  add_column();
});

$("#save_btn").click(function(){
  save(build_data_obj());
});

$(function () {
  col_container.sortable();
  col_container.disableSelection();
});


function build_data_obj() {
  var cols_data_obj = {'columns': []};
  var cols = $(".column");
  cols.each(function (col) {
    var col_data_obj = {'column': {'name': '', 'list': []}};
    $(this).find("textarea").each(function () {
      col_data_obj['column']['list'].push($(this).val());

    });

    cols_data_obj['columns'].push(col_data_obj);
  });

  //console.log(cols_data_obj);
  /*
   for (var i = 0; i < cols.length; i++){
   console.log()
   console.log(cols[i].each('li'));
   }*/

  return cols_data_obj;

}

function save(data) {
  myStorage = window.localStorage;
  myStorage.setItem('data', JSON.stringify(data));
}

function load() {
  myStorage = window.localStorage;
  data = JSON.parse(myStorage.getItem('data'));

  for (var col_index = 0; col_index < data['columns'].length; col_index++) {
    // console.log(data['columns'][i]);
    add_column(data['columns'][col_index])
  }
  //console.log(data);
}


$(document).ready(function(){
  load();
});

/**********************

 Auto Grow textarea
 http://www.brianchu.com/blog/2013/11/02/creating-an-auto-growing-text-input/

 ***********************/


var autoSize = function (textContainer, textareaSize, input) {
  //console.log("autosize");
  //console.log(input);
  // also can use textContent or innerText
  textareaSize.innerHTML = input.value + '\n';
};

document.addEventListener('DOMContentLoaded', function () {

});

