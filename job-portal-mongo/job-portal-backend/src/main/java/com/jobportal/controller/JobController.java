package com.jobportal.controller;

import com.jobportal.dto.JobRequest;
import com.jobportal.model.Job;
import com.jobportal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable String id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<Job> postJob(@RequestBody JobRequest request,
                                       @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(jobService.postJob(request, userDetails.getUsername()));
    }

    @GetMapping("/my-jobs")
    public ResponseEntity<List<Job>> getMyJobs(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(jobService.getJobsByEmployer(userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable String id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok("Job deleted");
    }
}
