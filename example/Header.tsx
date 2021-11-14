import * as React from 'react';

import { useThemeStore } from './ThemeConfig';

const Header = () => {
	const theme = useThemeStore();

	return (
		<div>
			<h1>The theme is - {theme}</h1>
		</div>
	);
};

export default Header;
