# LSCable CMS V2 Project Analysis Document

## 1. Project Overview

### Basic Information
| Item | Value |
|------|-------|
| Project Name | LSCable CMS |
| Version | 2.0 |
| Package | com.i52soft.lscable.cms |
| Type | Spring Boot Web Application |

### Project Description
LSCable CMS V2 is a cable management system for network infrastructure management. It provides web-based UI for managing cable connections, network devices, IP addresses, and data center infrastructure.

### Technology Stack
| Category | Technology |
|----------|------------|
| Framework | Spring Boot 1.4.4.RELEASE |
| Template Engine | Thymeleaf |
| Database | PostgreSQL 42.2.2.jre7 |
| ORM | MyBatis (mybatis-spring-boot-starter 1.1.1) |
| Security | Spring Security + BCrypt |
| WebSocket | Spring WebSocket |
| Logging | SLF4J + Logback |
| Connection Pool | HikariCP |
| Frontend | Bootstrap 3.3.4, jQuery 1.11.3 |
| Crypto | BouncyCastle (bcprov-jdk15on, bcpkix-jdk15on) |
| Build Tool | Maven |
| Java Version | 1.7 |

---

## 2. Project Structure

```
LSCable CMS V2/
├── src/
│   ├── main/
│   │   ├── java/com/i52soft/lscable/cms/
│   │   │   ├── App.java                      # Main Application
│   │   │   ├── config/                       # Configuration
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── WebConfig.java
│   │   │   │   ├── WebSocketConfig.java
│   │   │   │   ├── ThymeleafConfig.java
│   │   │   │   └── MyTomcatEmbeddedServletContainerFactory.java
│   │   │   ├── controller/                  # Controllers
│   │   │   │   ├── AdminController.java
│   │   │   │   ├── DefaultController.java
│   │   │   │   ├── HTBackendRestController.java
│   │   │   │   ├── WebSocketController.java
│   │   │   │   └── WidgetDataProviderRestController.java
│   │   │   ├── service/                      # Service Interfaces
│   │   │   │   ├── HTBackendService.java
│   │   │   │   ├── WidgetDataProviderService.java
│   │   │   │   └── impl/
│   │   │   │       ├── HTBackendServiceImpl.java
│   │   │   │       ├── LogInServiceImpl.java
│   │   │   │       └── WidgetDataProviderServiceImpl.java
│   │   │   ├── dao/                          # Data Access
│   │   │   │   ├── HTBackendDao.java
│   │   │   │   ├── LogInDao.java
│   │   │   │   └── WidgetDataProviderDao.java
│   │   │   ├── domain/                       # Domain Objects
│   │   │   │   ├── UserVO.java
│   │   │   │   ├── SystemUserVO.java
│   │   │   │   ├── EndUserVO.java
│   │   │   │   ├── ProductVO.java
│   │   │   │   ├── NetworkVO.java
│   │   │   │   ├── IPAddressVO.java
│   │   │   │   ├── CMSSiteVO.java
│   │   │   │   ├── RegionVO.java
│   │   │   │   ├── EntityVO.java
│   │   │   │   ├── InterfaceVO.java
│   │   │   │   ├── SiteTreeVO.java
│   │   │   │   ├── SiteTreeNodeVO.java
│   │   │   │   ├── LinkageConnectionVO.java
│   │   │   │   ├── ConnectorVO.java
│   │   │   │   ├── ConnectionVO.java
│   │   │   │   ├── MainPageLayoutVO.java
│   │   │   │   ├── MainPageWidgetVO.java
│   │   │   │   ├── MapWidgetVO.java
│   │   │   │   ├── ChartWidgetVO.java
│   │   │   │   ├── WidgetParam.java
│   │   │   │   ├── MapParam.java
│   │   │   │   ├── DeviceParam.java
│   │   │   │   ├── NetworkSwitchVO.java
│   │   │   │   ├── PPInvalidVO.java
│   │   │   │   ├── SampleWidgetVO.java
│   │   │   │   ├── SampleWidgetVO2.java
│   │   │   │   └── SiteTreePlacementVO.java
│   │   │   │   ├── SiteTreeRackspacePositionVO.java
│   │   │   │   ├── device.java
│   │   │   │   ├── deviceInfo.java
│   │   │   │   ├── regions.java
│   │   │   │   └── regionInfo.java
│   │   │   └── common/                        # Common Utilities
│   │   │       ├── CmsAuthenticationProvider.java
│   │   │       ├── KeyUtil.java
│   │   │       ├── PemFile.java
│   │   │       ├── IPAddress.java
│   │   │       ├── SimpleCORSFilter.java
│   │   │       └── CmsACLHandler.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application.yml
│   │       ├── database.properties
│   │       ├── data.sql
│   │       ├── db_reset_sql.txt
│   │       ├── LicensedMac
│   │       ├── logback-spring.xml
│   │       ├── templates/                    # Thymeleaf Templates
│   │       │   ├── login.html
│   │       │   ├── layout/
│   │       │   │   ├── default.html
│   │       │   │   ├── default2.html
│   │       │   │   ├── default3.html
│   │       │   │   ├── default4.html
│   │       │   │   ├── default5.html
│   │       │   │   ├── default6.html
│   │       │   │   ├── default7.html
│   │       │   │   ├── default8.html
│   │       │   │   └── public.html
│   │       │   ├── cms/
│   │       │   │   ├── index.html
│   │       │   │   ├── view.html
│   │       │   │   ├── new.html
│   │       │   │   ├── modifySite.html
│   │       │   │   ├── setting.html
│   │       │   │   ├── siteset.html
│   │       │   │   ├── adminAuth.html
│   │       │   │   ├── adminList.html
│   │       │   │   ├── adminSearch.html
│   │       │   │   ├── adminPortUsage.html
│   │       │   │   ├── catalog.html
│   │       │   │   ├── regions.html
│   │       │   │   ├── manufacturer.html
│   │       │   │   └── linkage.html
│   │       │   ├── cms2/                      # CMS v2 Theme
│   │       │   ├── setting/
│   │       │   │   ├── main.html
│   │       │   │   ├── view.html
│   │       │   │   ├── new.html
│   │       │   │   ├── modify.html
│   │       │   │   ├── system.html
│   │       │   │   ├── adminsysuser.html
│   │       │   │   ├── map-list.html
│   │       │   │   └── manage-widget-*.html   # Widget Management
│   │       │   ├── setting2/                  # Setting v2 Theme
│   │       │   ├── ipam/
│   │       │   │   ├── user.html
│   │       │   │   └── setting.html
│   │       │   ├── ipam2/
│   │       │   │   ├── index.html
│   │       │   │   ├── user.html
│   │       │   │   ├── setting.html
│   │       │   │   ├── terminalUser.html
│   │       │   │   ├── terminalList.html
│   │       │   │   └── adminNetwork.html
│   │       │   ├── main-widgetMap.html
│   │       │   └── pace.html
│   │       └── themes/
│   │           ├── bright.properties
│   │           └── dark.properties
│   └── test/
│       └── java/
│           └── com/mysample/
│               └── AppTest.java
├── target/
│   ├── LSCableCMS-2.0.jar
│   ├── config.properties
│   ├── startCMS.bat / startCMS.sh
│   └── stopCMS.bat / stopCMS.sh
├── doc/                              # Javadoc
├── pom.xml
├── .classpath
└── .project
```

