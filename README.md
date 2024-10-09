# React + Typescript로 제작한 Dashboard

React + Typescript, Node.js + MongoDB 를 사용한 다양한 management가 가능한 관리자 페이지 및 Dashboard입니다.

<br/>

# 프로젝트 개요

대상이 되는 사이트의 모니터링, 권한관리 등의 기능들도 Dashboard 사용자의 Role에 따라 시각화된 자료확인 및 로그확인, 쉬운 권한관리를 행사할 수 있도록 만든 Dashboard입니다.

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
- Admin 권한을 가진 사용자는 다른 User들의 권한 변경 가능
- Chart 및 숫자로 데이터 시각화
- 상호작용할 앱의(ex. 커뮤니티 사이트) 일반 User들의 계정을 정지 및 활성화 기능
- Dashboard 및 상호작용할 앱의 오류정보를 ErrorLog 탭에서 확인가능

<br/>

# 주요 기능
- `JWT (Json Web Token) 및 Cookie`를 사용한 token 기반의 사용자 인증(Authentication)
- AccessToken 및 User 권한 level에 따른 인가(Authorization)
- Mui를 이용한 `다크모드 지원`
- RTK를 사용한 효율적인 전역 Modal 관리

<br/>

# 개선 사항들
### 성능 개선
#### Suspense, lazy를 이용한 코드 스플리팅
- CSR의 **`초기 로딩 시간이 긴 문제를 개선`** 하기 위해 Route 페이지 별로 코드 스플리팅을 적용하여 **번들 사이즈를 줄였습니다.**
- lazy를 사용하여 페이지가 필요한 시점에 **`동적으로 컴포넌트를 load`**하며, Suspense를 사용하여 페이지가 load되는 동안 loading 화면을 노출합니다.

#### 빌드 시간 단축을 위한 Vite 번들러 사용
- **`빌드 속도가 느린 CRA의 단점을 개선`** 하기 위해 번들링 도구로 Vite를 선택하였습니다.
- Vite의 **esbuild와 브라우저의 ESM을 이용한 번들링**을 활용하여 개발 속도를 개선했습니다.

<br/>

### 오류 처리
#### ErrorBoundary를 이용하여 선언적으로 에러 처리
- Suspense와 ErrorBoundary를 각각 Wrapper 컴포넌트를 통해 관리합니다.
- 컴포넌트 내부에서는 비동기 성공 상태와 비즈니스 로직에 집중하여 개발 할 수 있습니다.
- Layout에 outlet을 Suspense와 ErrorBoundary로 감싸주어 Header가 무조건 보이게 설정함으로서 컴포넌트 에러로 인해 전체 앱이 멈추는 현상을 방지 할 수 있습니다.

<br/>

### 서버 상태 관리
#### React-Query를 이용한 일관성 있는 서버 상태 관리
- React-Query의 캐싱을 활용해 불필요한 API 호출 횟수를 줄였습니다.
- staleTime과 gcTime을 활용하여 불필요한 재요청을 방지하며 데이터를 최신 상태로 유지함으로써 사용자 경험을 개선했습니다.

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
