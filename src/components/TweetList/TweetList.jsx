import React from 'react';
import TweetListItem from './TweetListItem';
import { PropTypes } from 'prop-types';

/*
  Note: here didn't have the time to go further to implement a virtualized list using react-window.  This can further
  improve rendering performance
*/
export const TweetList = ({ tweets, draggable, droppable, onDrop, noItemsString, testID }) => {
  const onDragOverHandler = (e) => {
    e.preventDefault();
    e.target.classList.add('drop-active');
  };

  const onDragLeaveHandler = (e) => {
    e.preventDefault();
    e.target.classList.remove('drop-active');
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    e.target.classList.remove('drop-active');
    onDrop(e.dataTransfer.getData('id'));
  };

  return (
    <ul
      className="tweet-list"
      onDrop={droppable && onDropHandler}
      onDragLeave={droppable && onDragLeaveHandler}
      onDragOver={droppable && onDragOverHandler}
      data-testid={testID}
    >
      {tweets && tweets.length > 0 ? (
        tweets.map((tweet) => {
          return (
            <TweetListItem
              id={tweet.id}
              text={tweet.text}
              name={tweet.user.name}
              screenName={tweet.user.screen_name}
              timeStamp={tweet.created_at}
              profileImage={tweet.user.profile_image_url}
              draggable={draggable}
              key={tweet.id}
            />
          );
        })
      ) : (
        <li className="tweet-list-item">{noItemsString}</li>
      )}
    </ul>
  );
};

TweetList.propTypes = {
  onDrop: PropTypes.func,
  draggable: PropTypes.bool,
  droppable: PropTypes.bool,
  noItemsString: PropTypes.string,
  testID: PropTypes.string
};
