//
// NAPI 헤더입니다.
// npm을 통해 node-addon-api를 로컬로 설치하면 ./node_modules 폴더에 같이 딸려옵니다.
// 이것을 설치하지 않고, 먼저 작업하면 include에 빨간줄이 그어집니다.
#include <napi.h>
#include <stdio.h>
//
// 자바스크립트의 String 객체를 반환하는 함수입니다.
// 파라미터는 info[n] 형태로 얻어올 수 있습니다.
Napi::String SayHi(const Napi::CallbackInfo& info) {
  //
  // info에는 현재 스코프 정보(env)도 들어있습니다.
  // 자바스크립트 객체를 생성하려면 반드시 이것부터 가져와야합니다.
  Napi::Env env = info.Env();
  //
  // 현재 스코프 정보(env)와 std::string을 사용하여,
  // "Hi!"라는 자바스크립트 문자열을 반환합니다.
  return Napi::String::New(env, str);
}

//
// 애드온 이니셜라이져입니다.
// 자바스크립트 오브젝트(exports)에 함수를 하나씩 집어넣고,
// 다 집어넣었으면 리턴문으로 반환하면 됩니다.
Napi::Object init(Napi::Env env, Napi::Object exports) {
    //
    // 위의 함수를 "sayHi"라는 이름으로 집어넣습니다.
    exports.Set(Napi::String::New(env, "sayHi"), Napi::Function::New(env, SayHi));

    //
    // 다 집어넣었다면 반환합니다.
    return exports;
};

//
// 애드온의 별명과, 이니셜라이져를 인자로 받습니다.
NODE_API_MODULE(hello_world, init);
