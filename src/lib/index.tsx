import * as React from 'react';

interface StoreProviderProps {
	children?: React.ReactNode;
}

export interface StoreOptions {
	useStoreName?: string;
	useDispatchName?: string;
	providerName?: string;
}

/**
 *
 * @param init -> initial state
 * @param reducer -> reducer function
 * @param {StoreOptions}
 * @returns -> [StoreProvider -> wrap it to access the hooks [store, dispatch], useStore -> access the store, useDispatch -> dispath actions]
 */
export const createStore = <S, A>(
	init: S,
	reducer: (state: S, action: A) => S,
	{ useStoreName = 'useStore', useDispatchName = 'useDispatch', providerName = 'Provider' }: StoreOptions
) => {
	const StoreContext = React.createContext<any>(null);
	const StoreDispatchContext = React.createContext<any>(null);

	StoreContext.displayName = providerName;
	StoreDispatchContext.displayName = `${providerName}Dispatch`;

	/**
	 *
	 * @param props -> compose children
	 * @returns -> StoreProvider -> generic context
	 */
	const StoreProvider = (props: StoreProviderProps) => {
		const { children } = props;

		const [state, dispatch] = React.useReducer(reducer, init);

		return (
			<StoreContext.Provider value={state}>
				<StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
			</StoreContext.Provider>
		);
	};

	/**
	 *
	 * @returns -> store
	 */
	const useStore = () => {
		const store = React.useContext<S>(StoreContext);

		if (!store) {
			throw new Error(`${useStoreName} must be consumed (used) within a ${providerName}`);
		}

		return store;
	};

	/**
	 *
	 * @returns -> dispatch (fn) -> action
	 */
	const useDispatch = () => {
		const dispatch = React.useContext<React.Dispatch<A>>(StoreDispatchContext);

		if (!dispatch) {
			throw new Error(`${useDispatchName} must be consumed (used) within a ${providerName}`);
		}

		return dispatch;
	};

	return [StoreProvider, useStore, useDispatch] as const;
};
