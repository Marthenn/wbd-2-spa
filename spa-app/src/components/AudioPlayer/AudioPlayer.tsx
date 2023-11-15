import styles from "./audioplayer.module.css";
import { Box, Button, Slider, Typography, styled } from "@mui/material";
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import theme from "../../theme/theme";
import { useEffect, useRef, useState } from "react";

const AudioPlayer = ({
    audio_url,
    duration,
}: {
    audio_url: string;
    duration: number;
}) => {
    const [position, setPosition] = useState(0);
    const [paused, setPaused] = useState(false);
    const audioPlayer = useRef<HTMLAudioElement>(null);

    const TinyText = styled(Typography)({
        fontSize: '0.75rem',
        opacity: 0.38,
        fontWeight: 500,
        letterSpacing: 0.2,
        color: theme.palette.secondary.main,
    });

    useEffect(() => {
        const audio = audioPlayer.current;

        const updateTime = () => {
            if (audio) {
                setPosition(audio.currentTime);
            }
        };

        if (audio) {
            audio.addEventListener("timeupdate", updateTime);
        }

        return () => {
            if (audio) {
                audio.removeEventListener("timeupdate", updateTime);
            }
        };
    }, [audioPlayer]);

    const handlePlayPause = () => {
        setPaused(!paused);

        if (audioPlayer.current) {
            if (paused) {
                audioPlayer.current.pause();
            } else {
                audioPlayer.current.play();
            }
        }
    };

    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const seconds = value - minute * 60;
        const formattedSeconds = seconds.toFixed(2).split(".")[1]; // Keep two digits after the decimal point
        return `${minute}:${formattedSeconds}`;
      }
      

    return (
        <Box className={styles.audioPlayer}>
            <audio ref={audioPlayer} src={audio_url} />
            <Box sx={{ marginRight: 3 }}>
                <Button
                    className={styles.playPauseButton}
                    onClick={handlePlayPause}
                >
                    {paused ? (
                        <PauseCircleFilledRoundedIcon
                            sx={{ fontSize: 60, color: "#FFFFFF" }}
                        />
                    ) : (
                        <PlayCircleFilledWhiteIcon
                            sx={{ fontSize: 60, color: "#FFFFFF" }}
                        />
                    )}
                </Button>
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
                <TinyText>
                    -{formatDuration(duration - position)}
                </TinyText>
            </Box>
        </Box>
    );
};

export default AudioPlayer;
