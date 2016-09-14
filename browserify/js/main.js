// main.js
(function() {
  var foo = window.foo;
  var bar = window.bar;
  var el = document.getElementById('box');
  el.textContent = foo() + ' ' + bar();
})();
