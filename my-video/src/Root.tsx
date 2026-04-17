import React from 'react';
import {Composition} from 'remotion';
import {TerreAvenir} from './TerreAvenir';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="TerreAvenir"
				component={TerreAvenir}
				durationInFrames={85 * 30}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
