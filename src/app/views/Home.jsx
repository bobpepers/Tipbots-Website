import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  Divider,
} from '@mui/material';

import { withRouter } from '../hooks/withRouter';

const Home = function (props) {
  const {
    nodeStatus,
  } = props;

  useEffect(() => {
    document.title = 'Tipbots - Home';
  }, []);

  useEffect(
    () => {
      console.log(nodeStatus);
    },
    [
      nodeStatus,
    ],
  );

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={0}
        style={{ marginTop: '5px' }}
      >
        <Divider
          style={{ width: '100%' }}
        />
      </Grid>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  nodeStatus: state.nodeStatus,
})

export default withRouter(connect(mapStateToProps, null)(Home));
