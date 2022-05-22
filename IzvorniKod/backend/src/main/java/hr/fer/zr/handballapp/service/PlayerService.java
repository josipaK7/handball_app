package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.ClubSaveRequestDto;
import hr.fer.zr.handballapp.dto.PlayerSaveRequestDto;
import hr.fer.zr.handballapp.dto.PlayerDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PlayerService {
    List<PlayerDto> getAllPlayers();

    List<PlayerDto> getClubPlayers(Long clubId);

    List<PlayerDto> getAllFreePlayers();

    PlayerDto getPlayerByPlayerId(Long playerId);

    PlayerDto savePlayer(PlayerSaveRequestDto playerSaveRequestDto);

    void deletePlayer(Long playerId);
}
