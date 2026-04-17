import React from 'react';
import {
	AbsoluteFill,
	Audio,
	interpolate,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {C, PHONE_W, PHONE_H} from './theme';
import {HomeScreen} from './screens/HomeScreen';
import {MatchesScreen} from './screens/MatchesScreen';
import {PublierScreen} from './screens/PublierScreen';
import {MessagesScreen} from './screens/MessagesScreen';
import {MarketplaceScreen} from './screens/MarketplaceScreen';

// ─── Timing (30fps) ──────────────────────────────────────────────────────────
const FPS = 30;
const T = {
	CONSTAT_START: 0,              // 0s
	PROBLEMATIQUE_START: 12 * FPS, // 12s
	SOLUTION_START: 25 * FPS,      // 25s
	AGRO_START: 40 * FPS,          // 40s
	PROPRIO_START: 50 * FPS,       // 50s
	INVEST_START: 60 * FPS,        // 60s
	CONCLUSION_START: 70 * FPS,    // 70s
	END: 85 * FPS,                 // 85s
};

// ─── Shared helpers ───────────────────────────────────────────────────────────
const fadeIn = (frame: number, from = 0, to = 20) =>
	interpolate(frame, [from, to], [0, 1], {extrapolateRight: 'clamp'});

const fadeOut = (frame: number, dur: number, offset = 15) =>
	interpolate(frame, [dur - offset, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const slideUp = (frame: number, fps: number, from = 0) =>
	spring({frame: frame - from, fps, config: {damping: 80, stiffness: 200}, durationInFrames: 25});

// ─── Background ───────────────────────────────────────────────────────────────
const Background: React.FC = () => (
	<AbsoluteFill
		style={{
			background: `linear-gradient(145deg, ${C.bgGrad1} 0%, ${C.bgGrad2} 100%)`,
		}}
	/>
);

// ─── Phone Mockup ─────────────────────────────────────────────────────────────
const PhoneMockup: React.FC<{children: React.ReactNode; opacity?: number; x?: number}> = ({
	children,
	opacity = 1,
	x = 0,
}) => {
	const {width, height} = useVideoConfig();
	const cx = width / 2 - PHONE_W / 2 + x;
	const cy = height / 2 - PHONE_H / 2;

	return (
		<div
			style={{
				position: 'absolute',
				left: cx,
				top: cy,
				width: PHONE_W,
				height: PHONE_H,
				opacity,
				borderRadius: 36,
				boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 2px rgba(255,255,255,0.15)',
				overflow: 'hidden',
				background: C.offWhite,
			}}
		>
			{/* Notch */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 100,
					height: 22,
					background: '#111',
					borderBottomLeftRadius: 14,
					borderBottomRightRadius: 14,
					zIndex: 10,
				}}
			/>
			<div style={{width: '100%', height: '100%'}}>{children}</div>
		</div>
	);
};

// ─── Section Title Overlay ────────────────────────────────────────────────────
const SectionTitle: React.FC<{label: string; opacity: number}> = ({label, opacity}) => (
	<div
		style={{
			position: 'absolute',
			top: 40,
			left: 0,
			right: 0,
			display: 'flex',
			justifyContent: 'center',
			opacity,
		}}
	>
		<div
			style={{
				background: 'rgba(255,255,255,0.12)',
				backdropFilter: 'blur(8px)',
				border: '1px solid rgba(255,255,255,0.2)',
				borderRadius: 30,
				padding: '10px 28px',
				fontSize: 18,
				fontWeight: 700,
				color: C.white,
				letterSpacing: 3,
				textTransform: 'uppercase' as const,
				fontFamily: 'system-ui, sans-serif',
			}}
		>
			{label}
		</div>
	</div>
);

// ─── Narration Text ───────────────────────────────────────────────────────────
const Narration: React.FC<{text: string; opacity: number}> = ({text, opacity}) => (
	<div
		style={{
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			padding: '60px 120px 50px',
			background:
				'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
			opacity,
		}}
	>
		<p
			style={{
				margin: 0,
				fontSize: 34,
				lineHeight: 1.4,
				color: C.white,
				fontFamily: 'system-ui, sans-serif',
				fontWeight: 400,
				textAlign: 'center',
				textShadow: '0 2px 8px rgba(0,0,0,0.8)',
			}}
		>
			{text}
		</p>
	</div>
);

// ─── Profile Badge ────────────────────────────────────────────────────────────
const ProfileBadge: React.FC<{
	emoji: string;
	label: string;
	color: string;
	opacity: number;
	y: number;
}> = ({emoji, label, color, opacity, y}) => (
	<div
		style={{
			position: 'absolute',
			left: '50%',
			top: 76,
			transform: `translateX(-50%) translateY(${y}px)`,
			opacity,
		}}
	>
		<div
			style={{
				background: color,
				borderRadius: 30,
				padding: '10px 24px',
				fontSize: 22,
				fontWeight: 700,
				color: C.white,
				display: 'flex',
				alignItems: 'center',
				gap: 10,
				boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
				fontFamily: 'system-ui, sans-serif',
			}}
		>
			<span style={{fontSize: 26}}>{emoji}</span>
			<span>{label}</span>
		</div>
	</div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{
	value: string;
	label: string;
	sub: string;
	color: string;
	opacity: number;
	y: number;
}> = ({value, label, sub, color, opacity, y}) => (
	<div
		style={{
			opacity,
			transform: `translateY(${y}px)`,
			background: 'rgba(255,255,255,0.1)',
			backdropFilter: 'blur(10px)',
			border: '1px solid rgba(255,255,255,0.2)',
			borderRadius: 20,
			padding: '24px 32px',
			textAlign: 'center',
			fontFamily: 'system-ui, sans-serif',
			flex: 1,
		}}
	>
		<div
			style={{
				fontSize: 64,
				fontWeight: 900,
				color,
				lineHeight: 1,
				marginBottom: 8,
			}}
		>
			{value}
		</div>
		<div style={{fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 4}}>
			{label}
		</div>
		<div style={{fontSize: 15, color: 'rgba(255,255,255,0.7)'}}>
			{sub}
		</div>
	</div>
);

// ─── Logo / Tagline ───────────────────────────────────────────────────────────
const LogoTagline: React.FC<{opacity: number; scale: number}> = ({opacity, scale}) => (
	<div
		style={{
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: `translate(-50%, -50%) scale(${scale})`,
			opacity,
			textAlign: 'center',
			fontFamily: 'system-ui, sans-serif',
		}}
	>
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 18,
				marginBottom: 16,
			}}
		>
			<div
				style={{
					width: 80,
					height: 80,
					background: C.appGreen,
					borderRadius: 20,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 44,
				}}
			>
				🌿
			</div>
			<div
				style={{
					fontSize: 70,
					fontWeight: 900,
					color: C.white,
					letterSpacing: -1,
				}}
			>
				Terre d'Avenir
			</div>
		</div>
		<div
			style={{
				fontSize: 28,
				color: 'rgba(255,255,255,0.8)',
				fontStyle: 'italic',
				maxWidth: 800,
			}}
		>
			Parce que la compétence seule ne suffit pas —
			<br />
			il faut aussi la terre, le financement, et la confiance.
		</div>
	</div>
);

// ─── SECTION 1: CONSTAT ───────────────────────────────────────────────────────
const ConstatSection: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const dur = T.PROBLEMATIQUE_START - T.CONSTAT_START;

	const titleOpacity = fadeIn(frame, 5, 25) * fadeOut(frame, dur);
	const phoneSlide = spring({frame, fps, config: {damping: 70, stiffness: 180}, durationInFrames: 30});
	const phoneX = interpolate(phoneSlide, [0, 1], [120, 0]);
	const phoneOpacity = fadeIn(frame, 0, 20) * fadeOut(frame, dur);
	const narrationOpacity = fadeIn(frame, 15, 35) * fadeOut(frame, dur);

	return (
		<AbsoluteFill>
			<SectionTitle label="CONSTAT" opacity={titleOpacity} />
			<PhoneMockup opacity={phoneOpacity} x={phoneX}>
				<HomeScreen />
			</PhoneMockup>
			<Narration
				text="Au Bénin, des milliers de jeunes diplômés en agronomie restent sans emploi — pas par manque de compétences, mais par manque de ressources."
				opacity={narrationOpacity}
			/>
		</AbsoluteFill>
	);
};

