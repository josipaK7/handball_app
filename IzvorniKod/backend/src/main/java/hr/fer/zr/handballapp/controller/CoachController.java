package hr.fer.zr.handballapp.controller;

import hr.fer.zr.handballapp.dto.CoachDto;
import hr.fer.zr.handballapp.dto.CoachSelectDto;
import hr.fer.zr.handballapp.service.CoachService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/coaches")
public class CoachController {
    private final CoachService coachService;

    public CoachController(CoachService coachService) {
        this.coachService = coachService;
    }

    @GetMapping("/{coach_id}")
    public ResponseEntity<CoachDto> getClubCoach(@PathVariable("coach_id") Long coachId) {
        return ResponseEntity.ok(this.coachService.getCoach(coachId));
    }

    @GetMapping("/allFreeCoaches")
    public ResponseEntity<List<CoachSelectDto>> getAllFreeCoaches() {
        return ResponseEntity.ok(this.coachService.getAllFreeCoaches());
    }
}
