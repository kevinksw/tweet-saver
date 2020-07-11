import React from 'react';
import { PropTypes as MobxPropTypes, observer } from 'mobx-react';
import { TweetList } from '../../components/TweetList';

export const TwitterSavedList = observer(({ tweets }) => (
  <div className="twitter-list">
    <TweetList
      draggable={false}
      droppable
      tweets={tweets.savedTweets}
      noItemsString="No Saved Tweets"
      onDrop={tweets.saveTweetToLocalStorage}
      id="saved-tweets"
    />
  </div>
));

TwitterSavedList.propTypes = {
  savedTweets: MobxPropTypes.observableArray.isRequired,
};
