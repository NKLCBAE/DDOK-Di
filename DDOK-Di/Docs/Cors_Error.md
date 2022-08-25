# Cors 에러

# 에러 메세지

`Access to ~~ has been blocked by CORS policy : response to preflight request doesn't pass access control check : No 'Access-Control-Allow-Origin’ header is present on the requested resource.`

# 에러 원인

`Preflight request` 는 본 요청 전에 미리 예비 요청을 보내는데 이때 예비요청이 `spring security` 에 의해 막히고 `'Access-Control-Allow-Origin’ header` 가 없는 응답을 보낸다. 해당 응답을 받은 클라이언트는 cors 동작이 불가능하다고 판단하여 위와 같은 에러를 발생시킨다.

# Preflight request

Preflight 요청은 서버에 예비 요청을 보내서 안전한지 판단한 후 본 요청을 보내는 방법입니다. 아래 그림은 Preflight 요청 동작을 나타내는 그립입니다.

![https://beomy.github.io/assets/img/posts/browser/cors_preflight_request.png](https://beomy.github.io/assets/img/posts/browser/cors_preflight_request.png)

`GET`, `POST`, `PUT`, `DELETE` 등의 메서드로 API를 요청했는데, 크롬 개발자 도구의 네트워크 탭에 `OPTIONS` 메서드로 요청이 보내지는 것을 보신 적 있으시다면 CORS를 경험하셨던 것입니다. Preflight 요청은 실제 리소스를 요청하기 전에 `OPTIONS`라는 메서드를 통해 실제 요청을 전송할지 판단합니다.

`OPTIONS` 메서드로 서버에 예비 요청을 먼저 보내고, 서버는 이 예비 요청에 대한 응답으로 `Access-Control-Allow-Origin` 헤더를 포함한 응답을 브라우저에 보냅니다. 브라우저는 단순 요청과 동일하게 `Access-Control-Allow-Origin` 헤더를 확인해서 CORS 동작을 수행할지 판단합니다.

# 해결방법

`SecurityConfig`클래스의 `filterChain` 메서드에 다음 코드를 추가

```jsx
// Preflight request에 대해, 인증을 하지 않고 요청을 모두 허용한다.
http.requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
```

# 참고

- [https://velog.io/@xonic789/CORS-preflight-요청에-대해-401-에러-해결Spring-security-config](https://velog.io/@xonic789/CORS-preflight-%EC%9A%94%EC%B2%AD%EC%97%90-%EB%8C%80%ED%95%B4-401-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0Spring-security-config)
- https://beomy.github.io/tech/browser/cors/
