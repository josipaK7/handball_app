package hr.fer.zr.handballapp.repository;

import hr.fer.zr.handballapp.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
    List<Position> findAllByPositionIdIsIn(List<Long> positionIds);
}
