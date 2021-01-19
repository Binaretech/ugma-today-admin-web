import React, {useState, useEffect} from 'react';
import {GridList, GridListTile, Typography} from '@material-ui/core';
import StatisticCard from '../../components/statisticCard';
import {useFetchStatistics} from './functions';
import Loader from '../../components/loader/Loader';
import {trans} from '../../trans/trans';
import {useWindowSize} from '../../utils/customHooks';

function Home() {
  const mobile = 630;
  const [loading, statistics, error] = useFetchStatistics();
  const [width] = useWindowSize();
  const [columns, setColumns] = useState(width > mobile ? 2 : 1);

  useEffect(() => {
    setColumns(width > mobile ? 2 : 1);
  }, [width]);

  return error ? (
    <div>
      <Typography align="center" color="secondary">
        {trans('errors.generalError')}
      </Typography>
    </div>
  ) : (
    <div>
      {loading && <Loader />}
      <GridList cols={columns}>
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
