import React from 'react';
import {C} from '../theme';

const s = {
	root: {
		width: '100%',
		height: '100%',
		background: C.offWhite,
		fontFamily: 'system-ui, -apple-system, sans-serif',
		display: 'flex',
		flexDirection: 'column' as const,
		overflow: 'hidden',
	},
	header: {
		padding: '14px 16px 10px',
		background: C.white,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottom: `1px solid ${C.gray}`,
	},
	logoRow: {display: 'flex', alignItems: 'center', gap: 8},
	logoBox: {
		width: 34,
		height: 34,
		background: C.appGreen,
		borderRadius: 8,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 18,
	},
	logoText: {fontSize: 17, fontWeight: 700 as const, color: C.appGreen},
	icons: {display: 'flex', gap: 14, fontSize: 18},
	searchBar: {
		margin: '10px 14px 6px',
		background: C.lightGray,
		borderRadius: 24,
		padding: '9px 14px',
		display: 'flex',
		alignItems: 'center',
		gap: 8,
		fontSize: 13,
		color: C.darkGray,
	},
	chips: {
		display: 'flex',
		gap: 8,
		padding: '4px 14px 10px',
		overflowX: 'hidden' as const,
	},
	cards: {
		flex: 1,
		padding: '0 14px',
		display: 'flex',
		flexDirection: 'column' as const,
		gap: 12,
		overflow: 'hidden',
	},
};

const Chip: React.FC<{label: string; active?: boolean}> = ({label, active}) => (
	<div
		style={{
			padding: '6px 14px',
			borderRadius: 20,
			fontSize: 12,
			fontWeight: active ? 600 : 400,
			background: active ? C.appGreen : C.white,
			color: active ? C.white : C.medText,
			border: active ? 'none' : `1px solid ${C.gray}`,
			whiteSpace: 'nowrap' as const,
		}}
	>
		{label}
	</div>
);

const Tag: React.FC<{icon: string; label: string}> = ({icon, label}) => (
	<div
		style={{
			display: 'inline-flex',
			alignItems: 'center',
			gap: 4,
			padding: '4px 10px',
			borderRadius: 12,
			background: C.lightGray,
			fontSize: 11,
			color: C.medText,
		}}
	>
		<span>{icon}</span>
		<span>{label}</span>
	</div>
);

const ProgressBar: React.FC<{fill: number; label: string; sub: string}> = ({
	fill,
	label,
	sub,
}) => (
	<div style={{marginTop: 8}}>
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				fontSize: 11,
				marginBottom: 4,
			}}
		>
			<span style={{color: C.darkGray}}>{label}</span>
			<span style={{color: C.appGreen, fontWeight: 600}}>{sub}</span>
		</div>
		<div
			style={{
				height: 6,
				background: C.gray,
				borderRadius: 3,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: `${fill * 100}%`,
					height: '100%',
					background: C.appGreen,
					borderRadius: 3,
				}}
			/>
		</div>
	</div>
);

const ProprioCard: React.FC = () => (
	<div
		style={{
			background: C.white,
			borderRadius: 12,
			borderLeft: `4px solid ${C.proprioBorder}`,
			padding: 14,
			boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
		}}
	>
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: 6,
			}}
		>
			<div
				style={{
					background: C.proprioBg,
					color: C.proprioText,
					padding: '3px 10px',
					borderRadius: 12,
					fontSize: 11,
					fontWeight: 600,
				}}
			>
				🏔 Propriétaire foncier
			</div>
			<span style={{fontSize: 10, color: C.darkGray}}>📍 Borgou · 2j</span>
		</div>
		<div
			style={{
				fontSize: 13,
				fontWeight: 700,
				color: C.darkText,
				marginBottom: 4,
				lineHeight: 1.3,
			}}
		>
			Parcelle de 8 ha disponible — Terre fertile, Borgou
		</div>
		<div
			style={{fontSize: 11, color: C.darkGray, marginBottom: 8, lineHeight: 1.4}}
		>
			Je mets à disposition une parcelle agricole de 8 ha à 12 km de Parakou...
		</div>
		<div style={{display: 'flex', gap: 6, marginBottom: 8}}>
			<Tag icon="🏔" label="8 ha" />
			<Tag icon="⏱" label="36 mois" />
		</div>
		<ProgressBar
			fill={3 / 8}
			label="Superficie"
			sub="5 ha restants disponibles"
		/>
		<div style={{fontSize: 10, color: C.darkGray, marginTop: 2}}>
			3 / 8 ha engagés
		</div>
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginTop: 10,
			}}
		>
			<span style={{fontSize: 11, color: C.darkGray}}>👁 47 &nbsp; 📎 3</span>
			<div
				style={{
					background: C.matcherBtn,
					color: C.white,
					padding: '7px 16px',
					borderRadius: 20,
					fontSize: 12,
					fontWeight: 600,
				}}
			>
				⚡ Matcher
			</div>
		</div>
	</div>
);

