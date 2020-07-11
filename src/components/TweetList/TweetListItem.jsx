import React from 'react';
import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';

const TweetListItem = ({ id, profileImage, name, screenName, timestamp, text, draggable, testID }) => {
  const onDragStartHandler = (e) => {
    e.dataTransfer.setData('id', e.target.id);
    e.target.classList.add('active');
  };

  const onDragEndHandler = (e) => {
    e.target.classList.remove('active');
  };

  return (
    <li
      className="tweet-list-item"
      id={id}
      draggable={draggable}
      onDragEnd={onDragEndHandler}
      onDragStart={onDragStartHandler}
      data-testid={testID}
    >
      <section className="tweet-item-header">
        <div><img src={profileImage} alt={`Profile Image for @${screenName}`} /></div>
        <div>
          <strong>@{screenName}</strong> 
        </div>
        <div>
          ({name})
        </div>
        <div>
          <em>{dayjs(timestamp).format("YYYY-MM-DD hh:mm")}</em>
        </div>
      </section>
      <div>{text}</div>
    </li>
  );
};

TweetListItem.propTypes = {
  id: PropTypes.number,
  testID: PropTypes.string,
  timestamp: PropTypes.string,
  text: PropTypes.string,
  screenName: PropTypes.string,
  name: PropTypes.string,
  draggable: PropTypes.bool,
  profileImage: PropTypes.string
}

// Memoize for optimization since search result might be similar on
// subsequent searches or saved items doesn't have to be unnecessarily calulated and rendered
export default React.memo(TweetListItem);