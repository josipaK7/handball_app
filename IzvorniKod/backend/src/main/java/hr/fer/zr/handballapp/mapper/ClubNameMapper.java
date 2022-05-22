package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.ClubDto;
import hr.fer.zr.handballapp.model.Club;
import org.springframework.stereotype.Component;

@Component
public class ClubNameMapper implements DefaultMapper<Club, ClubDto> {

    @Override
    public ClubDto map(Club club) {
        if (club == null) {
            return null;
        }
        ClubDto clubDto = new ClubDto();
        clubDto.setClubId(club.getClubId());
        clubDto.setName(club.getName());
        return clubDto;
    }
}
