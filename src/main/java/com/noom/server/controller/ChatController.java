package com.noom.server.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.RedirectView;

import com.noom.server.dto.RoomDto;
import com.noom.server.model.ChatMessage;
import com.noom.server.service.ChatService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/msg")
public class ChatController {

	private final ChatService chatService;

	private final SimpMessagingTemplate simpMessagingTemplate;



	@GetMapping()
	public ModelAndView getRoomList() {

		ModelAndView mav = new ModelAndView();

		mav.setViewName("Chat");
		mav.addObject("RoomDto", new RoomDto());
		mav.addObject("room_list", chatService.getRoomList());
		System.out.println(chatService.getRoomList());
		return mav;
	}

	@GetMapping("/room/new")
	public ModelAndView makeRoom() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("MakeRoom");
		return mav;
	}

	@GetMapping("/room/new/room-name")
	public RedirectView completeRoomMaking(@RequestParam("room-name") String room_name) {
		System.out.println(room_name);
		chatService.makeRoom(room_name);
		return new RedirectView("http://localhost:8080/msg");
	}

	@PostMapping("/chat")
	public ModelAndView enterRoom(RoomDto roomdto) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("ChatRoom");
		mav.addObject("RoomDto", new RoomDto());
		mav.addObject("user_id", roomdto.getUser_id());
		mav.addObject("room_name", roomdto.getRoom_name());
		System.out.println(roomdto.getUser_id());
		System.out.println(roomdto.getRoom_name());
		return mav;
	}

	@MessageMapping("/chat.send")
	public void enterNewUser(@ModelAttribute ChatMessage chatmessage) {

		simpMessagingTemplate.convertAndSend("/topic/" + chatmessage.getRoom_name(), chatmessage);
	}

}
