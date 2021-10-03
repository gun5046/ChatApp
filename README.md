# Facing and Chat App

### 이 프로젝트는 화상 및 메시지 채팅 페이지를 위한 프로젝트입니다.
```

  + SpringBoot
  
  + Thymeleaf
  
  + Htlm
  
  + JavaScript
  
```

채팅 기능을 위해 Stomp(Simple/Stream Text Oriented Message Template) 메시징 프로토콜을 사용.

화상 채팅 기능을 위해 WebRTC API를 사용.

-------------------------------------------------------------------------------

### 1. Socket 통신


## + 먼저 알아보자 HTTP(HyperText Transfer Protocol) 

  + HyperText를 전송하기 위한 프로토콜(클라이언트와 서버 간 데이터를 주고 받기 위한 프로토콜)
  + TCP(Transmission Control Protocol)와 UDP(User Datagram Protocol)방식
  + 메세지 구조는 요청 Request 와 응답 Response 로 이루어짐
  + 통신과정
  ----- 그림 -------
  
  1.
  
  
  
  

### + Socket통신
  
  +

--------------------------------------------------------------------

### 2. Stomp(Simple/Stream Text Oriented Message Template)

+ STOMP는 HTTP에서 모델링 되는 Frame 기반 프로토콜

  + 웹상에서 쉽게 소켓통신을 하게 해주는 라이브러리
  + 메세징 전송을 효율적으로 하기 위해 탄생한 프로토콜
  + 클라이언트와 서버가 전송할 메시지의 유형, 형식, 내용들을 정의하는 메커니즘
  + 텍스트 기반 프로토콜으로 subscriber, sender, broker를 따로 두어 처리를 한다.
  + 채팅방 생성: pub/sub 구현을 위한 Topic 생성
  + 채팅방 입장: Topic 구독
  + 채팅방에서 메세지를 송수신: 해당 Topic으로 메세지를 송신(pub), 메세지를 수신(sub)

------------------------------------------------------------------------------------

### 3. WebRTC


