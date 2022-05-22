package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.PlayerDto;
import hr.fer.zr.handballapp.model.Player;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.NoSuchElementException;

@Component
public class PlayerMapper implements DefaultMapper<Player, PlayerDto> {
    private static final String DEFAULT_PROFILE_IMAGE = "/images/handballSports.jpg";
    private final ClubNameMapper clubNameMapper;
    private final PositionMapper positionMapper;

    public PlayerMapper(ClubNameMapper clubNameMapper, PositionMapper positionMapper) {
        this.clubNameMapper = clubNameMapper;
        this.positionMapper = positionMapper;
    }

    @Override
    public PlayerDto map(Player player) {
        PlayerDto playerDto = new PlayerDto();
        playerDto.setPlayerId(player.getPlayerId());
        playerDto.setClub(clubNameMapper.map(player.getClub()));
        playerDto.setFirstName(player.getFirstName());
        playerDto.setLastName(player.getLastName());
        playerDto.setImage(player.getImage() == null ? getDefaultImage() : player.getImage());
        playerDto.setDateOfBirth(player.getDateOfBirth());
        playerDto.setHeight(player.getHeight());
        playerDto.setWeight(player.getWeight());
        playerDto.setPreferredHand(player.getPreferredHand());
        playerDto.setOriginCountry(player.getOriginCountry());
        if (player.getPlayerPositions() == null) {
            playerDto.setPositions(new ArrayList<>());
        }
        playerDto.setPositions(positionMapper.mapToList(player.getPlayerPositions()));
        return playerDto;
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
