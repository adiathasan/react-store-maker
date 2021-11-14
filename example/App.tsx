import * as React from 'react';

import { ToggleThemeBtn } from './ToggleThemeBtn';
import { ThemeProvider } from './ThemeConfig';
import Header from './Header';

/**
 * more real world example https://adiathasan.vercel.app/
 * github: https://github.com/adiathasan/react-concepts/blob/master/src/Theme/ThemeReducer.ts
 */

const App = () => {
	return (
		<ThemeProvider>
			<Header />
			<ToggleThemeBtn />
		</ThemeProvider>
	);
};

export default App;
