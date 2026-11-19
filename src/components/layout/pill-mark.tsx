export function PillMark({ size = 26 }: { size?: number }) {
	return (
		<svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24">
			<g transform="rotate(-45 12 12)">
				<rect x="2" y="7.5" width="20" height="9" rx="4.5" fill="var(--purple)" />
				<path d="M12 7.5h5.5a4.5 4.5 0 0 1 0 9H12z" fill="var(--pink)" />
			</g>
		</svg>
	);
}
