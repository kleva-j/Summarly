import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

type AudioInputVisualizerProps = {
	width?: number;
	height?: number;
	options?: {
		barGap?: number;
		redFactor?: number;
		greenFactor?: number;
		blueFactor?: number;
		borderRadius?: number;
		centered?: boolean;
		style?: React.CSSProperties;
	};
	audioOptions?: {
		src?: string;
		loop?: boolean;
		volume?: number;
		muted?: boolean;
		onLoadedData?: (e: Event) => void;
		onError?: (e: Event) => void;
		onEnded?: (e: Event) => void;
	};
};

type RenderFrequencyGraphOptions = {
	barGap?: number;
	redFactor?: number;
	greenFactor?: number;
	blueFactor?: number;
	borderRadius?: number;
	centered?: boolean;
};

type RenderFrequencyGraphArgs = {
	analyser: AnalyserNode;
	canvasElement: HTMLCanvasElement;
	canvasWidth: number;
	canvasHeight: number;
	options?: RenderFrequencyGraphOptions;
};

type AnimateType = {
	analyser: AnalyserNode;
	canvasContext: CanvasRenderingContext2D;
};

export const AudioVisualizer = ({
	width = 320,
	height = 100,
	options = {},
	audioOptions = {},
}: AudioInputVisualizerProps) => {
	const audio = useMemo(() => new Audio(audioOptions.src), [audioOptions.src]);
	
	audio.crossOrigin = "anonymous";

	const [isPlaying, setIsplaying] = useState(false);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const isAnimating = useRef(false);

	const play = () => {
		audio
			.play()
			.then(() => setIsplaying(true))
			.catch((error) => {
				setIsplaying(false);
				console.log(error);
				audioOptions.onError?.(error);
			});
	};

	const pause = () => {
		setIsplaying(false);
		audio.pause();
	};

	const toggle = () => (isPlaying ? pause() : play());

	useEffect(() => {
		// Loop the audio if loop is true, default is false
		audio.loop = audioOptions.loop || false;

		// Adjust the volume of the audio, default is 1(max)
		audio.volume = audioOptions.volume || 1;

		// Mute the audio if muted is true, default is false
		audio.muted = audioOptions.muted || false;

		// Execute the onLoadedData function after finishing the loading of audio
		audio.onloadeddata = (e: Event) => audioOptions.onLoadedData?.(e);

		// Execute after the ending of the audio
		audio.addEventListener("ended", (e: Event) => {
			// Execute the onEnded function
			audioOptions.onEnded?.(e);

			// Play again the audio after the end if loop is true
			audioOptions.loop ? audio.play() : setIsplaying(false);
		});

		// Cleanup
		return () => {
			!audioOptions.loop &&
				audio.removeEventListener("ended", () => setIsplaying(false));
		};
	}, [audio, audioOptions]);

	const handleAudioAnimation = useCallback(
		async (canvasElement: HTMLCanvasElement) => {
			// console.log(audio.readyState);
			// if (audio.readyState !== 4) {
			// 	console.log("No audio source loaded");
			// 	return;
			// }

			isAnimating.current = true;

			const audioContext = new AudioContext();
			const analyser = audioContext.createAnalyser();
			const mediaElementSource = audioContext.createMediaElementSource(audio);
			analyser.connect(audioContext.destination);

			mediaElementSource.connect(analyser);
			analyser.fftSize = 2 ** 8;

			renderFrequencyGraph({
				analyser,
				canvasElement,
				canvasHeight: height,
				canvasWidth: width,
				options,
			});
		},
		[audio, height, width, options],
	);

	useEffect(() => {
		if (isAnimating.current) return;

		const canvasElement = canvasRef.current;
		if (!canvasElement) return;

		handleAudioAnimation(canvasElement);

		return () => {
			isAnimating.current = false;
		};
	}, [handleAudioAnimation]);

	return (
		<>
			<Button onClick={toggle} className="size-9 rounded-full p-2">
				{isPlaying ? (
					<Pause className="text-muted-foreground" />
				) : (
					<Play className="text-muted-foreground" />
				)}
			</Button>
			<canvas
				style={options.style}
				width={width}
				height={height}
				ref={canvasRef}
			/>
		</>
	);
};

function renderFrequencyGraph({
	analyser,
	canvasElement,
	canvasWidth,
	canvasHeight,
	options = {},
}: RenderFrequencyGraphArgs) {
	const {
		barGap = 2,
		redFactor = 5,
		greenFactor = 250,
		blueFactor = 170,
		borderRadius = 20,
		centered = true,
	} = options;

	const canvasContext = canvasElement.getContext(
		"2d",
	) as CanvasRenderingContext2D;

	const animate = ({ analyser, canvasContext: ctx }: AnimateType) => {
		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		const barWidth = canvasWidth / bufferLength;

		analyser.getByteFrequencyData(dataArray);

		let rectX = 0;

		dataArray.forEach((barHeight, index) => {
			const rectY = centered
				? (canvasHeight - barHeight) / 2
				: canvasHeight - barHeight;
			const r = barHeight + redFactor * (index / bufferLength);
			const g = greenFactor * (index / bufferLength);
			const b = blueFactor;
			ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

			ctx.beginPath();
			ctx.roundRect(rectX, rectY, barWidth, barHeight, [borderRadius]);
			ctx.fill();

			rectX += barWidth + barGap;
		});

		requestAnimationFrame(() => {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			animate({ analyser, canvasContext: ctx });
		});
	};

	animate({ analyser, canvasContext });
}
