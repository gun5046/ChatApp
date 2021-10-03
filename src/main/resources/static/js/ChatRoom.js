/**
 * 
 */


	let chatMessage = {
		sender : "",
		message : "",
		room_name : room_name,
		type : ""
	};
    let c_data;
    const video_startBtn = document.getElementById("video_start");
    const muteBtn = document.getElementById('muteBtn');
    const cameraBtn = document.getElementById('cameraBtn');

    let muteFlag = false;
    let cameraFlag = false;

    const myVideo = document.getElementById('myVideo');
	let myStream;



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
    let rtcPeerConnection;
	let sendMsg= document.getElementById('sendMsg');
	let sendBtn = document.getElementById("sendBtn");


	window.onload = function() {


		let socket = new SockJS("/ws/chat");



		let stompClient = Stomp.over(socket);

		stompClient.connect({}, onConnected, connectError);

        video_startBtn.addEventListener("click",getMedia);

        async function getMedia(){
            myStream = await navigator.mediaDevices.getUserMedia({
                audio:false,
                video:true
            })
            myVideo.srcObject=myStream;
            rtcPeerConnection = await new RTCPeerConnection();

            rtcPeerConnection.addEventListener("icecandidate", handleIce);
            rtcPeerConnection.addEventListener("addstream", handleAddStream);

            myStream.getTracks().forEach((track) => rtcPeerConnection.addTrack(track, myStream));
            stompClient.connect({},videoOnConnected(rtcPeerConnection),connectError);

        }

        function handleAddStream(data){
            console.log("got an event");
            console.log(data.stream);
            console.log(myStream);

            let addVideoBox = document.createElement("video");
            let parentTbody = document.getElementById("receivedVideoContainer");
            addVideoBox.style.width = "480px";
            addVideoBox.setAttribute("autoplay",true);
            addVideoBox.srcObject = data.stream;
            parentTbody.appendChild(addVideoBox);
        }

        function handleIce(data){
            if(data.candidate != null){

                c_data = data.candidate.toJSON();
                console.log(c_data);
                c_data.room_name = room_name;
                c_data.sender = sender;
                stompClient.send("/app/ice.send",{"type" : "iceSend"},JSON.stringify(c_data));
            }else{
                console.log("NULL입니다");
            }
        }

        function responseIce(response){

            let resdata = JSON.parse(response.body);
            delete resdata.room_name;
            console.log(resdata);
            if(resdata.sender == sender){
                console.log("myIce");
            }else{
                delete resdata.sender;

                rtcPeerConnection.addIceCandidate(resdata);
                console.log("ice received")
            }

        }

        sendMsg.addEventListener('keydown',function(event){
        	if(event.keyCode==13){
        	    sendMessage(sendMsg.value);
        	}
        })
""
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
            chatMessage.type = "Enter";
			let cmsg= JSON.stringify(chatMessage);


			stompClient.send("/app/chat.send",{"Type" : "Enter"},cmsg);// send 파라미터 : 1. 매핑url, 2. header정보(content-type 등) 3. 보낼 message
			console.log("보냄");
		}

        async function videoOnConnected(rtcPeerConnection){ //개별 id 부여 id가 내 id와 동일할시 받지않음
            console.log("iceConnected");
            stompClient.subscribe("/topic/ice/"+room_name, responseIce);
            console.log("비디오 보냄");
            const offer = await rtcPeerConnection.createOffer();
            rtcPeerConnection.setLocalDescription(offer);
            await stompClient.subscribe("/topic/video/"+room_name, responseVideo);

            let s_offer = JSON.stringify(offer);

            stompClient.send("/app/video.send",headers = {"Type":"Offer"}, body = room_name+"/" + sender + "/" +s_offer);

        }

        async function responseVideo(response){
            console.log("비디오 받음");
            let v_sender = response.body.substring(0, response.body.indexOf("/"));
            console.log(v_sender);
            let offer = response.body.substring(response.body.indexOf("/")+1);

            if(v_sender==sender){

            }
            else{
                const responseOffer= JSON.parse(offer);

                rtcPeerConnection.setRemoteDescription(responseOffer);
                if(responseOffer.type=="offer"){
                    const answer = await rtcPeerConnection.createAnswer();
                    rtcPeerConnection.setLocalDescription(answer);

                    stompClient.send("/app/video.send",{"Type":"Answer"},room_name+"/"+sender+"/"+JSON.stringify(answer));
                }
            }
        }
		function sendMessage(msg){
			chatMessage.sender =sender;
			chatMessage.message = msg;
            chatMessage.type = "Chat";
			let cmsg= JSON.stringify(chatMessage);

			stompClient.send("/app/chat.send", {"Type" : "Send"}, cmsg);
			console.log("보냄");

		}


		function connectError() {
			alert("오류");
		}
		function disConnected() {
			console.log("연결이 종료되었습니다.");
		}
		function responseMessage(response) {

			let addSender=document.createElement("td");
			let addMsg =document.createElement("td");
			let parentTbody = document.getElementById("msg_box");
			let addBox=document.createElement("tr");
			let data=JSON.parse(response.body);
			if(data.type=="Enter"){
			    //스타일 변경 중앙정렬
			}
			if(data.sender==sender){
			    console.log("me");
			    //스타일 변경
			}
			addSender.innerHTML = data.sender;
			addMsg.innerHTML = data.message;
			parentTbody.appendChild(addBox);
			parentTbody.appendChild(addSender);
			parentTbody.appendChild(addMsg);

			console.log("수신");
		}
	}



