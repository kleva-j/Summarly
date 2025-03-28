"use client";

import { LoaderCircleIcon, RefreshCw, UploadIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

import MediaThemeTailwindAudio from "player.style/tailwind-audio/react";

type SimpleRecordButtonProps = {
	submitRecording: (audioBlob: Blob) => Promise<void>;
	isSubmitting: boolean;
};

export function SimpleRecordButton(props: SimpleRecordButtonProps) {
	const { submitRecording, isSubmitting } = props;

	const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
		null,
	);

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

	const handleToggleRecording = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
		if (isRecording) stopRecording();
		else startRecording();
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

	const handleUpload = () => {
		if (audioBlob) submitRecording(audioBlob);
	};

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<Button
				onClick={handleToggleRecording}
				disabled={isSubmitting}
				className="mx-auto"
			>
				{isRecording ? (
					<>
						<span className={`mr-3 ${isRecording && "animate-pulse"}`}>●</span>{" "}
						Stop Recording
					</>
				) : audioBlob ? (
					<>
						<RefreshCw className="-ms-1" />
						Redo recording
					</>
				) : (
					"Start Recording"
				)}
			</Button>
			<div className="text-center mt-2">
				{isRecording && (
					<p className="text-sm">Time: {formatTime(recordingTime)}</p>
				)}
			</div>
			{audioBlob && (
				<AnimatePresence mode={"wait"}>
					<motion.div
						initial={{ opacity: 0, y: "-8%" }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, x: "8%" }}
						transition={{ type: "spring", duration: 0.5 }}
						className="flex flex-col gap-4 items-center"
					>
						<div className="text-base font-medium text-muted-foreground">
							Preview:
						</div>
						<MediaThemeTailwindAudio>
							{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
							<audio
								slot="media"
								src={URL.createObjectURL(audioBlob)}
								playsInline
								crossOrigin="anonymous"
							/>
						</MediaThemeTailwindAudio>
						<Button
							className="bg-emerald-600 mt-2 hover:bg-emerald-600/80 cursor-pointer"
							disabled={isSubmitting}
							onClick={handleUpload}
						>
							{isSubmitting ? (
								<LoaderCircleIcon
									className="-ms-1 animate-spin"
									aria-hidden="true"
									size={16}
								/>
							) : (
								<UploadIcon className="-ms-1" />
							)}
							Upload
						</Button>
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
}

export default SimpleRecordButton;
