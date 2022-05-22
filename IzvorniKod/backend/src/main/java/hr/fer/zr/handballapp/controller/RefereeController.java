package hr.fer.zr.handballapp.controller;

import hr.fer.zr.handballapp.dto.RefereeDto;
import hr.fer.zr.handballapp.service.RefereeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/referees")
public class RefereeController {
    private final RefereeService refereeService;

    public RefereeController(RefereeService refereeService) {
        this.refereeService = refereeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<RefereeDto>> getAllReferees() {
        return ResponseEntity.ok(this.refereeService.getAllReferees());
    }

    @GetMapping("/{referee_id}")
    public ResponseEntity<RefereeDto> getReferee(@PathVariable("referee_id") Long refereeId) {
        return ResponseEntity.ok(this.refereeService.getReferee(refereeId));
    }

}
