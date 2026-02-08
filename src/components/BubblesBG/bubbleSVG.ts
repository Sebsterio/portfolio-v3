export function bubbleSVG(size: number, id: number) {
	const g = `b-${id}`;
	const r = size / 2;
	const inset = size * 0.012;

	// Helper: polar → cartesian (0° = top, 90° = right, 180° = bottom, 270° = left)
	const pt = (angle: number) => {
		const a = ((angle - 90) * Math.PI) / 180;
		return {
			x: r + (r - inset) * Math.cos(a),
			y: r + (r - inset) * Math.sin(a),
		};
	};

	// Arc path from angle A → B
	const arc = (a1: number, a2: number, large = false) => {
		const p1 = pt(a1);
		const p2 = pt(a2);
		return `
			M ${p1.x} ${p1.y}
			A ${r - inset} ${r - inset} 0 ${large ? 1 : 0} 1 ${p2.x} ${p2.y}
		`;
	};

	return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"
		 xmlns="http://www.w3.org/2000/svg"
		 style="overflow: visible">

	<defs>

		<!-- Background refraction -->
		<filter id="${g}-backdrop">
			<feGaussianBlur stdDeviation="${(size * 0.7) / 100}" />
		</filter>

		<!-- Glass -->
		<radialGradient id="${g}-glass" cx="50%" cy="55%" r="70%">
			<stop offset="0%" stop-color="rgba(255,255,255,0.06)"/>
			<stop offset="60%" stop-color="rgba(255,255,255,0.02)"/>
			<stop offset="100%" stop-color="rgba(255,255,255,0)"/>
		</radialGradient>

		<!-- Blue refraction -->
		<radialGradient id="${g}-blue" cx="52%" cy="86%" r="42%">
			<stop offset="0%" stop-color="rgba(60,110,230,0.35)"/>
			<stop offset="40%" stop-color="rgba(60,110,230,0.14)"/>
			<stop offset="100%" stop-color="rgba(60,110,230,0)"/>
		</radialGradient>

		<!-- Horizon -->
		<radialGradient id="${g}-horizon" cx="50%" cy="18%" r="45%">
			<stop offset="0%" stop-color="rgba(220,235,255,0.25)"/>
			<stop offset="35%" stop-color="rgba(230,240,255,0.12)"/>
			<stop offset="65%" stop-color="rgba(255,255,255,0.04)"/>
			<stop offset="100%" stop-color="rgba(255,255,255,0)"/>
		</radialGradient>

		<!-- Main specular -->
		<radialGradient id="${g}-spec-main" cx="26%" cy="22%" r="3%">
			<stop offset="0%" stop-color="rgba(255,255,255,1)"/>
			<stop offset="35%" stop-color="rgba(245,250,255,0.85)"/>
			<stop offset="100%" stop-color="rgba(245,250,255,0)"/>
		</radialGradient>

		<!-- Small specular -->
		<radialGradient id="${g}-spec-small-1" cx="23%" cy="19%" r="4%">
			<stop offset="0%" stop-color="rgba(225,235,250,0.28)"/>
			<stop offset="70%" stop-color="rgba(225,235,250,0.12)"/>
			<stop offset="100%" stop-color="rgba(225,235,250,0)"/>
		</radialGradient>

		<!-- Tiny specular -->
		<radialGradient id="${g}-spec-small-2" cx="31%" cy="28%" r="3%">
			<stop offset="0%" stop-color="rgba(225,235,250,0.24)"/>
			<stop offset="70%" stop-color="rgba(225,235,250,0.1)"/>
			<stop offset="100%" stop-color="rgba(225,235,250,0)"/>
		</radialGradient>

		<!-- Rim gradient -->
		<linearGradient id="${g}-rim" x1="0%" y1="0%" x2="100%" y2="0%">
			<stop offset="0%" stop-color="rgba(255,255,255,0)"/>
			<stop offset="50%" stop-color="rgba(255,255,255,0.95)"/>
			<stop offset="100%" stop-color="rgba(255,255,255,0)"/>
		</linearGradient>

		<!-- Edge shadow -->
		<radialGradient id="${g}-edge" cx="50%" cy="50%" r="50%">
			<stop offset="74%" stop-color="rgba(0,0,0,0)"/>
			<stop offset="100%" stop-color="rgba(0,0,0,0.2)"/>
		</radialGradient>

	</defs>

	<!-- Refraction -->
	<circle cx="${r}" cy="${r}" r="${r}"
					fill="transparent"
					filter="url(#${g}-backdrop)" />

	<!-- Base layers -->
	<circle cx="${r}" cy="${r}" r="${r}" fill="url(#${g}-glass)" />
	<circle cx="${r}" cy="${r}" r="${r}" fill="url(#${g}-blue)" />
	<circle cx="${r}" cy="${r}" r="${r}" fill="url(#${g}-horizon)" />

	<!-- Main rim on top-left edge -->
	<path
		d="${arc(270, 0)}"
		fill="none"
		stroke="url(#${g}-rim)"
		stroke-width="${size * 0.018}"
		stroke-linecap="round"
	/>

	<!-- Secondary rim on bottom-right (opposite side) -->
	<path
		d="${arc(110, 160)}"
		fill="none"
		stroke="url(#${g}-rim)"
		stroke-width="${size * 0.008}"
		stroke-linecap="round"
		opacity="0.7"
	/>

	<!-- Specular highlights -->
	<circle cx="${r}" cy="${r}" r="${r}" fill="url(#${g}-spec-main)" />
	<circle cx="${r}" cy="${r}" r="${r}" fill="url(#${g}-spec-small-1)" />
	<circle cx="${r}" cy="${r}" r="${r}" fill="url(#${g}-spec-small-2)" />

	<!-- Edge shadow -->
	<circle cx="${r}" cy="${r}" r="${r}" fill="url(#${g}-edge)" />

</svg>
`;
}
