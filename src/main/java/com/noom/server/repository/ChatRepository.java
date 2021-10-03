package com.noom.server.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChatRepository {
    private List<String> room_list;

    @PostConstruct
    public void init() {
        room_list = new ArrayList<>();
    }

    public void makeRoom(String room_name) {
        System.out.println(room_name + "생성");
        room_list.add(room_name);
    }

    public List<String> getRoomList() {
        return room_list;
    }
}
