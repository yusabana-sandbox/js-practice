var neoMax = Math.max.bind(null, 200, 300, 400);  // 200, 300, 400 は引数として指定されている状態の neoMax 関数を返す
console.log(neoMax(100));    // 400
console.log(neoMax(800));    // 800


function add(x, y) {
  return x + y;
}

// 関数を部分適用
var add200 = add.bind(null, 200);
console.log(add200(300));     // 500
// 上記の2つは固定的に 数値を 引数に予約して設定しておくことで 部分適用 という



// カリー化 (currying, カリー化された=curried) とは、複数の引数をとる関数を、
// 引数が「もとの関数の最初の引数」で戻り値が「もとの関数の残りの引数を取り結果を返す関数」であるような関数にすること
// （あるいはその関数のこと）である。
// http://qiita.com/kenju/items/a056666fc6961906e4be
// http://qiita.com/KDKTN/items/6a27c0e8efa66b1f7799
function add2(x) { return function(y) { return x + y; } }  // 関数を返している関数でありカリー化している関数
curryAdd2 = add2(150);
console.log(curryAdd2(350));  // 500

console.log(add2(150)(350));  // 500 そのまま変数に関数を置かなくても実行できる

// curry化は部分適用と同じだが、呼び出し側で部分適用したい、引数を設定できる関数をカリー化された関数という


