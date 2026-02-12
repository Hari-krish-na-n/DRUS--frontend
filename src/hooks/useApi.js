// src/hooks/useApi.js
import { useState, useCallback, useEffect } from 'react';
import { apiFetch } from '../api/client';

export const useApi = (url, options = {}, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (newOptions = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFetch(url, { ...options, ...newOptions });
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (immediate) {
      fetch();
    }
  }, [immediate, fetch]);

  return { data, loading, error, refetch: fetch };
};
