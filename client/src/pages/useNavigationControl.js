// src/hooks/useNavigationControl.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useNavigationControl = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Prevent default back/forward behavior
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      // Stay on current page, disable back/forward
      navigate(location.pathname, { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname, navigate]);
};

export default useNavigationControl;
