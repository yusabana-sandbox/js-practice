// スーパークラス的な携帯電話
function CellPhone(number) {
  this.phoneNumber = number;
}

// サブクラス的なスマートフォン
function SmartPhone(number, wifispots) {
  this.wifispots = wifispots;
  CellPhone.call(this, number);
}
SmartPhone.prototype = new CellPhone(); // insatnceof用


// 利用コード(携帯番号とWifiスポットを固有データとして持たせます)
var myphone = new SmartPhone('09012344432', ['Home','StarBucksWifi']);

console.log(myphone.phoneNumber);
console.log(myphone.wifispots);

