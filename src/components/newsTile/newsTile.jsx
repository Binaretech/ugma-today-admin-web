import React from 'react';
import {Avatar, Card} from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';
import dayjs from 'dayjs';
import {useHistory} from 'react-router-dom';
import paths, {formatPath} from '../../routes/paths';
import LikesAndComments from '../../components/likesAndComments';

/**
 * @typedef {object} Post
 * @prop {string} title
 *
 * @param {{news: Post}} props
 */
export default function NewsTile({news}) {
  const history = useHistory();

  function onClick() {
    history.push(formatPath(paths.newsDetails, {id: news?.id}));
  }

  return (
    <Card className={styles.card} onClick={onClick}>
      <div className={styles.title}>
        <h2>{news?.title}</h2>
      </div>
      <div>
        <ReactMarkdown skipHtml>
          {news?.isCutted ? news?.preview?.trim() + '...' : news?.preview}
        </ReactMarkdown>
      </div>
      <div className={styles.author}>
        <Avatar src={news?.user?.profileImage} />
        <p className={styles.name}>{news?.user?.username}</p>
      </div>
      <div className={styles.info}>
        <LikesAndComments
          likedByUser={news?.likedByUser}
          likesCount={news?.likes}
          commentsCount={news?.comments}
        />
        <div>
          <p className={styles.timestamp}>
            {dayjs(news?.createdAt)?.fromNow()}
          </p>
        </div>
      </div>
    </Card>
  );
}