const InvestCard: React.FC = () => (
	<div
		style={{
			background: C.white,
			borderRadius: 12,
			borderLeft: `4px solid ${C.investBorder}`,
			padding: 14,
			boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
		}}
	>
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: 6,
			}}
		>
			<div
				style={{
					background: C.investBg,
					color: C.investText,
					padding: '3px 10px',
					borderRadius: 12,
					fontSize: 11,
					fontWeight: 600,
				}}
			>
				🏛 Investisseur
			</div>
			<span style={{fontSize: 10, color: C.darkGray}}>📍 Borgou · 20h</span>
		</div>
		<div
			style={{
				fontSize: 13,
				fontWeight: 700,
				color: C.darkText,
				marginBottom: 4,
				lineHeight: 1.3,
			}}
		>
			Investissement de 5 000 000 FCFA — Production de soja
		</div>
		<div
			style={{fontSize: 11, color: C.darkGray, marginBottom: 8, lineHeight: 1.4}}
		>
			Investisseur sérieux, je souhaite financer un projet de production de
			soja...
		</div>
		<div style={{display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 8}}>
			<Tag icon="⏱" label="12 mois" />
			<Tag icon="🌿" label="Soja" />
			<Tag icon="🛡" label="Risque: Faible" />
			<Tag icon="%" label="22%" />
		</div>
		<ProgressBar
			fill={2 / 5}
			label="Disponible"
			sub="3M FCFA restants disponibles"
		/>
		<div style={{fontSize: 10, color: C.darkGray, marginTop: 2}}>
			2M / 5M FCFA engagés
		</div>
	</div>
);

const BottomNav: React.FC<{active: string}> = ({active}) => {
	const items = [
		{id: 'accueil', icon: '🏠', label: 'Accueil'},
		{id: 'matches', icon: '🤝', label: 'Matches'},
		{id: 'publish', icon: '➕', label: 'Publier', special: true},
		{id: 'messages', icon: '💬', label: 'Messages'},
		{id: 'profil', icon: '👤', label: 'Profil'},
	];
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
				padding: '8px 0 10px',
				background: C.white,
				borderTop: `1px solid ${C.gray}`,
			}}
		>
			{items.map((item) =>
				item.special ? (
					<div
						key={item.id}
						style={{
							width: 48,
							height: 48,
							borderRadius: 24,
							background: C.appGreen,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 22,
							color: C.white,
						}}
					>
						{item.icon}
					</div>
				) : (
					<div
						key={item.id}
						style={{
							display: 'flex',
							flexDirection: 'column' as const,
							alignItems: 'center',
							gap: 2,
						}}
					>
						<span style={{fontSize: 18}}>{item.icon}</span>
						<span
							style={{
								fontSize: 9,
								color: active === item.id ? C.appGreen : C.darkGray,
								fontWeight: active === item.id ? 600 : 400,
							}}
						>
							{item.label}
						</span>
					</div>
				)
			)}
		</div>
	);
};

export const HomeScreen: React.FC = () => (
	<div style={s.root}>
		<div style={s.header}>
			<div style={s.logoRow}>
				<div style={s.logoBox}>🌿</div>
				<span style={s.logoText}>Terre d'Avenir</span>
			</div>
			<div style={s.icons}>
				<span>🏪</span>
				<span>🔔</span>
			</div>
		</div>
		<div style={s.searchBar}>
			<span>🔍</span>
			<span>Rechercher une publication...</span>
		</div>
		<div style={s.chips}>
			<Chip label="Tous" active />
			<Chip label="Agro-entrepreneurs" />
			<Chip label="Propriétaires fonciers" />
		</div>
		<div style={s.cards}>
			<ProprioCard />
			<InvestCard />
		</div>
		<BottomNav active="accueil" />
	</div>
);
