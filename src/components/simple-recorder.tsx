"use client";

import { type JSX, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

function SimpleRecordButton(): JSX.Element {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  
  const [recordingTime, setRecordingTime] = useState<number>(0);

  const timerRef = useRef<number | NodeJS.Timeout | null>(null);
  
  const RECORDING_MAX_DURATION = 240; // 4 minutes in seconds

  useEffect(() => {
    if (!audioStream) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setAudioStream(stream);
          const mediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(mediaRecorder);
          let audio: Blob[] = [];

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) audio = [event.data];
          };

          mediaRecorder.onstop = () => {
            const b = new Blob(audio, { type: "audio/wav" });
            setAudioBlob(b);
            console.log("audioBlob", b);
          };
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [audioStream]);

  const handleToggleRecording = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    mediaRecorder?.start();
    setIsRecording(true);
    setRecordingTime(0);
    setAudioBlob(null);
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => {
        if (prevTime >= RECORDING_MAX_DURATION - 1) {
          stopRecording();
          return RECORDING_MAX_DURATION;
        }
        return prevTime + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <Button
        onClick={handleToggleRecording}

      >
        {isRecording ? (
          <>
            <span className={`mr-3 ${isRecording && "animate-pulse"}`}>●</span>{" "}
            Stop Recording
          </>
        ) : audioBlob ? (
          "Redo recording"
        ) : (
          "Start Recording"
        )}
      </Button>
      <div>
        {isRecording && (
          <div>
            <p>Recording...</p>
            <p>Time: {formatTime(recordingTime)}</p>
          </div>
        )}
      </div>
      {audioBlob && (
        <>
          <div>Preview recording before submitting:</div>
          {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
          <audio controls>
            <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
          </audio>
        </>
      )}
    </div>
  );
}

export default SimpleRecordButton;
