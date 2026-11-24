import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const radius = 0.9;
const barrel = 1.35;
const halfLength = barrel + radius;
const splitSlope = 0.38;

// The artwork wraps once around the long axis. Half a revolution swaps the marks.
function makePrint(dark: boolean, finish?: CanvasRenderingContext2D) {
	const image = document.createElement("canvas");
	image.width = 1536;
	image.height = 2048;
	const ctx = image.getContext("2d")!;
	const { width, height } = image;
	// A diagonal plane intersects the round shell in a cosine in unwrapped UV space.
	// Use exactly that intersection for both the ink boundary and the printed slash.
	const seam = new Path2D();
	const slash = new Path2D();
	for (let i = 0; i <= 256; i++) {
		const t = i / 256;
		const x = width / 2 + (splitSlope * radius * Math.cos(2 * Math.PI * t) * width) / (2 * halfLength);
		if (i === 0) {
			seam.moveTo(x, 0);
			slash.moveTo(x, 0);
		} else {
			seam.lineTo(x, t * height);
			if (t <= 0.5) slash.lineTo(x, t * height);
		}
	}
	seam.lineTo(0, height);
	seam.lineTo(0, 0);
	seam.closePath();
	ctx.fillStyle = "#7628fb";
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = "#fa128d";
	ctx.fill(seam);
	ctx.strokeStyle = dark ? "#ffffff" : "#191426";
	ctx.lineWidth = (0.135 * width) / (2 * halfLength);
	ctx.stroke(slash);

	function face(angle: number) {
		ctx.setTransform(width / (2 * halfLength), 0, 0, height / (2 * Math.PI * radius), width / 2, height * angle);
	}
	face(0.25);
	ctx.lineWidth = 0.135;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(-0.56, -0.34);
	ctx.lineTo(-0.96, 0);
	ctx.lineTo(-0.56, 0.34);
	ctx.moveTo(0.56, -0.34);
	ctx.lineTo(0.96, 0);
	ctx.lineTo(0.56, 0.34);
	ctx.stroke();

	face(0.75);
	ctx.rotate(Math.PI); // Keep the reverse upright after a half turn around Y.
	// Lay the diamond out in the rear view, then unwrap its height onto the shell.
	// Its spine follows x = splitSlope * y, the same plane as the color boundary.
	const angle = Math.atan(splitSlope);
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	type Point = [number, number];
	const tip: Point = [0, -0.72], ridge: Point = [0, -0.15], base: Point = [0, 0.24];
	const left: Point = [-0.46, 0.03], right: Point = [0.46, 0.03];
	const notch: Point = [0, 0.34], bottom: Point = [0, 0.72];
	const lowerLeft: Point = [-0.46, 0.13], lowerRight: Point = [0.46, 0.13];
	if (finish) {
		// Three.js reads clearcoat from red and roughness from green.
		// Matte ink keeps the studio highlight from bleaching the facet boundaries.
		finish.fillStyle = "rgb(255 82 0)";
		finish.fillRect(0, 0, finish.canvas.width, finish.canvas.height);
		const scale = new DOMMatrix().scale(finish.canvas.width / width, finish.canvas.height / height);
		finish.setTransform(scale.multiply(ctx.getTransform()));
		finish.fillStyle = finish.strokeStyle = "rgb(0 235 0)";
		finish.lineWidth = 0.012;
	}
	ctx.strokeStyle = dark ? "#7b8092" : "#22242b";
	ctx.lineWidth = 0.012;
	function facet(lightInk: string, darkInk: string, ...points: Point[]) {
		ctx.fillStyle = dark ? darkInk : lightInk;
		const path = new Path2D();
		for (const [i, [x, y]] of points.entries()) {
			const across = x * cos + y * sin;
			const arc = radius * Math.asin((y * cos - x * sin) / radius);
			if (i === 0) path.moveTo(across, arc);
			else path.lineTo(across, arc);
		}
		path.closePath();
		ctx.fill(path);
		ctx.stroke(path);
		finish?.fill(path);
		finish?.stroke(path);
	}
	facet("#6c707b", "#ffffff", tip, left, ridge);
	facet("#393c45", "#c6cad5", tip, ridge, right);
	facet("#424651", "#adb3c3", left, ridge, base);
	facet("#191b22", "#8b92a4", ridge, right, base);
	facet("#616570", "#edf0f7", lowerLeft, notch, bottom);
	facet("#2b2e37", "#b3b9ca", notch, lowerRight, bottom);

	const texture = new THREE.CanvasTexture(image);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.wrapT = THREE.RepeatWrapping;
	return texture;
}

