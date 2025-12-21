import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
    videoUrl: string;
    title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });

    useEffect(() => {
        if (videoUrl && videoUrl.trim() !== "") {
            axios
                .post(`${process.env.NEXT_PUBLIC_SERVER_URI}/getVdoCipherOTP`, {
                    videoId: videoUrl,
                })
                .then((res: any) => {
                    setVideoData(res.data);
                })
                .catch((error) => {
                    console.error("CoursePlayer Error:", error);
                });
        }
    }, [videoUrl]);

    return (
        <div style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}>
            {videoData.otp && videoData.playbackInfo !== "" && (
                <iframe
                    src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=v2`}
                    style={{
                        border: 0,
                        maxWidth: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",

                    }}
                    allowFullScreen={true}
                    allow="encrypted-media"
                ></iframe>
            )}
        </div>
    );
};

export default CoursePlayer;
