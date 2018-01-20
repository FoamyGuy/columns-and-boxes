var col_container = $("#column_container");


function add_column() {
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

$(function () {
  col_container.sortable();
  col_container.disableSelection();
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