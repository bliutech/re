import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { backend } from "../utils/endpoints";
import Navbar from "../components/Navbar";

export default function Camera() {
  const [count, setCount] = useState(0);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);
  const colorRef = useRef(null);
  // window.onbeforeunload = () =>
  // {
  //     videoRef.current.stop();
  // }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  // check for browser type to switch out the camera module

  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "No browser detection";
  }

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { width: 300 } })
      .then((stream) => {
        window.localStream = stream;
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();

        // let playPromise = video.play();

        // if (playPromise !== undefined)
        // {
        //     playPromise.then(_ => {

        //         // video.pause();
        //     })
        //     .catch(error =>
        //     {

        //     });
        // }
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  (function (history) {
    var pushState = history.pushState;
    history.pushState = function (state) {
      let video = videoRef.current;
      window.localStream.getVideoTracks()[0].stop();
      video.src = "";
      return pushState.apply(history, arguments);
    };
  })(window.history);

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      let color = colorRef.current;

      ctx.drawImage(video, 0, 0, width, height);
      let pixels = ctx.getImageData(0, 0, width, height);

      color.style.backgroundColor = `rgb(${pixels.data[0]},${pixels.data[1]},${pixels.data[2]})`;
      color.style.borderColor = `rgb(${pixels.data[0]},${pixels.data[1]},${pixels.data[2]})`;
    }, 200);
  };

  const takePhoto = () => {
    let photo = photoRef.current;
    let strip = stripRef.current;

    const data = photo.toDataURL("image/jpeg");

    console.warn(data);
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "trash");
    link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    sendPhoto(data);
    strip.insertBefore(link, strip.firstChild);
  };

  async function sendPhoto(data) {
    let send = {
      image: data,
    };
    let res = await fetch(backend("image"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send),
    })
      .then()
      .catch((error) => {
        return;
      });
    console.log(await res.json());
  }

  return (
    <div className="container">
      <Navbar />
      <div ref={colorRef} className="scene">
        {/* <img
                className="mountains"
                src="https://i.ibb.co/RjYk1Ps/2817290-eps-1.png"
            /> */}
      </div>
      <div className="webcam-video">
        <button onClick={() => takePhoto()}>Take a photo</button>
        <video
          onCanPlay={() => paintToCanvas()}
          ref={videoRef}
          className="player"
        />
        <canvas ref={photoRef} className="photo" />
        <div className="photo-booth">
          <div ref={stripRef} className="strip" />
        </div>
      </div>
    </div>
  );
}
