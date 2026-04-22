# LSCable CMS V2 프로젝트 분석 문서

---

## 문서 요약

| 항목 | 내용 |
|------|------|
| 프로젝트 유형 | Spring Boot 기반 웹 애플리케이션 (케이블 관리 시스템) |
| 프레임워크 | Spring Boot 1.4.4.RELEASE, Thymeleaf |
| 데이터베이스 | PostgreSQL 42.2.2, MyBatis ORM, HikariCP 커넥션 풀 |
| 보안 | Spring Security + BCrypt 암호화, 역할 기반 접근 제어 (RBAC) |
| 주요 기능 | CMS(사이트/빌딩/패널 관리), IPAM(IP 주소 관리), 대시보드/위젯, 실시간 모니터링 (WebSocket) |
| 빌드 도구 | Maven |
| Java 버전 | 1.7 |
| 파일 수 | Java 59개, Template 100개 이상 |

---

## 1. 프로젝트 개요

### 기본 정보

| 항목 | 값 |
|------|------|
| 프로젝트 이름 | LSCable CMS |
| 버전 | 2.0 |
| 패키지 | com.i52soft.lscable.cms |
| 프로젝트 유형 | Spring Boot 웹 애플리케이션 |

### 프로젝트 설명

LSCable CMS V2는 네트워크 인프라 관리를 위한 케이블 관리 시스템입니다. 웹 기반 UI를 통해 케이블 연결, 네트워크 장비, IP 주소, 데이터센터 인프라를 관리할 수 있습니다.

### 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Spring Boot 1.4.4.RELEASE |
| 템플릿 엔진 | Thymeleaf |
| 데이터베이스 | PostgreSQL 42.2.2.jre7 |
| ORM | MyBatis (mybatis-spring-boot-starter 1.1.1) |
| 보안 | Spring Security + BCrypt |
| 웹소켓 | Spring WebSocket |
| 로깅 | SLF4J + Logback |
| 커넥션 풀 | HikariCP |
| 프론트엔드 | Bootstrap 3.3.4, jQuery 1.11.3 |
| 암호화 | BouncyCastle (bcprov-jdk15on, bcpkix-jdk15on) |
| 빌드 도구 | Maven |
| Java 버전 | 1.7 |

---

## 2. 프로젝트 구조

