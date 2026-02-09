package com.resume.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resume.ResumeRequest;
import com.resume.service.ResumeService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/resume")
public class ResumeController {

	@Autowired
	private ResumeService resumeService;
   
	@PostMapping("/generate")
	public ResponseEntity<Map<String, Object>> getResumeData 
	(@RequestBody ResumeRequest resumeRequest)
	{
	   Map<String, Object> jsonObject=this.resumeService.generateResumeResponse(resumeRequest.userDescription());
	   return new ResponseEntity<>(jsonObject,HttpStatus.OK);
	}
}
