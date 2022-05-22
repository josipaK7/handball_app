package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.PlayerSaveRequestDto;
import hr.fer.zr.handballapp.dto.PlayerDto;
import hr.fer.zr.handballapp.exceptions.ResourceNotFoundException;
import hr.fer.zr.handballapp.mapper.PlayerLogoMapper;
import hr.fer.zr.handballapp.mapper.PlayerMapper;
import hr.fer.zr.handballapp.mapper.PlayerNameMapper;
import hr.fer.zr.handballapp.model.Club;
import hr.fer.zr.handballapp.model.Player;
import hr.fer.zr.handballapp.repository.ClubRepository;
import hr.fer.zr.handballapp.repository.PlayerRepository;
import hr.fer.zr.handballapp.repository.PositionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepository playerRepository;
    private final PositionRepository positionRepository;
    private final PlayerMapper playerMapper;
    private final PlayerLogoMapper playerLogoMapper;
    private final PlayerNameMapper playerNameMapper;
    private final ClubRepository clubRepository;
    Logger logger = LoggerFactory.getLogger(PlayerServiceImpl.class);

    public PlayerServiceImpl(PlayerRepository playerRepository, PlayerMapper playerMapper,
                             PositionRepository positionRepository, PlayerLogoMapper playerLogoMapper, PlayerNameMapper playerNameMapper, ClubRepository clubRepository) {
        this.playerRepository = playerRepository;
        this.playerMapper = playerMapper;
        this.positionRepository = positionRepository;
        this.playerLogoMapper = playerLogoMapper;
        this.playerNameMapper = playerNameMapper;
        this.clubRepository = clubRepository;
    }

    @Override
    public List<PlayerDto> getAllPlayers() {
        List<Player> players = this.playerRepository.findAll();
        return playerLogoMapper.mapToList(players);
    }

    @Override
    public List<PlayerDto> getClubPlayers(Long clubId) {
        List<Player> players = this.playerRepository.findAllByClubClubId(clubId);
        return playerNameMapper.mapToList(players);
    }

    @Override
    public List<PlayerDto> getAllFreePlayers() {
        List<Player> players = playerRepository.findAllByClubIsNull();
        return playerMapper.mapToList(players);
    }

    @Override
    public PlayerDto getPlayerByPlayerId(Long playerId) {
        Optional<Player> playerOptional = this.playerRepository.findByPlayerId(playerId);
        if (playerOptional.isEmpty()) {
            throw new ResourceNotFoundException(String.format("Igrač s id %d ne postoji", playerId));
        }
        return playerMapper.map(playerOptional.get());
    }

    @Override
    public PlayerDto savePlayer(PlayerSaveRequestDto playerSaveRequestDto) {
        logger.info("Pozvan je save player " + playerSaveRequestDto.getPlayerId());
        Player player;
        if (playerSaveRequestDto.getPlayerId() != null) {
            logger.info("LOGGER igrač postoji vec, treba ga updateati " + playerSaveRequestDto.getPlayerId());
            // Update
            Optional<Player> playerOptional = playerRepository.findByPlayerId(playerSaveRequestDto.getPlayerId());
            if (playerOptional.isEmpty()) {
                throw new ResourceNotFoundException(String.format("Igrač s id %d ne postoji", playerSaveRequestDto.getPlayerId()));
            }
            player = playerOptional.get();
        } else {
            // Create
            player = new Player();
        }

        player.setFirstName(playerSaveRequestDto.getFirstName());
        player.setLastName(playerSaveRequestDto.getLastName());
        player.setImage(playerSaveRequestDto.getImage());
        player.setDateOfBirth(playerSaveRequestDto.getDateOfBirth());
        player.setHeight(playerSaveRequestDto.getHeight());
        player.setWeight(playerSaveRequestDto.getWeight());
        player.setOriginCountry(playerSaveRequestDto.getOriginCountry());

        Optional<Club> clubOptional = clubRepository.findByClubId(playerSaveRequestDto.getClub());
        if (clubOptional.isEmpty()) {
            player.setClub(null);
            //throw new ResourceNotFoundException(String.format("Klub s id %d ne postoji", playerSaveRequestDto.getClub()));
        } else {
            player.setClub(clubOptional.get());
        }

        player.setPlayerPositions(positionRepository.findAllByPositionIdIsIn(playerSaveRequestDto.getPositions()));

        player.setPreferredHand(playerSaveRequestDto.getPreferredHand());

        return playerMapper.map(playerRepository.save(player));
    }

    @Override
    public void deletePlayer(Long playerId) {
        Optional<Player> player = playerRepository.findByPlayerId(playerId);
        if (player.isPresent()) {
            playerRepository.delete(player.get());
        } else {
            throw new ResourceNotFoundException("Ne možete obrisati igrača koji ne postoji");
        }
    }
}
