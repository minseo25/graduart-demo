## 초기 세팅

```
npm install
```
dependencies 모두 설치하시고

```
REACT_APP_API_URL=http://localhost:8000/api/v1
```
root에 .env 파일 하나 만드세요

```
npm start
```
하면 localhost:3000 에 올라옵니다 (당연히 장고 서버도 켜두셔야 함)


## 기본 설명

`localhost:3000/login` 에서는 로그인, google login이 가능하고

`localhost:3000/register` 에서는 회원가입이 가능하고

`localhost:3000/` 로그인이 된 상태라면 여기서 로그인 정보를 확인 가능


jwt token을 쿠키에 담아서 리턴했고, 보안을 위해 HttpOnly 세팅을 해둬 script로는 읽어오지 못합니다

그냥 로그인된 상태라면 보내는 모든 api 요청 헤더에 같이 토큰이 담겨서 갈거에요

그렇다면 로그인 상태를 어떻게 인식하냐, /auth/user/ api로 요청을 보내 로그인되었는지 여부를 감지하고 state로 저장해 관리 ㄱㄱ

앞으로 다른 테스팅 페이지들도 만들게요

프론트 기능 구현 시 참고.

