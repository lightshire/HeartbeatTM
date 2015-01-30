$(function() {

    'use strict';

    var videoId = window.htbt.util.getVideoId(window.location.href),
        getCommentatorsUrl = window.htbt.config.backend +
            '/get_comment_authors?video_id=' + videoId,
        pickButton;

    $.getJSON(getCommentatorsUrl, handleCommentators);

    function handleCommentators(response) {
        $('.loader').hide();

        var commentators = _.map(response.authors, function(obj) {
            return obj.title;
        });

        displayCommentators(commentators);
    }

    function displayCommentators(commentators) {
        pickButton = $('<button id="pick-one"></button>')
            .attr('class', 'pure-button pure-button-primary')
            .html('Lets pick one!');

        $('#commentators').append($('<div id="header"></div>')
            .html('<span id="taunt">You have got ' + commentators.length + ' commentators</span>')
            .append(pickButton));

        $('#pick-one').on('click', function() {
            toggleSlotMachine(commentators);
        });

        _.each(commentators, function(commentator) {
            $('#commentators').append($('<div></div>')
                .addClass('commentator')
                .html(commentator));
        });
    }

    function toggleSlotMachine(commentators) {
        $('#slot-machine').show();
        $('#winner-taunt').hide();
        pickButton.hide();

        var easeOffBy = 75;

        for (var i = 0; i < easeOffBy; i++) {
            showName(i, easeOffBy - 1);
        }

        function showName(n, lastIdx) {
            setTimeout(function nextName() {
                $('#name').html(_.sample(commentators));

                if (n === lastIdx) {
                    $('#winner-taunt').css('display', 'inherit');
                    pickButton.html('Pick again!');
                    pickButton.show();
                }
            }, (i*i));
        }
    }

});
