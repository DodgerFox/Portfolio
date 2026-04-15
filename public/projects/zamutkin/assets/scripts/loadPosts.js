$(function(){
    $.getJSON('../../posts.json', function(data) {
            for(var i=0; i < data.posts.length;i++){
                var imagePost = '<div class="welcome-slider-slide__image" style="background-image: url(' + data.posts[i].url + ');"></div>',
                    titlePost = '<p class="welcome-slider-slide__title">' + data.posts[i].title + '</p>';
                $('.welcome-slider__wrap').append('<div class="welcome-slider-slide swiper-slide">' + imagePost + titlePost + '</div>')
            }
    });
});