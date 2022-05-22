package hr.fer.zr.handballapp.controller;

import hr.fer.zr.handballapp.dto.ClubTableEntryDto;
import hr.fer.zr.handballapp.service.ClubTableEntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/clubTableData")
public class ClubTableEntryController {

    private final ClubTableEntryService clubTableEntryService;

    public ClubTableEntryController(ClubTableEntryService clubTableEntryService) {
        this.clubTableEntryService = clubTableEntryService;
    }

    @GetMapping("/{competition_id}")
    public ResponseEntity<List<ClubTableEntryDto>> getClubTableData(@PathVariable("competition_id") Long competitionId) {
        return ResponseEntity.ok(this.clubTableEntryService.getTableEntries(competitionId));
    }

}
