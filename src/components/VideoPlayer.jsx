import ReactPlayer from 'react-player'

const VideoPlayer = ({ src }) => {
    return (
        <div className="video-container">
            <video className="video-player" width="100%" height="auto" controls loop autoPlay playsInline>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
