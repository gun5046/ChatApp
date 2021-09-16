/**
 * 
 */


	let chatMessage = {
		sender : "",
		message : "",
		room_name : room_name
	};

    const muteBtn = document.getElementById('muteBtn');
    const cameraBtn = document.getElementById('cameraBtn');

    let muteFlag = false;
    let cameraFlag = false;

    const myVideo = document.getElementById('myVideo');
	    let myStream;

	    async function getMedia(){
		    myStream = await navigator.mediaDevices.getUserMedia({
				audio:false,
				video:true
			})

		myVideo.srcObject=myStream;
    }

    getMedia();


    function handleMuteClick(){
        myStream
        .getAudioTracks()
        .forEach((track)=> (track.enabled = !track.enabled));

        if(!muteFlag){
            muteBtn.innerText="UnMute";
            muteFlag=true;
        }
        else{
            muteBtn.innerText="Mute";
            muteFlag=false;
        }

    }
    function handleCameraClick(){
        myStream
        .getVideoTracks()
        .forEach((track)=> (track.enabled = ! track.enabled));

        if(!cameraFlag){
            cameraBtn.innerText="CameraON";
            cameraFlag = true;
        }
        else{
            cameraBtn.innerText="CameraOFF";
            cameraFlag = false;
        }
    }

    muteBtn.addEventListener("click",handleMuteClick);
    cameraBtn.addEventListener("click", handleCameraClick);

	let sendMsg= document.getElementById('sendMsg');
	let sendBtn = document.getElementById("sendBtn");

    const rtcPeerConnection = new RtcPeerConnection();
    mystre.getTracks().forEach

	window.onload = function() {


		let socket = new SockJS("/ws/chat");



		let stompClient = Stomp.over(socket);

		stompClient.connect({}, onConnected, connectError);

		sendMsg.addEventListener('keydown',function(event){
			if(event.keyCode==13){
				sendMessage(sendMsg.value);
			}
		})

		//onKeyDown(keycode값),  onKeyPress(ASCII값) :  키를누르면 이벤트발생후 문자 입력, onKeyUp : 키를 누르면 문자입력후 이벤트발생
		//keydown : 누르는 순간 발생 keyup : 눌렀다 떼는 순간 발생
		sendBtn.addEventListener('click',function(event){
			console.log(sendMsg.value);
			sendMessage(sendMsg.value);
		})

		function onConnected() {
			stompClient.subscribe('/topic/' + room_name, responseMessage); // subscribe 파라미터 : 1. 구독할 토픽 url 2. 콜백메소드
			chatMessage.sender = sender;
			chatMessage.message = " 님이 입장하였습니다.";

			let cmsg= JSON.stringify(chatMessage);


			stompClient.send("/app/chat.send", {"Type" : "Enter"}, cmsg);// send 파라미터 : 1. 매핑url, 2. header정보(content-type 등) 3. 보낼 message
			console.log("보냄");
		}

		function sendMessage(msg){
			chatMessage.sender =sender;
			chatMessage.message = msg;

			let cmsg= JSON.stringify(chatMessage);

			stompClient.send("/app/chat.send", {"Type" : "Send"}, cmsg);
			console.log("보냄");
			sendMsg.value="";
		}


		function connectError() {
			alert("오류");
		}
		function disConnected() {
			console.log("연결이 종료되었습니다.");
		}
		function responseMessage(response) {
			let addSender=document.createElement("tr");
			let addMsg =document.createElement("tr");
			let parentTbody = document.getElementById("received_msg");
			let data=JSON.parse(response.body);
			addSender.innerHTML = data.sender;
			addMsg.innerHTML = data.message;
			parentTbody.appendChild(addSender);
			parentTbody.appendChild(addMsg);

			console.log("수신");
		}
	}



