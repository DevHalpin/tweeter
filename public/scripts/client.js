/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  const createTweetElement = (tweetData) => {

    let article = $("<article>").addClass("tweet");
    const date = moment(tweetData.created_at).fromNow();

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
  };
    
  $(".create-tweet").on('submit', function (e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: $(".create-tweet").serialize(),
      done: function(data) {
        console.log(data.text);
      }
    })
  });

  const loadTweets = function() {
    $.get("/tweets",renderTweets);
  }

  loadTweets(); 
});