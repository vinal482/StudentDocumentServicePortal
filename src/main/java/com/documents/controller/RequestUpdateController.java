package com.documents.controller;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.documents.model.RequestUpdateLog;
import com.documents.repository.RequestUpdateRepo;

@Controller
@RestController
public class RequestUpdateController {

    @Autowired
    RequestUpdateRepo requestUpdateRepo;

    @GetMapping("/requestUpdate/get")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity <?> getRequestUpdate(@RequestParam String requestId) {
        try {
            return new ResponseEntity<>(requestUpdateRepo.findByRequestId(requestId), null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/requestUpdate/add")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity <?> addRequestUpdate(@RequestBody RequestUpdateLog request) {
        try {
            Timestamp time = new Timestamp(System.currentTimeMillis());
            request.setTime(time);
            requestUpdateRepo.save(request);
            return new ResponseEntity<>(request, null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
}
