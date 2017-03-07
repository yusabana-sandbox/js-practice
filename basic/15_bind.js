// 人間
function Man(name) {
  this.name = name;
  this.greet = function() {
    console.log("Hello, my name is " + this.name);
  };
}

// ネコ
function Cat(name) {
  this.name = name;
}

// 人間の挨拶
var steve = new Man("Steve");
steve.greet();           // Hello, my name is Steve

// ネコの挨拶！？
var tama = new Cat("Tama");
var tamaGreet = steve.greet.bind(tama);
tamaGreet();            // Hello, my name is Tama
steve.greet.bind(tama)(); //直接bindして実行も可能
