import ReactPlayer from "react-player";

export function MusicPlayer({ songId }) {
    return (
        <div>
            <ReactPlayer
                url={songId}
                config={{
                    soundcloud: {
                        options: { }
                    }
                }}
            />
        </div>
    );
}