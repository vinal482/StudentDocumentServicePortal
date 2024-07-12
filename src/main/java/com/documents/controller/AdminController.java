package com.documents.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.documents.model.AdminDetails;
import com.documents.repository.AdminRepo;

@Controller
@RestController
public class AdminController {

    @Autowired
    AdminRepo adminRepository;

    @PostMapping("/admin/login")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity <?> adminLogin(@RequestBody AdminDetails adminDetails) {
        AdminDetails admin = adminRepository.findByEmailIdAndPassword(adminDetails.getEmailId(), adminDetails.getPassword());
        if (admin != null) {
            return new ResponseEntity<>(admin, null,  HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid", null, HttpStatus.OK);
        }
    }

    @PostMapping("/admin/add")
    public String addAdmin(@RequestBody AdminDetails adminDetails) {
        boolean f = adminRepository.existsById(adminDetails.getAdminId());
        if (f) {
            return "Admin already exists";
        } else {
            adminRepository.save(adminDetails);
            return "Admin added successfully";
        }
    }
}
