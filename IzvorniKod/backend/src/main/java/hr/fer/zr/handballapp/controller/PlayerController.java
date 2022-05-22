package hr.fer.zr.handballapp.controller;

import hr.fer.zr.handballapp.dto.PlayerDto;
import hr.fer.zr.handballapp.dto.PlayerSaveRequestDto;
import hr.fer.zr.handballapp.service.PlayerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/players")
public class PlayerController {
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/{player_id}")
    public ResponseEntity<PlayerDto> getPlayerById(@PathVariable("player_id") Long playerId) {
        return ResponseEntity.ok(this.playerService.getPlayerByPlayerId(playerId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<PlayerDto>> getAllPlayers() {
        return ResponseEntity.ok(this.playerService.getAllPlayers());
    }

    @GetMapping("/club/{club_id}")
    public ResponseEntity<List<PlayerDto>> getClubPlayers(@PathVariable("club_id") Long clubId) {
        return ResponseEntity.ok(this.playerService.getClubPlayers(clubId));
    }

    @GetMapping("/allFreePlayers")
    public ResponseEntity<List<PlayerDto>> getAllFreePlayers() {
        return ResponseEntity.ok(this.playerService.getAllFreePlayers());
    }

    @PostMapping("/save")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> savePlayer(@Valid @RequestBody final PlayerSaveRequestDto createRequest) {
        PlayerDto playerDto = playerService.savePlayer(createRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(playerDto);
    }

    @DeleteMapping("/delete/{player_id}")
    @RolesAllowed("ADMIN")
    public ResponseEntity<?> deletePlayer(@PathVariable("player_id") Long playerId) {
        playerService.deletePlayer(playerId);
        return ResponseEntity.ok().build();
    }

}
