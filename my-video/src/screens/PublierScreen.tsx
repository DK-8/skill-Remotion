import React from 'react';
import {C} from '../theme';

const f = 'system-ui, -apple-system, sans-serif';

const Field: React.FC<{icon: string; placeholder: string; tall?: boolean}> = ({
	icon,
	placeholder,
	tall,
}) => (
	<div
		style={{
			background: C.lightGray,
			borderRadius: 10,
			padding: tall ? '12px 14px 40px' : '12px 14px',
			display: 'flex',
			alignItems: 'flex-start',
			gap: 10,
			fontSize: 12,
			color: C.darkGray,
		}}
	>
		<span style={{fontSize: 16}}>{icon}</span>
		<span>{placeholder}</span>
	</div>
);

const SectionHeader: React.FC<{icon: string; label: string; color: string}> = ({
	icon,
	label,
	color,
}) => (
	<div
		style={{
			display: 'flex',
			alignItems: 'center',
			gap: 10,
			marginBottom: 12,
		}}
	>
		<div
			style={{
				width: 32,
				height: 32,
				borderRadius: 8,
				background: C.appGreenPale,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: 16,
			}}
		>
			{icon}
		</div>
		<span style={{fontSize: 15, fontWeight: 700, color}}>{label}</span>
	</div>
);

export const PublierScreen: React.FC = () => (
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
				padding: '18px 16px 14px',
				background: C.white,
				borderBottom: `1px solid ${C.gray}`,
			}}
		>
			<div style={{fontSize: 22, fontWeight: 700, color: C.darkText}}>
				Publier un projet
			</div>
		</div>

		<div style={{flex: 1, padding: 14, overflow: 'hidden'}}>
			{/* Role selector */}
			<div
				style={{
					background: C.appGreenPale,
					borderRadius: 12,
					padding: '12px 16px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: 16,
				}}
			>
				<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
					<span style={{fontSize: 20}}>🚜</span>
					<div>
						<div style={{fontSize: 10, color: C.darkGray}}>Publier en tant que</div>
						<div style={{fontSize: 13, fontWeight: 700, color: C.appGreen}}>
							Agro-entrepreneur
						</div>
					</div>
				</div>
				<span style={{fontSize: 18, color: C.appGreen}}>⇄</span>
			</div>

			{/* Section: Infos générales */}
			<SectionHeader icon="📝" label="Informations générales" color={C.appGreen} />
			<div style={{display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16}}>
				<Field
					icon="T"
					placeholder="ex: Projet de riziculture irriguée — 5 ha, Mo..."
				/>
				<Field
					icon="📄"
					placeholder="Décrivez votre projet agricole, vos compétences, ce dont vous avez besoin (terrain, financement)..."
					tall
				/>
				<div
					style={{
						background: C.lightGray,
						borderRadius: 10,
						padding: '12px 14px',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						fontSize: 12,
						color: C.darkGray,
					}}
				>
					<div style={{display: 'flex', alignItems: 'center', gap: 8}}>
						<span>📍</span>
						<span>Région du Bénin</span>
					</div>
					<span>▼</span>
				</div>
			</div>

			{/* Section: Détails projet */}
			<SectionHeader icon="🚜" label="Détails de votre projet agricole" color={C.appGreen} />
			<div style={{fontSize: 12, color: C.darkText, marginBottom: 6, fontWeight: 600}}>
				Culture / Production *
			</div>
			<Field icon="🌿" placeholder="Type de culture ou d'élevage (ex: Soja, Maïs...)" />
			<div
				style={{
					display: 'flex',
					gap: 12,
					marginTop: 12,
				}}
			>
				<div style={{flex: 1}}>
					<div style={{fontSize: 12, color: C.darkText, marginBottom: 6, fontWeight: 600}}>
						Durée (mois) *
					</div>
					<Field icon="⏱" placeholder="ex: 6" />
				</div>
				<div style={{flex: 1}}>
					<div style={{fontSize: 12, color: C.darkText, marginBottom: 6, fontWeight: 600}}>
						Superficie (ha)
					</div>
					<Field icon="🏔" placeholder="ex: 5" />
				</div>
			</div>
			<div style={{marginTop: 12}}>
				<div style={{fontSize: 12, color: C.darkText, marginBottom: 6, fontWeight: 600}}>
					Financement recherché (FCFA) *
				</div>
				<Field icon="💰" placeholder="ex: 3500000" />
			</div>
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
							style={{fontSize: 9, color: C.darkGray}}
						>
							{item.label}
						</span>
					</div>
				)
			)}
		</div>
	</div>
);
