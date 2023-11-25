# Makers 메이커스

> 카카오메이커스 클론 프로젝트

![Main](https://github.com/fzdf0613/makers/assets/135721168/24ed3db7-4791-436e-8885-49629f0f6d99)

<br/><br/>

# 기술 스택

> Next.js 13 / React / TS / FireBase

## 배포

> Vercel

<br/><br/>

# 구현 기능

계정 - 계정 생성 및 로그인, 로그아웃

관리자 - 상품 등록, 문의 답변

사용자 - 좋아요 등록, 주문, 구매 후기, 제품 문의, 내역 확인

<br/><br/><br/>

# 페이지 및 기능 설명

### 계정

- 계정 생성 및 로그인, 로그아웃 기능은 NextAuth로 구현되어 있습니다.
  <img src="https://github.com/fzdf0613/makers/assets/135721168/45092083-e31d-4002-8ea6-3df8d99bbdcc" height="45%" width="45%" />
  <img src="https://github.com/fzdf0613/makers/assets/135721168/21d4faea-0590-48fb-99cb-87aa174da77e" height="45%" width="45%" />

<br/><br/>

### 홈, 카테고리 페이지

- 등록된 상품 목록을 보여주며, 상단의 카테고리 바를 통해 카테고리별 상품 목록을 확인할 수 있습니다.
- 최신 순, 주문 많은 순, 마감 임박 순 으로 상품을 정렬해주는 기능을 제공합니다.
- 상품 목록을 확인할 수 있는 페이지에서 사용자는 버튼을 통해 상품을 '좋아요' 등록할 수 있으며, **Optimistic UI**로 동작합니다.
  <img src="https://github.com/fzdf0613/makers/assets/135721168/4fc618b8-4953-4caa-a929-01f7777dd378" height="50%" width="50%" /><br><br>

### 최근 본 페이지

- 사용자가 최근 조회산 상품 목록을 보여줍니다. 로그인 시에만 사용 가능합니다.
  <img src="https://github.com/fzdf0613/makers/assets/135721168/bb6fa011-ea48-4ba6-a8ce-25723572c74d" height="45%" width="45%" />
  <img src="https://github.com/fzdf0613/makers/assets/135721168/f283a89a-616c-4c36-abdb-76542c8fb8cf" height="45%" width="45%" /><br><br>

### 오픈예정 페이지

- 오픈 예정할 상품 목록이 존재할 경우, 상품 목록을 보여줍니다.
  <img src="https://github.com/fzdf0613/makers/assets/135721168/e726ff6b-3dec-4c3f-8115-529ce9180379" height="50%" width="50%" /><br><br>

### 검색 페이지

- 등록된 상품을 검색할 수 있습니다. 로그인 시에는 최근 검색한 키워드를 보여줍니다.
  <img src="https://github.com/fzdf0613/makers/assets/135721168/e3ce6ed5-bdfb-4a08-a572-577db5a6afb2" height="50%" width="50%" /><br><br>

<br/><br/>

### 관리자 기능

- 관리자는 상품 등록을 하고, 사용자가 등록한 제품 문의를 확인하고 답변을 등록할 수 있습니다.<br><br>

  ###### 상품 등록 페이지

  - Quill 라이브러리를 통해 글작성 에디터를 구현하였습니다.
  - 에디터를 커스터마이징하여, 앵커를 추가할 수 있는 기능을 추가하였습니다. ( 앵커는 상품 페이지에서 빠른 스크롤 이동을 위해 사용됩니다. )<br><br>
    <img src="https://github.com/fzdf0613/makers/assets/135721168/4e243004-82f6-4faf-9b26-587e12bb8e6d" height="50%" width="50%" /><br><br>

  ###### 문의 답변 페이지

  - 답변 목록, 답변 대기 목록을 확인 가능하며, 등록한 답변의 수정 및 삭제을 할 수 있습니다.
    <img src="https://github.com/fzdf0613/makers/assets/135721168/2c547441-78f6-4254-9194-f4e0a661d75e" height="50%" width="50%" /><br><br>

### 상품 페이지

- 상품의 주문이 가능합니다.
- 상품의 주문 현황을 프로그레스바 UI로 표시합니다.
- 상세정보, 구매후기, 제품문의 탭을 제공합니다.

  ###### 주문

  <img src="https://github.com/fzdf0613/makers/assets/135721168/09135817-8b28-4f1d-8524-3171b180c64b" height="50%" width="50%" /><br><br>

  ###### 상세정보 탭

  - 상품의 상세 정보를 확인할 수 있으며, **앵커바를 통해 해당 내용으로 빠르게 스크롤 이동이 가능합니다.** <br><br>
    <img src="https://github.com/fzdf0613/makers/assets/135721168/7177db8b-15f7-4349-a261-5ea155d452ba" height="50%" width="50%" /><br><br>

  ###### 구매후기 탭

  <img src="https://github.com/fzdf0613/makers/assets/135721168/b69ace23-2ed5-4f9d-baa2-8d7a837d7df6" height="45%" width="45%" />
  <img src="https://github.com/fzdf0613/makers/assets/135721168/9439c253-3067-49b0-99d0-e4889b43e929" height="45%" width="45%" /><br><br>

  ###### 제품문의 탭

  <img src="https://github.com/fzdf0613/makers/assets/135721168/92814745-b22b-4e2c-9474-00d1a66a8e64" height="45%" width="45%" />

<br/><br/>

### 사용자 기능

##### 마이 페이지

- 사용자의 좋아요, 주문 내역, 후기 내역, 문의 내역을 조회할 수 있습니다.
  - 후기내역 - 작성 목록 / 작성 대기 목록을 확인 가능합니다. 주문을 완료할 경우 해당 상품은 작성 대기 목록에 추가됩니다.
  - 문의내역 - 상품에 대한 문의한 내역이 표시됩니다. 문의 상품, 내역 및 답변을 확인할 수 있습니다. <br><br>
    <img src="https://github.com/fzdf0613/makers/assets/135721168/c27f5d55-9b9e-402b-b726-36930906fab0" height="50%" width="50%" /><br><br>

##### 후기 작성

<img src="https://github.com/fzdf0613/makers/assets/135721168/54d8a597-8b52-4749-aa3a-5454e915f942" height="50%" width="50%" /><br><br>

##### 문의 작성

<img src="https://github.com/fzdf0613/makers/assets/135721168/f92a2646-607c-4c8b-896d-fd25ec3fa534" height="50%" width="50%" /><br><br><br>
