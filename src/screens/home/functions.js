import {useEffect} from 'react';
import {useState} from 'react';
import {useXhr} from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';

export function useFetchStatistics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const [send] = useXhr(requests.statistics.summary);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchStatistics, []);

  function fetchStatistics() {
    setLoading(false);

    send()
      .then((response) => {
        setLoading(false);
        setStatistics(response?.data ?? []);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }

  return [loading, statistics, error];
}
