import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, GridList, Typography, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  cardRoot: {
    maxWidth: 275,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

function UpperPage() {
  const classes = useStyles();
  const [data, setData] = useState({ outcome: [] });
  const [loading, setLoading] = useState(true); // Loading state

  const url = 'http://k8s-eksdemogroup-e0353f9ab7-1737431341.ap-northeast-2.elb.amazonaws.com/services/all';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [url]); // Include url in dependency array to fetch data whenever url changes

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress /> {/* Loading indicator */}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={2}>
        {data.outcome.map(item => (
          <div key={item.id}>
            <Card className={classes.cardRoot}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" component="p">
                  <img
                    style={{ display: 'block', margin: '0px auto' }}
                    src={item.url}
                    height='120'
                    alt={item.name}
                  />
                  <br/>
                  {item.value}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={item.link}>
                  <Button size="small"> See More </Button>
                </a>
              </CardActions>
            </Card>
          </div>
        ))}
      </GridList>
    </div>
  );
}

export default UpperPage;
