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
