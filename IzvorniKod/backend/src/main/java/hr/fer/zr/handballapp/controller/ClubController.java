package hr.fer.zr.handballapp.controller;

import hr.fer.zr.handballapp.dto.ClubDto;
import hr.fer.zr.handballapp.dto.ClubSaveRequestDto;
import hr.fer.zr.handballapp.service.ClubService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/clubs")
public class ClubController {
    private final ClubService clubService;

    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping("/{club_id}")
    public ResponseEntity<ClubDto> getClubById(@PathVariable("club_id") Long clubId) {
        return ResponseEntity.ok(clubService.getClubByClubId(clubId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ClubDto>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    @GetMapping("/competition/{competition_id}")
    public ResponseEntity<List<ClubDto>> getCompetitionClubs(@PathVariable("competition_id") Long competitionId) {
        return ResponseEntity.ok(clubService.getCompetitionClubs(competitionId));
    }

    @PostMapping("/save")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> saveClub(@Valid @RequestBody final ClubSaveRequestDto createRequest) {
        ClubDto clubDto = clubService.saveClub(createRequest);
        return ResponseEntity.status(createRequest.getClubId() == null ? HttpStatus.CREATED : HttpStatus.OK).body(clubDto);
    }

    @DeleteMapping("/delete/{club_id}")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> deleteClub(@PathVariable("club_id") Long clubId) {
        clubService.deleteClub(clubId);
        return ResponseEntity.ok().build();
    }
}
