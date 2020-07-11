import React from 'react';
import { PropTypes as MobxPropTypes, observer } from 'mobx-react';
import { TweetList } from '../../components/TweetList';

export const TwitterResultsList = observer(({ tweets }) => (
  <div className="twitter-list">
    <TweetList
      draggable
      tweets={tweets.searchResultTweets}
      noItemsString="No Search Results"
      id="search-results"
    />
  </div>
));

TwitterResultsList.propTypes = {
  tweetResults: MobxPropTypes.observableArray.isRequired,
};
