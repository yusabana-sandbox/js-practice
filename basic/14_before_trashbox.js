// ゴミ箱
var flammableTrashBox = [],
    nonflammableTrashBox = [];

// ゴミクラス
var Rubbish = function(name, type) {
  this.name = name;
  this.type = type;
};

// 分別処理(ゴミクラスとの結合度が高い)
separatedJunk = function(rubbishes) {
  var i = 0; len = rubbishes.length;
  for ( ; i < len; i++) {
    if (rubbishes[i].type === 'flammable') {
      flammableTrashBox.push(rubbishes[i]);
    } else {
      nonflammableTrashBox.push(rubbishes[i]);
    }
  }
};

// メイン処理:ゴミクラスを分別処理にかける
separatedJunk([
  new Rubbish('チラシ', 'flammable'),
  new Rubbish('空き缶', 'nonflammable'),
  new Rubbish('紙くず', 'flammable')
]);


console.log(flammableTrashBox);
console.log(nonflammableTrashBox);
