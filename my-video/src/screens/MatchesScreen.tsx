import React from 'react';
import {C} from '../theme';

const f = 'system-ui, -apple-system, sans-serif';

const Tab: React.FC<{label: string; count: number; active?: boolean}> = ({
	label,
	count,
	active,
}) => (
	<div
		style={{
			display: 'flex',
			alignItems: 'center',
			gap: 6,
			paddingBottom: 10,
			borderBottom: active ? `2px solid ${C.appGreen}` : '2px solid transparent',
			cursor: 'pointer',
		}}
	>
		<span
			style={{
				fontSize: 13,
				color: active ? C.appGreen : C.darkGray,
				fontWeight: active ? 600 : 400,
			}}
		>
			{label}
		</span>
		<div
			style={{
				background: C.appGreen,
				color: C.white,
				borderRadius: 10,
				width: 18,
				height: 18,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: 10,
				fontWeight: 700,
			}}
		>
			{count}
		</div>
	</div>
);

const FilterChip: React.FC<{label: string; active?: boolean}> = ({
	label,
	active,
}) => (
	<div
		style={{
			padding: '5px 12px',
			borderRadius: 16,
			fontSize: 11,
			background: active ? C.appGreen : C.white,
			color: active ? C.white : C.medText,
			border: active ? 'none' : `1px solid ${C.gray}`,
			fontWeight: active ? 600 : 400,
		}}
	>
		{label}
	</div>
);

const MatchCard: React.FC<{
	status: 'pending' | 'processing' | 'done';
	badgeBg: string;
	badgeColor: string;
	badgeIcon: string;
	badgeLabel: string;
	title: string;
	desc: string;
	tag1: string;
	tag2: string;
	extra?: string;
	note?: string;
}> = ({
	status,
	badgeBg,
	badgeColor,
	badgeIcon,
	badgeLabel,
	title,
	desc,
	tag1,
	tag2,
	extra,
	note,
}) => {
	const statusConfig = {
		pending: {icon: '⏳', label: 'En attente de traitement', color: C.pendingOrange, bg: '#FFF3E0'},
		processing: {icon: '🔄', label: 'En cours de traitement', color: C.processingBlue, bg: '#E3F2FD'},
		done: {icon: '✅', label: 'Finalisé', color: C.appGreen, bg: C.appGreenPale},
	};
	const sc = statusConfig[status];

	return (
		<div
			style={{
				background: C.white,
				borderRadius: 14,
				overflow: 'hidden',
				boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
				marginBottom: 12,
			}}
		>
			<div
				style={{
					background: sc.bg,
					padding: '8px 14px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<span style={{fontSize: 12, color: sc.color, fontWeight: 600}}>
					{sc.icon} {sc.label}
				</span>
				<span style={{fontSize: 11, color: C.darkGray}}>Vous avez matché</span>
			</div>
			<div style={{padding: 14}}>
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
							background: badgeBg,
							color: badgeColor,
							padding: '3px 10px',
							borderRadius: 12,
							fontSize: 11,
							fontWeight: 600,
						}}
					>
						{badgeIcon} {badgeLabel}
					</div>
					<span style={{fontSize: 10, color: C.darkGray}}>📍 Borgou</span>
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
					{title}
				</div>
				<div
					style={{
						fontSize: 11,
						color: C.darkGray,
						marginBottom: 8,
						lineHeight: 1.4,
					}}
				>
					{desc}
				</div>
				<div style={{display: 'flex', gap: 6, marginBottom: extra ? 8 : 0}}>
					<div
						style={{
							padding: '4px 10px',
							borderRadius: 12,
							background: C.lightGray,
							fontSize: 11,
						}}
					>
						{tag1}
					</div>
					<div
						style={{
							padding: '4px 10px',
							borderRadius: 12,
							background: C.lightGray,
							fontSize: 11,
						}}
					>
						{tag2}
					</div>
				</div>
				{extra && (
					<div
						style={{
							background: C.appGreenPale,
							borderRadius: 8,
							padding: '8px 12px',
							fontSize: 12,
							color: C.appGreenDark,
							display: 'flex',
							alignItems: 'center',
							gap: 6,
							marginBottom: 8,
						}}
					>
						👤 {extra}
					</div>
				)}
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<span style={{fontSize: 11, color: C.darkGray}}>👁 47 &nbsp; 📎 3</span>
					<div
						style={{
							border: `1px solid ${C.gray}`,
							color: C.medText,
							padding: '5px 14px',
							borderRadius: 16,
							fontSize: 11,
						}}
					>
						↗ Voir
					</div>
				</div>
				{note && (
					<div
						style={{
							marginTop: 10,
							background: '#FFFDE7',
							borderRadius: 8,
							padding: '8px 12px',
							fontSize: 11,
							color: C.medText,
							display: 'flex',
							alignItems: 'center',
							gap: 6,
						}}
					>
						ℹ️ {note}
					</div>
				)}
			</div>
		</div>
	);
};