// ─── SECTION 2: PROBLÉMATIQUE ─────────────────────────────────────────────────
const ProblématiqueSection: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const dur = T.SOLUTION_START - T.PROBLEMATIQUE_START;

	const titleOpacity = fadeIn(frame, 5, 20) * fadeOut(frame, dur);
	const narrationOpacity = fadeIn(frame, 10, 30) * fadeOut(frame, dur);

	const stat1Spring = spring({frame, fps, config: {damping: 80, stiffness: 200}, durationInFrames: 20});
	const stat2Spring = spring({frame: frame - 15, fps, config: {damping: 80, stiffness: 200}, durationInFrames: 20});
	const stat3Spring = spring({frame: frame - 30, fps, config: {damping: 80, stiffness: 200}, durationInFrames: 20});

	const s1y = interpolate(stat1Spring, [0, 1], [40, 0]);
	const s2y = interpolate(stat2Spring, [0, 1], [40, 0]);
	const s3y = interpolate(stat3Spring, [0, 1], [40, 0]);

	return (
		<AbsoluteFill>
			<SectionTitle label="PROBLÉMATIQUE" opacity={titleOpacity} />
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: 80,
					right: 80,
					transform: 'translateY(-55%)',
					display: 'flex',
					gap: 24,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				<StatCard
					value="56%"
					label="Manque de financement"
					sub="des agro-entrepreneurs citent l'absence de financement"
					color="#FFD54F"
					opacity={stat1Spring}
					y={s1y}
				/>
				<StatCard
					value="45%"
					label="Accès à la terre"
					sub="n'ont pas accès aux terres agricoles"
					color="#80CBC4"
					opacity={stat2Spring}
					y={s2y}
				/>
				<StatCard
					value="80%"
					label="Parcelles inoccupées"
					sub="des propriétaires n'osent pas confier leur terrain"
					color="#A5D6A7"
					opacity={stat3Spring}
					y={s3y}
				/>
			</div>
			<Narration
				text="56% citent l'absence de financement. 45%, l'accès à la terre. 80% des propriétaires ont des parcelles inoccupées qu'ils n'osent pas confier, faute de confiance et de cadre légal."
				opacity={narrationOpacity}
			/>
		</AbsoluteFill>
	);
};

