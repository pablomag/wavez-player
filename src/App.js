import { useState, useRef } from "react";

import Songs from "./data/Songs.json";

import "./styles/App.scss";

import { Player } from "./components/Player";
import { Library } from "./components/Library";
import { Song } from "./components/Song";

function App() {
    const audioRef = useRef(null);
    const [songs] = useState(Songs);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        percentage: 0,
    });
    const handleUpdateTime = (event) => {
        const currentTime = event.target.currentTime;
        const duration = event.target.duration;
        const percentage = Math.ceil((currentTime * 100) / duration);
        setSongInfo({
            ...songInfo,
            currentTime,
            duration,
            percentage,
        });
    };
    const handleSelectSong = async (song) => {
        setCurrentSong(song);
        await audioRef.current.load();
        if (isPlaying) {
            audioRef.current.play();
        }
    };
    const handlePlayNextSong = () => {
        const index = songs.findIndex((song) => song === currentSong);
        const nextSong = songs[(index + 1) % songs.length];
        handleSelectSong(nextSong);
    };
    return (
        <div className="App">
            <h1 className="player-title">Wavez Player</h1>
            <Library
                songs={songs}
                currentSong={currentSong}
                handleSelectSong={handleSelectSong}
            />
            <Song currentSong={currentSong} />
            <Player
                audioRef={audioRef}
                songs={songs}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                currentSong={currentSong}
                handleSelectSong={handleSelectSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
            <audio
                onEnded={handlePlayNextSong}
                onLoadedMetadata={handleUpdateTime}
                onTimeUpdate={handleUpdateTime}
                src={currentSong.audio}
                ref={audioRef}
            ></audio>
        </div>
    );
}

export default App;
