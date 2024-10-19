# React + Typescript로 제작한 Dashboard

React + Typescript, Node.js + MongoDB 를 사용한 다양한 management가 가능한 관리자 페이지 및 Dashboard입니다.

<br/>

# 프로젝트 개요

대상이 되는 사이트(ex 커뮤니티 사이트)의 모니터링, 권한관리 등의 기능들도 Dashboard 사용자의 Role에 따라 시각화된 자료확인 및 로그확인, 쉬운 권한관리를 행사할 수 있도록 만든 Dashboard입니다.

Side Project로 무한스크롤 기반 커뮤니티 웹 사이트를 개발한 후 상담사, 개발자, 기획자, 고객사 등

Dashboard User가 권한에 따라 필요한 정보에(통계, 상담기록, 1:1문의내역, 에러로그 등) 접근할 수 있도록, 또는 권한을 행사할 수 있도록 하여

해당 Dashboard에서 필요한 데이터 수집 및 커뮤니티 사이트까지 관리하는 총괄적인 management가 가능한 Dashboard를 제작하고자 해당 프로젝트를 시작하게 됐습니다.

<br/>

# URL

https://dashboard-dj.vercel.app

-Test 임시 계정(ID: admin@admin.com PW: 123456)

[Backend github URL](https://github.com/gksgks666/Dashboard-Server)

<br/>

# Tech Skill Used

|        Category        |                                             Tech                                              |
| :--------------------: | :-------------------------------------------------------------------------------------------: |
| **프레임워크 및 언어** |                                     **React, TypeScript**                                     |
|   **전역 상태 관리**   |                                       **Redux Toolkit**                                       |
|   **서버 상태 관리**   |                                        **React-Query**                                        |
|      **스타일링**      |                               **StyledComponents, MaterialUi**                                |
|     **코드 관리**      |                                  **ESLint, Husky, Prettier**                                  |
|       **번들러**       |                                           **VITE**                                            |
|    **배포 플랫폼**     |                                          **Vercel**                                           |
|  **기타 라이브러리**   | **Axios, dayjs, Yup, Jwt-decode, Nivo, react-hot-toast, react-error-boundary, redux-persist** |

<br/>

# 프로젝트 소개

- 로그인, 회원가입, 로그아웃 등 사용자 인증 절차 구현
- Admin 권한을 가진 사용자는 Dashboard 내의 다른 User 권한 사용자의 권한을 변경 가능
- Chart 및 숫자로 데이터 시각화
- 상호작용할 앱의(ex. 커뮤니티 사이트) 사용자 계정을 정지 및 활성화 기능
- Dashboard 및 상호작용할 앱의 오류정보를 ErrorLog 탭에서 확인가능
- 다크모드 지원

<br/>

# 주요 기능

### 인증 및 인가

#### JWT 인증방식 로그인

- JWT를 사용하여 AccessToken과 RefreshToken을 발급하고, **localStorage 및 HttpOnly Cookie에 저장하여 사용자 인증(Authentication)을** 처리합니다.
- AccessToken의 존재 여부를 기반으로 **`사용자의 권한을 검사하여 인가(Authorization)를 수행`** 합니다.
- AccessToken과 RefreshToken을 함께 사용하며, token을 1회성으로 관리하여 **`XSS 및 CSRF 공격에 대한 보안을 강화`** 합니다.

### 상태 관리

#### 클라이언트 상태 관리 RTK 사용

- Redux Toolkit을 사용하여 다크/라이트 모드, 모달 관리, 유저 정보 등의 상태를 관리합니다.
- 새로고침 시 redux 전역 **`상태가 초기화되는 현상을 방지`** 하기 위해 redux-persist를 통해 유저 데이터를 유지합니다.

#### 서버 상태 관리 React-Query 사용

- API 데이터 관리를 단순화하고 최적화합니다.

### 확장성있는 컴포넌트

#### Modal 컨테이너 분리

- createPortal을 이용하여 모달을 modal-root에 별도로 위치시켜 다른 컴포넌트들과 독립적으로 동작하도록 구성했습니다.
- 모달 type별 내부 컴포넌트를 **교체하는 방식으로 확장성을 높였** 습니다.
- 모달 type을 Array로 관리하여 **`여러개의 중첩모달을 동시에 띄울 수 있는 구조로 설계`** 했습니다.

#### Button 컴포넌트

- 일관된 스타일 적용이 필요한 Button 컴포넌트의 경우 variant 속성을 활용하여 스타일을 지정합니다.

### API 요청전 작업 처리

- interceptors를 활용해 **axios 요청 전**에 accessToken을 **`Header에 포함하여 API 요청 시 함께 전달`** 합니다.
- jwt-decode를 사용해 토큰 만료 시간을 검사하고, 만료 시 RefreshToken을 이용해 새 토큰을 자동으로 발급받아 **`앱 사용 중 로그아웃되는 현상을 방지하여`** 사용자 경험을 개선했습니다.

### Chart 구현을 위한 Nivo 사용

- Nivo 라이브러리를 사용하여 데이터 시각화를 위한 Chart를 구현했습니다.

### MUI 활용

#### DataGrid 활용

- DataGrid를 활용하여 각 Column에 맞게 다수의 데이터를 노출합니다.
- PaginationModel의 CustomComponents를 활용해 커스텀 페이지네이션 기능을 구현했습니다.
- isLoading 상태에 따라 **Skeleton UI를 제공**하여 **`데이터 로딩 중에도 사용자 경험을 개선`** 했습니다.

#### 다크모드 적용

- createTheme을 사용하여 **다크/라이트 모드를 구현**하고, 사용자가 테마를 전환할 수 있도록 설정했습니다.

### 기타

#### 코드 관리

- eslint, prettier, husky를 적용해 **일관된 코드 스타일을 유지하고 자동화된 코드 관리**를 수행했습니다.

### 추가 예정 기능

#### 사용자 정의 통계

- 대상이 되는 사이트(ex 커뮤니티 사이트)에서 특정 페이지 노출, 버튼 클릭, 상담사 연결 등 특정 부분에서의 사용자의 활동을 시각적 데이터로 확인할 수 있도록 개발자가 설정할 수 있습니다.
- 특정 이벤트 발생 시 api 호출하여 DB에 저장, nodeScheduler를 이용해 1시간단위로 batch를 돌려서 1일단위 통계수치를 저장합니다. 일정 기한이 지나면 데이터는 삭제합니다.
- 1일단위 통계수치를 받아와서 화면에 보여주도록 사용자 정의 통계를 구상중입니다.

#### batch 바로 돌리기

- 테스트할땐 통계 수치가 올바르게 변하는지 즉각적으로 확인이 필요할 수 있으므로 날짜를 지정해서 해당 날짜의 batch를 수동으로 바로 돌릴 수 있는 기능을 구상중입니다.

<br/>

# 개선 사항들

### 성능 개선

#### Suspense, lazy를 이용한 코드 스플리팅

- CSR의 **`초기 로딩 시간이 긴 문제를 개선`** 하기 위해 Route 페이지 별로 코드 스플리팅을 적용하여 **번들 사이즈를 줄였습니다.**
- lazy를 사용하여 페이지가 필요한 시점에 **`동적으로 컴포넌트를 load`** 하며, Suspense를 사용하여 페이지가 load되는 동안 loading 화면을 노출합니다.

#### 빌드 시간 단축을 위한 Vite 번들러 사용

- **`빌드 속도가 느린 CRA의 단점을 개선`** 하기 위해 번들링 도구로 Vite를 사용하였습니다.
- Vite의 **esbuild와 브라우저의 ESM을 이용한 번들링**을 활용하여 개발 속도를 개선했습니다.

#### 효율적인 서버 상태 관리를 위한 React-Query 도입

- React-Query의 캐싱을 활용해 **`불필요한 API 호출 횟수를 줄였습니다`**.
- placeholderData 옵션을 활용해 **`Loading Spinning을 방지하여 사용자 경험을 개선`** 했습니다.

### 오류 처리

#### ErrorBoundary를 이용하여 선언적으로 에러 처리

- Suspense와 ErrorBoundary를 각각 Wrapper 컴포넌트를 통해 관리합니다.
- Outlet을 이용하여 route별 자식 컴포넌트 렌더링, Header가 무조건 보이게 설정함으로서 컴포넌트 에러로 인해 **`전체 앱이 멈추는 현상을 방지`** 할 수 있습니다.
- 컴포넌트 내부에서는 비동기 성공 상태와 **비즈니스 로직에 집중**하여 개발 할 수 있습니다.

<br/>

# 프로젝트 구조

```bash
📦src
 ┣ 📂components
 ┃ ┣ 📂Button
 ┃ ┣ 📂DatePicker
 ┃ ┣ 📂Fab
 ┃ ┃ ┣ 📂Content
 ┃ ┣ 📂Helper
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂Content
 ┣ 📂hooks
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂mutations
 ┃ ┃ ┣ 📂queries
 ┣ 📂pages
 ┣ 📂router
 ┣ 📂rtk
 ┃ ┣ 📂features
 ┣ 📂styles
 ┣ 📂types
 ┣ 📂utils
```
