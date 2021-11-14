import { useTheme } from './ThemeConfig';

export const ToggleThemeBtn = () => {
	const { toggleTheme } = useTheme();

	return <button onClick={toggleTheme}>Toggle theme</button>;
};
