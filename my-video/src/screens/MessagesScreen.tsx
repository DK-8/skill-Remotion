import React from 'react';
import {C} from '../theme';

const f = 'system-ui, -apple-system, sans-serif';

const MsgRow: React.FC<{
	title: string;
	time: string;
	preview: string;
	unread?: boolean;
	avatarBg: string;
}> = ({title, time, preview, unread, avatarBg}) => (
	<div
		style={{
			display: 'flex',
			gap: 12,
			padding: '12px 0',
			borderBottom: `1px solid ${C.lightGray}`,
			alignItems: 'flex-start',
		}}
	>
		<div style={{position: 'relative' as const}}>
			<div
				style={{
					width: 44,
					height: 44,
					borderRadius: 22,
					background: avatarBg,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: 12,
					fontWeight: 700,
					color: C.white,
				}}
			>
				TDAV
			</div>
			<div
				style={{
					position: 'absolute' as const,
					bottom: 0,
					right: 0,
					width: 14,
					height: 14,
					borderRadius: 7,
					background: C.appGreen,
					border: `2px solid ${C.white}`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<span style={{fontSize: 7, color: C.white}}>✓</span>
			</div>
		</div>
		<div style={{flex: 1, minWidth: 0}}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: 3,
				}}
			>
				<span
					style={{fontSize: 13, fontWeight: 700, color: C.darkText}}
				>
					{title}
				</span>
				<span style={{fontSize: 10, color: C.darkGray}}>{time}</span>
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 4,
					fontSize: 11,
					color: C.darkGray,
				}}
			>
				<span style={{fontSize: 11, color: C.appGreen}}>✓ Équipe Terre d'Avenir</span>
			</div>
			<div
				style={{
					fontSize: 12,
					color: C.medText,
					marginTop: 2,
					overflow: 'hidden',
					whiteSpace: 'nowrap' as const,
					textOverflow: 'ellipsis',
				}}
			>
				{preview}
			</div>
		</div>
		{unread && (
			<div
				style={{
					width: 10,
					height: 10,
					borderRadius: 5,
					background: C.appGreen,
					marginTop: 6,
					flexShrink: 0,
				}}
			/>
		)}
	</div>
);

export const MessagesScreen: React.FC = () => (
	<div
		style={{
			width: '100%',
			height: '100%',
			background: C.white,
			fontFamily: f,
			display: 'flex',
			flexDirection: 'column',
			overflow: 'hidden',
		}}
	>
		<div
			style={{
				padding: '18px 16px 14px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderBottom: `1px solid ${C.gray}`,
			}}
		>
			<div style={{fontSize: 22, fontWeight: 700, color: C.darkText}}>
				Messages
			</div>
			<div
				style={{
					background: C.appGreenPale,
					borderRadius: 16,
					padding: '4px 12px',
					display: 'flex',
					alignItems: 'center',
					gap: 6,
					fontSize: 12,
					color: C.appGreen,
					fontWeight: 600,
				}}
			>
				🛡 Équipe TDAV
			</div>
		</div>

		<div
			style={{
				display: 'flex',
				gap: 8,
				padding: '10px 14px',
				borderBottom: `1px solid ${C.lightGray}`,
			}}
		>
			{['Tous', 'Agro-entrepreneurs', 'Propriétaires fonciers'].map((label, i) => (
				<div
					key={label}
					style={{
						padding: '5px 12px',
						borderRadius: 16,
						fontSize: 11,
						background: i === 0 ? C.appGreen : C.white,
						color: i === 0 ? C.white : C.medText,
						border: i === 0 ? 'none' : `1px solid ${C.gray}`,
						fontWeight: i === 0 ? 600 : 400,
					}}
				>
					{label}
				</div>
			))}
		</div>

		<div
			style={{
				background: C.appGreenPale,
				margin: '10px 14px',
				borderRadius: 10,
				padding: '10px 14px',
				display: 'flex',
				alignItems: 'center',
				gap: 8,
				fontSize: 12,
				color: C.appGreenDark,
			}}
		>
			🛡 Vos échanges avec l'équipe Terre d'Avenir — matches &amp; commandes marketplace.
		</div>

		<div style={{flex: 1, padding: '0 14px', overflow: 'hidden'}}>
			<MsgRow
				title="Parcelle 8 ha — Borgou"
				time="Il y a 2h"
				preview="Pouvez-vous nous préciser la superficie souhaitée et le type de culture envisagé ?"
				unread
				avatarBg={C.appGreenDark}
			/>
			<MsgRow
				title="Investissement 5M FCFA — Soja"
				time="Hier"
				preview="Votre dossier est en cours d'analyse. Nous revenons vers vous sous 72h."
				avatarBg="#F57F17"
			/>
			<MsgRow
				title="Financement 5M FCFA — Soja, Par..."
				time="Il y a 10j"
				preview="Match finalisé ! Votre contribution de 500 000 FCFA a été validée. Merci pour votre soutien."
				avatarBg={C.appGreen}
			/>
			<MsgRow
				title="Besoin financement 3.5M FCFA ..."
				time="Il y a 4j"
				preview="Un investisseur a contribué 1 400 000 FCFA à votre projet. Notre équipe examine le dossier."
				unread
				avatarBg={C.appGreenDark}
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
				{icon: '🤝', label: 'Matches', active: false},
				{icon: '➕', label: 'Publier', special: true},
				{icon: '💬', label: 'Messages', active: true},
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
