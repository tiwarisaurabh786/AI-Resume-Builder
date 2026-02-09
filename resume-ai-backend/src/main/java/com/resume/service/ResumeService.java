package com.resume.service;

import java.util.Map;

public interface ResumeService {
   
	Map<String, Object> generateResumeResponse (String userResumeDescription);
	
}
