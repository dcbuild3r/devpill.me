import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const radius = 0.9;
const barrel = 1.35;
const halfLength = barrel + radius;

// The artwork wraps once around the long axis. Half a revolution swaps the marks.
function makePrint() {
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
		const x = width / 2 + (0.38 * radius * Math.cos(2 * Math.PI * t) * width) / (2 * halfLength);
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
	ctx.strokeStyle = "#191426";
	ctx.lineWidth = (0.135 * width) / (2 * halfLength);
	ctx.stroke(slash);

	function face(angle: number) {
		ctx.setTransform(width / (2 * halfLength), 0, 0, height / (2 * Math.PI * radius), width / 2, height * angle);
	}
	face(0.25);
	ctx.strokeStyle = "#191426";
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
	function facet(color: string, points: number[][]) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(points[0][0], points[0][1]);
		for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
		ctx.closePath();
		ctx.fill();
	}
	facet("#f6f5ff", [[0, -0.76], [-0.47, 0.04], [0, -0.16]]);
	facet("#bcc1d7", [[0, -0.76], [0, -0.16], [0.47, 0.04]]);
	facet("#8891ad", [[-0.47, 0.04], [0, -0.16], [0, 0.24]]);
	facet("#565f79", [[0, -0.16], [0.47, 0.04], [0, 0.24]]);
	facet("#e6e9f6", [[-0.47, 0.14], [0, 0.35], [0, 0.76]]);
	facet("#989fb8", [[0, 0.35], [0.47, 0.14], [0, 0.76]]);

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
	const print = makePrint();
	const material = new THREE.MeshPhysicalMaterial({
		map: print, roughness: 0.32, metalness: 0.08, clearcoat: 0.8, clearcoatRoughness: 0.18,
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
			size.disconnect();
			visibility.disconnect();
			document.removeEventListener("visibilitychange", sync);
			geometry.dispose();
			material.dispose();
			print.dispose();
			studio.dispose();
			renderer.dispose();
		},
	};
}
