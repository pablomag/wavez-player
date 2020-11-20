import { useState } from "react";

import { LibrarySong } from "./LibrarySong";

export const Library = ({ songs, currentSong, handleSelectSong }) => {
    const [ libraryToggle, setLibraryToggle ] = useState(false);
    const handleToggleLibrary = () => {
        setLibraryToggle(!libraryToggle);
    }
    return (
        <div className={`library-container ${libraryToggle ? "" : "library-folded"}`}>
            <div className="library">
                <h2 className="library-title">Library</h2>
                <div className="library-songs">
                    { songs.map((song) =>
                        <LibrarySong
                            key={song.id}
                            song={song}
                            currentSong={currentSong}
                            handleSelectSong={handleSelectSong}
                        />
                    )}
                </div>
            </div>
            <div className="library-thumb" onClick={handleToggleLibrary}></div>
        </div>
    );
}
