package com.prioritcare.service;

import com.prioritcare.dto.PriorityAssessmentDTO;
import org.springframework.stereotype.Service;

@Service
public class PriorityService {

    public String assessPriority(PriorityAssessmentDTO dto) {
        int score = dto.getUrgencyScore();

        String level;
        if (score >= 8) {
            level = "HIGH";
        } else if (score >= 5) {
            level = "MEDIUM";
        } else {
            level = "LOW";
        }

        return "Priority Level: " + level;
    }
}