// ─── SECTION 3: SOLUTION ─────────────────────────────────────────────────────
const SolutionSection: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const dur = T.AGRO_START - T.SOLUTION_START;

	const titleOpacity = fadeIn(frame, 5, 20) * fadeOut(frame, dur);
	const narrationOpacity = fadeIn(frame, 10, 30) * fadeOut(frame, dur);

	const phoneSpring = spring({frame, fps, config: {damping: 70, stiffness: 180}, durationInFrames: 25});
	const phoneOpacity = fadeIn(frame, 0, 20) * fadeOut(frame, dur);

	const showMatches = frame > 7 * FPS;
	const matchOpacity = interpolate(frame, [7 * FPS, 7 * FPS + 20], [0, 1], {extrapolateRight: 'clamp'}) * fadeOut(frame, dur);

	const actorsOpacity = fadeIn(frame, 4 * FPS, 4 * FPS + 20) * fadeOut(frame, dur);

	return (
		<AbsoluteFill>
			<SectionTitle label="SOLUTION" opacity={titleOpacity} />

			{/* Left phone - Home */}
			<PhoneMockup opacity={phoneOpacity * (showMatches ? 0.4 : 1)} x={-230}>
				<HomeScreen />
			</PhoneMockup>

			{/* Right phone - Matches (appears after 7s) */}
			<PhoneMockup opacity={matchOpacity} x={230}>
				<MatchesScreen />
			</PhoneMockup>

			{/* Actor pills */}
			<div
				style={{
					position: 'absolute',
					top: 90,
					left: 0,
					right: 0,
					display: 'flex',
					justifyContent: 'center',
					gap: 16,
					opacity: actorsOpacity,
					fontFamily: 'system-ui, sans-serif',
				}}
			>
				{[
					{emoji: '🌱', label: 'Agro-entrepreneur', bg: C.appGreen},
					{emoji: '🏡', label: 'Propriétaire foncier', bg: C.proprioText},
					{emoji: '💼', label: 'Investisseur', bg: C.investText},
				].map(({emoji, label, bg}) => (
					<div
						key={label}
						style={{
							background: bg,
							borderRadius: 24,
							padding: '8px 20px',
							fontSize: 16,
							fontWeight: 700,
							color: C.white,
							display: 'flex',
							alignItems: 'center',
							gap: 8,
						}}
					>
						<span>{emoji}</span>
						<span>{label}</span>
					</div>
				))}
			</div>

			<Narration
				text="Terre d'Avenir met en relation trois acteurs clés : agro-entrepreneurs, propriétaires fonciers, et investisseurs — jouant le rôle de tiers de confiance."
				opacity={narrationOpacity}
			/>
		</AbsoluteFill>
	);
};

