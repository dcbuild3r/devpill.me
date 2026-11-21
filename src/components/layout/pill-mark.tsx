/** The logo's two halves: a terminal for "dev" and a capsule for "pill". Colors are props because the Open Graph renderer cannot read CSS variables. */
export function PillMark({ size = 26, purple = "var(--purple)", pink = "var(--pink)", style }: { size?: number; purple?: string; pink?: string; style?: React.CSSProperties }) {
	return (
		<svg aria-hidden="true" width={(size * 52) / 24} height={size} viewBox="0 0 52 24" style={style}>
			<rect x="1.5" y="3.5" width="21" height="17" rx="3.5" fill="none" stroke={purple} strokeWidth="2" />
			<path d="M7 9l3.5 3L7 15M13 15.5h4.5" fill="none" stroke={purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			<g transform="translate(28) rotate(-45 12 12)">
				<rect x="2" y="7.5" width="20" height="9" rx="4.5" fill={purple} />
				<path d="M12 7.5h5.5a4.5 4.5 0 0 1 0 9H12z" fill={pink} />
			</g>
		</svg>
	);
}
