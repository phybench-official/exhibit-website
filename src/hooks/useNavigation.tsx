import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useLoading } from './loading-context.tsx';

export function useNavigation() {
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const navigateWithLoading = useCallback((to: string) => {
    startLoading();
    setTimeout(() => {
      navigate(to);
    }, 100);
  }, [navigate, startLoading]);

  return { navigateWithLoading };
}
