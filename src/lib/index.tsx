import * as React from 'react';

interface StoreProviderProps {
	children?: React.ReactNode;
}

/**
 *
 * @param init -> initial state
 * @param reducer -> reducer function
 * @returns -> [StoreProvider -> wrap it to access the hooks [store, dispatch], useStore -> access the store, useDispatch -> dispath actions]
 */
export const createStore = <S, A>(init: S, reducer: (state: S, action: A) => S) => {
	const StoreContext = React.createContext<any>(null);
	const StoreDispatchContext = React.createContext<any>(null);

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
			throw new Error('createStore->fn: useStore must be consumed (used) within a Provider');
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
			throw new Error('createstore->fn: useDispatch must be consumed (used) within a Provider');
		}

		return dispatch;
	};

	return [StoreProvider, useStore, useDispatch] as const;
};