```
LSCable CMS V2/
├── src/
│   ├── main/
│   │   ├── java/com/i52soft/lscable/cms/
│   │   │   ├── App.java                      # 메인 애플리케이션
│   │   │   ├── config/                        # 설정
│   │   │   │   ├── SecurityConfig.java        # 보안 설정
│   │   │   │   ├── WebConfig.java             # 웹 설정
│   │   │   │   ├── WebSocketConfig.java       # 웹소켓 설정
│   │   │   │   ├── ThymeleafConfig.java       # 템플릿 설정
│   │   │   │   └── MyTomcatEmbeddedServletContainerFactory.java
│   │   │   ├── controller/                    # 컨트롤러
│   │   │   │   ├── AdminController.java       # 관리자 컨트롤러
│   │   │   │   ├── DefaultController.java     # 기본 컨트롤러
│   │   │   │   ├── HTBackendRestController.java
│   │   │   │   ├── WebSocketController.java   # 웹소켓
│   │   │   │   └── WidgetDataProviderRestController.java
│   │   │   ├── service/                      # 서비스 인터페이스
│   │   │   │   ├── HTBackendService.java      # 핵심 비즈니스 로직
│   │   │   │   ├── WidgetDataProviderService.java
│   │   │   │   └── impl/
│   │   │   │       ├── HTBackendServiceImpl.java
│   │   │   │       ├── LogInServiceImpl.java
│   │   │   │       └── WidgetDataProviderServiceImpl.java
│   │   │   ├── dao/                           # 데이터 접근
│   │   │   │   ├── HTBackendDao.java
│   │   │   │   ├── LogInDao.java
│   │   │   │   └── WidgetDataProviderDao.java
│   │   │   ├── domain/                        # 도메인 객체
│   │   │   │   ├── UserVO.java                # 일반 사용자
│   │   │   │   ├── SystemUserVO.java          # 시스템 관리자
│   │   │   │   ├── EndUserVO.java             # 최종 사용자
│   │   │   │   ├── ProductVO.java             # 제품
│   │   │   │   ├── NetworkVO.java             # 네트워크 세그먼트
│   │   │   │   ├── IPAddressVO.java           # IP 주소
│   │   │   │   ├── CMSSiteVO.java             # CMS 사이트
│   │   │   │   ├── RegionVO.java              # 지역
│   │   │   │   ├── EntityVO.java              # 물리적 엔티티
│   │   │   │   ├── InterfaceVO.java           # 네트워크 인터페이스
│   │   │   │   ├── SiteTreeVO.java            # 사이트 트리
│   │   │   │   ├── SiteTreeNodeVO.java
│   │   │   │   ├── LinkageConnectionVO.java   # 연결 정보
│   │   │   │   ├── ConnectorVO.java
│   │   │   │   ├── ConnectionVO.java
│   │   │   │   ├── MainPageLayoutVO.java      # 대시보드 레이아웃
│   │   │   │   ├── MainPageWidgetVO.java      # 대시보드 위젯
│   │   │   │   ├── MapWidgetVO.java           # 맵 위젯
│   │   │   │   ├── ChartWidgetVO.java         # 차트 위젯
│   │   │   │   ├── WidgetParam.java
│   │   │   │   ├── MapParam.java
│   │   │   │   ├── DeviceParam.java
│   │   │   │   ├── NetworkSwitchVO.java       # 네트워크 스위치
│   │   │   │   ├── PPInvalidVO.java
│   │   │   │   ├── SampleWidgetVO.java
│   │   │   │   ├── SampleWidgetVO2.java
│   │   │   │   ├── SiteTreePlacementVO.java
│   │   │   │   ├── SiteTreeRackspacePositionVO.java
│   │   │   │   ├── device.java
│   │   │   │   ├── deviceInfo.java
│   │   │   │   ├── regions.java
│   │   │   │   └── regionInfo.java
│   │   │   └── common/                         # 공통 유틸리티
│   │   │       ├── CmsAuthenticationProvider.java  # 인증 제공자
│   │   │       ├── KeyUtil.java                # 키 유틸
│   │   │       ├── PemFile.java                # PEM 파일 처리
│   │   │       ├── IPAddress.java              # IP 주소 처리
│   │   │       ├── SimpleCORSFilter.java       # CORS 필터
│   │   │       └── CmsACLHandler.java          # ACL 핸들러
│   │   └── resources/
│   │       ├── application.properties          # 스프링 부트 설정
│   │       ├── application.yml
│   │       ├── database.properties              # DB 연결 설정
│   │       ├── data.sql                        # 초기 데이터
│   │       ├── db_reset_sql.txt                # DB 리셋 SQL
│   │       ├── LicensedMac                     # 라이선스 MAC 주소
│   │       ├── logback-spring.xml              # 로깅 설정
│   │       ├── templates/                      # Thymeleaf 템플릿
│   │       │   ├── login.html                  # 로그인 페이지
│   │       │   ├── layout/                     # 레이아웃 템플릿
│   │       │   │   ├── default.html ~ default8.html
│   │       │   │   └── public.html
│   │       │   ├── cms/                        # CMS 모듈 (원본 테마)
│   │       │   │   ├── index.html, view.html, new.html
│   │       │   │   ├── modifySite.html, setting.html
│   │       │   │   ├── siteset.html, adminAuth.html
│   │       │   │   ├── catalog.html, regions.html
│   │       │   │   ├── manufacturer.html, linkage.html
│   │       │   │   └── adminSearch.html, adminPortUsage.html
│   │       │   ├── cms2/                       # CMS 모듈 (v2 테마)
│   │       │   ├── setting/                    # 설정 모듈 (원본)
│   │       │   │   ├── main.html, view.html
│   │       │   │   ├── new.html, modify.html
│   │       │   │   ├── system.html, adminsysuser.html
│   │       │   │   ├── map-list.html
│   │       │   │   └── manage-widget-*.html   # 위젯 관리
│   │       │   ├── setting2/                   # 설정 모듈 (v2)
│   │       │   ├── ipam/                      # IPAM 모듈 (원본)
│   │       │   │   ├── user.html, setting.html
│   │       │   ├── ipam2/                      # IPAM 모듈 (v2)
│   │       │   │   ├── index.html, user.html
│   │       │   │   ├── setting.html, terminalUser.html
│   │       │   │   ├── terminalList.html, adminNetwork.html
│   │       │   ├── main-widgetMap.html
│   │       │   └── pace.html
│   │       └── themes/
│   │           ├── bright.properties           # 밝은 테마
│   │           └── dark.properties             # 어두운 테마
│   └── test/
│       └── java/
│           └── com/mysample/
│               └── AppTest.java
├── target/
│   ├── LSCableCMS-2.0.jar                     # 빌드된 JAR
│   ├── config.properties                        # 실행 설정
│   ├── startCMS.bat / startCMS.sh              # 시작 스크립트
│   └── stopCMS.bat / stopCMS.sh                # 중지 스크립트
├── doc/                                         # Javadoc 문서
├── pom.xml                                      # Maven 설정
├── .classpath
└── .project
```

