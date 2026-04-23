package com.jobportal.controller;

import com.jobportal.model.Application;
import com.jobportal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply/{jobId}")
    public ResponseEntity<Application> apply(
            @PathVariable String jobId,
            @RequestParam(required = false) String resumeUrl,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            applicationService.applyForJob(jobId, userDetails.getUsername(), resumeUrl));
    }

    @GetMapping("/my-applications")
    public ResponseEntity<List<Application>> myApplications(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
            applicationService.getMyApplications(userDetails.getUsername()));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> applicantsForJob(@PathVariable String jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsForJob(jobId));
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Application> updateStatus(
            @PathVariable String applicationId,
            @RequestParam String status) {
        return ResponseEntity.ok(applicationService.updateStatus(applicationId, status));
    }
}
