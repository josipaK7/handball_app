package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.ClubDto;
import hr.fer.zr.handballapp.model.Club;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.NoSuchElementException;

@Component
public class ClubLogoMapper implements DefaultMapper<Club, ClubDto> {
    private static final String DEFAULT_PROFILE_IMAGE = "/images/handballSports.jpg";

    @Override
    public ClubDto map(Club club) {
        if (club == null) {
            return null;
        }
        ClubDto clubDto = new ClubDto();
        clubDto.setClubId(club.getClubId());
        clubDto.setName(club.getName());
        clubDto.setImage(club.getImage() == null ? getDefaultImage() : club.getImage());
        return clubDto;
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
