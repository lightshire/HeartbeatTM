/*globals Keen*/

(function() {
    'use strict';

    var client = new Keen({
        projectId: '5538590196773d1ea50bf0ca',
        readKey: '1a9748dc700410eb363667e26076a0166ee71901d84d509ccacc60defc490027b2a266e57602ad5a60e27ab496218fa419ff1278a85eb888e689f8810baba1216133bb670a9ef592c541ee6b35095c6b61159c4b9b91a41aa4192d4b2096d8b15fbd70086ae400707a9b287073f52174'
    });

    Keen.ready(function() {
        drawn_metric();
        drawn_area();
        drawn_table();
    });

    function drawn_metric() {
        var total_played = new Keen.Query('count', {
                eventCollection: 'played_track',
            }),
            raw_metric = new Keen.Dataviz()
                .colors([Keen.Dataviz.defaults.colors[3]])
                .chartOptions({
                    prettyNumber: false,
                    prefix: ''
                })
                .prepare(),
            req_metric = new Keen.Dataviz()
                .height(138)
                .colors([Keen.Dataviz.defaults.colors[2]])
                .prepare(),
            req = client.run(total_played);
        req.on('complete', function(err, res) {
            req_metric.parseRequest(this).render();
            raw_metric.parseRawData(res)
            .render();
        });
        req.on('error', function(err, res) {
            req_metric.error(res.message);
            raw_metric.error(res.message);
        });
        client.draw(total_played, document.getElementById('total-played-song'), {
            colors: ['#f35757'],
            height: 138,
            title: 'Total played',
            chartOptions: {
                suffix: '',
            }
        });
    }

    function drawn_area() {
        var played_per_day = new Keen.Query('count', {
                eventCollection: 'played_track',
                timeframe: 'previous_7_days',
                interval: 'daily'
            }),
            req_area = new Keen.Dataviz()
                .height(300)
                .chartType('areachart')
                .stacked(true)
                .prepare(),
            raw_area = new Keen.Dataviz()
                .height(300)
                .chartType('areachart')
                .chartOptions({
                    isStacked: false
                })
                .prepare(),
            req = client.run(played_per_day);
        req.on('complete', function(err, res) {
            req_area.parseRequest(this).render();
            raw_area.parseRawData(res)
            .render();
        });
        client.draw(played_per_day, document.getElementById('played-song-per-day'), {
            chartType: 'areachart',
            height: 300,
            stacked: true
        });
    }

    function drawn_table() {
        var top_per_week = new Keen.Query('count', {
                event_collection: 'played_track',
                group_by: 'title',
                timeframe: 'this_7_days',
            }),
            req_table = new Keen.Dataviz()
                .height(300)
                .chartType('table')
                .prepare(),
            raw_table = new Keen.Dataviz()
                .height(300)
                .chartType('table')
                .prepare(),
            req = client.run(top_per_week);
        req.on('complete', function(err, res) {
            req_table.parseRequest(this).render();
            raw_table.parseRawData(res).render();
        });

        client.draw(top_per_week, document.getElementById('top-ten-played-song'), {
            chartType: 'table',
            height: 300,
            sortGroups: 'desc',
            sortIntervals: 'desc',
            chartOptions: {
                sortColumn: 1,
                sortAscending: false
            }
        });
    }
})();
