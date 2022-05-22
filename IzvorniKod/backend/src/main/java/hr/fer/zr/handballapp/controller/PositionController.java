package hr.fer.zr.handballapp.controller;

import hr.fer.zr.handballapp.dto.PositionDto;
import hr.fer.zr.handballapp.service.PositionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/positions")
public class PositionController {
    private final PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PositionDto>> getAllPlayers() {
        return ResponseEntity.ok(this.positionService.getAllPositions());
    }
}
