$(function() {

    'use strict';

    var videoId = window.htbt.util.getVideoId(window.location.href),
        getCommentatorsUrl = window.htbt.config.backend +
            '/get_comment_authors?video_id=' + videoId,
        pickButton,
        elements = [],
        highlighted;

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
            .html('Pick a winner!');

        $('#commentators').append($('<div id="header"></div>')
            .html('<span id="taunt">' + commentators.length + ' people left a comment</span>')
            .append(pickButton)
            .append($('<br/><br/>')));

        $('#pick-one').on('click', function() {
            toggleSlotMachine(elements);
        });

        _.each(commentators, function(commentator) {
            var element = $('<div></div>')
                .addClass('commentator')
                .html(commentator);
            elements.push(element);
            $('#commentators').append(element);
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

        function showName (n, lastIdx) {
            setTimeout(function nextName() {
                var sample = _.sample(commentators);
                $('#name').html(sample.html());

                if (highlighted) {
                    highlighted.removeClass('highlight');
                }
                highlighted = sample.addClass('highlight');

                if (n === lastIdx) {
                    $('#winner-taunt').css('display', 'inherit');
                    pickButton.html('Pick another winner!');
                    pickButton.show();
                }
            }, (i*i));
        }
    }

});
