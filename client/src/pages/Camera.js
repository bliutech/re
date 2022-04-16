import React, {useEffect, useRef} from "react";
import './styles.css';
import { backend } from "../utils/endpoints";

export default function Camera()
{
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const stripRef = useRef(null);
    const colorRef = useRef(null);

    useEffect(() => {
        getVideo();
        // return () => {
        //     videoRef.current.pause();
        // }
    }, [videoRef]);


    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({audio: false, video: {width: 300} })
            .then(stream => {
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
            .catch(err => {
                console.error("error:", err);
            });
    };

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

            color.style.backgroundColor = `rgb(${pixels.data[0]},${pixels.data[1]},${
            pixels.data[2]
            })`;
            color.style.borderColor = `rgb(${pixels.data[0]},${pixels.data[1]},${
            pixels.data[2]
            })`;
        }, 200);
    };

    const takePhoto = () => {
        let photo = photoRef.current;
        let strip = stripRef.current;

        const data = photo.toDataURL("image/jpeg");

        console.warn(data);
        const link = document.createElement("a");
        link.href = data;
        link.setAttribute("download", "myWebcam");
        link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
        sendPhoto(data);
        strip.insertBefore(link, strip.firstChild);
    };

    async function sendPhoto(data)
    {
        await fetch(
            backend('image'),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        )
        .then(
        )
        .catch(error => {
            return;
        });
    }

    return (
    <div className="container">
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