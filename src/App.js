import React from 'react';
import './App.css';
import { SearchInput } from './components/SearchInput';
import { TwitterResultsList } from './containers/TwitterResultsList';
import { TwitterSavedList } from './containers/TwitterSavedList';

import { configure } from 'mobx';
import TweetStore from './store/TweetStore';

configure({ enforceActions: 'observed' });

const initQueryValue = 'vancouver';
const tweetStore = new TweetStore();
tweetStore.fetchTweets(initQueryValue);
tweetStore.loadTweetsFromLocalStorage();




const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Tweet Saver</h1>
      </header>

      <section>
        <section className="twitter-list-header">
          <div className="search-input">
            <SearchInput initValue={initQueryValue} searchTweetAction={tweetStore.fetchTweets} />
          </div>
          <div>
            <h3>Saved Tweets <button onClick={tweetStore.clearSavedTweets}>Clear Saved Tweets</button></h3>
          </div>
          
        </section>
        <section className="twitter-lists">
          <TwitterResultsList tweets={tweetStore} />
          <TwitterSavedList tweets={tweetStore} />
        </section>
      </section>
    </div>
  );
};



export default App;
