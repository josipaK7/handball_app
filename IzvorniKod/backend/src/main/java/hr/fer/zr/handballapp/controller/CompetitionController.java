package hr.fer.zr.handballapp.controller;

import hr.fer.zr.handballapp.dto.CompetitionSaveRequestDto;
import hr.fer.zr.handballapp.dto.CompetitionDto;
import hr.fer.zr.handballapp.service.CompetitionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/competitions")
public class CompetitionController {
    private final CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping("/{competition_id}")
    public ResponseEntity<CompetitionDto> getCompetitionById(@PathVariable("competition_id") Long competitionId) {
        return ResponseEntity.ok(this.competitionService.getCompetitionById(competitionId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CompetitionDto>> getAllCompetitions() {
        return ResponseEntity.ok(this.competitionService.getAllCompetitions());
    }

    @PostMapping("/save")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> saveCompetition(@Valid @RequestBody final CompetitionSaveRequestDto saveRequestDto) {
        CompetitionDto competitionDto = competitionService.saveCompetition(saveRequestDto);
        return ResponseEntity.status(saveRequestDto.getCompetitionId() == null ? HttpStatus.CREATED : HttpStatus.OK).body(competitionDto);
    }

    @DeleteMapping("/delete/{competition_id}")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> deleteCompetition(@PathVariable("competition_id") Long competitionId) {
        competitionService.deleteCompetition(competitionId);
        return ResponseEntity.ok().build();
    }
}
