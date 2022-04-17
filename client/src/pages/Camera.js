import React, { useState, useEffect, useRef } from "react";
import "./Camera.css";
import { backend } from "../utils/endpoints";

export default function Camera() {
  const [data, setData] = useState();

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

  const labelToText = {
    'battery': 'Battery',
    'biological': 'Biological',
    'brown glass': 'Biological',
    'cardboard': 'Cardboard',
    'clothes': 'Clothes',
    'green-glass': 'Green glass',
    'metal': 'Metal',
    'paper': 'Paper',
    'plastic': 'Plastic',
    'shoes': 'Shoes',
    'trash': 'Trash',
    'white glass': 'White glass',
  }

  const binToText = {
    'landfill': 'Landfill',
    'recycle': 'Recycle',
    'compost': 'Compost',
    'special': 'Special',
  }

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { width: 300 } })
      .then((stream) => {
        window.localStream = stream;
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
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

      // color.style.backgroundColor = `rgb(${pixels.data[0]},${pixels.data[1]},${pixels.data[2]})`;
      // color.style.borderColor = `rgb(${pixels.data[0]},${pixels.data[1]},${pixels.data[2]})`;
    }, 200);
  };

  async function takePhoto() {
    let photo = photoRef.current;
    let strip = stripRef.current;
    let photo_url = photo.toDataURL("image/jpeg");

    const link = document.querySelector("#recentPhoto");
    link.href = photo_url;
    link.setAttribute("download", "trash");
    const button = document.querySelector(".submit");
    button.style.display = "";
    sendPhoto(photo_url);
    link.innerHTML = `<img id="photoTaken" src='${photo_url}' alt='thumbnail'/>`;

    strip.insertBefore(link, strip.firstChild);
    //setData(photo_url);
  }

  function handleClick() {
    //add code for post request, need user and most likely type
  }
  function byConfidence(a, b) {
    if (a.confidence > b.confidence) {
      return -1;
    } else if (b.confidence > a.confidence) {
      return 1;
    } else {
      return 0;
    }
  }
  async function sendPhoto(data) {
    let MLdata = {};
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
    MLdata = await res.json();
    let formattedMLData = [];
    Object.entries(MLdata).forEach((entry) => {
      const [key, value] = entry;
      formattedMLData.push({ type: key, bin: value[0], confidence: value[1] });
    });
    formattedMLData.sort(byConfidence);
    console.log(formattedMLData);
    const description = document.querySelector("#trashDescription");
    description.innerHTML = `
      [${formattedMLData[0].confidence / 100}%] (${labelToText[formattedMLData[0].type]}) <b>${binToText[formattedMLData[0].bin]}</b><br/>
      [${formattedMLData[1].confidence / 100}%] (${labelToText[formattedMLData[1].type]}) <b>${binToText[formattedMLData[1].bin]}</b><br/>
      [${formattedMLData[2].confidence / 100}%] (${labelToText[formattedMLData[2].type]}) <b>${binToText[formattedMLData[2].bin]}</b><br/>
    `;
    setData(MLdata);
  }

  return (
    <div className="webcam-video">
      <video id="preview"
        onCanPlay={() => paintToCanvas()}
        ref={videoRef}
        className="player"
      /><br/>
      <button className="camera-click" onClick={() => takePhoto()}>Take a photo</button>
      <br/>
      <canvas style={{ display: "none" }} ref={photoRef} className="photo" />
      <div className="photo-booth">
        <div ref={stripRef} className="strip">
          <a id="recentPhoto"></a>
        </div>
      </div><br/>
      <button
        className="camera-click submit"
        style={{ display: "none" }}
        onClick={handleClick}
      >
        Submit Trash
      </button>
      <p id="trashDescription"></p>
      <br/><br/><br/>
    </div>
  );
