//
// hello_world.node 애드온을 찾아 가져옵니다.
const addon = require("bindings")("hello_world");

//
// 애드온 함수를 실행합니다.
// "Hi!" 라는 문자열을 가져오게 됩니다.
const str = addon.sayHi();

//
// "Hi!" 문자열이 콘솔에 출력됩니다.
console.log(str);
