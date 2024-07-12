package com.documents.controller;

import java.sql.Timestamp;
// import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.documents.repository.TempRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.documents.model.RequestsDetails;
import com.documents.model.TempRequestDetails;
import com.documents.repository.RequestRepo;
import com.documents.repository.RequestedDocumentRepo;

@Controller
@RestController
public class RequestController {
    @Autowired
    RequestRepo requestRepo;
    @Autowired
    RequestedDocumentRepo requestedDocumentRepo;
    @Autowired
    TempRequestRepo tempRequestRepo;

    @GetMapping("/request/get")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> getRequest(@RequestParam String requestId) {
        return new ResponseEntity<>(requestRepo.findByRequestId(requestId), null, HttpStatus.OK);
        // return "Request";
    }

    @GetMapping("/request/getAll")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> getAllRequest() {
        try {
            return new ResponseEntity<>(requestRepo.findAll(), null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/request/getByStudentId")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> getRequestByStudentId(@RequestParam String studentId) {
        try {
            return new ResponseEntity<>(requestRepo.findByStudentId(studentId), null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/request/add")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> addRequest(@RequestBody TempRequestDetails request) {
        try {
            String studentId = request.getStudentId();
            LocalDateTime now = LocalDateTime.now();
            Timestamp time = Timestamp.valueOf(now);
            String datePart = now.format(DateTimeFormatter.ofPattern("yyddMMHHmm"));
            String requestId = datePart + studentId.substring(studentId.length() - 5);
            request.setTime(time);
            request.setRequestId(requestId);
            request.setStatus("Pending");
            tempRequestRepo.save(request);
            return new ResponseEntity<>(request, null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/tempRequestStatus/update")
    public ResponseEntity<?> updateStatusOfTempPayment(@RequestBody TempRequestDetails request) {
        try {
            TempRequestDetails oldRequest = tempRequestRepo.findByRequestId(request.getRequestId());
            request.setAmountPaid(oldRequest.getAmountPaid());
            request.setDeliveryMod(oldRequest.getDeliveryMod());
            request.setContactNo(oldRequest.getContactNo());
            request.setStudentId(oldRequest.getStudentId());
            request.setTransactionId(oldRequest.getTransactionId());
            request.setTime(oldRequest.getTime());
            request.setStatus("Successful");
            tempRequestRepo.save(request);
            return new ResponseEntity<>(request, null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error"+ e, null, HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping("/search")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> searchRequest(@RequestParam String query) {
        try {
            boolean isNumeric = query.chars().allMatch(Character::isDigit);
            if (isNumeric) {
                return new ResponseEntity<>(requestRepo.findByRequestId(query), null, HttpStatus.OK);
            }
            boolean ewxistBystudentId = requestRepo.existStudentId(query);
            if (ewxistBystudentId) {
                return new ResponseEntity<>(requestRepo.findByStudentId(query), null, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, null, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/request/status/update")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> updateRequestStatus(@RequestBody RequestsDetails request) {
        try {
            RequestsDetails requestOp = requestRepo.findByRequestId(request.getRequestId());
            requestOp.setStatus(request.getStatus());
            if(request.getRemarks() != null) {
                requestOp.setRemarks(request.getRemarks());
            }
            requestRepo.save(requestOp);
            return new ResponseEntity<>(requestOp, null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/request/getbystatus")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> getRequestByStatus(@RequestParam String status) {
        try {
            return new ResponseEntity<>(requestRepo.findByStatus(status), null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("request/delete")
    public String deleteRequest(@RequestParam String requestId) {
        String res = "";
        try {
            requestRepo.deleteById(requestId);
            res = "delete successfully";
        } catch (Exception e) {
            res = "not found";
        }
        return res;
    }



}
