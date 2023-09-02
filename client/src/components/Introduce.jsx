import "../css/Introduce.css";

export default function Introduce({ enjoy, download, watch, kids }) {
  return (
    <section className="introduce">
      {enjoy && (
        <div className="introduce__enjoy">
          <div className="introduce__enjoy-left">
            <h1 className="introduce__title">Enjoy on your TV</h1>
            <span className="introduce__description">
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </span>
          </div>
          <div className="introduce__enjoy-right">
            <img
              className="introduce__img"
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
              alt=""
            />
            <div className="introduce__enjoy-video">
              <video playsInline autoPlay muted loop>
                <source
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      )}

      {download && (
        <div className="introduce__download">
          <div className="introduce__download-left">
            <img
              className="introduce__img"
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
              alt="mobile.jpg"
            />
            <div className="introduce__download-stranger">
              <img
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                alt="stranger.png"
              />
              <div className="introduce__stranger-title">
                <h4>Stranger Things</h4>
                <span>Downloading...</span>
              </div>
            </div>
          </div>
          <div className="introduce__download-right">
            <h1 className="introduce__title">
              Download your shows to watch offline
            </h1>
            <span className="introduce__description">
              Save your favorites easily and always have something to watch.
            </span>
          </div>
        </div>
      )}

      {watch && (
        <div className="introduce__watch">
          <div className="introduce__watch-left">
            <h1 className="introduce__title">Watch everywhere</h1>
            <span className="introduce__description">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </span>
          </div>
          <div className="introduce__watch-right">
            <img
              className="introduce__img"
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-vn.png"
              alt="device-pile.png"
            />
            <div className="introduce__watch-video">
              <video playsInline autoPlay muted loop>
                <source
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-vn.m4v"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      )}

      {kids && (
        <div className="introduce__kid">
          <div className="introduce__kid-left">
            <img
              className="introduce__img"
              src="https://occ-0-325-395.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABejKYujIIDQciqmGJJ8BtXkYKKTi5jiqexltvN1YmvXYIfX8B9CYwooUSIzOKneblRFthZAFsYLMgKMyNfeHwk16DmEkpIIcb6A3.png?r=f55"
              alt="kids.jpg"
            />
          </div>
          <div className="introduce__kid-right">
            <h1 className="introduce__title">
              Download your shows to watch offline
            </h1>
            <span className="introduce__description">
              Save your favorites easily and always have something to watch.
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