export const MatchesScreen: React.FC = () => (
	<div
		style={{
			width: '100%',
			height: '100%',
			background: C.offWhite,
			fontFamily: f,
			display: 'flex',
			flexDirection: 'column',
			overflow: 'hidden',
		}}
	>
		<div
			style={{
				padding: '18px 16px 0',
				background: C.white,
				borderBottom: `1px solid ${C.gray}`,
			}}
		>
			<div
				style={{
					fontSize: 22,
					fontWeight: 700,
					color: C.darkText,
					marginBottom: 14,
				}}
			>
				Mes Matches
			</div>
			<div style={{display: 'flex', gap: 24}}>
				<Tab label="Matches envoyés" count={3} active />
				<Tab label="Matches reçus" count={3} />
			</div>
		</div>
		<div
			style={{
				display: 'flex',
				gap: 8,
				padding: '10px 14px',
				background: C.white,
			}}
		>
			<FilterChip label="Tous" active />
			<FilterChip label="En attente" />
			<FilterChip label="En traitement" />
			<FilterChip label="Finalisés" />
		</div>
		<div style={{flex: 1, padding: '10px 14px', overflow: 'hidden'}}>
			<MatchCard
				status="pending"
				badgeBg={C.proprioBg}
				badgeColor={C.proprioText}
				badgeIcon="🏔"
				badgeLabel="Propriétaire foncier"
				title="Parcelle de 8 ha disponible — Terre fertile, Borgou"
				desc="Terre noire très fertile, idéale pour le soja, le maïs ou le coton..."
				tag1="🏔 8 ha"
				tag2="⏱ 36 mois"
				extra="Superficie demandée : 5.0 ha sur 8.0 ha"
				note="L'équipe Terre d'Avenir va examiner ce match et vous contacter."
			/>
			<MatchCard
				status="processing"
				badgeBg={C.investBg}
				badgeColor={C.investText}
				badgeIcon="🏛"
				badgeLabel="Investisseur"
				title="Investissement de 5 000 000 FCFA — Production de soja"
				desc="Je suis prêt à mobiliser 5 millions pour les intrants, semences..."
				tag1="⏱ 12 mois"
				tag2="🌿 Soja"
			/>
		</div>
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
			{[
				{icon: '🏠', label: 'Accueil', active: false},
				{icon: '🤝', label: 'Matches', active: true},
				{icon: '➕', label: 'Publier', special: true},
				{icon: '💬', label: 'Messages', active: false},
				{icon: '👤', label: 'Profil', active: false},
			].map((item) =>
				item.special ? (
					<div
						key="pub"
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
						key={item.label}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 2,
						}}
					>
						<span style={{fontSize: 18}}>{item.icon}</span>
						<span
							style={{
								fontSize: 9,
								color: item.active ? C.appGreen : C.darkGray,
								fontWeight: item.active ? 600 : 400,
							}}
						>
							{item.label}
						</span>
					</div>
				)
			)}
		</div>
	</div>
);
