import { useEffect, useRef } from 'react';

export const SORT_OPTIONS = [
    {
        text: 'Updated',
        value: 'updatedAt'
    },
    {
        text: 'Created',
        value: 'createdAt'
    },
    {
        text: 'Name',
        value: 'name'
    },
    {
        text: 'Quantity',
        value: 'quantity'
    }
];

export const LIMIT_OPTIONS = [10, 20, 30, 40, 50, 60, 70];

export const DEFAULT_ADD_ITEM = {
    name: '',
    quantity: 0
};

export function useIsMounted() {
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return () => (isMounted.current = false);
    }, []);
    return isMounted.current;
}

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function parseApolloErrors(errorObject) {
    const networkErrors = errorObject?.networkError?.result?.errors;
    if (networkErrors) {
        return networkErrors.map(error => error.message);
    }

    const networkErrorMessage = errorObject?.networkError?.message;
    if (networkErrorMessage) {
        return [networkErrorMessage];
    }

    const graphQLErrors = errorObject?.graphQLErrors;
    if (graphQLErrors) {
        let errors = [];
        graphQLErrors.forEach(error => {
            if (error.message === 'ValidationError') {
                error.extensions.code.forEach(validationError => {
                    errors.push(validationError);
                });
                return;
            }

            errors.push(error.message);
        });
        return errors;
    }

    return [];
}

export const sliceData = ({ data, offset, limit }) =>
    data.slice(offset * limit, (offset + 1) * limit);
