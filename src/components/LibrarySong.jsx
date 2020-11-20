export const LibrarySong = ({ song, currentSong, handleSelectSong }) => {
    return (
        <div className={`library-song ${currentSong === song ? "library-song-selected" : ""}`} onClick={() => handleSelectSong(song)}>
            <div className="library-song-art">
                <img src={song.art} alt={song.title} />
            </div>
            <div className="library-song-info">
                <h3 className="library-song-info-title">{song.title}</h3>
                <h4 className="library-song-info-artist">{song.artist}</h4>
            </div>
        </div>
    );
}
