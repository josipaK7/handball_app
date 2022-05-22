package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.ClubDto;
import hr.fer.zr.handballapp.dto.CoachDto;
import hr.fer.zr.handballapp.model.Coach;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.NoSuchElementException;

@Component
public class CoachMapper implements DefaultMapper<Coach, CoachDto> {
    private static final String DEFAULT_PROFILE_IMAGE = "/images/coach.jpg";
    private final CoachRoleMapper coachRoleMapper;

    public CoachMapper(CoachRoleMapper coachRoleMapper) {
        this.coachRoleMapper = coachRoleMapper;
    }

    @Override
    public CoachDto map(Coach coach) {
        CoachDto coachDto = new CoachDto();
        coachDto.setCoachId(coach.getCoachId());
        ClubDto clubDto = new ClubDto();
        clubDto.setClubId(coach.getClub().getClubId());
        clubDto.setName(coach.getClub().getName());
        coachDto.setClub(clubDto);
        coachDto.setCoachRole(coachRoleMapper.map(coach.getCoachRole()));
        coachDto.setFirstName(coach.getFirstName());
        coachDto.setLastName(coach.getLastName());
        coachDto.setImage(coach.getImage() == null ? getDefaultImage() : coach.getImage());
        coachDto.setOriginCountry(coach.getOriginCountry());
        return coachDto;
    }

    public byte[] getDefaultImage() {
        try {
            BufferedImage bufferedImage = ImageIO.read(getClass().getResource(DEFAULT_PROFILE_IMAGE));
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "jpg", byteArrayOutputStream);
            byte[] bytesImage = byteArrayOutputStream.toByteArray();
            byteArrayOutputStream.close();
            return bytesImage;
        } catch (IOException exception) {
            throw new NoSuchElementException();
        }
    }

}
