package com.noom.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.noom.server.repository.ChatRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {

	private final ChatRepository chatRepository;

	public void makeRoom(String room_name) {
		chatRepository.makeRoom(room_name);
	}

	public List<String> getRoomList() {
		return chatRepository.getRoomList();
	}

}
