package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.PositionDto;
import hr.fer.zr.handballapp.mapper.PositionMapper;
import hr.fer.zr.handballapp.model.Position;
import hr.fer.zr.handballapp.repository.PositionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionServiceImpl implements PositionService {
    private final PositionRepository positionRepository;
    private final PositionMapper positionMapper;

    public PositionServiceImpl(PositionRepository positionRepository, PositionMapper positionMapper) {
        this.positionRepository = positionRepository;
        this.positionMapper = positionMapper;
    }

    @Override
    public List<PositionDto> getAllPositions() {
        List<Position> positions = this.positionRepository.findAll();
        return this.positionMapper.mapToList(positions);
    }
}
