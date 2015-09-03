(function (htbt) {

    'use strict';

    var videoId = window.htbt.util.getVideoId(window.location.href),
        // getCommentatorsUrl = window.htbt.config.backend +
        getCommentatorsUrl = 'http://localhost' +
        '/get_comment_authors?video_id=' + videoId,
        pickButton,
        winnerCount,
        commenters = [],
        elements = [],
        highlighted;

    collectComments();

    function collectComments (options) {
        options = options || {
            part: 'id,replies,snippet',
            videoId: videoId,
            key: htbt.config.google_api_key,
            maxResults: 100,
            order: 'time',
            fields: 'pageInfo,nextPageToken,items(id,'
                + 'snippet/topLevelComment/snippet/textDisplay,'
                + 'snippet/topLevelComment/snippet/authorDisplayName,'
                + 'replies/comments/id,'
                + 'replies/comments/snippet/textDisplay,'
                + 'replies/comments/snippet/authorDisplayName)'
        };

        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/commentThreads',
            type: 'GET',
            data: options,
            success: function (data) {
                var replies = [],
                    comments = _(data.items)
                        .map(function (e) {
                            var obj = {
                                title: e.snippet.topLevelComment.snippet.authorDisplayName,
                                comment: e.snippet.topLevelComment.snippet.textDisplay,
                                comment_id: e.id
                            };

                            if (e.replies) {
                                replies = replies.concat(
                                    _(e.replies.comments)
                                        .map(function (j) {
                                            return {
                                                title: j.snippet.authorDisplayName,
                                                comment: j.snippet.textDisplay,
                                                comment_id: j.id
                                            };
                                        })
                                        .value()
                                );
                            }

                            return obj;
                        })
                        .value();

                comments = comments.concat(replies);
                commenters = commenters.concat(comments);

                if (data.nextPageToken) {
                    options.pageToken = data.nextPageToken;
                    return collectComments(options);
                }

                commenters = _.uniq(commenters, function (e) {
                    return e.title;
                });

                handleCommentators({authors: commenters});
            }
        });
    }

    function updateCommentators() {
        $.getJSON(getCommentatorsUrl, handleCommentators);
    }

    function handleCommentators(response) {
        $('.loader').hide();

        displayCommentators(response.authors);
    }

    function displayCommentators(commentators) {
        pickButton = $('<button id="pick-one"></button>')
            .attr('class', 'pure-button pure-button-primary')
            .html('Go!');

        winnerCount = $('<input id="pick-more" value="1" type="number" min="1" max="' + commentators.length + '" />');

        $('#commentators')
            .append($('<div id="header"></div>')
                .html('<span class="taunt">' + commentators.length + ' people left a comment</span> <span class="taunt">Pick </span>')
                .append(winnerCount)
                .append('<span class="taunt"> winner(s)!</span>')
                .append(pickButton)
                .append('<div id="filter_div"></div>')
                .append($('<br/><br/>')));

        $('#filter_div')
            .append('Comment filter: ')
            .append('<input name="filter" onkeyup="filter_comments(this);" type="text" id="comment_filter" title="Only people with comments containing this word(s) will appear"/>')
            .append($('<br/><br/>'));

        $('#pick-one')
            .on('click', function () {
                toggleSlotMachine(elements);
            });

        _.each(commentators, function (commentator) {
            var element = $('<div></div>')
                .addClass('commentator')
                .html(commentator.title)
                .attr('title', commentator.comment);
            elements.push(element);

            $('#commentators').append(element);
        });
    }

    window.filter_comments = function (e) {
        elements.forEach(function (a) {
            if (~a[0].getAttribute('title').indexOf(e.value)) {
                a[0].style.display = 'inline-block';
            }
            else {
                a[0].style.display = 'none';
            }
        });
    };

    function toggleSlotMachine(commentators) {
        var i,
            easeOffBy = 75;
        
        $('#slot-machine').show();
        $('#winner-taunt').hide();
        pickButton.hide();

        for (i = 0; i < easeOffBy; i++) {
            showName(i, easeOffBy - 1);
        }

        commentators = commentators.filter(function (a) {
            return a[0].style.display !== 'none';
        });

        function showName(n, lastIdx) {
            setTimeout(function nextName() {
                var samples = _.sample(commentators, +$('#pick-more').val());

                $('#name').html(samples[0].html());

                if (n === lastIdx) {
                    $('#name')
                        .html(
                            samples.map(function (a) {
                                return a.html() + '<br/>';
                            })
                        );
                }

                highlighted && highlighted.forEach(function (a) {
                    a.removeClass('highlight');
                });

                samples.forEach(function (a) {
                    a.addClass('highlight');
                });

                highlighted = samples;

                if (n === lastIdx) {
                    $('#winner-taunt')
                        .css('display', 'inherit');
                    pickButton.html('Pick again!');
                    pickButton.show();
                }
            }, (i * i));
        }
    }

})(window.htbt = window.htbt || {});

