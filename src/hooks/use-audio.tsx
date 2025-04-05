import { useMemo, useEffect, useState } from "react";

interface optionsType {
	src: string;
	loop?: boolean;
	volume?: number;
	muted?: boolean;
	onLoadedData?: (e: Event) => void;
	onError?: (e: Event) => void;
	onEnded?: (e: Event) => void;
}

export const useAudio = (options: optionsType) => {
	const audio = useMemo(() => new Audio(options.src), [options.src]);

	const [isPlaying, setIsplaying] = useState(false);

	const play = () => {
		audio
			.play()
			.then(() => setIsplaying(true))
			.catch((error) => {
				setIsplaying(false);
				console.log(error);
				options.onError?.(error);
			});
	};

	const pause = () => {
		setIsplaying(false);
		audio.pause();
	};

	const toggle = () => (isPlaying ? pause() : play());

	useEffect(() => {
		// Loop the audio if loop is true, default is false
		audio.loop = options.loop || false;

		// Adjust the volume of the audio, default is 1(max)
		audio.volume = options.volume || 1;

		// Mute the audio if muted is true, default is false
		audio.muted = options.muted || false;

		// Execute the onLoadedData function after finishing the loading of audio
		audio.onloadeddata = (e: Event) => options.onLoadedData?.(e);

		// Execute after the ending of the audio
		audio.addEventListener("ended", (e: Event) => {
			// Execute the onEnded function
			options.onEnded?.(e);

			// Play again the audio after the end if loop is true
			if (options.loop) audio.play();
			else setIsplaying(false);
		});

		// Cleanup
		return () => {
			if (!options.loop)
				audio.removeEventListener("ended", () => setIsplaying(false));
		};
	}, [audio, options]);

	// Returning isPlaying, play, pause, toogle
	return { isPlaying, play, pause, toggle, audio };
};
