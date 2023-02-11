
![로고](public/imgs/github_프론트엔드.png)

# IT Monsters

## 🏠 [Home Page](https://it-monsters.co.kr/) / [Youtube](https://youtu.be/iyCul1aOxAE)
- 사이드 프로젝트  플랫폼!


## 🎃 서비스 소개

아무나 매칭되는 랜덤 매칭에 지겨우신 프로젝트 팀!
소통이 안되는 팀원에 지쳐버린 프로젝트 팀!
- 필요한 능력을 가진 참가자를 게시글을 통해 모집해보세요! 
- 팀장님께서는 참가신청을 통해 요청한 사람의 전문성을 확인하고 능력을 갖춘 분이라면
 수락을 통해 팀으로 합류가 가능합니다!

내 능력을 제대로 발휘할 수 있는 팀을 찾고 싶은 개발자!
기가막힌 아이디어를 찾아 도전하고 싶은 개발자!
- 자신의 기록들을 공유하고 전문성을 뽐내보세요.
- 마음에 드는 모집 게시글을 저장하고 참여하고 완료한 프로젝트는 기록으로 남길수 있어요!

IT몬스터즈와 함께 팀을 꾸리고 프로젝트의 세계로 모험을 떠나보세요🏃‍♂️🏃
 
## 🗓️ 프로젝트 기간
2022년 8월 28일 ~2022 년 10월 8일

## 우리팀 소개

**`Front-End`** 
- 노진서(Vice Leader) 원중희 황태영
  
**`Back-End`**
- 전지만(Project Leader) 이원규 이동규 김진무

**`UI-UX Design`**
- 윤정아

**`Marketing Design`**
- 김소정



## ****⭐️ 팀 구성****
<div> 

| 이름   | 팀원 깃허브                    | 포지션    |
| ------ | ------------------------------ | --------- |
| 노진서 | https://github.com/bennoholik  | Front-end |
| 원중희 | https://github.com/wndgml13    | Front-end |
| 황태영 | https://github.com/hty0525     | Front-end |
| 전지만 | https://github.com/Camof1ow    | Back-end  |
| 김진무 | https://github.com/kimjinmoo91 | Back-end  |
| 이원규 | https://github.com/oneqrhee    | Back-end  |
| 이동규 | https://github.com/dds1q       | Back-end  |
| 윤정아 |                                | UI/UX     |

</div>

## 🛠 기술스택
<div > 
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=ffffff">
  <img src="https://img.shields.io/badge/react-282C34?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=PWA&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
    <img src="https://img.shields.io/badge/Recoil-2E77BC?style=for-the-badge&logo=Recoil&logoColor=white"> 

  <br>
   <img src="https://img.shields.io/badge/GitHub%20Actions-232F3E?style=for-the-badge&logo=GitHubActions&logoColor=2088FF"/>
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
  <br/>
 <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white">
 <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
<img src="https://img.shields.io/badge/CloudFront-D05C4B?style=for-the-badge&logo=Amazon AWS&logoColor=white">
</div>

<br/>

## 🛠기술 스택 도입 배경

**TypeScript**

- 코드 작성시 형변환에 관련한 오류를 명확한 타입 지정을 통해 미리 예방 가능하므로 생산성의 향상을 도모하기 위해 도입하였습니다.

**ReactQuery**

- 각 페이지 별로 필요한 데이터를 바로 가지고 올수있어서 상태관리가 필요없는 컴포넌트에 한하여 리엑트 쿼리를 적용하여 처리할 수 있도록 하였습니다.

**Recoil**

- 다른 전역 상태 관리 툴인 Redux에 비해  리소스를 덜 사용하며 렌더링시의 부담을 덜고 안정적인 전역상태관리를 위하여 도입하게 되었습니다.

**Tailwind CSS**

- 코드의 가독성과 적응 하는데에 시간이 걸리긴 하였지만, Tailwind CSS의 Utility-First 컨셉 덕분에  편리하고 쉽고 빠르게 원하는 디자인을 개발할수 있어서 도입하게 되었습니다.

<br>

## 🛠 트러블 슈팅
1. **✔️WEB socket 호출 이슈**

      채팅방에서 채팅입력창에 입력할때마다 웹소켓이 계속 호출되는 이슈
      
      `문제확인`
      
      채팅방에 들어갈때, 채팅 입력을 할때마다 계속해서 리렌더링이 되면서 web socket을 호출되는 것이라고 판단하였다.
      
      `방법도출`
      
      1. useRef를 이용하여 엔터를 입력했을 경우와 전송 버튼눌렀을 때만 web socket이 호출 되게 만들어서 웹소켓 호출 빈도를 줄였다.
      2. 하지만 여전히 채팅을 보낼때마다 웹소켓이 호출된다는 것 잘못된 방식이라고 판단하였다.
      3. 처음 채팅을 도입 시도할때 로직을 보면 채팅 방에 입장할때마다 SockJs에 연결하고 구독하고 구독해제 하는 방식을 쓰고 있었다.
      4. 로그인 후 바로 웹소켓을 연결하고 채팅방들어갈때마다 구독하는 방식으로 변경하였다.

<br>

## 🔎 주요기능

<br/>

**팀원 모집 게시글 작성**


<img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(1).png" alt="drawing" width="250"/> <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(2).png" alt="drawing" width="250"/>

  모집 게시글 작성시 원하는 기술 스택과 함께 필요한 인원을 설정하여 참여할 인원들이 프로젝트 내용에 대해 확인 할 수 있도록 합니다.

---

**모집 요청 시 알림과 팀원**


 <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(3).png" alt="drawing" width="250"/>  <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(4).png" alt="drawing" width="250"/>  <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(6).png" alt="drawing" width="250"/>

- 요청된 게시글에 지원요청을 알림을 통해 확인이 가능하며 개인페이지의 참여자의 보유 기술 스택 및 포트폴리오 확인 가능합니다.
- 게시글 작성자는 확인한 정보를 통해 승인과 거절을 할 수 있습니다.

---


**실시간 채팅기능**


 <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(8).png" alt="drawing" width="250"/>  <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(9).png" alt="drawing" width="250"/>

- 승인을 통해 가입된 팀원은 채팅창에 참여할 수 있습니다.
- 참가중인 멤버를 확인 할 수 있고 프로필을 통해 참가중인 멤버의 개인 페이지와 보유 기술스택 포트폴리오등을 확인 가능합니다.
- 나가기 버튼을 통해 프로젝트팀에서의 도중하차 결정을 내릴 수 있습니다.

---

**게시글 검색기능 및 필터**

 <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(12).png" alt="drawing" width="250"/>  <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(10).png" alt="drawing" width="250"/>  <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(11).png" alt="drawing" width="250"/>

- 적용된 필터를 통한 빠른 검색이 가능합니다.

 <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(13).png" alt="drawing" width="250"/> <img src="./readme/it-monsters.co.kr_(iPhone_12_Pro)_(14).png" alt="drawing" width="250"/>

- 제목으로 모집 게시글 검색이 가능합니다.
















