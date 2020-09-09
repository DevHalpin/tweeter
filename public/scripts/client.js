/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const tweetData = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }];



  const createTweetElement = (tweetData) => {

    let article = $("<article>").addClass("tweet");
    const date = moment(tweetData.created_at);

    article.append(`
    <header>
      <span class="h-image">
        <img src=${tweetData.user.avatars}>
      </span>
      <span class="h-name">
        <h3>${tweetData.user.name}</h3>
      </span>
      <span class="handle">
        <h3>${tweetData.user.handle}</h3>
      </span>
    </header>
    <p>
      ${tweetData.content.text}
    </p>
    <footer class="foot">
      <span class="footer-left">
        <h6>${date}</h6>
      </span>
      <span class="footer-right">
          <i class='fas fa-flag' style='font-size:24px'></i>
          <i class='fas fa-retweet' style='font-size:24px'></i>
          <i class='fas fa-heart' style='font-size:24px'></i>
      </span>
    </footer>`);
    return article;
  };

  const renderTweets = function(tweets) {
    for (tweet of tweets) {
      $('#tweet-container').append(createTweetElement(tweet));
    }
  }

  renderTweets(tweetData);
});