---

## 3. 모듈 설명

### 3.1 컨트롤러 계층

#### AdminController.java
주요 관리 기능 컨트롤러:

- `/admin/setting/*` - 대시보드 레이아웃 및 위젯 관리
- `/admin/cms/*` - CMS 사이트 관리
- `/admin/ipam/*` - IP 주소 관리
- 테마 기반 라우팅 (setting/ vs setting2/)

주요 엔드포인트:

| 경로 | 설명 |
|------|------|
| /admin/setting/adminsysuser | 시스템 사용자 관리 |
| /admin/setting/new | 새 레이아웃 생성 |
| /admin/setting/modify | 레이아웃 수정 |
| /admin/setting/map-list | 맵 위젯 목록 |
| /admin/cms/siteset | 사이트 설정 |
| /admin/cms/view | 사이트 보기 |
| /admin/cms/new | 새 사이트 생성 |
| /admin/cms/regions | 지역 관리 |
| /admin/cms/manufacturer | 제조사 관리 |
| /admin/ipam/adminNetwork | 네트워크 관리 |

#### HTBackendRestController.java
백엔드 작업을 위한 REST API 컨트롤러

#### WidgetDataProviderRestController.java
위젯 데이터 제공을 위한 REST API

#### WebSocketController.java
실시간 통신 지원 (알림, 상태 업데이트)

#### DefaultController.java
기본 라우팅 및 메인 페이지 처리

### 3.2 서비스 계층

#### HTBackendService (인터페이스 + 구현)
핵심 비즈니스 로직:

- 위젯 관리
- 레이아웃 관리
- 사이트 트리 관리
- 제품/제조사 관리
- 사용자 관리
- 네트워크/IPAM 관리
- 연결 다이어그램
- 알람 모니터링

#### WidgetDataProviderService
위젯 데이터 제공 서비스

### 3.3 도메인 객체

| 도메인 클래스 | 설명 |
|--------------|------|
| UserVO | 일반 사용자 |
| SystemUserVO | 시스템 관리자 |
| EndUserVO | 최종 사용자/터미널 사용자 |
| CMSSiteVO | CMS 사이트 정보 |
| NetworkVO | 네트워크 세그먼트 |
| IPAddressVO | IP 주소 |
| EntityVO | 물리적 엔티티 (장비, 랙 등) |
| InterfaceVO | 네트워크 인터페이스 |
| SiteTreeVO | 사이트 트리 구조 |
| MainPageLayoutVO | 대시보드 레이아웃 |
| MainPageWidgetVO | 대시보드 위젯 |
| MapWidgetVO | 맵 위젯 |
| WidgetParam | 위젯 매개변수 |

### 3.4 보안

- **인증**: Spring Security + BCrypt 비밀번호 암호화
- **권한 부여**: 역할 기반 접근 제어 (RBAC)
- **세션**: Remember-me 기능 지원
- **공개 리소스**: CSS, JS, 이미지, 정적 리소스 (permitAll)
- **보호 리소스**: `/admin/**`는 Administrator 역할 필요

---

## 4. API 엔드포인트

### 인증

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /login | 로그인 페이지 |
| POST | /login-process | 로그인 처리 |
| GET | /logout | 로그아웃 |

### 관리자 - 설정

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /admin/setting/adminsysuser | 시스템 사용자 관리 |
| GET | /admin/setting/new | 새 레이아웃 생성 |
| GET | /admin/setting/modify | 레이아웃 수정 |
| GET | /admin/setting/map-list | 맵 위젯 목록 |
| GET | /admin/setting/manage-layout | 레이아웃 관리 |
| GET | /admin/setting/manage-widget | 위젯 관리 |
| GET | /admin/setting/preview-layout | 레이아웃 미리보기 |

