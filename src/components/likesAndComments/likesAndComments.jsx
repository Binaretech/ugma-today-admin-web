import React from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltIconOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import InsertCommentOutlinedIcon from '@material-ui/icons/InsertCommentOutlined';
import styles from './styles.module.css';
import { IconButton } from '@material-ui/core';

export default function LikesAndComents({
  likesCount,
  commentsCount,
  likedByUser,
  buttons,
  onClickLike,
  onClickComment,
  disableComment,
}) {
  return (
    <div className={styles.scores}>
      <div className={styles.score}>
        {buttons ? (
          <IconButton onClick={onClickLike}>
            {likedByUser ? (
              <ThumbUpAltIcon color="primary" />
            ) : (
              <ThumbUpAltIconOutlined />
            )}
          </IconButton>
        ) : likedByUser ? (
          <ThumbUpAltIcon color="primary" />
        ) : (
          <ThumbUpAltIconOutlined />
        )}
        <p>{likesCount ?? 0}</p>
      </div>
      {!disableComment && (
        <div className={styles.score}>
          {buttons ? (
            <IconButton onClick={onClickComment}>
              <InsertCommentOutlinedIcon />
            </IconButton>
          ) : (
            <InsertCommentOutlinedIcon />
          )}
          <p>{commentsCount ?? 0}</p>
        </div>
      )}
    </div>
  );
}
