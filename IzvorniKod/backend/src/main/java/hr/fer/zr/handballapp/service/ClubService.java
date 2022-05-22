package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.ClubDto;
import hr.fer.zr.handballapp.dto.ClubSaveRequestDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClubService {
    List<ClubDto> getAllClubs();

    List<ClubDto> getCompetitionClubs(Long competitionId);

    ClubDto getClubByClubId(Long clubId);

    ClubDto saveClub(ClubSaveRequestDto clubSaveRequestDto);

    void deleteClub(Long clubId);

}
