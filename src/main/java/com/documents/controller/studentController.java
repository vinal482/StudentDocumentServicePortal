package com.documents.controller;

import com.documents.EmailSenderService;
import com.documents.model.StudentDetails;
import com.documents.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RestController
@CrossOrigin(origins = "http://192.168.56.1:3000")
 class StudentController {

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    StudentRepository userRepository;


//    @PostMapping("/login")
//    public ResponseEntity<StudentDetails> createUser(@RequestBody StudentDetails studentDetails)
//    {
//        boolean f =userService.checkId(studentDetails.getStudentId());
//        if(f)
//        {
//            studentDetails.setEmailId(studentDetails.getEmailId());
//            studentDetails.setName(studentDetails.getName());
//        }
//        else {
//            StudentDetails studentDetails1 = userService.createUser(studentDetails);
//            return new ResponseEntity<>(studentDetails1, HttpStatus.OK);
//        }
//
//
//    }

    @GetMapping("/email/send")
    public String sendMail() {
        try {
            emailSenderService.sendEmail("karanhpadhiyar12345@gmail.com", "Hi this is test mail", "HI this is test mail");
            return "Mail sent successfully";
        } catch (Exception e) {
            return "Error Occurred: " + e;
        }
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> addStudent(@RequestBody StudentDetails student) {
        try {
            boolean f = userRepository.existsById(student.getStudentId());
            if(f)
            {
                student.setName(student.getName());
                student.setEmailId(student.getEmailId());
                userRepository.save(student);
                return new ResponseEntity<>(student, null, HttpStatus.OK);
            } else {
                userRepository.save(student);
                return new ResponseEntity<StudentDetails>(student, null, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

//    @PutMapping("/student/{id}")
//    public ResponseEntity<?> updateById(@PathVariable("id") int id, @RequestBody StudentDetails student) {
//        try {
//            boolean f = userService.checkId(id);
//            if(f)
//             {
//                student.setName(student.getName());
//                student.setEmailId(student.getEmailId());
//                userRepository.save(student);
//                return new ResponseEntity<>(student, null, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>("No Student found with id: " + id, null, HttpStatus.NOT_FOUND);
//            }
//        } catch (Exception e) {
//            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }



}
