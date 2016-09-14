var COLS = 10, ROWS = 20;  // 横10, 縦20
var board = []; // 盤面
var lose; // 一番上まで行ったかどうか(負けフラグ)
var interval; //ゲームを実行するタイマーを保持する変数
var current; //今操作しているブロックの形
var currentX, currentY; //今操作しているブロックの位置

// 操作するブロックのパターン
var shapes = [
  [1, 1, 1, 1],
  [1, 1, 1, 0,
   1],
  [1, 1, 1, 0,
   0, 0, 1],
  [1, 1, 0, 0,
   1, 1],
  [1, 1, 0, 0,
   0, 1, 1],
  [0, 1, 1, 0,
   1, 1],
  [0, 1, 0, 0,
   1, 1, 1]
];

// ブロックの色
var colors = [
  'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
]


function newShape() {
  var id = Math.floor(Math.random() * shapes.length); //ランダムにインデックスを出す
  var shape = shapes[id];
  // パターンを操作ブロックへセットする
  current = [];
  for (var y = 0; y < 4; ++y) {
    current[y] = [];
    for (var x = 0; x< 4; ++x) {
      var i = 4 * y + x;
      if (typeof shape[i] != 'undefined' && shape[i]) {
        current[y][x] = id + 1;
      }
      else {
        current[y][x] = 0;
      }
    }
  }
  //ブロックを盤面の上の方にセットする
  currentX = 5;
  currentY = 0;
}

function init() {
  for (var y = 0; y < ROWS; ++y) {
    board[y] = [];
    for (var x = 0; x < COLS; ++x) {
      board[y][x] = 0;
    }
  }
}

function tick() {
  // 1つ下へ移動する
  if (valid(0,1)) {
    ++currentY;
  }
  //もし着地していたら（1つ下にブロックがあったら）
  else {
    freeze(); //操作ブロックを盤面へ固定する
    clearLines(); //ライン消去処理
    if (lose) {
      //もしゲームオーバなら最初から始める
      newGame();
      return false;
    }
    // 新しい操作ブロックをセットする
    newShape();
   }
}

function freeze() {
  for (var y = 0; y < 4; ++y) {
    for (var x = 0; x < 4; ++x) {
      if (current[y][x]) {
        board[y + currentY][x + currentX] = current[y][x];
      }
    }
  }
}

//操作ブロックを回す処理
function rotate(current) {
  var newCurrent = [];
  for (var y = 0; y < 4; ++y) {
    newCurrent[y] = [];
    for (var x = 0; x < 4; ++x) {
      newCurrent[y][x] = current[3-x][y];
    }
  }
  return newCurrent;
}

// 一行揃っているか調べ、揃っていたらそれらを消す
function clearLines() {
  for (var y = ROWS - 1; y >= 0; --y) {
    var rowFilled = true;
    // 一行揃っているか調べる
    for (var x = 0; x < COLS; ++x) {
      if (board[y][x] == 0 ) {
        rowFilled = false;
        break;
      }
    }

    // もし一行揃っていたらサウンドを鳴らしてそれらを消す
    if (rowFilled) {
      document.getElementById('clearsound').play(); //消滅サウンドを鳴らす
      //その上にあったブロックを１つずつ落としていく
      for (var yy = y; yy > 0; --y) {
        for (var x = 0; x < COLS; ++x) {
          board[yy][x] = board[yy - 1][x];
        }
      }
      ++y;
    }
  }
}


// キーボードが押された時に呼び出される関数
function keyPress(key) {
  switch(key) {
    case 'left':
      if (valid(-1)) {
        --currentX;  // 左にひとつずらす
      }
      break;
    case 'right':
      if (valid(1)) {
        ++currentX; //右にひとつずらす
      }
      break;
    case 'down':
      if(valid(0, 1)) {
        ++currentY; //下にひとつずらす
      }
      break;
    case 'rotate':
      //操作ブロックを回す
      var rotated  = rotate(current);
      if (valid(0, 0, rotated)) {
        curent = rotated; //回せる場合は回したあとの状態に操作ブロックをセットする
      }
      break;
  }
}

// // 指定された方向に、操作ブロックを動かせるかどうかチェックする
// // ゲームオーバー判定もここで行う
// function valid( offsetX, offsetY, newCurrent ) {
//   offsetX = offsetX || 0;
//   offsetY = offsetY || 0;
//   offsetX = currentX + offsetX;
//   offsetY = currentY + offsetY;
//   newCurrent = newCurrent || current;
//   for ( var y = 0; y < 4; ++y ) {
//     for ( var x = 0; x < 4; ++x ) {
//       if ( newCurrent[ y ][ x ] ) {
//         if ( typeof board[ y + offsetY ] == 'undefined'
//              || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
//              || board[ y + offsetY ][ x + offsetX ]
//              || x + offsetX < 0
//              || y + offsetY >= ROWS
//              || x + offsetX >= COLS ) {
//                if (offsetY == 1 && offsetX-currentX == 0 && offsetY-currentY == 1){
//                  console.log('game over');
//                  lose = true; // もし操作ブロックが盤面の上にあったらゲームオーバーにする
//                }
//                return false;
//              }
//       }
//     }
//   }
//   return true;
// }
function valid(offsetX, offsetY, newCurrent) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX + offsetX;
  offsetX = currentY + offsetY;
  newCurrent = newCurrent || current;
  for (var y = 0; y < 4; ++y) {
    for (var x = 0; x < 4; ++x) {
      if (newCurrent[y][x]) {
        if (typeof board[y + offsetY] == 'undefined'
            || typeof board[y + offsetY][x + offsetX] == 'undefined'
            || board[y + offsetY][x + offsetX]
            || x + offsetX < 0
            || y + offsetY >= ROWS
            || x + offsetX >= COLS) {
          if (offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY == 1) {
            console.log('game over');
            lose = true; //もし操作ブロックが盤面の上にあったらゲームオーバー
          }
          return false;
        }
      }
    }
  }
  return true;
}


function newGame() {
  clearInterval(interval); //ゲームタイマークリア
  init(); // 盤面をまっさらにする
  newShape(); //操作ブロックをセット
  lose = false; // 負けフラグ
  interval = setInterval(tick, 250); // 250ミリ秒ごとにtickという関数を呼ぶ
}

newGame();