---

## 3. Module Description

### 3.1 Controller Layer

#### AdminController.java
Main administrative controller handling:
- `/admin/setting/*` - Dashboard layout and widget management
- `/admin/cms/*` - CMS site management
- `/admin/ipam/*` - IP Address Management
- Theme-based routing (setting/ vs setting2/)

#### HTBackendRestController.java
REST API controller for backend operations

#### WidgetDataProviderRestController.java
REST API for widget data provisioning

#### WebSocketController.java
Real-time communication support

#### DefaultController.java
Default routing and main page handling

### 3.2 Service Layer

#### HTBackendService (Interface + Impl)
Core business logic for:
- Widget management
- Layout management
- Site tree management
- Product/Manufacturer management
- User management
- Network/IPAM management
- Connection diagram
- Alarm monitoring

#### WidgetDataProviderService
Widget data provider service

### 3.3 Domain Objects

| Domain Class | Description |
|--------------|-------------|
| UserVO | General user |
| SystemUserVO | System administrator |
| EndUserVO | End user/terminal user |
| CMSSiteVO | CMS site information |
| NetworkVO | Network segment |
| IPAddressVO | IP address |
| EntityVO | Physical entity (device, rack, etc.) |
| InterfaceVO | Network interface |
| SiteTreeVO | Site tree structure |
| MainPageLayoutVO | Dashboard layout |
| MainPageWidgetVO | Dashboard widget |
| MapWidgetVO | Map widget |
| WidgetParam | Widget parameters |

### 3.4 Security

- **Authentication**: Spring Security with BCrypt password encoding
- **Authorization**: Role-based access control
- **Session**: Remember-me functionality
- **Public Resources**: CSS, JS, images, static resources (permitAll)
- **Protected Resources**: `/admin/**` requires Administrator role

