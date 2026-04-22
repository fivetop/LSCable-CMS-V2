package com.i52soft.lscable.cms.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {
    private final SimpMessagingTemplate template;

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/traps")
    public void onReceivedMesage(String message){
		JSONObject json = new JSONObject();
		json.put("alarms", message);
        this.template.convertAndSend("/alarms",  json.toString());
    }
}
