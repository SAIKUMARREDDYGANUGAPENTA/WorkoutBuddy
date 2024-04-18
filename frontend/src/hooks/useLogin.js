import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Changed null to false for consistency

    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to login'); // Handle server errors
            }

            const json = await response.json();

            // Save the user in local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    return { login, error, isLoading };
};
