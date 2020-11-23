import React from 'react';
import {Card, CardContent, CardHeader, Typography} from '@material-ui/core';
import styles from './styles.module.css';

export default function StatisticCard({title, content}) {
  return (
    <Card className={styles.card} variant="outlined">
      <CardHeader className={styles.title} title={title} />
      <CardContent className={styles.content}>
        <Typography variant="h3">{content}</Typography>
      </CardContent>
    </Card>
  );
}
