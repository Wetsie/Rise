import { useCallback, useEffect, useRef, useState } from "react";
type useStateSafeParams<T> = T | (() => T);

export function useStateSafe<T>(
	initialValue: useStateSafeParams<T>
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [val, setVal] = useState<T>(initialValue);
	const mountedRef = useRef<boolean>();

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);

	const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
		(s: React.SetStateAction<T>) => {
			if (mountedRef.current) {
				setVal(s);
			}
		},
		[setVal]
	);
	return [val, setValue];
}