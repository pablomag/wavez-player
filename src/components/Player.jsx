import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import { formatTime } from "../common/formatTime";

export const Player = ({ audioRef, songs, songInfo, setSongInfo, currentSong, handleSelectSong, isPlaying, setIsPlaying }) => {
    const handlePlaySong = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };
    const handlePauseSong = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };
    const handleNextSong = async () => {
        let nextSong;
        for (const [index, song] of songs.entries()) {
            if (currentSong.id === song.id) {
                const nextSongIndex = (index + 1) % songs.length;
                nextSong = songs[nextSongIndex];
            }
        }
        handleSelectSong(nextSong);
    }
    const handlePreviousSong = async () => {
        let prevSong;
        for (const [index, song] of songs.entries()) {
            if (currentSong.id === song.id) {
                const prevSongIndex = (songs.length - 1 + index) % songs.length;
                prevSong = songs[prevSongIndex];
            }
        }
        handleSelectSong(prevSong);
    };
    const handleDragTime = (event) => {
        const currentTime = event.target.value;
        audioRef.current.currentTime = currentTime;
        setSongInfo({ ...songInfo, currentTime });
    };
    return (
        <div className="player">
            <div className="time-controls">
                <p className="time">{ formatTime(songInfo.currentTime) }</p>
                <div className="track"
                     style={{
                        background: `linear-gradient(
                            to right,
                            ${currentSong.colors.primary} 0%,
                            ${currentSong.colors.secondary} 50%,
                            ${currentSong.colors.tertiary} 100%
                        )`
                     }}>
                    <input
                        onChange={handleDragTime}
                        min={0}
                        max={songInfo.duration | 0}
                        value={songInfo.currentTime}
                        type="range"
                    />
                    <div className="animate-track"
                         style={{ transform: `translateX(${songInfo.percentage}%)` }}></div>
                </div>
                <p className="time">{ parseInt(songInfo.duration) > 0 ? formatTime(songInfo.duration) : "-:-" }</p>
            </div>
            <div className="player-controls">
                <FontAwesomeIcon className="fa-icon previous" icon={faAngleLeft} onClick={handlePreviousSong} />
                { !isPlaying ?
                <FontAwesomeIcon className="fa-icon play" icon={faPlay} onClick={handlePlaySong} /> :
                <FontAwesomeIcon className="fa-icon pause" icon={faPause} onClick={handlePauseSong} />
                }
                <FontAwesomeIcon className="fa-icon next" icon={faAngleRight} onClick={handleNextSong} />
            </div>
        </div>
    );
}
