package hr.fer.zr.handballapp.controller;

import hr.fer.zr.handballapp.dto.MatchSaveRequestDto;
import hr.fer.zr.handballapp.dto.MatchDto;
import hr.fer.zr.handballapp.service.MatchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/matches")
public class MatchController {
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/competition/{competition_id}/played")
    public ResponseEntity<List<MatchDto>> getPlayedMatches(@PathVariable("competition_id") Long competitionId) {
        return ResponseEntity.ok(this.matchService.getPlayedMatchesByCompetitionId(competitionId));
    }

    @GetMapping("/competition/{competition_id}/scheduled")
    public ResponseEntity<List<MatchDto>> getScheduledMatches(@PathVariable("competition_id") Long competitionId) {
        return ResponseEntity.ok(this.matchService.getScheduledMatchesByCompetitionId(competitionId));
    }

    @PostMapping("/save/played")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> savePlayedMatch(@Valid @RequestBody final MatchSaveRequestDto createRequest) {
        MatchDto matchDto = matchService.savePlayedMatch(createRequest);
        return ResponseEntity.status(createRequest.getMatchId() == null ? HttpStatus.CREATED : HttpStatus.OK).body(matchDto);
    }

    @DeleteMapping("/delete/played/{match_id}")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> deletePlayedMatch(@PathVariable("match_id") Long matchId) {
        matchService.deleteMatch(matchId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/save/scheduled")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> saveScheduledMatch(@Valid @RequestBody final MatchSaveRequestDto createRequest) {
        MatchDto matchDto = matchService.saveScheduledMatch(createRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(matchDto);
    }

    @DeleteMapping("/delete/scheduled/{match_id}")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> deleteScheduledMatch(@PathVariable("match_id") Long matchId) {
        matchService.deleteMatch(matchId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/referee/{referee_id}")
    public ResponseEntity<List<MatchDto>> getMatchesByReferee(@PathVariable("referee_id") Long refereeId) {
        return ResponseEntity.ok(this.matchService.getMatchesByReferee(refereeId));
    }

}

