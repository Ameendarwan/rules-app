import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '.'

/**
 * Store Dispatcher with known store context
 */
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * Store Selector with known store context
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
