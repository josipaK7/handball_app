package hr.fer.zr.handballapp.repository;

import hr.fer.zr.handballapp.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findAll();
    List<Player> findAllByClubClubId(Long clubId);
    List<Player> findAllByClubIsNull();
    Optional<Player> findByPlayerId(Long playerId);

}
