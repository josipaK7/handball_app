package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.PositionDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PositionService {
    List<PositionDto> getAllPositions();
}
