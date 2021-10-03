package com.noom.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ChatMessage {
    private String sender;
    private String message;
    private String room_name;
    private String type;

}
