import { ChromeGradientBg } from '@/components/background/ChromeGradientBg';
import { MetallicOrbsBg } from '@/components/background/MetallicOrbsBg';
import { QuantumGridBg } from '@/components/background/QuantumGridBg';
import { ParticlesBg } from '@/components/background/ParticlesBg';
import { FloatingShapesBg } from '@/components/background/FloatingShapesBg';

export const AppBackground = () => {
	return (
		<>
			<ChromeGradientBg />
			<MetallicOrbsBg />
			<QuantumGridBg />
			<ParticlesBg />
			<FloatingShapesBg />
		</>
	);
};