export function mountCapsule(canvas: HTMLCanvasElement) {
	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
	renderer.setClearColor(0, 0);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	const scene = new THREE.Scene();
	const room = new RoomEnvironment();
	const generator = new THREE.PMREMGenerator(renderer);
	const studio = generator.fromScene(room, 0.045);
	scene.environment = studio.texture;
	room.dispose();
	generator.dispose();

	const curve: THREE.Vector2[] = [];
	for (let i = 0; i <= 32; i++) {
		const angle = i * Math.PI / 64;
		curve.push(new THREE.Vector2(radius * Math.sin(angle), -barrel - radius * Math.cos(angle)));
	}
	for (let i = 0; i <= 32; i++) {
		const angle = i * Math.PI / 64;
		curve.push(new THREE.Vector2(radius * Math.cos(angle), barrel + radius * Math.sin(angle)));
	}
	const geometry = new THREE.LatheGeometry(curve, 112, -Math.PI / 2);
	const { uv, position } = geometry.attributes;
	for (let i = 0; i < uv.count; i++) {
		uv.setXY(i, (position.getY(i) + halfLength) / (2 * halfLength), 1 - uv.getX(i));
	}
	geometry.rotateZ(-Math.PI / 2);
	const root = document.documentElement;
	let dark = root.classList.contains("dark");
	const finishCanvas = document.createElement("canvas");
	finishCanvas.width = 384;
	finishCanvas.height = 512;
	const print = makePrint(dark, finishCanvas.getContext("2d")!);
	const finish = new THREE.CanvasTexture(finishCanvas);
	finish.wrapT = THREE.RepeatWrapping;
	const material = new THREE.MeshPhysicalMaterial({
		map: print, roughnessMap: finish, clearcoatMap: finish, roughness: 1, metalness: 0.08, clearcoat: 0.8, clearcoatRoughness: 0.18,
	});
	const pill = new THREE.Mesh(geometry, material);
	const pose = new THREE.Group();
	pose.rotation.set(-0.03, -0.14, 0.20);
	pose.add(pill);
	scene.add(pose);
	const camera = new THREE.OrthographicCamera(-2.6, 2.6, 1.8, -1.8, 0.1, 20);
	camera.position.z = 8;

	let frame = 0;
	let previous = 0;
	let spinning = false;
	let visible = false;
	let drag: { id: number; x: number; y: number } | null = null;
	const horizontal = new THREE.Vector3(1, 0, 0);
	const vertical = new THREE.Vector3(0, 1, 0);
	const longAxis = new THREE.Vector3();
	function draw() {
		// Leave room for the ends even when a visitor turns the capsule upright.
		longAxis.copy(horizontal).applyQuaternion(pill.quaternion).applyQuaternion(pose.quaternion);
		camera.zoom = Math.min(1, camera.top / (radius + barrel * Math.abs(longAxis.y) + 0.12));
		camera.updateProjectionMatrix();
		renderer.render(scene, camera);
	}
	function animate(now: number) {
		if (previous) pill.rotation.y += Math.min((now - previous) / 1000, 0.1) * (Math.PI / 5);
		previous = now;
		draw();
		frame = requestAnimationFrame(animate);
	}
	function sync() {
		cancelAnimationFrame(frame);
		previous = 0;
		if (spinning && !drag && visible && !document.hidden) frame = requestAnimationFrame(animate);
	}
	function rotate(yaw: number, pitch: number) {
		pose.rotateOnWorldAxis(vertical, yaw);
		pose.rotateOnWorldAxis(horizontal, pitch);
		draw();
	}
	function grab(event: PointerEvent) {
		if (drag || event.button !== 0) return;
		drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
		canvas.setPointerCapture(event.pointerId);
		sync();
	}
	function move(event: PointerEvent) {
		if (!drag || drag.id !== event.pointerId) return;
		const sensitivity = 2 * Math.PI / canvas.clientWidth;
		rotate((event.clientX - drag.x) * sensitivity, (event.clientY - drag.y) * sensitivity);
		drag.x = event.clientX;
		drag.y = event.clientY;
	}
	function release(event: PointerEvent) {
		if (drag?.id !== event.pointerId) return;
		drag = null;
		sync();
	}
	function keydown(event: KeyboardEvent) {
		const step = Math.PI / 12;
		switch (event.key) {
			case "ArrowLeft": rotate(-step, 0); break;
			case "ArrowRight": rotate(step, 0); break;
			case "ArrowUp": rotate(0, -step); break;
			case "ArrowDown": rotate(0, step); break;
			default: return;
		}
		event.preventDefault();
	}
	const input = new AbortController();
	const options = { signal: input.signal };
	canvas.addEventListener("pointerdown", grab, options);
	canvas.addEventListener("pointermove", move, options);
	canvas.addEventListener("lostpointercapture", release, options);
	canvas.addEventListener("keydown", keydown, options);
	function resize() {
		const { width, height } = canvas.getBoundingClientRect();
		if (!width || !height) return;
		const halfWidth = Math.max(2.58, 1.38 * width / height);
		camera.left = -halfWidth;
		camera.right = halfWidth;
		camera.top = halfWidth * height / width;
		camera.bottom = -camera.top;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height, false);
		draw();
	}
	const theme = new MutationObserver(() => {
		const nextDark = root.classList.contains("dark");
		if (nextDark === dark) return;
		dark = nextDark;
		material.map?.dispose();
		material.map = makePrint(dark);
		draw();
	});
	theme.observe(root, { attributes: true, attributeFilter: ["class"] });
	const size = new ResizeObserver(resize);
	size.observe(canvas);
	const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
	visibility.observe(canvas);
	document.addEventListener("visibilitychange", sync);
	resize();
	return {
		setSpinning(value: boolean) { spinning = value; sync(); },
		dispose() {
			cancelAnimationFrame(frame);
			input.abort();
			theme.disconnect();
			size.disconnect();
			visibility.disconnect();
			document.removeEventListener("visibilitychange", sync);
			geometry.dispose();
			finish.dispose();
			material.dispose();
			material.map?.dispose();
			studio.dispose();
			renderer.dispose();
		},
	};
}
