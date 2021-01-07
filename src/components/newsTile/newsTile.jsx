import React from 'react';
import {Avatar, IconButton, Card} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';
import dayjs from 'dayjs';
import LikesAndComments from '../../components/likesAndComments';

/**
 * @typedef {object} Post
 * @prop {string} title
 *
 * @param {{news: Post}} props
 */
export default function NewsTile({news, onSelectedItem}) {
  return (
    <Card className={styles.card}>
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
          <IconButton onClick={() => onSelectedItem(news)}>
            <EditIcon />
          </IconButton>
        </div>
        <div>
          <p className={styles.timestamp}>
            {dayjs(news?.createdAt)?.fromNow()}
          </p>
        </div>
      </div>
    </Card>
  );
}
