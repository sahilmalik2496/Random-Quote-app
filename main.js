$(document).ready(function(){
    var quote;
    var author;
    // color options for the quote box
    var colors = ["#f04c4c", "#fab246", "#635ad8", "#80daf0", "#7f64f7f6", "#e380f0f6", "#80f085f6", "#7c63ec"];
    function getNewQuote()
    {
        // ajax request from the api for random quotes
        $.ajax({
            url: "https://api.forismatic.com/api/1.0/", 
            jsonp: "jsonp",
            dataType : 'jsonp',
            data: {
                method: 'getQuote',
                lang: 'en', 
                format: 'jsonp'
            },
            success: function(response){
                quote = response.quoteText;
                author = response.quoteAuthor;
                $('#quote').text(quote); // appending the quote to our html
                if (author){
                    $('#author').text(' - ' + author);
                } 
                else
                {
                    $('#author').text('- anonymous'); // if the author is anonymous
                }
            }
        });
    }
    getNewQuote();
    // trigger function when the user clicks new quote 
    $('.get-quote').on("click", function(event){
        event.preventDefault();
        getNewQuote();
            $(".quote-box").css("background-color", colors[Math.floor(Math.random() * colors.length)]); 
            // applying random background colors
            
    });
     // trigger function when the user clicks share quote
    $('.share-quote').on("click", function(event){
        event.preventDefault();
        window.open('http://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + '-'+ author));
    });
});