import styles from "./audioplayer.module.css";
import { Box, Button, Slider, Typography, styled } from "@mui/material";
import pauseButton from '../../assets/pause-button.svg';
import playButton from '../../assets/play-button.svg';
import theme from "../../theme/theme";
import React from "react";

const AudioPlayer = ({
    audio_url,
    duration,
}: {
    audio_url: string;
    duration: number;
}) => {
    const TinyText = styled(Typography)({
        fontSize: '0.75rem',
        opacity: 0.38,
        fontWeight: 500,
        letterSpacing: 0.2,
        color: theme.palette.secondary.main,
    });
    const [position, setPosition] = React.useState(32);
    const [paused, setPaused] = React.useState(false);
    function formatDuration(value: number) {
      const minute = Math.floor(value / 60);
      const secondLeft = value - minute * 60;
      return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    return (
        <Box className={styles.audioPlayer} >
            <Box sx={{marginRight: 3}}>
                {paused ? ( 
                <Button className={styles.playPauseButton} onClick={() => setPaused(!paused)}>
                    <img src={pauseButton} alt="Pause" />
                </Button>)
                : (
                <Button className={styles.playPauseButton} onClick={() => setPaused(!paused)}>
                    <img src={playButton} alt="Play" />
                </Button>)
                }
            </Box>
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: -2,
                width: 27,
            }}
            >
            <TinyText>{formatDuration(position)}</TinyText>
            </Box>
            <Slider
            aria-label="time-indicator"
            value={position}
            min={0}
            max={duration}
            onChange={(_, value) => setPosition(value as number)}
            sx={{
                color: 'secondary.main',
                width: '80%',
            }}
            />
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: -2,
                width: 27,
            }}
            >
            <TinyText>-{formatDuration(duration - position)}</TinyText>
            </Box>
        </Box>
    );
};

export default AudioPlayer;
