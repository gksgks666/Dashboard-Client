# React + Typescript로 제작한 Dashboard
대상이 되는 사이트의 모니터링, 권한관리 등의 기능들도 Dashboard 사용자의 Role에 따라 시각화된 자료확인 및 로그확인, 쉬운 권한관리를 행사할 수 있도록 만든 Dashboard입니다.

# 프로젝트 개요
Side Project로 무한스크롤 기반 커뮤니티 웹 사이트를 개발한 후 상담사, 개발자, 기획자, 고객사 등

Dashboard User가 권한에 따라 필요한 정보에(통계, 상담기록, 1:1문의내역, 에러로그 등) 접근할 수 있도록, 또는 권한을 행사할 수 있도록 하여

해당 Dashboard에서 필요한 데이터 수집 및 커뮤니티 사이트까지 관리하는 총괄적인 management가 가능한 Dashboard를 제작하고자 해당 프로젝트를 시작하게 됐습니다.

# URL
https://dashboard-dj.vercel.app

-Test 임시 계정(ID: admin@admin.com PW: 123456)

Backend github URL: https://github.com/gksgks666/Dashboard-Server

# Tech Skill Used
|Category|Tech|
|:-:|:-:|
|**프레임워크 및 언어**|**React, TypeScript**|
|**전역 상태 관리**|**Redux Toolkit**|
|**서버 상태 관리**|**React-Query**|
|**스타일링**|**StyledComponent, MaterialUi**|
|**코드 관리**|**ESLint, Husky, Prettier**|
|**번들러**|**VITE**|
|**배포 플랫폼**|**Vercel**|

# 프로젝트 소개


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
 ┃ ┣ 📂admin
 ┃ ┣ 📂breakdown
 ┃ ┣ 📂customers
 ┃ ┣ 📂daily
 ┃ ┣ 📂dashboard
 ┃ ┣ 📂errorlog
 ┃ ┣ 📂invalidpage
 ┃ ┣ 📂layout
 ┃ ┣ 📂login
 ┃ ┣ 📂monthly
 ┃ ┣ 📂overview
 ┃ ┗ 📂register
 ┣ 📂router
 ┣ 📂rtk
 ┃ ┣ 📂features
 ┣ 📂styles
 ┣ 📂types
 ┃ ┣ 📂Module
 ┣ 📂utils
```
