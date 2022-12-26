import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Trans,
  t,
} from '@lingui/macro';
import {
  useLocation,
  useParams,
} from 'react-router-dom';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
  Typography,
  CircularProgress,
  Divider,
} from '@mui/material';
import parse from 'html-react-parser';
import { tipbotInfoArray } from '../helpers/tipbotsInfoArray';
import { fetchChangelogAction } from '../actions/changelog';
import { withRouter } from '../hooks/withRouter';

const ChangeLogView = function (props) {
  const {
    changelog,
  } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const { botName } = useParams();

  const [botInfo, setBotInfo] = useState(tipbotInfoArray.find((x) => x.name.toLowerCase() === botName.toLowerCase()));

  useEffect(() => {
    setBotInfo(tipbotInfoArray.find((x) => x.name.toLowerCase() === botName.toLowerCase()));
  }, [location.pathname]);

  useEffect(() => {
    console.log(botInfo);
    if (botInfo) {
      dispatch(fetchChangelogAction(
        botInfo.userApiUrl.toLowerCase(),
      ));
    }
  }, [
    botInfo,
  ]);

  useEffect(() => {
    if (changelog.data) {
      document.title = t`ChangeLog - ${botName}`;
    }
  }, [
    changelog.data,
  ]);

  useEffect(() => {}, [changelog]);

  return (
    <div className="content tipbots">
      {
        changelog.isLoading && (
          <Grid container>
            <Grid
              item
              xs={12}
              justifyContent="center"
              align="center"
            >
              <CircularProgress />
            </Grid>
          </Grid>
        )
      }
      {
        changelog && changelog.data && changelog.data.versions && changelog.data.versions.map((item, index) => {
          let newBody = item.body;
          newBody = newBody.replaceAll(/(### [a-zA-Z0-9\-_ .]+)/g, '<span style="text-decoration: underline">$1</span>');
          newBody = newBody.replaceAll('### ', '');
          newBody = newBody.replaceAll('*', '');
          newBody = newBody.replace(/\([^()]*\)/g, '');
          newBody = newBody.replace(/\([^()]*\)/g, '');
          newBody = newBody.replaceAll(/(\n\n)/gm, '\n');
          return (
            <Grid
              container
              key={item.title}
              sx={{
                paddingTop: '1rem',
              }}
            >
              {
                index === 0 && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      paddingBottom: '1rem',
                    }}
                  >
                    <Typography
                      variant="h3"
                    >
                      {botInfo && (
                        botInfo.name
                      )}
                      {' '}
                      {botInfo && (
                        item.version
                      )}
                    </Typography>
                  </Grid>
                )
              }
              <Grid
                item
                xs={12}
              >
                <Divider />
                <Typography
                  variant="h6"
                  // align="center"
                >
                  v
                  {item.version}
                </Typography>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  // align="center"
                >
                  {parse(newBody)}
                </Typography>
              </Grid>
            </Grid>
          )
        })
      }
    </div>
  );
}

ChangeLogView.defaultProps = {
  changelog: {
    data: undefined,
  },
};

ChangeLogView.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  changelog: PropTypes.shape({
    data: PropTypes.shape({
      versions: PropTypes.arrayOf(
        PropTypes.shape({
        }),
      ),
    }),
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  changelog: state.changelog,
})

export default withRouter(connect(mapStateToProps, null)(ChangeLogView));
