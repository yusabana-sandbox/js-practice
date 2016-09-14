$(function() {
  var $div1 = $('#div1');
  console.log($div1);

  var $span = $('#div1 span');
  console.log($span);
});

$(function() {
  // すべてのdiv要素のうち2番目の要素(指定する数値は0スタート)
  var $div2 = $('div:eq(1)');
  console.log($div2);
});

$(function() {
  $('#box').animate({ left: "500px" }, 1000).fadeOut();
});
