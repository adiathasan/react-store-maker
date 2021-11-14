import { createStore } from '../src';

export type Theme = 'light' | 'dark';

const init: Theme = 'light';

export type ThemeActions = { type: 'SET_DARK'; payload: 'dark' } | { type: 'SET_LIGHT'; payload: 'light' };

const reducer = (state: Theme = init, action: ThemeActions) => {
	switch (action.type) {
		case 'SET_LIGHT':
			return action.payload;
		case 'SET_DARK':
			return action.payload;
		default:
			return state;
	}
};

const [ThemeProvider, useThemeStore, useThemeDispatch] = createStore(init, reducer);

export { ThemeProvider, useThemeStore, useThemeDispatch };

// using with custom hook
export function useTheme() {
	const theme = useThemeStore();
	const dispatch = useThemeDispatch();

	const toggleTheme = () => {
		const newThemeAction: ThemeActions =
			theme === 'light' ? { type: 'SET_DARK', payload: 'dark' } : { type: 'SET_LIGHT', payload: 'light' };

		dispatch(newThemeAction);
	};

	return {
		toggleTheme,
		theme,
	};
}