---

## 4. API Endpoints

### Authentication
| Method | Path | Description |
|--------|------|-------------|
| GET | /login | Login page |
| POST | /login-process | Login processing |
| GET | /logout | Logout |

### Admin - Setting
| Method | Path | Description |
|--------|------|-------------|
| GET | /admin/setting/adminsysuser | System user management |
| GET | /admin/setting/new | Create new layout |
| GET | /admin/setting/modify | Modify layout |
| GET | /admin/setting/map-list | Map widget list |
| GET | /admin/setting/manage-layout | Manage layout |
| GET | /admin/setting/manage-widget | Manage widget |
| GET | /admin/setting/preview-layout | Preview layout |

### Admin - CMS
| Method | Path | Description |
|--------|------|-------------|
| GET | /admin/cms/setting | CMS settings |
| GET | /admin/cms/siteset | Site settings |
| GET | /admin/cms/view | View site |
| GET | /admin/cms/new | Create new site |
| GET | /admin/cms/modifySite | Modify site |
| GET | /admin/cms/catalog | Product catalog |
| GET | /admin/cms/regions | Region management |
| GET | /admin/cms/manufacturer | Manufacturer management |
| GET | /admin/cms/adminAuth | Authorization management |
| GET | /admin/cms/linkage | Connection management |

### Admin - IPAM
| Method | Path | Description |
|--------|------|-------------|
| GET | /admin/ipam/setting | IPAM settings |
| GET | /admin/ipam/user | User IP management |
| GET | /admin/ipam/adminNetwork | Network administration |

---

## 5. Database Configuration

### Connection Pool
- **Type**: HikariCP
- **Driver**: PostgreSQL 42.2.2.jre7
- **Configuration**: database.properties (externalized)

### ORM
- **Type**: MyBatis
- **Mapper**: XML-based SQL mapping

---

## 6. Build & Deployment

### Build
```bash
mvn clean package
```

### Run
```bash
# Windows
target\startCMS.bat

# Linux
sh target/startCMS.sh
```

### Stop
```bash
# Windows
target\stopCMS.bat

# Linux
sh target/stopCMS.sh
```

---

## 7. Features

### Core Features
1. **Cable Management System (CMS)**
   - Site management
   - Building/Floor/Room hierarchy
   - Patch panel management
   - Connection tracking

2. **Dashboard & Widgets**
   - Customizable dashboard layouts
   - Line Chart, Pie Chart, Gauge Chart
   - Alarm Grid Table
   - Availability Grid Table
   - Map Widget
   - 3D Rack View (DCIM)

3. **IP Address Management (IPAM)**
   - IP address allocation
   - Network segment management
   - L2/L3 switch management
   - Gateway configuration

4. **Real-time Monitoring**
   - WebSocket-based updates
   - Alarm status monitoring
   - Port status monitoring

5. **User Management**
   - System user administration
   - End user management
   - Role-based access control (RBAC)

6. **Theme Support**
   - Bright theme
   - Dark theme

---

## 8. Configuration Files

### application.properties
Spring Boot main configuration

### database.properties
Database connection configuration (externalized)

### config.properties
Application runtime configuration (in target/)

### LicensedMac
License MAC address for hardware binding

---

## 9. Dependencies Summary

| Group | Artifact | Version |
|-------|----------|---------|
| org.springframework.boot | spring-boot-starter-web | 1.4.4.RELEASE |
| org.springframework.boot | spring-boot-starter-security | 1.4.4.RELEASE |
| org.springframework.boot | spring-boot-starter-websocket | 1.4.4.RELEASE |
| org.springframework.boot | spring-boot-starter-thymeleaf | 1.4.4.RELEASE |
| org.mybatis.spring.boot | mybatis-spring-boot-starter | 1.1.1 |
| org.postgresql | postgresql | 42.2.2.jre7 |
| org.projectlombok | lombok | 1.16.8 |
| com.zaxxer | HikariCP | (from parent) |
| org.bouncycastle | bcprov-jdk15on | 1.56 |
| org.bouncycastle | bcpkix-jdk15on | 1.56 |
| org.webjars | bootstrap | 3.3.4 |
| org.webjars | jquery | 1.11.3 |

---

## 10. Notes

- This is a legacy Spring Boot 1.4.x application (Java 7)
- Uses Thymeleaf for server-side rendering
- Two theme versions exist: original (setting/) and v2 (setting2/)
- CMS and IPAM modules with separate UI paths
- Hardware license binding is implemented but currently disabled
- Javadoc documentation available in /doc folder
