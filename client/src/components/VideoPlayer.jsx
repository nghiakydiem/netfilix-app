import "../css/VideoPlayer.css";
import ReactPlayer from "react-player";
import { HiPlus } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { RxSpeakerOff } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { RxSpeakerLoud } from "react-icons/rx";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { MdOutlineDone } from "react-icons/md";
import { useState } from "react";


export default function VideoPlayer({
  movie,
  onClose,
  movieStatus,
  removeMovieInList,
  addMovieToList,
}) {
  const { done, loading } = movieStatus;
  const [videoStatus, setVideoStatus] = useState({
    muted: false,
    playing: false,
  });

  return (
    <div className="videoPlayer">
      <div className="videoPlayer__video">
        <ReactPlayer
          url={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}`}
          width="100%"
          height="27rem"
          muted={videoStatus.muted}
          playing={videoStatus.playing}
        />
      </div>

      <button onClick={onClose} className="videoPlayer__button-close">
        <IoCloseSharp />
      </button>

      <div className="videoPlayer__buttons">
        <div className="videoPlayer__button-left">
          {videoStatus.playing ? (
            <button
              className="videoPlayer__playing"
              onClick={() =>
                setVideoStatus((prev) => ({
                  ...prev,
                  playing: !videoStatus.playing,
                }))
              }
            >
              <TbPlayerPauseFilled />
              Pause
            </button>
          ) : (
            <button
              className="videoPlayer__playing"
              onClick={() =>
                setVideoStatus({
                  ...videoStatus,
                  playing: !videoStatus.playing,
                })
              }
            >
              <FaPlay />
              Play
            </button>
          )}

          {done && !loading && (
            <button className="videoPlayer__done" onClick={removeMovieInList}>
              <MdOutlineDone />
            </button>
          )}
          {!done && !loading && (
            <button className="videoPlayer__plus" onClick={addMovieToList}>
              <HiPlus />
            </button>
          )}
          {loading && (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>

        {videoStatus.muted ? (
          <button
            className="videoPlayer__speaker"
            onClick={() =>
              setVideoStatus({ ...videoStatus, muted: !videoStatus.muted })
            }
          >
            <RxSpeakerOff />
          </button>
        ) : (
          <button
            className="videoPlayer__speaker"
            onClick={() =>
              setVideoStatus({ ...videoStatus, muted: !videoStatus.muted })
            }
          >
            <RxSpeakerLoud />
          </button>
        )}
      </div>
    </div>
  );
}
