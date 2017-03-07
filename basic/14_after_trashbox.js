// ゴミ箱
var flammableTrashBox = [],
    nonflammableTrashBox = [];

// ゴミクラス
var Rubbish = function(name, type) {
  this.name = name;
  this.type = type;
};

// 処理の汎化
function repeat(arr, fn) {
    var i = 0; len = arr.length;
    for (; i < len; i++) {
      fn.call(arr[i]);   // ここで this を設定して関数をよびだしている
    }
}

// メイン処理
repeat([
  new Rubbish('チラシ', 'flammable'),
  new Rubbish('空き缶', 'nonflammable'),
  new Rubbish('紙くず', 'flammable')
  ], 
  function() {
    if (this.type === 'flammable') {
      flammableTrashBox.push(this);
    } else {
      nonflammableTrashBox.push(this);
    }
  }
);

console.log(flammableTrashBox);
console.log(nonflammableTrashBox);
