import React from 'react';
import { render, screen } from '@testing-library/react';
import { TweetList } from './TweetList';

describe('Tweet List test suite', () => {
  const tweetListTestId = "test-tweet-list";

  const mockTweetListData = [
    {
      id: 1234,
      user: {
        screen_name: 'testHandle1',
        name: 'Test User 1',
        profile_image_url: 'some-url.png'
      },
      created_at: 'Sat Jul 11 16:25:31 +0000 2020',
      text: 'test content'
    },
    {
        id: 5678,
        user: {
          screen_name: 'testHandle2',
          name: 'Test User 2',
          profile_image_url: 'some-url.png'
        },
        created_at: 'Sat Jul 11 16:25:33 +0000 2020',
        text: 'test content 2'
    }

  ];
  const noItemsString = 'no items';

  it('test default render correct number of tweets', () => {
    render(
      <TweetList
        tweets={mockTweetListData}
        noItemsString={noItemsString}
        testID={tweetListTestId}
      />
    );
    expect(screen.getByTestId(tweetListTestId).children.length).toBe(2);
  });

  it('test empty list array render no item string', () => {
    render(
      <TweetList
        tweets={[]}
        noItemsString={noItemsString}
        testID={tweetListTestId}
      />
    );
    expect(screen.getByText(noItemsString)).not.toBeNull();
  });
});
