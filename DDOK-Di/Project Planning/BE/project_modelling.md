# 스마트 디스크 DB 모델링

## 1. User

- **[PK]** user_id/ int / notnull, Auto_Increment
- 사원번호 / int / notnull
- 이름 / varchar(20) / notnull
- 키  / int
  - 데스크 세팅에 상관관계가 큰 키 항목을 기록함
- 이메일 / varchar(50)
- 전화번호 / varchar(20)
- 사진 / varchar(200)
  - 유저의 프로필 사진이 저장된 서버의 URL을 기록함
- 직급 / varchar(20)
  - 회사를 대상으로 하는 경우 직책을 기록하여 프로필 사진과 함께 개별 LCD 대기화면에 띄워줄 것.
- id / varchar(20) / notnull
- password / varchar(20) / notnull
- admin / boolean / notnull
- seat_id/ varchar(20)
  - 현재 자리
- **[FK]** bookmark1 / int
  - 데스트 세팅 중 유저가 선택한 즐겨찾기.
  - Desk_Setting의 PK값을 사용.
- **[FK]** bookmark2 / int
- **[FK]** bookmark3 / int
- **[FK]** 현재상태 / int / not null

## 2. Desk_Setting

- **[PK]** setting_id / int / notnull, Auto_Increment

- 데스크높이 / int / notnull

- 의자높이 / int / notnull

- 모니터위치 / int / notnull

- 설정일시 / date / notnull

## 3. seat
- **[PK]** seat_id / int / not null, Auto_Increment
- seat_number / varchar(20) / not null
- isEmpty / boolean / not null

## 4. User_Status
- **[PK]** status_id / int / not null, Auto_Increment
- 상태종류 / Status/ varchar(10) / not null


**[비고]**

- 데스크 세팅은 무조건 데스크높이/모니터 위치를 포함해야 하므로 각각의 필드에는 notnull 설정을 해줌.
- 이외에도 실제 임베디드 구현 과정에서 필요한 세팅값을 이 테이블에 칼럼으로 추가할 것.
