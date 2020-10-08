import React from 'react';
import { Grid } from '@material-ui/core';
import { SearchBar, VideoDetails, VideoList } from './components/index';
import Youtube from './api/yt';

class App extends React.Component {
  state = {
    videos: [],
    selectedVideos: null,
  };

  componentDidMount() {
    this.handleSubmit('Youtube API');
  }
  handleSubmit = async (searchTerm) => {
    const response = await Youtube.get('search', {
      params: {
        q: searchTerm,
        part: 'snippet',
        maxResults: 15,
        key: 'AIzaSyD6s9ZHDqrwBdPUPo8c8Wh9euGeU0UWrmE',
      },
    });
    this.setState({
      videos: response.data.items,
      selectedVideos: response.data.items[0],
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideos: video });
  };
  render() {
    const { videos, selectedVideos } = this.state;
    return (
      <React.Fragment>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>
          Youtube Clone
        </h1>
        <Grid justify="center" container spacing={10}>
          <Grid item xs={12}>
            <Grid container spacing={10}>
              <Grid item xs={12}>
                <SearchBar onFormSubmit={this.handleSubmit} />
              </Grid>
              <Grid item xs={8}>
                <VideoDetails video={selectedVideos} />
              </Grid>
              <Grid item xs={4}>
                <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
