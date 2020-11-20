export const Song = ({ currentSong }) => {
    return (
        <div className="song">
            <img src={currentSong.art} alt={currentSong.title} />
            <p className="song-title">{currentSong.title}</p>
            <p className="song-artist">{currentSong.artist}</p>
        </div>
    );
}
