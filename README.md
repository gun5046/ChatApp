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
  + 한번에 한 방향으로만 통신이 가능한 반이중(Half-duplex)통신
  + TCP(Transmission Control Protocol)와 UDP(User Datagram Protocol)방식
  + 메세지 구조는 요청 Request 와 응답 Response 로 이루어짐
  + 클라이언트 쪽에서 필요할때 Request를 할때만 서버가 Response를 하는 방식으로 통신
  + 연결을 수행할 때마다 3-way handshakng 기법을 사용(HTTP 1.0)
  + HTML 페이지를 수신받고 완전히 연결을 종료시킴
    + 송수신 과정
    
      ![http송수신](https://user-images.githubusercontent.com/48385816/135965726-bafd7a6f-d374-458d-a64a-6aec0b8937cc.png)
    
    + 세션 연결 과정
    
     
      ![http](https://user-images.githubusercontent.com/48385816/135966281-6eeb731a-69f9-40ab-9a93-38e6de5c4bcf.png)

  
  
  

## Socket통신

+클라이언트와 한 번 연결이 되면 계속 같은 라인을 사용해서 통신

+클라이언트와 서버 서로 Request 가능(연결지향 양방향 전이중 통신)

+클라이언트와 서버가 연결되어 있기 때문에 실시간 통신이 가능
  
  +Socket 통신과정 예시
    
   ![Socket 통신과정](https://user-images.githubusercontent.com/48385816/135966108-ea5f3ef3-4ee1-4533-8c46-1e7045e7f91b.png)

출처 : https://12bme.tistory.com/297

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

 프로젝트에서는 채팅방 입장시 Topic을 생성하며 동시에 구독한다. 이후 다른 참가자들이 입장시 먼저 생성된 Topic을 구독한다.
 
 ###영상
  
  ![ezgif com-gif-maker](https://user-images.githubusercontent.com/48385816/135970023-5b6579f3-3a02-4bdc-b74d-1541e31d1f8d.gif)
  
------------------------------------------------------------------------------------

### 3. WebRTC

+ 웹 어플리케이션(최근에는 Android 및 IOS도 지원) 및 사이트들이 별도의 소프트웨어 없이 음성,
  영상 미디어 혹은 텍스트, 파일 같은 데이터를 브라우져끼리 주고 받을 수 있게 만든 기술
+sad
