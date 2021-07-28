import { useState } from 'react';
import { useDebounce } from 'react-use';

export const useDebouncedValue = <T>(value: T, time: number): [T, () => void] => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    const [, cancel] = useDebounce(
        () => {
            setDebouncedValue(value);
        },
        time || 500,
        [value]
    );

    return [
        debouncedValue, 
        cancel
    ];
}