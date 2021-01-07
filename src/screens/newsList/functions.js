import {useEffect, useState} from 'react';
import {useXhr} from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';

export function useFetchNews(requestAgain = false) {
  const [currentPage, setCurrentPage] = useState(1);
  const [send] = useXhr({
    ...requests.news.index,
    showErrorSnackbar: true,
    queryParams: {
      ...requests.news.index.queryParams,
      page: currentPage,
    },
  });

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    send()
      .then((response) => {
        setLoading(false);
        setPosts(
          response?.ids?.map((id) => {
            return response?.data?.[id];
          }) ?? [],
        );
        setCurrentPage(response?.current_page);
        setTotalPages(response?.last_page);
      })
      .catch(() => {
        setLoading(false);
      });
    //eslint-disable-next-line
  }, [currentPage, requestAgain]);

  return [loading, posts, currentPage, setCurrentPage, totalPages];
}
