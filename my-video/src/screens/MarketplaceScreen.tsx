import React from 'react';
import {C} from '../theme';

const f = 'system-ui, -apple-system, sans-serif';

const CatChip: React.FC<{label: string; active?: boolean}> = ({label, active}) => (
	<div
		style={{
			padding: '6px 14px',
			borderRadius: 20,
			fontSize: 11,
			background: active ? C.appGreen : C.white,
			color: active ? C.white : C.medText,
			border: active ? 'none' : `1px solid ${C.gray}`,
			fontWeight: active ? 600 : 400,
			whiteSpace: 'nowrap' as const,
		}}
	>
		{label}
	</div>
);

const ProductCard: React.FC<{
	name: string;
	price: string;
	qty: string;
	region: string;
}> = ({name, price, qty, region}) => (
	<div
		style={{
			background: C.white,
			borderRadius: 12,
			overflow: 'hidden',
			boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
		}}
	>
		<div
			style={{
				background: C.appGreenPale,
				height: 90,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: 30,
			}}
		>
			🖼
		</div>
		<div style={{padding: '8px 10px 10px'}}>
			<div
				style={{
					fontSize: 11,
					color: C.darkText,
					fontWeight: 600,
					marginBottom: 3,
					lineHeight: 1.3,
					overflow: 'hidden',
					display: '-webkit-box',
					WebkitLineClamp: 2,
					WebkitBoxOrient: 'vertical' as const,
				}}
			>
				{name}
			</div>
			<div
				style={{fontSize: 13, fontWeight: 700, color: C.appGreen, marginBottom: 3}}
			>
				{price}
			</div>
			<div style={{fontSize: 10, color: C.darkGray, marginBottom: 3}}>{qty}</div>
			<div style={{fontSize: 10, color: C.darkGray}}>📍 {region}</div>
		</div>
	</div>
);

export const MarketplaceScreen: React.FC = () => (
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
				padding: '14px 16px 12px',
				background: C.white,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderBottom: `1px solid ${C.gray}`,
			}}
		>
			<div style={{display: 'flex', alignItems: 'center', gap: 10}}>
				<span style={{fontSize: 18, color: C.appGreen}}>←</span>
				<span style={{fontSize: 17, fontWeight: 700, color: C.darkText}}>
					Marketplace Agricole
				</span>
			</div>
			<span style={{fontSize: 20}}>⊕</span>
		</div>

		{/* Banner */}
		<div
			style={{
				margin: 14,
				background: C.appGreen,
				borderRadius: 14,
				padding: '16px 18px',
				display: 'flex',
				alignItems: 'center',
				gap: 14,
			}}
		>
			<span style={{fontSize: 30}}>🏪</span>
			<div>
				<div
					style={{
						fontSize: 15,
						fontWeight: 700,
						color: C.white,
						marginBottom: 4,
					}}
				>
					Vendez vos récoltes
				</div>
				<div style={{fontSize: 11, color: 'rgba(255,255,255,0.85)'}}>
					Connectez-vous avec restaurants, supermarchés et acheteurs.
				</div>
			</div>
		</div>

		{/* Category chips */}
		<div
			style={{
				display: 'flex',
				gap: 8,
				padding: '0 14px 10px',
				overflowX: 'hidden' as const,
			}}
		>
			<CatChip label="Tous" active />
			<CatChip label="Céréales" />
			<CatChip label="Légumes" />
			<CatChip label="Fruits" />
		</div>

		{/* Product grid */}
		<div
			style={{
				flex: 1,
				padding: '0 14px',
				display: 'grid',
				gridTemplateColumns: '1fr 1fr',
				gap: 10,
				overflow: 'hidden',
				alignContent: 'start',
			}}
		>
			<ProductCard
				name="Maïs local séché — sac ..."
				price="12 500 FCFA/sac"
				qty="40.0 sac disponible(s)"
				region="Borgou"
			/>
			<ProductCard
				name="Tomates fraîches bio — ..."
				price="8 000 FCFA/cagette"
				qty="25.0 cagette disponible(s)"
				region="Atlantique"
			/>
			<ProductCard
				name="Ignames blanches — sa..."
				price="22 000 FCFA/sac"
				qty="60.0 sac disponible(s)"
				region="Collines"
			/>
			<ProductCard
				name="Soja grain — 1 kg"
				price="650 FCFA/kg"
				qty="500.0 kg disponible(s)"
				region="Borgou"
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
				{icon: '🏠', label: 'Accueil'},
				{icon: '🤝', label: 'Matches'},
				{icon: '➕', label: 'Publier', special: true},
				{icon: '💬', label: 'Messages'},
				{icon: '👤', label: 'Profil'},
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
						<span style={{fontSize: 9, color: C.darkGray}}>{item.label}</span>
					</div>
				)
			)}
		</div>
	</div>
);
