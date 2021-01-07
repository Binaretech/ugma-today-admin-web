import React, {useState} from 'react';
import Pagination from '../../components/pagination';
import Loader from '../../components/loader/Loader';
import {List, ListItem} from '@material-ui/core';
import NewsTile from '../../components/newsTile';
import {Button} from '@material-ui/core';
import {useFetchNews} from './functions';
import {trans} from '../../trans/trans';
import styles from './styles.module.css';
import SaveNews from '../../components/saveNews/SaveNews';

export default function NewsList() {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [requestAgain, setRequestAgain] = useState(false);
  const [loading, news, currentPage, setCurrentPage, totalPages] = useFetchNews(
    requestAgain,
  );

  const handlePaginationOnChange = (_, value) => {
    setCurrentPage(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setItem(null);
    setRequestAgain(!requestAgain);
  };

  const setUpdate = (item) => {
    setItem(item);
    setOpen(true);
  };

  return (
    <div className={styles.mainContainer}>
      {open && (
        <SaveNews
          item={item}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
      <div className={styles.addNewsContainer}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          {trans('words.add')}
        </Button>
      </div>
      <div className={styles.resultsContainer}>
        {loading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : news.length > 0 ? (
          <List className={styles.container}>
            {news.map((item) => (
              <ListItem key={item.id}>
                <NewsTile news={item} onSelectedItem={setUpdate} />
              </ListItem>
            ))}
          </List>
        ) : (
          <div className={styles.emptyResults}>
            <p>{trans('words.emptyResults')}</p>
          </div>
        )}
      </div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePaginationOnChange}
      />
    </div>
  );
}
