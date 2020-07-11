import { observable, action, decorate, toJS } from "mobx";
import { stringify } from "query-string";

const TweetQueryApiPath = "/api/tweet-search";

export default class TweetStore {
  searchResultTweets = [];
  savedTweets = [];
  fetchState = { status: "done" };
  // possible options: "pending" / "done" / "error"

  fetchTweets = (query, count = 10) => {
    this.searchResultTweets = [];
    this.fetchState = { status: "pending" };
    fetch(`${TweetQueryApiPath}?${stringify({ q: query, count })}`)
      .then(this.fetchTweetSuccess)
      .then(this.processTweetData)
      .catch(this.fetchTweetError);
  };

  fetchTweetSuccess(response) {
    return response.json();
  }

  fetchTweetError(error) {
    this.fetchState = { status: "error", message: error };
  }

  processTweetData(data) {
    this.fetchState = { status: "done" };
    this.searchResultTweets = data.statuses;
  }

  saveTweetToLocalStorage = (id) => {
    const tweetToSave = this.searchResultTweets.find(
      (tweet) => tweet.id === parseInt(id, 10)
    );
    this.savedTweets = this.savedTweets.concat([{
        id: tweetToSave.id,
        create_at: tweetToSave.create_at,
        user: {
            screen_name: tweetToSave.user.screen_name,
            name: tweetToSave.user.name,
            profile_image_url: tweetToSave.profile_image_url
        },
        text: tweetToSave.text
    }]);
    localStorage.setItem('saved-tweets', JSON.stringify(this.savedTweets));
  };

  loadTweetsFromLocalStorage = () => {
    const savedTweets = JSON.parse(localStorage.getItem('saved-tweets'));
    if(savedTweets) {
        this.savedTweets = savedTweets;
    } else {
        this.savedTweets = [];
    }
  }

  clearSavedTweets = () => {
      localStorage.removeItem('saved-tweet');
      this.savedTweets = [];
  }
}

decorate(TweetStore, {
  fetchState: observable,
  searchResultTweets: observable,
  savedTweets: observable,
  fetchTweets: action,
  saveTweetToLocalStorage: action,
  loadTweetsFromLocalStorage: action,
  clearSavedTweets: action,
  processTweetData: action.bound,
  fetchTweetError: action.bound,
  fetchTweetSuccess: action.bound,
});
