# N-API

-   ## N-API의 C++ 래핑인 Node-Addon-API를 사용하여 Addon을 만드는 과정

    -   ### bindilng.gyp

        컴파일할 소스 파일들의 경로와 컴파일 옵션을 지정하며 json포맷을 따릅니다. 프로젝트의 루트에 위치해야 합니다.

    -   ### node-gyp

        루트폴더에 있는 binding.gyp파일을 읽고, 타겟팅된 소스 파일들을 컴파일하는 프로그램입니다. 컴파일 작업이 성공적으로 끝나면 루트에 build 폴더가 만들어지는데, release 또는 debug 폴더 안에 있는 확장명이 .node인 파일을 찾으면 됩니다. 이것이 DLL파일입니다.

    -   ### node 패키지

        node-gyp는 글로벌로 설치합니다.

        bindings와 node-addon-api는 로컬로 설치합니다.

    -   ### 개발 시작하기

        1.  node-gyp를 설치합니다.

                npm install -g node-gyp

        2.  프로젝트 폴더를 생성하고 npm을 초기화합니다.

                npm init -y

                npm i bindings

                npm i node-addon-api

        3.  다음과 같이 루트폴더에 binding.gyp를 작성합니다.

            ```
            # binding.gyp
            {
            "targets": [
                {
                "cflags!": [ "-fno-exceptions" ],
                "cflags_cc!": [ "-fno-exceptions" ],
                "include_dirs" : [
                    "<!@(node -p \"require('node-addon-api').include\")"
                ],
                "target_name": "./hello_world",

                # 여기서 타겟 소스파일을 지정합니다.
                "sources": [ "hello_world.cpp" ],
                'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
                }
            ]
            }
            ```

        4.  C++ 코드를 작성합니다.

            ```
            //
            // NAPI 헤더입니다.
            // npm을 통해 node-addon-api를 로컬로 설치하면 ./node_modules 폴더에 같이 딸려옵니다.
            // 이것을 설치하지 않고, 먼저 작업하면 include에 빨간줄이 그어집니다.
            #include <napi.h>

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
            return Napi::String::New(env, "Hi!");
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
            ```

        5.  node-gyp를 사용하여 빌드합니다.

                node-gyp rebuild

        6.  다음과 같이 index.js를 작성합니다.

            ```
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
            ```

        7.  node 명령어를 사용하여 js를 실행해줍니다.

                node index.js
