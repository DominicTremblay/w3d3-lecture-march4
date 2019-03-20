const request = (options, cb) => {
  // var jqxhr = $.ajax("example.php")
  //   .done(function () {
  //     alert("success");
  //   })
  //   .fail(function () {
  //     alert("error");
  //   })
  //   .always(function () {
  //     alert("complete");
  //   });

  // Creating the get request
  $.ajax(options)
    // function that will received the data back from the request
    .done(response => {
      // calling the callback function with that data
      cb(response);
    })
    // Any error with the request
    .fail(err => {
      console.log(`Error: ${err}`);
    })
    // This will get executed in any case
    .always(() => {
      console.log('Request completed');
    });
};

// Create an article element generated dynamically from the data
const createArticle = content => {
  // Creating a new element with ES6

  // return `<div class="post-preview" data-article-id="${content.id}">
  //   <a href="#">
  //     <h2 class="post-title">
  //       ${content.title}
  //     </h2>
  //     <h3 class="post-subtitle">
  //       ${content.body}
  //     </h3>
  //   </a>
  //   <p class="post-meta">Posted by <a href="#">Start Bootstrap</a> on September 24, 2014</p>
  // </div>`;

  // Creating a new div element with jQuery
  const $articleDiv = $('<div>')
    .addClass('post-preview')
    .attr('data-article-id', content.id);
  const $link = $('<a>').attr('href', '#');

  // Creating an h2 elements and adding to the a element
  $('<h2>')
    .addClass('post-title')
    .text(content.title)
    .appendTo($link);

  // Creating an h3 elements and adding to the a element
  $('<h3>')
    .addClass('post-subtitle')
    .text(content.body)
    .appendTo($link);

  // Adding the a element to the div of the article
  $articleDiv.append($link);

  // Craeting the p tag, using .html instead of .text because there is a tag in
  // the content

  $('<p>')
    .addClass('post-meta')
    .html('Posted by <a href="#" >Start Bootstrap</a > on September 24, 2014')
    .appendTo($articleDiv);

  return $articleDiv;
};

//a function that will loop through the array of objects
// and render each article and add them to the dom
const renderArticles = articles => {
  // for (const articleObj of articles) {
  //   $('#articles').append(createArticle(articleObj));
  // }

  // looping over the array with jQuery .each
  $.each(articles, function(index, articleObj) {
    $('#articles').append(createArticle(articleObj));
  });
};

// Anything that refers to the DOM must be enclosed here
$(document).ready(function() {
  const url = 'http://jsonplaceholder.typicode.com/posts';

  // Triggered by a click on the load more button
  $('#load-more').on('click', function(event) {
    // Setting the options for the request
    const requestOptions = {
      method: 'GET',
      url: url,
      dataType: 'json',
    };

    // calling the request function and getting the result in the callback
    request(requestOptions, function(response) {
      // calling a function that will loop through the array of objects
      // and render eacg article
      renderArticles(response);
    });
  });
}); //
