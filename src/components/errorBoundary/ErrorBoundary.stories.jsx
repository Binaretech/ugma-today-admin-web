import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export default { title: 'Error Boundary' };


export const boundary = () => {
    return (
        <ErrorBoundary />
    )
};
