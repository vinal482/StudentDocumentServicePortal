package com.documents.controller;

import com.documents.model.PaymentLogs;
import com.documents.repository.PaymentLogsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class PaymentsLogController {
    @Autowired
    PaymentLogsRepo paymentLogsRepo;

    @PostMapping("/paymentLogs/add")
    public ResponseEntity<?> PaymentLogsAdd(@RequestBody PaymentLogs log) {
        boolean isLogExist = paymentLogsRepo.existsByReferenceNo(log.getReferenceNo());
        if(isLogExist) {
            return new ResponseEntity<>("Already Exist", null, HttpStatus.OK);
        } else {
            paymentLogsRepo.save(log);
            return new ResponseEntity<>(log, null, HttpStatus.OK);
        }
    }
}
