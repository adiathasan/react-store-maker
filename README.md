# React Store maker

Create multiple stores with providers and get the store and dispatch hook for free with type safety!

## How to use it

**Install**

```bash
npm install react-store-maker
or
yarn add react-store-maker
```

**Creating store with createStore function!**

```typescript
// ThemeConfig.ts
import { createStore } from 'react-store-maker';

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
export const useTheme = () => {
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
};
```

**Use it any where in your app after nesting at the top level**

```tsx
// App.tsx
import { ThemeProvider } from './ThemeConfig';
import { useTheme, useThemeStore } from './ThemeConfig';

const App = () => {
	return (
		<ThemeProvider>
			<Header />
			<ToggleThemeBtn />
		</ThemeProvider>
	);
};

const Header = () => {
	const theme = useThemeStore();

	return (
		<div>
			<h1>The theme is - {theme}</h1>
		</div>
	);
};

export const ToggleThemeBtn = () => {
	const { toggleTheme } = useTheme();

	return <button onClick={toggleTheme}>Toggle theme</button>;
};
```

**Use multiple store providers for seperating logic**

```tsx
const App = () => {
	return (
		<ThemeProvider>
			<AuthProvider>
				<Header />
				<ToggleThemeBtn />
			</AuthProvider>
		</ThemeProvider>
	);
};

// login.tsx
const Login = () => {
	const { user } = useAuthStore();

	const dispatch = useAuthDispatch();

	return (
		<div>
			<h1>welcome - {user}</h1>
			<button onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</button>
		</div>
	);
};
```
