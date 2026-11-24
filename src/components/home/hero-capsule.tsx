"use client";

import { Pause, Play } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import type { mountCapsule } from "./capsule-scene";

export function HeroCapsule() {
	const canvas = useRef<HTMLCanvasElement>(null);
	const scene = useRef<ReturnType<typeof mountCapsule> | null>(null);
	const [ready, setReady] = useState(false);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		let active = true;
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const followPreference = () => setRunning(!motion.matches);
		motion.addEventListener("change", followPreference);
		import("./capsule-scene").then(({ mountCapsule }) => {
			if (!active || !canvas.current) return;
			scene.current = mountCapsule(canvas.current);
			followPreference();
			setReady(true);
		}).catch(() => { /* The poster also serves browsers without WebGL. */ });
		return () => {
			active = false;
			motion.removeEventListener("change", followPreference);
			scene.current?.dispose();
			scene.current = null;
		};
	}, []);
	useEffect(() => { scene.current?.setSpinning(running); }, [ready, running]);

	return (
		<div className="relative mx-auto aspect-[3/2] w-full max-w-md">
			<div
				className={`absolute inset-0 bg-contain bg-center bg-no-repeat ${ready ? "" : "bg-[url(/devpill-capsule.webp)] dark:bg-[url(/devpill-capsule-dark.webp)]"}`}>
				<canvas ref={canvas} tabIndex={ready ? 0 : undefined}
					aria-label="Devpill capsule with code on the front and Ethereum on the reverse. Drag or use the arrow keys to rotate."
					className="block size-full touch-pinch-zoom cursor-grab rounded-lg focus-visible:outline-2 focus-visible:outline-primary active:cursor-grabbing" />
			</div>
			{ready && (
				<button type="button" aria-label={running ? "Pause capsule rotation" : "Play capsule rotation"}
					onClick={() => setRunning(!running)}
					className="absolute right-1 bottom-1 grid size-9 place-items-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground">
					{running ? <Pause size={15} weight="fill" /> : <Play size={15} weight="fill" />}
				</button>
			)}
		</div>
	);
}
