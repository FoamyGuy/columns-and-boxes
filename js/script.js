var col_container = $("#column_container");


function add_column(col_data) {

  //var col_wrapper = $('<div class="col_wrapper is-one-fifth ">');
  var col = $('<li class="column is-one-fifth"><ul class=""></li>');
  var add_box_btn = $('<a class="is-fixed-bottom button is-link add_box_btn">Add Box</a>');
  var title = $('<input class="column_title" placeholder="Title" type="text">');

  add_box_btn.click(function () {
    console.log("addbox");
    var box = $('<li class="box">');
    var auto_grow_text_str = '<div class="textarea-container"><textarea></textarea><div class="textarea-size"></div></div>';
    var input = $(auto_grow_text_str);
    box.append(input);
    $(this).after(box);

    var textContainer = input.find(".textarea-container")[0];
    var textareaSize = input.find(".textarea-size")[0];
    var txtarea = input.find('textarea')[0];

    console.log(txtarea);
    txtarea.addEventListener('input', function (evt) {
      console.log("input event");
      autoSize(textContainer, textareaSize, txtarea);
    });
    save(build_data_obj());
  });

  title[0].addEventListener('input', function(){
      save(build_data_obj());
  });

  col.append(title);
  col.append(add_box_btn);

  col_container.append(col);

  if (col_data) {
    title.val(col_data['column']['name']);
    for (var box_index = 0; box_index < col_data['column']['list'].length; box_index++) {
      // Because javascript is weird? closures and mutables or something.
      // wrap it in an anonymous function and it's happy.
      (function (box_index) {
        //console.log(col_data['column']['list'][box_index]);
        var box = $('<li class="box">');
        var auto_grow_text_str = '<div class="textarea-container"><textarea></textarea><div class="textarea-size"></div></div>';

        var input = $(auto_grow_text_str);
        box.append(input);

        col.append(box);

        input.find('textarea').val(col_data['column']['list'][box_index]);

        var textContainer = input.find(".textarea-container")[0];
        var textareaSize = input.find(".textarea-size")[0];
        var txtarea = input.find('textarea')[0];

        //console.log(txtarea);
        autoSize(textContainer, textareaSize, txtarea);

        txtarea.addEventListener('input', function (evt) {
          autoSize(textContainer, textareaSize, txtarea);
          save(build_data_obj());
        });
      })(box_index);

    }
  }

  //console.log("calling sortable");
  $(function () {
    col.sortable({
      connectWith: ".column",
      stop: function () {
        save(build_data_obj());
      }
    });
    col.disableSelection();
  });
}


$("#add_column_btn").click(function () {
  add_column();
});



$(function () {
  col_container.sortable({
    stop: function () {
      save(build_data_obj());
    }
  });
  col_container.disableSelection();
});


function build_data_obj() {
  var cols_data_obj = {'columns': []};
  var cols = $(".column");
  cols.each(function (col) {
    var col_data_obj = {'column': {'name': $(this).find('.column_title').val(), 'list': []}};
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


$(document).ready(function () {
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

