import React from 'react';
import Pagination from '../../components/pagination';
import Loader from '../../components/loader/Loader';
import {List, ListItem} from '@material-ui/core';
import NewsTile from '../../components/newsTile';
import {useFetchNews} from './functions';
import {trans} from '../../trans/trans';
import styles from './styles.module.css';

export default function NewsList() {
  const [
    loading,
    news,
    currentPage,
    setCurrentPage,
    totalPages,
  ] = useFetchNews();

  const handlePaginationOnChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : news.length > 0 ? (
        <List className={styles.container}>
          {news.map((item) => (
            <ListItem key={item.id}>
              <NewsTile news={item} />
            </ListItem>
          ))}
        </List>
      ) : (
        <div className={styles.emptyResults}>
          <p>{trans('words.emptyResults')}</p>
        </div>
      )}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePaginationOnChange}
      />
    </div>
  );
}