// ─── SECTION 4: DEMO AGRO-ENTREPRENEUR ───────────────────────────────────────
const DemoAgroSection: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const dur = T.PROPRIO_START - T.AGRO_START;

	const badgeY = interpolate(
		spring({frame, fps, config: {damping: 80, stiffness: 200}, durationInFrames: 20}),
		[0, 1], [30, 0]
	);
	const badgeOpacity = fadeIn(frame, 0, 15) * fadeOut(frame, dur);

	const screen1Opacity = fadeIn(frame, 0, 15) * interpolate(frame, [3 * FPS - 10, 3 * FPS], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const screen2Opacity = interpolate(frame, [3 * FPS, 3 * FPS + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) *
		interpolate(frame, [6 * FPS - 10, 6 * FPS], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const screen3Opacity = interpolate(frame, [6 * FPS, 6 * FPS + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * fadeOut(frame, dur);

	const narrationOpacity = fadeIn(frame, 5, 20) * fadeOut(frame, dur);

	return (
		<AbsoluteFill>
			<ProfileBadge emoji="🌱" label="Agro-entrepreneur" color={C.appGreen} opacity={badgeOpacity} y={badgeY} />

			<PhoneMockup opacity={screen1Opacity}>
				<PublierScreen />
			</PhoneMockup>
			<PhoneMockup opacity={screen2Opacity}>
				<MatchesScreen />
			</PhoneMockup>
			<PhoneMockup opacity={screen3Opacity}>
				<MessagesScreen />
			</PhoneMockup>

			<Narration
				text="Tu publies ton projet avec tes besoins. L'app te propose des matches : parcelles disponibles et investisseurs compatibles. Tu échanges, le contrat est sécurisé."
				opacity={narrationOpacity}
			/>
		</AbsoluteFill>
	);
};

// ─── SECTION 5: DEMO PROPRIÉTAIRE FONCIER ────────────────────────────────────
const DemoProprioSection: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const dur = T.INVEST_START - T.PROPRIO_START;

	const badgeY = interpolate(
		spring({frame, fps, config: {damping: 80, stiffness: 200}, durationInFrames: 20}),
		[0, 1], [30, 0]
	);
	const badgeOpacity = fadeIn(frame, 0, 15) * fadeOut(frame, dur);

	const screen1Opacity = fadeIn(frame, 0, 15) *
		interpolate(frame, [5 * FPS - 10, 5 * FPS], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const screen2Opacity = interpolate(frame, [5 * FPS, 5 * FPS + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * fadeOut(frame, dur);

	const narrationOpacity = fadeIn(frame, 5, 20) * fadeOut(frame, dur);

	return (
		<AbsoluteFill>
			<ProfileBadge emoji="🏡" label="Propriétaire foncier" color={C.proprioText} opacity={badgeOpacity} y={badgeY} />

			<PhoneMockup opacity={screen1Opacity}>
				<MatchesScreen />
			</PhoneMockup>
			<PhoneMockup opacity={screen2Opacity}>
				<MessagesScreen />
			</PhoneMockup>

			<Narration
				text="Tu déclares ta parcelle disponible. Tu reçois des demandes de jeunes agro-entrepreneurs vérifiés. Terre d'Avenir sécurise l'accord et te protège juridiquement."
				opacity={narrationOpacity}
			/>
		</AbsoluteFill>
	);
};

// ─── SECTION 6: DEMO INVESTISSEUR ────────────────────────────────────────────
const DemoInvestisseurSection: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const dur = T.CONCLUSION_START - T.INVEST_START;

	const badgeY = interpolate(
		spring({frame, fps, config: {damping: 80, stiffness: 200}, durationInFrames: 20}),
		[0, 1], [30, 0]
	);
	const badgeOpacity = fadeIn(frame, 0, 15) * fadeOut(frame, dur);

	const screen1Opacity = fadeIn(frame, 0, 15) *
		interpolate(frame, [5 * FPS - 10, 5 * FPS], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const screen2Opacity = interpolate(frame, [5 * FPS, 5 * FPS + 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * fadeOut(frame, dur);

	const narrationOpacity = fadeIn(frame, 5, 20) * fadeOut(frame, dur);

	return (
		<AbsoluteFill>
			<ProfileBadge emoji="💼" label="Investisseur" color={C.investText} opacity={badgeOpacity} y={badgeY} />

			<PhoneMockup opacity={screen1Opacity}>
				<MatchesScreen />
			</PhoneMockup>
			<PhoneMockup opacity={screen2Opacity}>
				<MarketplaceScreen />
			</PhoneMockup>

			<Narration
				text="Tu explores des projets agricoles documentés et vérifiés. Tu investis dans ceux qui correspondent à tes objectifs — depuis n'importe où dans le monde."
				opacity={narrationOpacity}
			/>
		</AbsoluteFill>
	);
};

// ─── SECTION 7: CONCLUSION ───────────────────────────────────────────────────
const ConclusionSection: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const dur = T.END - T.CONCLUSION_START;

	const phoneOpacity = fadeIn(frame, 0, 20) *
		interpolate(frame, [8 * FPS, 10 * FPS], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const logoScale = interpolate(
		spring({frame: frame - 8 * FPS, fps, config: {damping: 70, stiffness: 150}, durationInFrames: 30}),
		[0, 1], [0.7, 1]
	);
	const logoOpacity = interpolate(frame, [8 * FPS, 9 * FPS], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) *
		interpolate(frame, [dur - 25, dur], [1, 0], {extrapolateLeft: 'clamp'});

	return (
		<AbsoluteFill>
			<PhoneMockup opacity={phoneOpacity} x={-230}>
				<MarketplaceScreen />
			</PhoneMockup>
			<PhoneMockup opacity={phoneOpacity} x={230}>
				<HomeScreen />
			</PhoneMockup>
			<LogoTagline opacity={logoOpacity} scale={logoScale} />
		</AbsoluteFill>
	);
};

// ─── ROOT COMPOSITION ─────────────────────────────────────────────────────────
export const TerreAvenir: React.FC = () => {
	return (
		<AbsoluteFill>
			<Audio src={staticFile('voiceover.mp3')} />
			<Background />

			<Sequence from={T.CONSTAT_START} durationInFrames={T.PROBLEMATIQUE_START - T.CONSTAT_START + 15}>
				<ConstatSection />
			</Sequence>

			<Sequence from={T.PROBLEMATIQUE_START} durationInFrames={T.SOLUTION_START - T.PROBLEMATIQUE_START + 15}>
				<ProblématiqueSection />
			</Sequence>

			<Sequence from={T.SOLUTION_START} durationInFrames={T.AGRO_START - T.SOLUTION_START + 15}>
				<SolutionSection />
			</Sequence>

			<Sequence from={T.AGRO_START} durationInFrames={T.PROPRIO_START - T.AGRO_START + 15}>
				<DemoAgroSection />
			</Sequence>

			<Sequence from={T.PROPRIO_START} durationInFrames={T.INVEST_START - T.PROPRIO_START + 15}>
				<DemoProprioSection />
			</Sequence>

			<Sequence from={T.INVEST_START} durationInFrames={T.CONCLUSION_START - T.INVEST_START + 15}>
				<DemoInvestisseurSection />
			</Sequence>

			<Sequence from={T.CONCLUSION_START} durationInFrames={T.END - T.CONCLUSION_START}>
				<ConclusionSection />
			</Sequence>
		</AbsoluteFill>
	);
};
