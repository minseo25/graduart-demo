## 초기 세팅

```
npm install
```
dependencies 모두 설치하시고

```
npm start
```
하면 localhost:3000 에 올라옵니다 (당연히 장고 서버도 켜두셔야 함)


## 기본 설명

`localhost:3000/login` 에서는 로그인, google login이 가능하고

`localhost:3000/register` 에서는 회원가입이 가능하고

`localhost:3000/` 로그인이 된 상태라면 여기서 로그인 정보를 확인 가능

`localhost:3000/items` 에서는 작품 목록 확인 가능 (로그인 안하고서도), 검색 기능도 완료, 작품 상세 페이지도 접속 가능

`localhost:3000/cart` 에서는 장바구니 확인 가능, 장바구니 물폼 삭제 가능, 상품 디테일 페이지에서 장바구니 추가 가능

`localhost:3000/purchase` 에서는 장바구니에 담긴 것들을 결제하는 페이지, 카카오페이로 결제 기능 추가 완료 (성공/실패 페이지도 존재)

`localhost:3000/purchases` 에서는 구매 내역들을 확인할 수 있음, 상세내역 버튼을 클릭하면 모달로 주문 상세내역이 뜸, 배송조회 버튼을 클릭하면 배송조회 가능, 환불신청 버튼 클릭하면 환불 요청이 날라감 (만약 환불 처리됐으면 환불 처리됨으로 바뀌고 클릭 x)


jwt token을 쿠키에 담아서 리턴했고, 보안을 위해 HttpOnly 세팅을 해둬 script로는 읽어오지 못합니다

그냥 로그인된 상태라면 보내는 모든 api 요청 헤더에 같이 토큰이 담겨서 갈거에요

그렇다면 로그인 상태를 어떻게 인식하냐, /auth/user/ api로 요청을 보내 로그인되었는지 여부를 감지하고 state로 저장해 관리 ㄱㄱ

프론트 기능 구현 시 참고.

## 프론트 레포 링크

https://github.com/hoooooojjjj/New_GraduART
