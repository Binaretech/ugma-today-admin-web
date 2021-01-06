import React from 'react';
import {GridList, GridListTile, Typography} from '@material-ui/core';
import StatisticCard from '../../components/statisticCard';
import {useFetchStatistics} from './functions';
import Loader from '../../components/loader/Loader';
import {trans} from '../../trans/trans';

function Home() {
  const [loading, statistics, error] = useFetchStatistics();

  return error ? (
    <div>
      <Typography align="center" color="secondary">
        {trans('errors.generalError')}
      </Typography>
    </div>
  ) : (
    <div>
      {loading && <Loader />}
      <GridList cols={2}>
        {statistics.map((statistic) => (
          <GridListTile key={statistic?.name}>
            <StatisticCard
              title={trans(`Components.StatisticCard.${statistic?.name}`)}
              content={statistic?.count}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default Home;
