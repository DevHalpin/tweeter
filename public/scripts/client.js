
/*
  * Sanitize function to prevent XSS
  * Takes in a string and returns sanitized string
  */
const sanitize = (string) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, match => map[match]);
};
  
/*
  * createTweetElement takes in a data object with tweet info
  * Returns the completed tweet article element
  */
const createTweetElement = (tweetData) => {
   
  let article = $('<article>').addClass('tweet');
  const date = moment(tweetData.created_at).fromNow();
   
  article.append(`
   <header>
   <span class='h-image'>
   <img src=${tweetData.user.avatars}>
   </span>
   <span class='h-name'>
   <h3>${tweetData.user.name}</h3>
   </span>
   <span class='handle'>
   <h3>${tweetData.user.handle}</h3>
   </span>
   </header>
   <p>
   ${sanitize(tweetData.content.text)}
   </p>
   <footer class='foot'>
   <span class='footer-left'>
   <h6>${date}</h6>
   </span>
   <span class='footer-right'>
   <i class='fas fa-flag' style='font-size:24px'></i>
   <i class='fas fa-retweet' style='font-size:24px'></i>
   <i class='fas fa-heart' style='font-size:24px'></i>
   </span>
   </footer>`);
  return article;
};
  
/*
  * renderTweets takes in an array of tweets
  * and prepends each one into the tweet container
  */
const renderTweets = function(tweets) {
  $('#tweet-container').empty();
  for (const tweet of tweets) {
    $('#tweet-container').prepend(createTweetElement(tweet));
  }
};
  
/*
  * loadTweets pulls tweets from database
  * and pushes them to renderTweets
  */
const loadTweets = function() {
  $.get('/tweets',renderTweets);
};

$(document).ready(() => {
  loadTweets();
  $('.error').hide();
  $('.new-tweet').hide();

  $('.container').on('scroll', function() {
    if ($(this).scrollTop() <= 100) {
      $('.fa-angle-double-up').addClass('hidden');
    } else {
      $('.fa-angle-double-up').removeClass('hidden');
    }
  });

  $('.fa-angle-double-up').on('click', function() {
    $('.container').scrollTop(0);
  })
  $('.write-tweet').on('click', function() {
    $('.new-tweet').slideToggle();
    $('#tweet-text').val('').focus();
    $('#tweet-test, .counter').text(140);
  });
    
  $('.create-tweet').on('submit', function(e) {
    e.preventDefault();
    $('.error-message').text('');
    $('.error').slideUp();
    const text = $('#tweet-text').val();
    if (text === '' || text === null) {
      $('.error').slideDown();
      $('.error-message').text('🔴 Tweet text field is empty! 🔴');
    } else if (text.length > 140) {
      $('.error').slideDown();
      $('.error-message').text('🔴 Tweet text is longer than 140 characters! 🔴');
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets/',
        data: $('.create-tweet').serialize(),
      })
        .done(function() {
          loadTweets();
          $('#tweet-text').val('');
          $('#tweet-test, .counter').text(140);
        });
    }
  });
});