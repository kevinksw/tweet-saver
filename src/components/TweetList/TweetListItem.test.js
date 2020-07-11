import React from 'react';
import { render, screen } from '@testing-library/react';
import TweetListItem from './TweetListItem';

describe('Tweet List Item test suite', () => {
  const tweetListItemTestId = 'test-tweet-list-item';
  const mockTweetData = {
    id: 1234,
    user: {
      screen_name: 'testHandle',
      name: 'Test User',
      profile_image_url: 'some-url.png'
    },
    created_at: 'Sat Jul 11 16:25:31 +0000 2020',
    text: 'test content'
  };

  it('test default render', () => {
    render(
      <TweetListItem
        id={mockTweetData.id}
        timestamp={mockTweetData.created_at}
        text={mockTweetData.text}
        screenName={mockTweetData.user.screen_name}
        profileImage={mockTweetData.user.profile_image_url}
        name={mockTweetData.user.name}
        testID={tweetListItemTestId}
      />
    );

    expect(screen.getByText(mockTweetData.text)).not.toBeNull();
  });
});