### 관리자 - CMS

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /admin/cms/setting | CMS 설정 |
| GET | /admin/cms/siteset | 사이트 설정 |
| GET | /admin/cms/view | 사이트 보기 |
| GET | /admin/cms/new | 새 사이트 생성 |
| GET | /admin/cms/modifySite | 사이트 수정 |
| GET | /admin/cms/catalog | 제품 카탈로그 |
| GET | /admin/cms/regions | 지역 관리 |
| GET | /admin/cms/manufacturer | 제조사 관리 |
| GET | /admin/cms/adminAuth | 권한 관리 |
| GET | /admin/cms/linkage | 연결 관리 |

### 관리자 - IPAM

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /admin/ipam/setting | IPAM 설정 |
| GET | /admin/ipam/user | 사용자 IP 관리 |
| GET | /admin/ipam/adminNetwork | 네트워크 관리 |

---

## 5. 데이터베이스 설정

### 커넥션 풀
- **유형**: HikariCP
- **드라이버**: PostgreSQL 42.2.2.jre7
- **설정**: database.properties (외부화됨)

### ORM
- **유형**: MyBatis
- **매퍼**: XML 기반 SQL 매핑

---

## 6. 빌드 및 배포

### 빌드
```bash
mvn clean package
```

### 실행
```bash
# Windows
target\startCMS.bat

# Linux
sh target/startCMS.sh
```

### 중지
```bash
# Windows
target\stopCMS.bat

# Linux
sh target/stopCMS.sh
```

---

## 7. 주요 기능

### 핵심 기능

1. **케이블 관리 시스템 (CMS)**
   - 사이트 관리
   - 빌딩/층/실 계층 구조
   - 패치 패널 관리
   - 연결 추적

2. **대시보드 및 위젯**
   - 사용자 정의 대시보드 레이아웃
   - 라인 차트, 파이 차트, 게이지 차트
   - 알람 그리드 테이블
   - 가용성 그리드 테이블
   - 맵 위젯
   - 3D 랙 뷰 (DCIM)

3. **IP 주소 관리 (IPAM)**
   - IP 주소 할당
   - 네트워크 세그먼트 관리
   - L2/L3 스위치 관리
   - 게이트웨이 구성

4. **실시간 모니터링**
   - WebSocket 기반 업데이트
   - 알람 상태 모니터링
   - 포트 상태 모니터링

5. **사용자 관리**
   - 시스템 사용자 관리
   - 최종 사용자 관리
   - 역할 기반 접근 제어 (RBAC)

6. **테마 지원**
   - 밝은 테마 (Bright)
   - 어두운 테마 (Dark)

---

## 8. 설정 파일

### application.properties
스프링 부트 메인 설정

### database.properties
데이터베이스 연결 설정 (외부화됨)

### config.properties
애플리케이션 실행 시간 설정 (target/ 폴더 내)

### LicensedMac
하드웨어 바인딩을 위한 라이선스 MAC 주소

---

## 9. 의존성 요약

| 그룹 | 아티팩트 | 버전 |
|------|----------|------|
| org.springframework.boot | spring-boot-starter-web | 1.4.4.RELEASE |
| org.springframework.boot | spring-boot-starter-security | 1.4.4.RELEASE |
| org.springframework.boot | spring-boot-starter-websocket | 1.4.4.RELEASE |
| org.springframework.boot | spring-boot-starter-thymeleaf | 1.4.4.RELEASE |
| org.mybatis.spring.boot | mybatis-spring-boot-starter | 1.1.1 |
| org.postgresql | postgresql | 42.2.2.jre7 |
| org.projectlombok | lombok | 1.16.8 |
| com.zaxxer | HikariCP | (parent에서 상속) |
| org.bouncycastle | bcprov-jdk15on | 1.56 |
| org.bouncycastle | bcpkix-jdk15on | 1.56 |
| org.webjars | bootstrap | 3.3.4 |
| org.webjars | jquery | 1.11.3 |

---

## 10. 참고 사항

- 기존 Spring Boot 1.4.x 애플리케이션 (Java 7)
- Thymeleaf를 사용한 서버사이드 렌더링
- 두 가지 테마 버전 존재: 원본 (setting/) 및 v2 (setting2/)
- CMS 및 IPAM 모듈이 별도의 UI 경로를 가짐
- 하드웨어 라이선스 바인딩은 구현되어 있으나 현재 비활성화 상태
- Javadoc 문서는 /doc 폴더에 있음
