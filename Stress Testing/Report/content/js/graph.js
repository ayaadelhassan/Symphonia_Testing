/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 3.0, "series": [{"data": [[6600.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Premium", "isController": false}, {"data": [[400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Visit profile-1", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Visit profile-2", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Visit profile-3", "isController": false}, {"data": [[300.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "Visit profile-4", "isController": false}, {"data": [[1600.0, 1.0], [1000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Visit profile-5", "isController": false}, {"data": [[100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Visit profile-6", "isController": false}, {"data": [[600.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Visit profile-7", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Visit profile-8", "isController": false}, {"data": [[100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Visit profile-0", "isController": false}, {"data": [[100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Edit profile-0", "isController": false}, {"data": [[100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Edit profile-1", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Visit profile-9", "isController": false}, {"data": [[400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Edit profile-6", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Edit profile-7", "isController": false}, {"data": [[400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Edit profile-8", "isController": false}, {"data": [[800.0, 3.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Edit profile-9", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Edit profile-2", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Edit profile-3", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Edit profile-4", "isController": false}, {"data": [[100.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Library\\artists-1", "isController": false}, {"data": [[1100.0, 1.0], [2200.0, 1.0], [2500.0, 1.0]], "isOverall": false, "label": "Edit profile-5", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Library\\artists-0", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Library\\artists-3", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Library\\artists-2", "isController": false}, {"data": [[1800.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "Library\\artists-5", "isController": false}, {"data": [[300.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Library\\artists-4", "isController": false}, {"data": [[400.0, 1.0], [100.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "Library\\artists-7", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Library\\artists-6", "isController": false}, {"data": [[400.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Library\\artists-9", "isController": false}, {"data": [[200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Create playlist", "isController": false}, {"data": [[400.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Library\\artists-8", "isController": false}, {"data": [[18400.0, 1.0], [20100.0, 1.0]], "isOverall": false, "label": "Login Page", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "Change password-2", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Change password-3", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Change password-4", "isController": false}, {"data": [[1500.0, 1.0], [1600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Change password-5", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Change password-6", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Upgrade-9", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Change password-7", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Change password-8", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Change password-9", "isController": false}, {"data": [[1400.0, 1.0], [1600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Login Page-7", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Notifications settings-5", "isController": false}, {"data": [[2100.0, 1.0], [1500.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Upgrade-5", "isController": false}, {"data": [[12500.0, 1.0], [14400.0, 1.0], [16300.0, 1.0]], "isOverall": false, "label": "Login Page-8", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Notifications settings-4", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Upgrade-6", "isController": false}, {"data": [[1300.0, 2.0], [5600.0, 1.0]], "isOverall": false, "label": "Sign Up Page", "isController": false}, {"data": [[10500.0, 1.0], [5900.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Login Page-9", "isController": false}, {"data": [[200.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Notifications settings-3", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Upgrade-7", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Notifications settings-2", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Upgrade-8", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Notifications settings", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Notifications settings-9", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Upgrade-1", "isController": false}, {"data": [[400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Notifications settings-8", "isController": false}, {"data": [[300.0, 1.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Upgrade-2", "isController": false}, {"data": [[400.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Notifications settings-7", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "Upgrade-3", "isController": false}, {"data": [[1300.0, 1.0], [1400.0, 2.0]], "isOverall": false, "label": "Liked Songs", "isController": false}, {"data": [[400.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Notifications settings-6", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0]], "isOverall": false, "label": "Upgrade-4", "isController": false}, {"data": [[1300.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Recover Playlist", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Recover Playlist-7", "isController": false}, {"data": [[2300.0, 3.0]], "isOverall": false, "label": "Login Page-0", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Recover Playlist-8", "isController": false}, {"data": [[2400.0, 1.0], [2800.0, 1.0], [1500.0, 1.0]], "isOverall": false, "label": "Login Page-1", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Recover Playlist-9", "isController": false}, {"data": [[600.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login Page-2", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Web Player Home", "isController": false}, {"data": [[1100.0, 1.0], [1200.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "Login Page-3", "isController": false}, {"data": [[1100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Login Page-4", "isController": false}, {"data": [[1200.0, 1.0], [2500.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Login Page-5", "isController": false}, {"data": [[2100.0, 1.0], [12800.0, 1.0], [14200.0, 1.0]], "isOverall": false, "label": "Login Page-6", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Recover Playlist-0", "isController": false}, {"data": [[100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Recover Playlist-1", "isController": false}, {"data": [[300.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Recover Playlist-2", "isController": false}, {"data": [[0.0, 1.0], [200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Recover Playlist-3", "isController": false}, {"data": [[100.0, 2.0], [6500.0, 1.0]], "isOverall": false, "label": "Premium-6", "isController": false}, {"data": [[300.0, 1.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Recover Playlist-4", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Premium-7", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Change password-0", "isController": false}, {"data": [[1100.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Recover Playlist-5", "isController": false}, {"data": [[100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Premium-8", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Change password-1", "isController": false}, {"data": [[100.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Recover Playlist-6", "isController": false}, {"data": [[1400.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Premium-9", "isController": false}, {"data": [[100.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "Premium-2", "isController": false}, {"data": [[0.0, 1.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Premium-3", "isController": false}, {"data": [[0.0, 1.0], [1200.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Premium-4", "isController": false}, {"data": [[1600.0, 1.0], [1800.0, 2.0]], "isOverall": false, "label": "Premium-5", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Album-6", "isController": false}, {"data": [[100.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Album-7", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Album-8", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Premium-0", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Album-9", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Premium-1", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Album-2", "isController": false}, {"data": [[300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Album-3", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Album-4", "isController": false}, {"data": [[1200.0, 1.0], [800.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Album-5", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Album-0", "isController": false}, {"data": [[100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Album-1", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Upgrade-0", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Notifications settings-1", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Notifications settings-0", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "Change password", "isController": false}, {"data": [[900.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Web Player Home-5", "isController": false}, {"data": [[400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Web Player Home-6", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "Web Player Home-3", "isController": false}, {"data": [[300.0, 3.0]], "isOverall": false, "label": "Web Player Home-4", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Web Player Home-9", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Web Player Home-7", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Web Player Home-8", "isController": false}, {"data": [[1300.0, 1.0], [900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Album", "isController": false}, {"data": [[100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Web Player Home-1", "isController": false}, {"data": [[300.0, 3.0]], "isOverall": false, "label": "Web Player Home-2", "isController": false}, {"data": [[2300.0, 1.0], [1300.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Upgrade", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Web Player Home-0", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "Library\\artists", "isController": false}, {"data": [[2000.0, 3.0]], "isOverall": false, "label": "Search", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Search-7", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Search-8", "isController": false}, {"data": [[1600.0, 1.0], [1800.0, 2.0]], "isOverall": false, "label": "Search-5", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Search-6", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Search-9", "isController": false}, {"data": [[1500.0, 1.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "About", "isController": false}, {"data": [[2400.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Sign Up Page-1", "isController": false}, {"data": [[400.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Sign Up Page-0", "isController": false}, {"data": [[0.0, 2.0], [1700.0, 1.0]], "isOverall": false, "label": "Sign Up Page-3", "isController": false}, {"data": [[5100.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Sign Up Page-2", "isController": false}, {"data": [[1200.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "Sign Up Page-5", "isController": false}, {"data": [[400.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "Search-0", "isController": false}, {"data": [[2100.0, 1.0], [0.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Sign Up Page-4", "isController": false}, {"data": [[400.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Sign Up Page-7", "isController": false}, {"data": [[600.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Sign Up Page-6", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Search-3", "isController": false}, {"data": [[2500.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Sign Up Page-9", "isController": false}, {"data": [[300.0, 3.0]], "isOverall": false, "label": "Search-4", "isController": false}, {"data": [[1100.0, 1.0], [400.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Sign Up Page-8", "isController": false}, {"data": [[1300.0, 1.0], [2700.0, 2.0]], "isOverall": false, "label": "Edit profile", "isController": false}, {"data": [[100.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Search-1", "isController": false}, {"data": [[300.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Search-2", "isController": false}, {"data": [[1200.0, 1.0], [2500.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Visit profile", "isController": false}, {"data": [[4600.0, 1.0], [2700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Library\\albums", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "About-3", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "Library\\playlists-0", "isController": false}, {"data": [[300.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "About-2", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "About-1", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "About-0", "isController": false}, {"data": [[300.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Library\\playlists-3", "isController": false}, {"data": [[400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "About-7", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "Library\\playlists-4", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "About-6", "isController": false}, {"data": [[200.0, 3.0]], "isOverall": false, "label": "Play a song", "isController": false}, {"data": [[100.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Library\\playlists-1", "isController": false}, {"data": [[1300.0, 1.0], [1600.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "About-5", "isController": false}, {"data": [[300.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Library\\playlists-2", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "About-4", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Library\\playlists-7", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Library\\playlists-8", "isController": false}, {"data": [[1100.0, 1.0], [1800.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "Library\\playlists-5", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "About-9", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Library\\playlists-6", "isController": false}, {"data": [[400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "About-8", "isController": false}, {"data": [[400.0, 3.0]], "isOverall": false, "label": "Library\\playlists-9", "isController": false}, {"data": [[1400.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Library\\albums-8", "isController": false}, {"data": [[1500.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Library\\albums-9", "isController": false}, {"data": [[1300.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Library\\playlists", "isController": false}, {"data": [[400.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "Liked Songs-1", "isController": false}, {"data": [[400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Liked Songs-0", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Liked Songs-3", "isController": false}, {"data": [[300.0, 2.0], [200.0, 1.0]], "isOverall": false, "label": "Liked Songs-2", "isController": false}, {"data": [[1100.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "Liked Songs-5", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0]], "isOverall": false, "label": "Liked Songs-4", "isController": false}, {"data": [[400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Liked Songs-7", "isController": false}, {"data": [[100.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "Liked Songs-6", "isController": false}, {"data": [[500.0, 3.0]], "isOverall": false, "label": "Liked Songs-9", "isController": false}, {"data": [[400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Liked Songs-8", "isController": false}, {"data": [[300.0, 2.0], [3400.0, 1.0]], "isOverall": false, "label": "Library\\albums-4", "isController": false}, {"data": [[2500.0, 1.0], [1500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Library\\albums-5", "isController": false}, {"data": [[1400.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Library\\albums-6", "isController": false}, {"data": [[1400.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Library\\albums-7", "isController": false}, {"data": [[1200.0, 1.0], [100.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Library\\albums-0", "isController": false}, {"data": [[1400.0, 1.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Library\\albums-1", "isController": false}, {"data": [[300.0, 1.0], [1200.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "Library\\albums-2", "isController": false}, {"data": [[200.0, 2.0], [3200.0, 1.0]], "isOverall": false, "label": "Library\\albums-3", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 20100.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 24.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 345.0, "series": [{"data": [[0.0, 345.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 87.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 24.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 113.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.287769784172662, "minX": 1.591833E12, "maxY": 3.0, "series": [{"data": [[1.59183306E12, 2.287769784172662], [1.591833E12, 3.0]], "isOverall": false, "label": "Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59183306E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 84.0, "minX": 1.0, "maxY": 19253.5, "series": [{"data": [[2.0, 1820.0], [3.0, 4372.5]], "isOverall": false, "label": "Premium", "isController": false}, {"data": [[2.6666666666666665, 3521.6666666666665]], "isOverall": false, "label": "Premium-Aggregated", "isController": false}, {"data": [[3.0, 382.0]], "isOverall": false, "label": "Visit profile-1", "isController": false}, {"data": [[3.0, 382.0]], "isOverall": false, "label": "Visit profile-1-Aggregated", "isController": false}, {"data": [[3.0, 375.0]], "isOverall": false, "label": "Visit profile-2", "isController": false}, {"data": [[3.0, 375.0]], "isOverall": false, "label": "Visit profile-2-Aggregated", "isController": false}, {"data": [[3.0, 355.0]], "isOverall": false, "label": "Visit profile-3", "isController": false}, {"data": [[3.0, 355.0]], "isOverall": false, "label": "Visit profile-3-Aggregated", "isController": false}, {"data": [[3.0, 483.66666666666663]], "isOverall": false, "label": "Visit profile-4", "isController": false}, {"data": [[3.0, 483.66666666666663]], "isOverall": false, "label": "Visit profile-4-Aggregated", "isController": false}, {"data": [[3.0, 1590.6666666666667]], "isOverall": false, "label": "Visit profile-5", "isController": false}, {"data": [[3.0, 1590.6666666666667]], "isOverall": false, "label": "Visit profile-5-Aggregated", "isController": false}, {"data": [[3.0, 292.0]], "isOverall": false, "label": "Visit profile-6", "isController": false}, {"data": [[3.0, 292.0]], "isOverall": false, "label": "Visit profile-6-Aggregated", "isController": false}, {"data": [[3.0, 534.3333333333334]], "isOverall": false, "label": "Visit profile-7", "isController": false}, {"data": [[3.0, 534.3333333333334]], "isOverall": false, "label": "Visit profile-7-Aggregated", "isController": false}, {"data": [[3.0, 475.0]], "isOverall": false, "label": "Visit profile-8", "isController": false}, {"data": [[3.0, 475.0]], "isOverall": false, "label": "Visit profile-8-Aggregated", "isController": false}, {"data": [[3.0, 277.6666666666667]], "isOverall": false, "label": "Visit profile-0", "isController": false}, {"data": [[3.0, 277.6666666666667]], "isOverall": false, "label": "Visit profile-0-Aggregated", "isController": false}, {"data": [[3.0, 283.3333333333333]], "isOverall": false, "label": "Edit profile-0", "isController": false}, {"data": [[3.0, 283.3333333333333]], "isOverall": false, "label": "Edit profile-0-Aggregated", "isController": false}, {"data": [[3.0, 292.6666666666667]], "isOverall": false, "label": "Edit profile-1", "isController": false}, {"data": [[3.0, 292.6666666666667]], "isOverall": false, "label": "Edit profile-1-Aggregated", "isController": false}, {"data": [[3.0, 484.3333333333333]], "isOverall": false, "label": "Visit profile-9", "isController": false}, {"data": [[3.0, 484.3333333333333]], "isOverall": false, "label": "Visit profile-9-Aggregated", "isController": false}, {"data": [[3.0, 386.3333333333333]], "isOverall": false, "label": "Edit profile-6", "isController": false}, {"data": [[3.0, 386.3333333333333]], "isOverall": false, "label": "Edit profile-6-Aggregated", "isController": false}, {"data": [[3.0, 498.3333333333333]], "isOverall": false, "label": "Edit profile-7", "isController": false}, {"data": [[3.0, 498.3333333333333]], "isOverall": false, "label": "Edit profile-7-Aggregated", "isController": false}, {"data": [[3.0, 378.3333333333333]], "isOverall": false, "label": "Edit profile-8", "isController": false}, {"data": [[3.0, 378.3333333333333]], "isOverall": false, "label": "Edit profile-8-Aggregated", "isController": false}, {"data": [[3.0, 832.3333333333334]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[3.0, 832.3333333333334]], "isOverall": false, "label": "Login-Aggregated", "isController": false}, {"data": [[3.0, 388.0]], "isOverall": false, "label": "Edit profile-9", "isController": false}, {"data": [[3.0, 388.0]], "isOverall": false, "label": "Edit profile-9-Aggregated", "isController": false}, {"data": [[3.0, 229.0]], "isOverall": false, "label": "Edit profile-2", "isController": false}, {"data": [[3.0, 229.0]], "isOverall": false, "label": "Edit profile-2-Aggregated", "isController": false}, {"data": [[3.0, 181.66666666666669]], "isOverall": false, "label": "Edit profile-3", "isController": false}, {"data": [[3.0, 181.66666666666669]], "isOverall": false, "label": "Edit profile-3-Aggregated", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "Edit profile-4", "isController": false}, {"data": [[3.0, 171.0]], "isOverall": false, "label": "Edit profile-4-Aggregated", "isController": false}, {"data": [[3.0, 401.0]], "isOverall": false, "label": "Library\\artists-1", "isController": false}, {"data": [[3.0, 401.0]], "isOverall": false, "label": "Library\\artists-1-Aggregated", "isController": false}, {"data": [[3.0, 2001.0]], "isOverall": false, "label": "Edit profile-5", "isController": false}, {"data": [[3.0, 2001.0]], "isOverall": false, "label": "Edit profile-5-Aggregated", "isController": false}, {"data": [[3.0, 167.66666666666666]], "isOverall": false, "label": "Library\\artists-0", "isController": false}, {"data": [[3.0, 167.66666666666666]], "isOverall": false, "label": "Library\\artists-0-Aggregated", "isController": false}, {"data": [[3.0, 240.0]], "isOverall": false, "label": "Library\\artists-3", "isController": false}, {"data": [[3.0, 240.0]], "isOverall": false, "label": "Library\\artists-3-Aggregated", "isController": false}, {"data": [[3.0, 288.3333333333333]], "isOverall": false, "label": "Library\\artists-2", "isController": false}, {"data": [[3.0, 288.3333333333333]], "isOverall": false, "label": "Library\\artists-2-Aggregated", "isController": false}, {"data": [[3.0, 1898.0]], "isOverall": false, "label": "Library\\artists-5", "isController": false}, {"data": [[3.0, 1898.0]], "isOverall": false, "label": "Library\\artists-5-Aggregated", "isController": false}, {"data": [[3.0, 262.3333333333333]], "isOverall": false, "label": "Library\\artists-4", "isController": false}, {"data": [[3.0, 262.3333333333333]], "isOverall": false, "label": "Library\\artists-4-Aggregated", "isController": false}, {"data": [[3.0, 517.0]], "isOverall": false, "label": "Library\\artists-7", "isController": false}, {"data": [[3.0, 517.0]], "isOverall": false, "label": "Library\\artists-7-Aggregated", "isController": false}, {"data": [[3.0, 396.3333333333333]], "isOverall": false, "label": "Library\\artists-6", "isController": false}, {"data": [[3.0, 396.3333333333333]], "isOverall": false, "label": "Library\\artists-6-Aggregated", "isController": false}, {"data": [[3.0, 642.3333333333334]], "isOverall": false, "label": "Library\\artists-9", "isController": false}, {"data": [[3.0, 642.3333333333334]], "isOverall": false, "label": "Library\\artists-9-Aggregated", "isController": false}, {"data": [[3.0, 411.3333333333333]], "isOverall": false, "label": "Create playlist", "isController": false}, {"data": [[3.0, 411.3333333333333]], "isOverall": false, "label": "Create playlist-Aggregated", "isController": false}, {"data": [[3.0, 641.6666666666666]], "isOverall": false, "label": "Library\\artists-8", "isController": false}, {"data": [[3.0, 641.6666666666666]], "isOverall": false, "label": "Library\\artists-8-Aggregated", "isController": false}, {"data": [[3.0, 19253.5]], "isOverall": false, "label": "Login Page", "isController": false}, {"data": [[3.0, 19253.5]], "isOverall": false, "label": "Login Page-Aggregated", "isController": false}, {"data": [[3.0, 321.3333333333333]], "isOverall": false, "label": "Change password-2", "isController": false}, {"data": [[3.0, 321.3333333333333]], "isOverall": false, "label": "Change password-2-Aggregated", "isController": false}, {"data": [[3.0, 360.6666666666667]], "isOverall": false, "label": "Change password-3", "isController": false}, {"data": [[3.0, 360.6666666666667]], "isOverall": false, "label": "Change password-3-Aggregated", "isController": false}, {"data": [[3.0, 548.3333333333334]], "isOverall": false, "label": "Change password-4", "isController": false}, {"data": [[3.0, 548.3333333333334]], "isOverall": false, "label": "Change password-4-Aggregated", "isController": false}, {"data": [[3.0, 1676.6666666666667]], "isOverall": false, "label": "Change password-5", "isController": false}, {"data": [[3.0, 1676.6666666666667]], "isOverall": false, "label": "Change password-5-Aggregated", "isController": false}, {"data": [[3.0, 509.0]], "isOverall": false, "label": "Change password-6", "isController": false}, {"data": [[3.0, 509.0]], "isOverall": false, "label": "Change password-6-Aggregated", "isController": false}, {"data": [[2.0, 501.0], [3.0, 512.0]], "isOverall": false, "label": "Upgrade-9", "isController": false}, {"data": [[2.3333333333333335, 504.6666666666667]], "isOverall": false, "label": "Upgrade-9-Aggregated", "isController": false}, {"data": [[3.0, 487.6666666666667]], "isOverall": false, "label": "Change password-7", "isController": false}, {"data": [[3.0, 487.6666666666667]], "isOverall": false, "label": "Change password-7-Aggregated", "isController": false}, {"data": [[3.0, 486.3333333333333]], "isOverall": false, "label": "Change password-8", "isController": false}, {"data": [[3.0, 486.3333333333333]], "isOverall": false, "label": "Change password-8-Aggregated", "isController": false}, {"data": [[3.0, 476.3333333333333]], "isOverall": false, "label": "Change password-9", "isController": false}, {"data": [[3.0, 476.3333333333333]], "isOverall": false, "label": "Change password-9-Aggregated", "isController": false}, {"data": [[3.0, 1357.3333333333333]], "isOverall": false, "label": "Login Page-7", "isController": false}, {"data": [[3.0, 1357.3333333333333]], "isOverall": false, "label": "Login Page-7-Aggregated", "isController": false}, {"data": [[3.0, 1431.6666666666667]], "isOverall": false, "label": "Notifications settings-5", "isController": false}, {"data": [[3.0, 1431.6666666666667]], "isOverall": false, "label": "Notifications settings-5-Aggregated", "isController": false}, {"data": [[2.0, 1217.5], [3.0, 2161.0]], "isOverall": false, "label": "Upgrade-5", "isController": false}, {"data": [[2.3333333333333335, 1532.0]], "isOverall": false, "label": "Upgrade-5-Aggregated", "isController": false}, {"data": [[3.0, 14465.0]], "isOverall": false, "label": "Login Page-8", "isController": false}, {"data": [[3.0, 14465.0]], "isOverall": false, "label": "Login Page-8-Aggregated", "isController": false}, {"data": [[3.0, 304.0]], "isOverall": false, "label": "Notifications settings-4", "isController": false}, {"data": [[3.0, 304.0]], "isOverall": false, "label": "Notifications settings-4-Aggregated", "isController": false}, {"data": [[2.0, 401.0], [3.0, 477.0]], "isOverall": false, "label": "Upgrade-6", "isController": false}, {"data": [[2.3333333333333335, 426.33333333333337]], "isOverall": false, "label": "Upgrade-6-Aggregated", "isController": false}, {"data": [[2.0, 1399.0], [1.0, 1386.0], [3.0, 5653.0]], "isOverall": false, "label": "Sign Up Page", "isController": false}, {"data": [[2.0, 2812.6666666666665]], "isOverall": false, "label": "Sign Up Page-Aggregated", "isController": false}, {"data": [[3.0, 6092.333333333333]], "isOverall": false, "label": "Login Page-9", "isController": false}, {"data": [[3.0, 6092.333333333333]], "isOverall": false, "label": "Login Page-9-Aggregated", "isController": false}, {"data": [[3.0, 147.33333333333334]], "isOverall": false, "label": "Notifications settings-3", "isController": false}, {"data": [[3.0, 147.33333333333334]], "isOverall": false, "label": "Notifications settings-3-Aggregated", "isController": false}, {"data": [[2.0, 487.5], [3.0, 526.0]], "isOverall": false, "label": "Upgrade-7", "isController": false}, {"data": [[2.3333333333333335, 500.3333333333333]], "isOverall": false, "label": "Upgrade-7-Aggregated", "isController": false}, {"data": [[3.0, 199.33333333333334]], "isOverall": false, "label": "Notifications settings-2", "isController": false}, {"data": [[3.0, 199.33333333333334]], "isOverall": false, "label": "Notifications settings-2-Aggregated", "isController": false}, {"data": [[2.0, 496.5], [3.0, 505.0]], "isOverall": false, "label": "Upgrade-8", "isController": false}, {"data": [[2.3333333333333335, 499.3333333333333]], "isOverall": false, "label": "Upgrade-8-Aggregated", "isController": false}, {"data": [[3.0, 1611.0]], "isOverall": false, "label": "Notifications settings", "isController": false}, {"data": [[3.0, 1611.0]], "isOverall": false, "label": "Notifications settings-Aggregated", "isController": false}, {"data": [[3.0, 474.6666666666667]], "isOverall": false, "label": "Notifications settings-9", "isController": false}, {"data": [[3.0, 474.6666666666667]], "isOverall": false, "label": "Notifications settings-9-Aggregated", "isController": false}, {"data": [[2.0, 328.5], [3.0, 501.0]], "isOverall": false, "label": "Upgrade-1", "isController": false}, {"data": [[2.3333333333333335, 386.0]], "isOverall": false, "label": "Upgrade-1-Aggregated", "isController": false}, {"data": [[3.0, 387.0]], "isOverall": false, "label": "Notifications settings-8", "isController": false}, {"data": [[3.0, 387.0]], "isOverall": false, "label": "Notifications settings-8-Aggregated", "isController": false}, {"data": [[2.0, 382.5], [3.0, 283.0]], "isOverall": false, "label": "Upgrade-2", "isController": false}, {"data": [[2.3333333333333335, 349.3333333333333]], "isOverall": false, "label": "Upgrade-2-Aggregated", "isController": false}, {"data": [[3.0, 273.0]], "isOverall": false, "label": "Notifications settings-7", "isController": false}, {"data": [[3.0, 273.0]], "isOverall": false, "label": "Notifications settings-7-Aggregated", "isController": false}, {"data": [[2.0, 284.0], [3.0, 312.0]], "isOverall": false, "label": "Upgrade-3", "isController": false}, {"data": [[2.3333333333333335, 293.3333333333333]], "isOverall": false, "label": "Upgrade-3-Aggregated", "isController": false}, {"data": [[2.0, 1366.0], [1.0, 1458.0], [3.0, 1463.0]], "isOverall": false, "label": "Liked Songs", "isController": false}, {"data": [[2.0, 1429.0]], "isOverall": false, "label": "Liked Songs-Aggregated", "isController": false}, {"data": [[3.0, 282.0]], "isOverall": false, "label": "Notifications settings-6", "isController": false}, {"data": [[3.0, 282.0]], "isOverall": false, "label": "Notifications settings-6-Aggregated", "isController": false}, {"data": [[2.0, 342.0], [3.0, 744.0]], "isOverall": false, "label": "Upgrade-4", "isController": false}, {"data": [[2.3333333333333335, 476.0]], "isOverall": false, "label": "Upgrade-4-Aggregated", "isController": false}, {"data": [[3.0, 1828.6666666666667]], "isOverall": false, "label": "Recover Playlist", "isController": false}, {"data": [[3.0, 1828.6666666666667]], "isOverall": false, "label": "Recover Playlist-Aggregated", "isController": false}, {"data": [[3.0, 484.6666666666667]], "isOverall": false, "label": "Recover Playlist-7", "isController": false}, {"data": [[3.0, 484.6666666666667]], "isOverall": false, "label": "Recover Playlist-7-Aggregated", "isController": false}, {"data": [[3.0, 2352.0]], "isOverall": false, "label": "Login Page-0", "isController": false}, {"data": [[3.0, 2352.0]], "isOverall": false, "label": "Login Page-0-Aggregated", "isController": false}, {"data": [[3.0, 477.3333333333333]], "isOverall": false, "label": "Recover Playlist-8", "isController": false}, {"data": [[3.0, 477.3333333333333]], "isOverall": false, "label": "Recover Playlist-8-Aggregated", "isController": false}, {"data": [[3.0, 2280.3333333333335]], "isOverall": false, "label": "Login Page-1", "isController": false}, {"data": [[3.0, 2280.3333333333335]], "isOverall": false, "label": "Login Page-1-Aggregated", "isController": false}, {"data": [[3.0, 465.0]], "isOverall": false, "label": "Recover Playlist-9", "isController": false}, {"data": [[3.0, 465.0]], "isOverall": false, "label": "Recover Playlist-9-Aggregated", "isController": false}, {"data": [[3.0, 692.0]], "isOverall": false, "label": "Login Page-2", "isController": false}, {"data": [[3.0, 692.0]], "isOverall": false, "label": "Login Page-2-Aggregated", "isController": false}, {"data": [[3.0, 1467.6666666666667]], "isOverall": false, "label": "Web Player Home", "isController": false}, {"data": [[3.0, 1467.6666666666667]], "isOverall": false, "label": "Web Player Home-Aggregated", "isController": false}, {"data": [[3.0, 1278.3333333333333]], "isOverall": false, "label": "Login Page-3", "isController": false}, {"data": [[3.0, 1278.3333333333333]], "isOverall": false, "label": "Login Page-3-Aggregated", "isController": false}, {"data": [[3.0, 717.3333333333334]], "isOverall": false, "label": "Login Page-4", "isController": false}, {"data": [[3.0, 717.3333333333334]], "isOverall": false, "label": "Login Page-4-Aggregated", "isController": false}, {"data": [[3.0, 1900.3333333333333]], "isOverall": false, "label": "Login Page-5", "isController": false}, {"data": [[3.0, 1900.3333333333333]], "isOverall": false, "label": "Login Page-5-Aggregated", "isController": false}, {"data": [[3.0, 9727.0]], "isOverall": false, "label": "Login Page-6", "isController": false}, {"data": [[3.0, 9727.0]], "isOverall": false, "label": "Login Page-6-Aggregated", "isController": false}, {"data": [[3.0, 160.66666666666666]], "isOverall": false, "label": "Recover Playlist-0", "isController": false}, {"data": [[3.0, 160.66666666666666]], "isOverall": false, "label": "Recover Playlist-0-Aggregated", "isController": false}, {"data": [[3.0, 270.3333333333333]], "isOverall": false, "label": "Recover Playlist-1", "isController": false}, {"data": [[3.0, 270.3333333333333]], "isOverall": false, "label": "Recover Playlist-1-Aggregated", "isController": false}, {"data": [[3.0, 270.6666666666667]], "isOverall": false, "label": "Recover Playlist-2", "isController": false}, {"data": [[3.0, 270.6666666666667]], "isOverall": false, "label": "Recover Playlist-2-Aggregated", "isController": false}, {"data": [[3.0, 266.6666666666667]], "isOverall": false, "label": "Recover Playlist-3", "isController": false}, {"data": [[3.0, 266.6666666666667]], "isOverall": false, "label": "Recover Playlist-3-Aggregated", "isController": false}, {"data": [[2.0, 168.0], [3.0, 3339.0]], "isOverall": false, "label": "Premium-6", "isController": false}, {"data": [[2.6666666666666665, 2282.0]], "isOverall": false, "label": "Premium-6-Aggregated", "isController": false}, {"data": [[3.0, 309.3333333333333]], "isOverall": false, "label": "Recover Playlist-4", "isController": false}, {"data": [[3.0, 309.3333333333333]], "isOverall": false, "label": "Recover Playlist-4-Aggregated", "isController": false}, {"data": [[2.0, 521.0], [3.0, 485.5]], "isOverall": false, "label": "Premium-7", "isController": false}, {"data": [[2.6666666666666665, 497.3333333333333]], "isOverall": false, "label": "Premium-7-Aggregated", "isController": false}, {"data": [[3.0, 385.3333333333333]], "isOverall": false, "label": "Change password-0", "isController": false}, {"data": [[3.0, 385.3333333333333]], "isOverall": false, "label": "Change password-0-Aggregated", "isController": false}, {"data": [[3.0, 1662.0]], "isOverall": false, "label": "Recover Playlist-5", "isController": false}, {"data": [[3.0, 1662.0]], "isOverall": false, "label": "Recover Playlist-5-Aggregated", "isController": false}, {"data": [[2.0, 192.0], [3.0, 334.0]], "isOverall": false, "label": "Premium-8", "isController": false}, {"data": [[2.6666666666666665, 286.6666666666667]], "isOverall": false, "label": "Premium-8-Aggregated", "isController": false}, {"data": [[3.0, 167.33333333333334]], "isOverall": false, "label": "Change password-1", "isController": false}, {"data": [[3.0, 167.33333333333334]], "isOverall": false, "label": "Change password-1-Aggregated", "isController": false}, {"data": [[3.0, 394.6666666666667]], "isOverall": false, "label": "Recover Playlist-6", "isController": false}, {"data": [[3.0, 394.6666666666667]], "isOverall": false, "label": "Recover Playlist-6-Aggregated", "isController": false}, {"data": [[2.0, 494.0], [3.0, 954.0]], "isOverall": false, "label": "Premium-9", "isController": false}, {"data": [[2.6666666666666665, 800.6666666666666]], "isOverall": false, "label": "Premium-9-Aggregated", "isController": false}, {"data": [[2.0, 152.0], [3.0, 504.0]], "isOverall": false, "label": "Premium-2", "isController": false}, {"data": [[2.6666666666666665, 386.6666666666667]], "isOverall": false, "label": "Premium-2-Aggregated", "isController": false}, {"data": [[2.0, 120.0], [3.0, 425.5]], "isOverall": false, "label": "Premium-3", "isController": false}, {"data": [[2.6666666666666665, 323.6666666666667]], "isOverall": false, "label": "Premium-3-Aggregated", "isController": false}, {"data": [[2.0, 447.0], [3.0, 697.0]], "isOverall": false, "label": "Premium-4", "isController": false}, {"data": [[2.6666666666666665, 613.6666666666666]], "isOverall": false, "label": "Premium-4-Aggregated", "isController": false}, {"data": [[2.0, 1653.0], [3.0, 1887.0]], "isOverall": false, "label": "Premium-5", "isController": false}, {"data": [[2.6666666666666665, 1809.0]], "isOverall": false, "label": "Premium-5-Aggregated", "isController": false}, {"data": [[3.0, 495.6666666666667]], "isOverall": false, "label": "Album-6", "isController": false}, {"data": [[3.0, 495.6666666666667]], "isOverall": false, "label": "Album-6-Aggregated", "isController": false}, {"data": [[3.0, 276.6666666666667]], "isOverall": false, "label": "Album-7", "isController": false}, {"data": [[3.0, 276.6666666666667]], "isOverall": false, "label": "Album-7-Aggregated", "isController": false}, {"data": [[3.0, 387.0]], "isOverall": false, "label": "Album-8", "isController": false}, {"data": [[3.0, 387.0]], "isOverall": false, "label": "Album-8-Aggregated", "isController": false}, {"data": [[2.0, 161.0], [3.0, 169.0]], "isOverall": false, "label": "Premium-0", "isController": false}, {"data": [[2.6666666666666665, 166.33333333333334]], "isOverall": false, "label": "Premium-0-Aggregated", "isController": false}, {"data": [[3.0, 481.0]], "isOverall": false, "label": "Album-9", "isController": false}, {"data": [[3.0, 481.0]], "isOverall": false, "label": "Album-9-Aggregated", "isController": false}, {"data": [[2.0, 191.0], [3.0, 576.5]], "isOverall": false, "label": "Premium-1", "isController": false}, {"data": [[2.6666666666666665, 448.0]], "isOverall": false, "label": "Premium-1-Aggregated", "isController": false}, {"data": [[3.0, 208.0]], "isOverall": false, "label": "Album-2", "isController": false}, {"data": [[3.0, 208.0]], "isOverall": false, "label": "Album-2-Aggregated", "isController": false}, {"data": [[3.0, 184.33333333333331]], "isOverall": false, "label": "Album-3", "isController": false}, {"data": [[3.0, 184.33333333333331]], "isOverall": false, "label": "Album-3-Aggregated", "isController": false}, {"data": [[3.0, 174.33333333333331]], "isOverall": false, "label": "Album-4", "isController": false}, {"data": [[3.0, 174.33333333333331]], "isOverall": false, "label": "Album-4-Aggregated", "isController": false}, {"data": [[3.0, 1302.3333333333333]], "isOverall": false, "label": "Album-5", "isController": false}, {"data": [[3.0, 1302.3333333333333]], "isOverall": false, "label": "Album-5-Aggregated", "isController": false}, {"data": [[3.0, 161.66666666666666]], "isOverall": false, "label": "Album-0", "isController": false}, {"data": [[3.0, 161.66666666666666]], "isOverall": false, "label": "Album-0-Aggregated", "isController": false}, {"data": [[3.0, 277.3333333333333]], "isOverall": false, "label": "Album-1", "isController": false}, {"data": [[3.0, 277.3333333333333]], "isOverall": false, "label": "Album-1-Aggregated", "isController": false}, {"data": [[2.0, 492.5], [3.0, 168.0]], "isOverall": false, "label": "Upgrade-0", "isController": false}, {"data": [[2.3333333333333335, 384.3333333333333]], "isOverall": false, "label": "Upgrade-0-Aggregated", "isController": false}, {"data": [[3.0, 478.0]], "isOverall": false, "label": "Notifications settings-1", "isController": false}, {"data": [[3.0, 478.0]], "isOverall": false, "label": "Notifications settings-1-Aggregated", "isController": false}, {"data": [[3.0, 168.0]], "isOverall": false, "label": "Notifications settings-0", "isController": false}, {"data": [[3.0, 168.0]], "isOverall": false, "label": "Notifications settings-0-Aggregated", "isController": false}, {"data": [[3.0, 2068.0]], "isOverall": false, "label": "Change password", "isController": false}, {"data": [[3.0, 2068.0]], "isOverall": false, "label": "Change password-Aggregated", "isController": false}, {"data": [[3.0, 1298.6666666666667]], "isOverall": false, "label": "Web Player Home-5", "isController": false}, {"data": [[3.0, 1298.6666666666667]], "isOverall": false, "label": "Web Player Home-5-Aggregated", "isController": false}, {"data": [[3.0, 386.0]], "isOverall": false, "label": "Web Player Home-6", "isController": false}, {"data": [[3.0, 386.0]], "isOverall": false, "label": "Web Player Home-6-Aggregated", "isController": false}, {"data": [[3.0, 290.3333333333333]], "isOverall": false, "label": "Web Player Home-3", "isController": false}, {"data": [[3.0, 290.3333333333333]], "isOverall": false, "label": "Web Player Home-3-Aggregated", "isController": false}, {"data": [[3.0, 328.0]], "isOverall": false, "label": "Web Player Home-4", "isController": false}, {"data": [[3.0, 328.0]], "isOverall": false, "label": "Web Player Home-4-Aggregated", "isController": false}, {"data": [[3.0, 480.3333333333333]], "isOverall": false, "label": "Web Player Home-9", "isController": false}, {"data": [[3.0, 480.3333333333333]], "isOverall": false, "label": "Web Player Home-9-Aggregated", "isController": false}, {"data": [[3.0, 499.6666666666667]], "isOverall": false, "label": "Web Player Home-7", "isController": false}, {"data": [[3.0, 499.6666666666667]], "isOverall": false, "label": "Web Player Home-7-Aggregated", "isController": false}, {"data": [[3.0, 472.3333333333333]], "isOverall": false, "label": "Web Player Home-8", "isController": false}, {"data": [[3.0, 472.3333333333333]], "isOverall": false, "label": "Web Player Home-8-Aggregated", "isController": false}, {"data": [[3.0, 1473.0]], "isOverall": false, "label": "Album", "isController": false}, {"data": [[3.0, 1473.0]], "isOverall": false, "label": "Album-Aggregated", "isController": false}, {"data": [[3.0, 275.0]], "isOverall": false, "label": "Web Player Home-1", "isController": false}, {"data": [[3.0, 275.0]], "isOverall": false, "label": "Web Player Home-1-Aggregated", "isController": false}, {"data": [[3.0, 340.3333333333333]], "isOverall": false, "label": "Web Player Home-2", "isController": false}, {"data": [[3.0, 340.3333333333333]], "isOverall": false, "label": "Web Player Home-2-Aggregated", "isController": false}, {"data": [[2.0, 1713.5], [3.0, 2333.0]], "isOverall": false, "label": "Upgrade", "isController": false}, {"data": [[2.3333333333333335, 1920.0]], "isOverall": false, "label": "Upgrade-Aggregated", "isController": false}, {"data": [[3.0, 160.33333333333334]], "isOverall": false, "label": "Web Player Home-0", "isController": false}, {"data": [[3.0, 160.33333333333334]], "isOverall": false, "label": "Web Player Home-0-Aggregated", "isController": false}, {"data": [[3.0, 2068.0]], "isOverall": false, "label": "Library\\artists", "isController": false}, {"data": [[3.0, 2068.0]], "isOverall": false, "label": "Library\\artists-Aggregated", "isController": false}, {"data": [[3.0, 2066.3333333333335]], "isOverall": false, "label": "Search", "isController": false}, {"data": [[3.0, 2066.3333333333335]], "isOverall": false, "label": "Search-Aggregated", "isController": false}, {"data": [[3.0, 379.3333333333333]], "isOverall": false, "label": "Search-7", "isController": false}, {"data": [[3.0, 379.3333333333333]], "isOverall": false, "label": "Search-7-Aggregated", "isController": false}, {"data": [[3.0, 392.6666666666667]], "isOverall": false, "label": "Search-8", "isController": false}, {"data": [[3.0, 392.6666666666667]], "isOverall": false, "label": "Search-8-Aggregated", "isController": false}, {"data": [[3.0, 1792.0]], "isOverall": false, "label": "Search-5", "isController": false}, {"data": [[3.0, 1792.0]], "isOverall": false, "label": "Search-5-Aggregated", "isController": false}, {"data": [[3.0, 513.3333333333334]], "isOverall": false, "label": "Search-6", "isController": false}, {"data": [[3.0, 513.3333333333334]], "isOverall": false, "label": "Search-6-Aggregated", "isController": false}, {"data": [[3.0, 503.3333333333333]], "isOverall": false, "label": "Search-9", "isController": false}, {"data": [[3.0, 503.3333333333333]], "isOverall": false, "label": "Search-9-Aggregated", "isController": false}, {"data": [[3.0, 1497.6666666666667]], "isOverall": false, "label": "About", "isController": false}, {"data": [[3.0, 1497.6666666666667]], "isOverall": false, "label": "About-Aggregated", "isController": false}, {"data": [[2.0, 155.0], [1.0, 168.0], [3.0, 2495.0]], "isOverall": false, "label": "Sign Up Page-1", "isController": false}, {"data": [[2.0, 939.3333333333333]], "isOverall": false, "label": "Sign Up Page-1-Aggregated", "isController": false}, {"data": [[2.0, 160.0], [1.0, 167.0], [3.0, 471.0]], "isOverall": false, "label": "Sign Up Page-0", "isController": false}, {"data": [[2.0, 266.0]], "isOverall": false, "label": "Sign Up Page-0-Aggregated", "isController": false}, {"data": [[2.0, 84.0], [1.0, 91.0], [3.0, 1718.0]], "isOverall": false, "label": "Sign Up Page-3", "isController": false}, {"data": [[2.0, 631.0]], "isOverall": false, "label": "Sign Up Page-3-Aggregated", "isController": false}, {"data": [[2.0, 121.0], [1.0, 174.0], [3.0, 5177.0]], "isOverall": false, "label": "Sign Up Page-2", "isController": false}, {"data": [[2.0, 1824.0]], "isOverall": false, "label": "Sign Up Page-2-Aggregated", "isController": false}, {"data": [[2.0, 1236.0], [1.0, 1216.0], [3.0, 1993.0]], "isOverall": false, "label": "Sign Up Page-5", "isController": false}, {"data": [[2.0, 1481.6666666666667]], "isOverall": false, "label": "Sign Up Page-5-Aggregated", "isController": false}, {"data": [[3.0, 270.0]], "isOverall": false, "label": "Search-0", "isController": false}, {"data": [[3.0, 270.0]], "isOverall": false, "label": "Search-0-Aggregated", "isController": false}, {"data": [[2.0, 102.0], [1.0, 88.0], [3.0, 2136.0]], "isOverall": false, "label": "Sign Up Page-4", "isController": false}, {"data": [[2.0, 775.3333333333333]], "isOverall": false, "label": "Sign Up Page-4-Aggregated", "isController": false}, {"data": [[2.0, 468.0], [1.0, 471.0], [3.0, 1001.0]], "isOverall": false, "label": "Sign Up Page-7", "isController": false}, {"data": [[2.0, 646.6666666666666]], "isOverall": false, "label": "Sign Up Page-7-Aggregated", "isController": false}, {"data": [[2.0, 512.0], [1.0, 176.0], [3.0, 646.0]], "isOverall": false, "label": "Sign Up Page-6", "isController": false}, {"data": [[2.0, 444.66666666666663]], "isOverall": false, "label": "Sign Up Page-6-Aggregated", "isController": false}, {"data": [[3.0, 394.6666666666667]], "isOverall": false, "label": "Search-3", "isController": false}, {"data": [[3.0, 394.6666666666667]], "isOverall": false, "label": "Search-3-Aggregated", "isController": false}, {"data": [[2.0, 506.0], [1.0, 501.0], [3.0, 2538.0]], "isOverall": false, "label": "Sign Up Page-9", "isController": false}, {"data": [[2.0, 1181.6666666666667]], "isOverall": false, "label": "Sign Up Page-9-Aggregated", "isController": false}, {"data": [[3.0, 353.6666666666667]], "isOverall": false, "label": "Search-4", "isController": false}, {"data": [[3.0, 353.6666666666667]], "isOverall": false, "label": "Search-4-Aggregated", "isController": false}, {"data": [[2.0, 459.0], [1.0, 192.0], [3.0, 1131.0]], "isOverall": false, "label": "Sign Up Page-8", "isController": false}, {"data": [[2.0, 594.0]], "isOverall": false, "label": "Sign Up Page-8-Aggregated", "isController": false}, {"data": [[3.0, 2290.3333333333335]], "isOverall": false, "label": "Edit profile", "isController": false}, {"data": [[3.0, 2290.3333333333335]], "isOverall": false, "label": "Edit profile-Aggregated", "isController": false}, {"data": [[3.0, 381.6666666666667]], "isOverall": false, "label": "Search-1", "isController": false}, {"data": [[3.0, 381.6666666666667]], "isOverall": false, "label": "Search-1-Aggregated", "isController": false}, {"data": [[3.0, 351.3333333333333]], "isOverall": false, "label": "Search-2", "isController": false}, {"data": [[3.0, 351.3333333333333]], "isOverall": false, "label": "Search-2-Aggregated", "isController": false}, {"data": [[3.0, 1877.6666666666667]], "isOverall": false, "label": "Visit profile", "isController": false}, {"data": [[3.0, 1877.6666666666667]], "isOverall": false, "label": "Visit profile-Aggregated", "isController": false}, {"data": [[3.0, 3134.3333333333335]], "isOverall": false, "label": "Library\\albums", "isController": false}, {"data": [[3.0, 3134.3333333333335]], "isOverall": false, "label": "Library\\albums-Aggregated", "isController": false}, {"data": [[3.0, 269.3333333333333]], "isOverall": false, "label": "About-3", "isController": false}, {"data": [[3.0, 269.3333333333333]], "isOverall": false, "label": "About-3-Aggregated", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "Library\\playlists-0", "isController": false}, {"data": [[3.0, 169.0]], "isOverall": false, "label": "Library\\playlists-0-Aggregated", "isController": false}, {"data": [[3.0, 258.3333333333333]], "isOverall": false, "label": "About-2", "isController": false}, {"data": [[3.0, 258.3333333333333]], "isOverall": false, "label": "About-2-Aggregated", "isController": false}, {"data": [[3.0, 174.66666666666666]], "isOverall": false, "label": "About-1", "isController": false}, {"data": [[3.0, 174.66666666666666]], "isOverall": false, "label": "About-1-Aggregated", "isController": false}, {"data": [[3.0, 167.0]], "isOverall": false, "label": "About-0", "isController": false}, {"data": [[3.0, 167.0]], "isOverall": false, "label": "About-0-Aggregated", "isController": false}, {"data": [[3.0, 284.3333333333333]], "isOverall": false, "label": "Library\\playlists-3", "isController": false}, {"data": [[3.0, 284.3333333333333]], "isOverall": false, "label": "Library\\playlists-3-Aggregated", "isController": false}, {"data": [[3.0, 512.0]], "isOverall": false, "label": "About-7", "isController": false}, {"data": [[3.0, 512.0]], "isOverall": false, "label": "About-7-Aggregated", "isController": false}, {"data": [[3.0, 385.66666666666663]], "isOverall": false, "label": "Library\\playlists-4", "isController": false}, {"data": [[3.0, 385.66666666666663]], "isOverall": false, "label": "Library\\playlists-4-Aggregated", "isController": false}, {"data": [[3.0, 491.6666666666667]], "isOverall": false, "label": "About-6", "isController": false}, {"data": [[3.0, 491.6666666666667]], "isOverall": false, "label": "About-6-Aggregated", "isController": false}, {"data": [[3.0, 221.33333333333334]], "isOverall": false, "label": "Play a song", "isController": false}, {"data": [[3.0, 221.33333333333334]], "isOverall": false, "label": "Play a song-Aggregated", "isController": false}, {"data": [[3.0, 381.6666666666667]], "isOverall": false, "label": "Library\\playlists-1", "isController": false}, {"data": [[3.0, 381.6666666666667]], "isOverall": false, "label": "Library\\playlists-1-Aggregated", "isController": false}, {"data": [[3.0, 1153.0]], "isOverall": false, "label": "About-5", "isController": false}, {"data": [[3.0, 1153.0]], "isOverall": false, "label": "About-5-Aggregated", "isController": false}, {"data": [[3.0, 289.0]], "isOverall": false, "label": "Library\\playlists-2", "isController": false}, {"data": [[3.0, 289.0]], "isOverall": false, "label": "Library\\playlists-2-Aggregated", "isController": false}, {"data": [[3.0, 396.66666666666663]], "isOverall": false, "label": "About-4", "isController": false}, {"data": [[3.0, 396.66666666666663]], "isOverall": false, "label": "About-4-Aggregated", "isController": false}, {"data": [[3.0, 483.6666666666667]], "isOverall": false, "label": "Library\\playlists-7", "isController": false}, {"data": [[3.0, 483.6666666666667]], "isOverall": false, "label": "Library\\playlists-7-Aggregated", "isController": false}, {"data": [[3.0, 470.6666666666667]], "isOverall": false, "label": "Library\\playlists-8", "isController": false}, {"data": [[3.0, 470.6666666666667]], "isOverall": false, "label": "Library\\playlists-8-Aggregated", "isController": false}, {"data": [[3.0, 1651.3333333333333]], "isOverall": false, "label": "Library\\playlists-5", "isController": false}, {"data": [[3.0, 1651.3333333333333]], "isOverall": false, "label": "Library\\playlists-5-Aggregated", "isController": false}, {"data": [[3.0, 501.3333333333333]], "isOverall": false, "label": "About-9", "isController": false}, {"data": [[3.0, 501.3333333333333]], "isOverall": false, "label": "About-9-Aggregated", "isController": false}, {"data": [[3.0, 502.3333333333333]], "isOverall": false, "label": "Library\\playlists-6", "isController": false}, {"data": [[3.0, 502.3333333333333]], "isOverall": false, "label": "Library\\playlists-6-Aggregated", "isController": false}, {"data": [[3.0, 377.6666666666667]], "isOverall": false, "label": "About-8", "isController": false}, {"data": [[3.0, 377.6666666666667]], "isOverall": false, "label": "About-8-Aggregated", "isController": false}, {"data": [[3.0, 472.6666666666667]], "isOverall": false, "label": "Library\\playlists-9", "isController": false}, {"data": [[3.0, 472.6666666666667]], "isOverall": false, "label": "Library\\playlists-9-Aggregated", "isController": false}, {"data": [[3.0, 815.0]], "isOverall": false, "label": "Library\\albums-8", "isController": false}, {"data": [[3.0, 815.0]], "isOverall": false, "label": "Library\\albums-8-Aggregated", "isController": false}, {"data": [[3.0, 816.3333333333333]], "isOverall": false, "label": "Library\\albums-9", "isController": false}, {"data": [[3.0, 816.3333333333333]], "isOverall": false, "label": "Library\\albums-9-Aggregated", "isController": false}, {"data": [[3.0, 1825.0]], "isOverall": false, "label": "Library\\playlists", "isController": false}, {"data": [[3.0, 1825.0]], "isOverall": false, "label": "Library\\playlists-Aggregated", "isController": false}, {"data": [[2.0, 178.0], [1.0, 476.0], [3.0, 493.0]], "isOverall": false, "label": "Liked Songs-1", "isController": false}, {"data": [[2.0, 382.3333333333333]], "isOverall": false, "label": "Liked Songs-1-Aggregated", "isController": false}, {"data": [[2.0, 169.0], [1.0, 505.0], [3.0, 471.0]], "isOverall": false, "label": "Liked Songs-0", "isController": false}, {"data": [[2.0, 381.6666666666667]], "isOverall": false, "label": "Liked Songs-0-Aggregated", "isController": false}, {"data": [[2.0, 404.0], [1.0, 364.0], [3.0, 411.0]], "isOverall": false, "label": "Liked Songs-3", "isController": false}, {"data": [[2.0, 393.0]], "isOverall": false, "label": "Liked Songs-3-Aggregated", "isController": false}, {"data": [[2.0, 394.0], [1.0, 287.0], [3.0, 319.0]], "isOverall": false, "label": "Liked Songs-2", "isController": false}, {"data": [[2.0, 333.3333333333333]], "isOverall": false, "label": "Liked Songs-2-Aggregated", "isController": false}, {"data": [[2.0, 1194.0], [1.0, 950.0], [3.0, 989.0]], "isOverall": false, "label": "Liked Songs-5", "isController": false}, {"data": [[2.0, 1044.3333333333333]], "isOverall": false, "label": "Liked Songs-5-Aggregated", "isController": false}, {"data": [[2.0, 361.0], [1.0, 333.0], [3.0, 772.0]], "isOverall": false, "label": "Liked Songs-4", "isController": false}, {"data": [[2.0, 488.6666666666667]], "isOverall": false, "label": "Liked Songs-4-Aggregated", "isController": false}, {"data": [[2.0, 515.0], [1.0, 483.0], [3.0, 499.0]], "isOverall": false, "label": "Liked Songs-7", "isController": false}, {"data": [[2.0, 499.0]], "isOverall": false, "label": "Liked Songs-7-Aggregated", "isController": false}, {"data": [[2.0, 483.0], [1.0, 172.0], [3.0, 165.0]], "isOverall": false, "label": "Liked Songs-6", "isController": false}, {"data": [[2.0, 273.3333333333333]], "isOverall": false, "label": "Liked Songs-6-Aggregated", "isController": false}, {"data": [[2.0, 506.0], [1.0, 510.0], [3.0, 514.0]], "isOverall": false, "label": "Liked Songs-9", "isController": false}, {"data": [[2.0, 510.0]], "isOverall": false, "label": "Liked Songs-9-Aggregated", "isController": false}, {"data": [[2.0, 514.0], [1.0, 169.0], [3.0, 482.0]], "isOverall": false, "label": "Liked Songs-8", "isController": false}, {"data": [[2.0, 388.3333333333333]], "isOverall": false, "label": "Liked Songs-8-Aggregated", "isController": false}, {"data": [[3.0, 1347.6666666666667]], "isOverall": false, "label": "Library\\albums-4", "isController": false}, {"data": [[3.0, 1347.6666666666667]], "isOverall": false, "label": "Library\\albums-4-Aggregated", "isController": false}, {"data": [[3.0, 2037.0]], "isOverall": false, "label": "Library\\albums-5", "isController": false}, {"data": [[3.0, 2037.0]], "isOverall": false, "label": "Library\\albums-5-Aggregated", "isController": false}, {"data": [[3.0, 821.6666666666667]], "isOverall": false, "label": "Library\\albums-6", "isController": false}, {"data": [[3.0, 821.6666666666667]], "isOverall": false, "label": "Library\\albums-6-Aggregated", "isController": false}, {"data": [[3.0, 810.0]], "isOverall": false, "label": "Library\\albums-7", "isController": false}, {"data": [[3.0, 810.0]], "isOverall": false, "label": "Library\\albums-7-Aggregated", "isController": false}, {"data": [[3.0, 622.3333333333333]], "isOverall": false, "label": "Library\\albums-0", "isController": false}, {"data": [[3.0, 622.3333333333333]], "isOverall": false, "label": "Library\\albums-0-Aggregated", "isController": false}, {"data": [[3.0, 729.0]], "isOverall": false, "label": "Library\\albums-1", "isController": false}, {"data": [[3.0, 729.0]], "isOverall": false, "label": "Library\\albums-1-Aggregated", "isController": false}, {"data": [[3.0, 629.6666666666667]], "isOverall": false, "label": "Library\\albums-2", "isController": false}, {"data": [[3.0, 629.6666666666667]], "isOverall": false, "label": "Library\\albums-2-Aggregated", "isController": false}, {"data": [[3.0, 1242.6666666666665]], "isOverall": false, "label": "Library\\albums-3", "isController": false}, {"data": [[3.0, 1242.6666666666665]], "isOverall": false, "label": "Library\\albums-3-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 3.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 2841.9333333333334, "minX": 1.591833E12, "maxY": 183186.98333333334, "series": [{"data": [[1.59183306E12, 9207.7], [1.591833E12, 183186.98333333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.59183306E12, 2841.9333333333334], [1.591833E12, 8053.033333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59183306E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 92.0, "minX": 1.591833E12, "maxY": 19253.5, "series": [{"data": [[1.59183306E12, 4255.5], [1.591833E12, 2054.0]], "isOverall": false, "label": "Premium", "isController": false}, {"data": [[1.591833E12, 382.0]], "isOverall": false, "label": "Visit profile-1", "isController": false}, {"data": [[1.591833E12, 375.0]], "isOverall": false, "label": "Visit profile-2", "isController": false}, {"data": [[1.591833E12, 355.0]], "isOverall": false, "label": "Visit profile-3", "isController": false}, {"data": [[1.591833E12, 483.66666666666663]], "isOverall": false, "label": "Visit profile-4", "isController": false}, {"data": [[1.591833E12, 1590.6666666666667]], "isOverall": false, "label": "Visit profile-5", "isController": false}, {"data": [[1.591833E12, 292.0]], "isOverall": false, "label": "Visit profile-6", "isController": false}, {"data": [[1.591833E12, 534.3333333333334]], "isOverall": false, "label": "Visit profile-7", "isController": false}, {"data": [[1.591833E12, 475.0]], "isOverall": false, "label": "Visit profile-8", "isController": false}, {"data": [[1.591833E12, 277.6666666666667]], "isOverall": false, "label": "Visit profile-0", "isController": false}, {"data": [[1.591833E12, 283.3333333333333]], "isOverall": false, "label": "Edit profile-0", "isController": false}, {"data": [[1.591833E12, 292.6666666666667]], "isOverall": false, "label": "Edit profile-1", "isController": false}, {"data": [[1.591833E12, 484.3333333333333]], "isOverall": false, "label": "Visit profile-9", "isController": false}, {"data": [[1.591833E12, 386.3333333333333]], "isOverall": false, "label": "Edit profile-6", "isController": false}, {"data": [[1.591833E12, 498.3333333333333]], "isOverall": false, "label": "Edit profile-7", "isController": false}, {"data": [[1.591833E12, 378.3333333333333]], "isOverall": false, "label": "Edit profile-8", "isController": false}, {"data": [[1.591833E12, 832.3333333333334]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.591833E12, 388.0]], "isOverall": false, "label": "Edit profile-9", "isController": false}, {"data": [[1.591833E12, 229.0]], "isOverall": false, "label": "Edit profile-2", "isController": false}, {"data": [[1.591833E12, 181.66666666666669]], "isOverall": false, "label": "Edit profile-3", "isController": false}, {"data": [[1.591833E12, 171.0]], "isOverall": false, "label": "Edit profile-4", "isController": false}, {"data": [[1.591833E12, 401.0]], "isOverall": false, "label": "Library\\artists-1", "isController": false}, {"data": [[1.591833E12, 2001.0]], "isOverall": false, "label": "Edit profile-5", "isController": false}, {"data": [[1.591833E12, 167.66666666666666]], "isOverall": false, "label": "Library\\artists-0", "isController": false}, {"data": [[1.591833E12, 240.0]], "isOverall": false, "label": "Library\\artists-3", "isController": false}, {"data": [[1.591833E12, 288.3333333333333]], "isOverall": false, "label": "Library\\artists-2", "isController": false}, {"data": [[1.59183306E12, 1911.0], [1.591833E12, 1891.5]], "isOverall": false, "label": "Library\\artists-5", "isController": false}, {"data": [[1.591833E12, 262.3333333333333]], "isOverall": false, "label": "Library\\artists-4", "isController": false}, {"data": [[1.59183306E12, 932.0], [1.591833E12, 309.5]], "isOverall": false, "label": "Library\\artists-7", "isController": false}, {"data": [[1.591833E12, 396.3333333333333]], "isOverall": false, "label": "Library\\artists-6", "isController": false}, {"data": [[1.59183306E12, 942.0], [1.591833E12, 492.5]], "isOverall": false, "label": "Library\\artists-9", "isController": false}, {"data": [[1.59183306E12, 504.0], [1.591833E12, 365.0]], "isOverall": false, "label": "Create playlist", "isController": false}, {"data": [[1.59183306E12, 920.0], [1.591833E12, 502.5]], "isOverall": false, "label": "Library\\artists-8", "isController": false}, {"data": [[1.591833E12, 19253.5]], "isOverall": false, "label": "Login Page", "isController": false}, {"data": [[1.591833E12, 321.3333333333333]], "isOverall": false, "label": "Change password-2", "isController": false}, {"data": [[1.591833E12, 360.6666666666667]], "isOverall": false, "label": "Change password-3", "isController": false}, {"data": [[1.591833E12, 548.3333333333334]], "isOverall": false, "label": "Change password-4", "isController": false}, {"data": [[1.591833E12, 1676.6666666666667]], "isOverall": false, "label": "Change password-5", "isController": false}, {"data": [[1.591833E12, 509.0]], "isOverall": false, "label": "Change password-6", "isController": false}, {"data": [[1.59183306E12, 501.0], [1.591833E12, 512.0]], "isOverall": false, "label": "Upgrade-9", "isController": false}, {"data": [[1.591833E12, 487.6666666666667]], "isOverall": false, "label": "Change password-7", "isController": false}, {"data": [[1.591833E12, 486.3333333333333]], "isOverall": false, "label": "Change password-8", "isController": false}, {"data": [[1.591833E12, 476.3333333333333]], "isOverall": false, "label": "Change password-9", "isController": false}, {"data": [[1.591833E12, 1357.3333333333333]], "isOverall": false, "label": "Login Page-7", "isController": false}, {"data": [[1.591833E12, 1431.6666666666667]], "isOverall": false, "label": "Notifications settings-5", "isController": false}, {"data": [[1.59183306E12, 1532.0]], "isOverall": false, "label": "Upgrade-5", "isController": false}, {"data": [[1.591833E12, 14465.0]], "isOverall": false, "label": "Login Page-8", "isController": false}, {"data": [[1.591833E12, 304.0]], "isOverall": false, "label": "Notifications settings-4", "isController": false}, {"data": [[1.59183306E12, 401.0], [1.591833E12, 477.0]], "isOverall": false, "label": "Upgrade-6", "isController": false}, {"data": [[1.59183306E12, 2812.6666666666665]], "isOverall": false, "label": "Sign Up Page", "isController": false}, {"data": [[1.591833E12, 6092.333333333333]], "isOverall": false, "label": "Login Page-9", "isController": false}, {"data": [[1.591833E12, 147.33333333333334]], "isOverall": false, "label": "Notifications settings-3", "isController": false}, {"data": [[1.59183306E12, 487.5], [1.591833E12, 526.0]], "isOverall": false, "label": "Upgrade-7", "isController": false}, {"data": [[1.591833E12, 199.33333333333334]], "isOverall": false, "label": "Notifications settings-2", "isController": false}, {"data": [[1.59183306E12, 496.5], [1.591833E12, 505.0]], "isOverall": false, "label": "Upgrade-8", "isController": false}, {"data": [[1.591833E12, 1611.0]], "isOverall": false, "label": "Notifications settings", "isController": false}, {"data": [[1.591833E12, 474.6666666666667]], "isOverall": false, "label": "Notifications settings-9", "isController": false}, {"data": [[1.59183306E12, 328.5], [1.591833E12, 501.0]], "isOverall": false, "label": "Upgrade-1", "isController": false}, {"data": [[1.591833E12, 387.0]], "isOverall": false, "label": "Notifications settings-8", "isController": false}, {"data": [[1.59183306E12, 382.5], [1.591833E12, 283.0]], "isOverall": false, "label": "Upgrade-2", "isController": false}, {"data": [[1.591833E12, 273.0]], "isOverall": false, "label": "Notifications settings-7", "isController": false}, {"data": [[1.59183306E12, 284.0], [1.591833E12, 312.0]], "isOverall": false, "label": "Upgrade-3", "isController": false}, {"data": [[1.59183306E12, 1429.0]], "isOverall": false, "label": "Liked Songs", "isController": false}, {"data": [[1.591833E12, 282.0]], "isOverall": false, "label": "Notifications settings-6", "isController": false}, {"data": [[1.59183306E12, 342.0], [1.591833E12, 744.0]], "isOverall": false, "label": "Upgrade-4", "isController": false}, {"data": [[1.591833E12, 1828.6666666666667]], "isOverall": false, "label": "Recover Playlist", "isController": false}, {"data": [[1.591833E12, 484.6666666666667]], "isOverall": false, "label": "Recover Playlist-7", "isController": false}, {"data": [[1.591833E12, 2352.0]], "isOverall": false, "label": "Login Page-0", "isController": false}, {"data": [[1.591833E12, 477.3333333333333]], "isOverall": false, "label": "Recover Playlist-8", "isController": false}, {"data": [[1.591833E12, 2280.3333333333335]], "isOverall": false, "label": "Login Page-1", "isController": false}, {"data": [[1.591833E12, 465.0]], "isOverall": false, "label": "Recover Playlist-9", "isController": false}, {"data": [[1.591833E12, 692.0]], "isOverall": false, "label": "Login Page-2", "isController": false}, {"data": [[1.591833E12, 1467.6666666666667]], "isOverall": false, "label": "Web Player Home", "isController": false}, {"data": [[1.591833E12, 1278.3333333333333]], "isOverall": false, "label": "Login Page-3", "isController": false}, {"data": [[1.591833E12, 717.3333333333334]], "isOverall": false, "label": "Login Page-4", "isController": false}, {"data": [[1.591833E12, 1900.3333333333333]], "isOverall": false, "label": "Login Page-5", "isController": false}, {"data": [[1.591833E12, 9727.0]], "isOverall": false, "label": "Login Page-6", "isController": false}, {"data": [[1.591833E12, 160.66666666666666]], "isOverall": false, "label": "Recover Playlist-0", "isController": false}, {"data": [[1.591833E12, 270.3333333333333]], "isOverall": false, "label": "Recover Playlist-1", "isController": false}, {"data": [[1.591833E12, 270.6666666666667]], "isOverall": false, "label": "Recover Playlist-2", "isController": false}, {"data": [[1.591833E12, 266.6666666666667]], "isOverall": false, "label": "Recover Playlist-3", "isController": false}, {"data": [[1.59183306E12, 3341.0], [1.591833E12, 164.0]], "isOverall": false, "label": "Premium-6", "isController": false}, {"data": [[1.591833E12, 309.3333333333333]], "isOverall": false, "label": "Recover Playlist-4", "isController": false}, {"data": [[1.59183306E12, 514.0], [1.591833E12, 464.0]], "isOverall": false, "label": "Premium-7", "isController": false}, {"data": [[1.591833E12, 385.3333333333333]], "isOverall": false, "label": "Change password-0", "isController": false}, {"data": [[1.591833E12, 1662.0]], "isOverall": false, "label": "Recover Playlist-5", "isController": false}, {"data": [[1.59183306E12, 346.0], [1.591833E12, 168.0]], "isOverall": false, "label": "Premium-8", "isController": false}, {"data": [[1.591833E12, 167.33333333333334]], "isOverall": false, "label": "Change password-1", "isController": false}, {"data": [[1.591833E12, 394.6666666666667]], "isOverall": false, "label": "Recover Playlist-6", "isController": false}, {"data": [[1.59183306E12, 968.5], [1.591833E12, 465.0]], "isOverall": false, "label": "Premium-9", "isController": false}, {"data": [[1.59183306E12, 514.0], [1.591833E12, 132.0]], "isOverall": false, "label": "Premium-2", "isController": false}, {"data": [[1.59183306E12, 439.5], [1.591833E12, 92.0]], "isOverall": false, "label": "Premium-3", "isController": false}, {"data": [[1.59183306E12, 873.0], [1.591833E12, 95.0]], "isOverall": false, "label": "Premium-4", "isController": false}, {"data": [[1.59183306E12, 1770.5], [1.591833E12, 1886.0]], "isOverall": false, "label": "Premium-5", "isController": false}, {"data": [[1.591833E12, 495.6666666666667]], "isOverall": false, "label": "Album-6", "isController": false}, {"data": [[1.591833E12, 276.6666666666667]], "isOverall": false, "label": "Album-7", "isController": false}, {"data": [[1.591833E12, 387.0]], "isOverall": false, "label": "Album-8", "isController": false}, {"data": [[1.59183306E12, 161.0], [1.591833E12, 169.0]], "isOverall": false, "label": "Premium-0", "isController": false}, {"data": [[1.591833E12, 481.0]], "isOverall": false, "label": "Album-9", "isController": false}, {"data": [[1.59183306E12, 424.5], [1.591833E12, 495.0]], "isOverall": false, "label": "Premium-1", "isController": false}, {"data": [[1.591833E12, 208.0]], "isOverall": false, "label": "Album-2", "isController": false}, {"data": [[1.591833E12, 184.33333333333331]], "isOverall": false, "label": "Album-3", "isController": false}, {"data": [[1.591833E12, 174.33333333333331]], "isOverall": false, "label": "Album-4", "isController": false}, {"data": [[1.591833E12, 1302.3333333333333]], "isOverall": false, "label": "Album-5", "isController": false}, {"data": [[1.591833E12, 161.66666666666666]], "isOverall": false, "label": "Album-0", "isController": false}, {"data": [[1.591833E12, 277.3333333333333]], "isOverall": false, "label": "Album-1", "isController": false}, {"data": [[1.59183306E12, 492.5], [1.591833E12, 168.0]], "isOverall": false, "label": "Upgrade-0", "isController": false}, {"data": [[1.591833E12, 478.0]], "isOverall": false, "label": "Notifications settings-1", "isController": false}, {"data": [[1.591833E12, 168.0]], "isOverall": false, "label": "Notifications settings-0", "isController": false}, {"data": [[1.591833E12, 2068.0]], "isOverall": false, "label": "Change password", "isController": false}, {"data": [[1.591833E12, 1298.6666666666667]], "isOverall": false, "label": "Web Player Home-5", "isController": false}, {"data": [[1.591833E12, 386.0]], "isOverall": false, "label": "Web Player Home-6", "isController": false}, {"data": [[1.591833E12, 290.3333333333333]], "isOverall": false, "label": "Web Player Home-3", "isController": false}, {"data": [[1.591833E12, 328.0]], "isOverall": false, "label": "Web Player Home-4", "isController": false}, {"data": [[1.591833E12, 480.3333333333333]], "isOverall": false, "label": "Web Player Home-9", "isController": false}, {"data": [[1.591833E12, 499.6666666666667]], "isOverall": false, "label": "Web Player Home-7", "isController": false}, {"data": [[1.591833E12, 472.3333333333333]], "isOverall": false, "label": "Web Player Home-8", "isController": false}, {"data": [[1.591833E12, 1473.0]], "isOverall": false, "label": "Album", "isController": false}, {"data": [[1.591833E12, 275.0]], "isOverall": false, "label": "Web Player Home-1", "isController": false}, {"data": [[1.591833E12, 340.3333333333333]], "isOverall": false, "label": "Web Player Home-2", "isController": false}, {"data": [[1.59183306E12, 1920.0]], "isOverall": false, "label": "Upgrade", "isController": false}, {"data": [[1.591833E12, 160.33333333333334]], "isOverall": false, "label": "Web Player Home-0", "isController": false}, {"data": [[1.59183306E12, 2087.0], [1.591833E12, 2058.5]], "isOverall": false, "label": "Library\\artists", "isController": false}, {"data": [[1.591833E12, 2066.3333333333335]], "isOverall": false, "label": "Search", "isController": false}, {"data": [[1.591833E12, 379.3333333333333]], "isOverall": false, "label": "Search-7", "isController": false}, {"data": [[1.591833E12, 392.6666666666667]], "isOverall": false, "label": "Search-8", "isController": false}, {"data": [[1.591833E12, 1792.0]], "isOverall": false, "label": "Search-5", "isController": false}, {"data": [[1.591833E12, 513.3333333333334]], "isOverall": false, "label": "Search-6", "isController": false}, {"data": [[1.591833E12, 503.3333333333333]], "isOverall": false, "label": "Search-9", "isController": false}, {"data": [[1.59183306E12, 1097.0], [1.591833E12, 1698.0]], "isOverall": false, "label": "About", "isController": false}, {"data": [[1.59183306E12, 939.3333333333333]], "isOverall": false, "label": "Sign Up Page-1", "isController": false}, {"data": [[1.59183306E12, 266.0]], "isOverall": false, "label": "Sign Up Page-0", "isController": false}, {"data": [[1.59183306E12, 631.0]], "isOverall": false, "label": "Sign Up Page-3", "isController": false}, {"data": [[1.59183306E12, 1824.0]], "isOverall": false, "label": "Sign Up Page-2", "isController": false}, {"data": [[1.59183306E12, 1481.6666666666667]], "isOverall": false, "label": "Sign Up Page-5", "isController": false}, {"data": [[1.591833E12, 270.0]], "isOverall": false, "label": "Search-0", "isController": false}, {"data": [[1.59183306E12, 775.3333333333333]], "isOverall": false, "label": "Sign Up Page-4", "isController": false}, {"data": [[1.59183306E12, 646.6666666666666]], "isOverall": false, "label": "Sign Up Page-7", "isController": false}, {"data": [[1.59183306E12, 444.66666666666663]], "isOverall": false, "label": "Sign Up Page-6", "isController": false}, {"data": [[1.591833E12, 394.6666666666667]], "isOverall": false, "label": "Search-3", "isController": false}, {"data": [[1.59183306E12, 1181.6666666666667]], "isOverall": false, "label": "Sign Up Page-9", "isController": false}, {"data": [[1.591833E12, 353.6666666666667]], "isOverall": false, "label": "Search-4", "isController": false}, {"data": [[1.59183306E12, 594.0]], "isOverall": false, "label": "Sign Up Page-8", "isController": false}, {"data": [[1.591833E12, 2290.3333333333335]], "isOverall": false, "label": "Edit profile", "isController": false}, {"data": [[1.591833E12, 381.6666666666667]], "isOverall": false, "label": "Search-1", "isController": false}, {"data": [[1.591833E12, 351.3333333333333]], "isOverall": false, "label": "Search-2", "isController": false}, {"data": [[1.591833E12, 1877.6666666666667]], "isOverall": false, "label": "Visit profile", "isController": false}, {"data": [[1.59183306E12, 4630.0], [1.591833E12, 2386.5]], "isOverall": false, "label": "Library\\albums", "isController": false}, {"data": [[1.59183306E12, 415.0], [1.591833E12, 196.5]], "isOverall": false, "label": "About-3", "isController": false}, {"data": [[1.591833E12, 169.0]], "isOverall": false, "label": "Library\\playlists-0", "isController": false}, {"data": [[1.59183306E12, 309.0], [1.591833E12, 233.0]], "isOverall": false, "label": "About-2", "isController": false}, {"data": [[1.59183306E12, 171.0], [1.591833E12, 176.5]], "isOverall": false, "label": "About-1", "isController": false}, {"data": [[1.59183306E12, 168.0], [1.591833E12, 166.5]], "isOverall": false, "label": "About-0", "isController": false}, {"data": [[1.591833E12, 284.3333333333333]], "isOverall": false, "label": "Library\\playlists-3", "isController": false}, {"data": [[1.59183306E12, 534.0], [1.591833E12, 501.0]], "isOverall": false, "label": "About-7", "isController": false}, {"data": [[1.591833E12, 385.66666666666663]], "isOverall": false, "label": "Library\\playlists-4", "isController": false}, {"data": [[1.59183306E12, 488.0], [1.591833E12, 493.5]], "isOverall": false, "label": "About-6", "isController": false}, {"data": [[1.591833E12, 221.33333333333334]], "isOverall": false, "label": "Play a song", "isController": false}, {"data": [[1.591833E12, 381.6666666666667]], "isOverall": false, "label": "Library\\playlists-1", "isController": false}, {"data": [[1.59183306E12, 409.0], [1.591833E12, 1525.0]], "isOverall": false, "label": "About-5", "isController": false}, {"data": [[1.591833E12, 289.0]], "isOverall": false, "label": "Library\\playlists-2", "isController": false}, {"data": [[1.59183306E12, 740.0], [1.591833E12, 225.0]], "isOverall": false, "label": "About-4", "isController": false}, {"data": [[1.591833E12, 483.6666666666667]], "isOverall": false, "label": "Library\\playlists-7", "isController": false}, {"data": [[1.591833E12, 470.6666666666667]], "isOverall": false, "label": "Library\\playlists-8", "isController": false}, {"data": [[1.591833E12, 1651.3333333333333]], "isOverall": false, "label": "Library\\playlists-5", "isController": false}, {"data": [[1.59183306E12, 516.0], [1.591833E12, 494.0]], "isOverall": false, "label": "About-9", "isController": false}, {"data": [[1.591833E12, 502.3333333333333]], "isOverall": false, "label": "Library\\playlists-6", "isController": false}, {"data": [[1.59183306E12, 480.0], [1.591833E12, 326.5]], "isOverall": false, "label": "About-8", "isController": false}, {"data": [[1.591833E12, 472.6666666666667]], "isOverall": false, "label": "Library\\playlists-9", "isController": false}, {"data": [[1.59183306E12, 1487.0], [1.591833E12, 479.0]], "isOverall": false, "label": "Library\\albums-8", "isController": false}, {"data": [[1.59183306E12, 1514.0], [1.591833E12, 467.5]], "isOverall": false, "label": "Library\\albums-9", "isController": false}, {"data": [[1.591833E12, 1825.0]], "isOverall": false, "label": "Library\\playlists", "isController": false}, {"data": [[1.59183306E12, 382.3333333333333]], "isOverall": false, "label": "Liked Songs-1", "isController": false}, {"data": [[1.59183306E12, 381.6666666666667]], "isOverall": false, "label": "Liked Songs-0", "isController": false}, {"data": [[1.59183306E12, 393.0]], "isOverall": false, "label": "Liked Songs-3", "isController": false}, {"data": [[1.59183306E12, 333.3333333333333]], "isOverall": false, "label": "Liked Songs-2", "isController": false}, {"data": [[1.59183306E12, 1044.3333333333333]], "isOverall": false, "label": "Liked Songs-5", "isController": false}, {"data": [[1.59183306E12, 488.6666666666667]], "isOverall": false, "label": "Liked Songs-4", "isController": false}, {"data": [[1.59183306E12, 499.0]], "isOverall": false, "label": "Liked Songs-7", "isController": false}, {"data": [[1.59183306E12, 273.3333333333333]], "isOverall": false, "label": "Liked Songs-6", "isController": false}, {"data": [[1.59183306E12, 510.0]], "isOverall": false, "label": "Liked Songs-9", "isController": false}, {"data": [[1.59183306E12, 388.3333333333333]], "isOverall": false, "label": "Liked Songs-8", "isController": false}, {"data": [[1.59183306E12, 3404.0], [1.591833E12, 319.5]], "isOverall": false, "label": "Library\\albums-4", "isController": false}, {"data": [[1.59183306E12, 2002.0], [1.591833E12, 2054.5]], "isOverall": false, "label": "Library\\albums-5", "isController": false}, {"data": [[1.59183306E12, 1471.0], [1.591833E12, 497.0]], "isOverall": false, "label": "Library\\albums-6", "isController": false}, {"data": [[1.59183306E12, 1471.0], [1.591833E12, 479.5]], "isOverall": false, "label": "Library\\albums-7", "isController": false}, {"data": [[1.59183306E12, 1219.0], [1.591833E12, 324.0]], "isOverall": false, "label": "Library\\albums-0", "isController": false}, {"data": [[1.59183306E12, 1479.0], [1.591833E12, 354.0]], "isOverall": false, "label": "Library\\albums-1", "isController": false}, {"data": [[1.59183306E12, 1243.0], [1.591833E12, 323.0]], "isOverall": false, "label": "Library\\albums-2", "isController": false}, {"data": [[1.59183306E12, 3246.0], [1.591833E12, 241.0]], "isOverall": false, "label": "Library\\albums-3", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59183306E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.591833E12, "maxY": 2347.0, "series": [{"data": [[1.59183306E12, 167.0], [1.591833E12, 165.0]], "isOverall": false, "label": "Premium", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Visit profile-1", "isController": false}, {"data": [[1.591833E12, 327.0]], "isOverall": false, "label": "Visit profile-2", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Visit profile-3", "isController": false}, {"data": [[1.591833E12, 276.0]], "isOverall": false, "label": "Visit profile-4", "isController": false}, {"data": [[1.591833E12, 1590.3333333333333]], "isOverall": false, "label": "Visit profile-5", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Visit profile-6", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Visit profile-7", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Visit profile-8", "isController": false}, {"data": [[1.591833E12, 277.6666666666667]], "isOverall": false, "label": "Visit profile-0", "isController": false}, {"data": [[1.591833E12, 283.0]], "isOverall": false, "label": "Edit profile-0", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Edit profile-1", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Visit profile-9", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Edit profile-6", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Edit profile-7", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Edit profile-8", "isController": false}, {"data": [[1.591833E12, 832.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Edit profile-9", "isController": false}, {"data": [[1.591833E12, 183.66666666666666]], "isOverall": false, "label": "Edit profile-2", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Edit profile-3", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Edit profile-4", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\artists-1", "isController": false}, {"data": [[1.591833E12, 2000.6666666666667]], "isOverall": false, "label": "Edit profile-5", "isController": false}, {"data": [[1.591833E12, 167.33333333333334]], "isOverall": false, "label": "Library\\artists-0", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\artists-3", "isController": false}, {"data": [[1.591833E12, 225.0]], "isOverall": false, "label": "Library\\artists-2", "isController": false}, {"data": [[1.59183306E12, 1911.0], [1.591833E12, 1891.5]], "isOverall": false, "label": "Library\\artists-5", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\artists-4", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\artists-7", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\artists-6", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\artists-9", "isController": false}, {"data": [[1.59183306E12, 504.0], [1.591833E12, 365.0]], "isOverall": false, "label": "Create playlist", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\artists-8", "isController": false}, {"data": [[1.591833E12, 2346.0]], "isOverall": false, "label": "Login Page", "isController": false}, {"data": [[1.591833E12, 292.0]], "isOverall": false, "label": "Change password-2", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Change password-3", "isController": false}, {"data": [[1.591833E12, 434.66666666666663]], "isOverall": false, "label": "Change password-4", "isController": false}, {"data": [[1.591833E12, 1676.3333333333333]], "isOverall": false, "label": "Change password-5", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Change password-6", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Upgrade-9", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Change password-7", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Change password-8", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Change password-9", "isController": false}, {"data": [[1.591833E12, 1038.3333333333333]], "isOverall": false, "label": "Login Page-7", "isController": false}, {"data": [[1.591833E12, 1431.6666666666667]], "isOverall": false, "label": "Notifications settings-5", "isController": false}, {"data": [[1.59183306E12, 1532.0]], "isOverall": false, "label": "Upgrade-5", "isController": false}, {"data": [[1.591833E12, 1091.6666666666667]], "isOverall": false, "label": "Login Page-8", "isController": false}, {"data": [[1.591833E12, 156.66666666666666]], "isOverall": false, "label": "Notifications settings-4", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Upgrade-6", "isController": false}, {"data": [[1.59183306E12, 266.0]], "isOverall": false, "label": "Sign Up Page", "isController": false}, {"data": [[1.591833E12, 862.6666666666666]], "isOverall": false, "label": "Login Page-9", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Notifications settings-3", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Upgrade-7", "isController": false}, {"data": [[1.591833E12, 184.0]], "isOverall": false, "label": "Notifications settings-2", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Upgrade-8", "isController": false}, {"data": [[1.591833E12, 167.66666666666666]], "isOverall": false, "label": "Notifications settings", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Notifications settings-9", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Upgrade-1", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Notifications settings-8", "isController": false}, {"data": [[1.59183306E12, 340.0], [1.591833E12, 224.0]], "isOverall": false, "label": "Upgrade-2", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Notifications settings-7", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Upgrade-3", "isController": false}, {"data": [[1.59183306E12, 381.6666666666667]], "isOverall": false, "label": "Liked Songs", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Notifications settings-6", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 744.0]], "isOverall": false, "label": "Upgrade-4", "isController": false}, {"data": [[1.591833E12, 160.66666666666666]], "isOverall": false, "label": "Recover Playlist", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Recover Playlist-7", "isController": false}, {"data": [[1.591833E12, 2347.0]], "isOverall": false, "label": "Login Page-0", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Recover Playlist-8", "isController": false}, {"data": [[1.591833E12, 1441.3333333333333]], "isOverall": false, "label": "Login Page-1", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Recover Playlist-9", "isController": false}, {"data": [[1.591833E12, 408.6666666666667]], "isOverall": false, "label": "Login Page-2", "isController": false}, {"data": [[1.591833E12, 160.0]], "isOverall": false, "label": "Web Player Home", "isController": false}, {"data": [[1.591833E12, 361.0]], "isOverall": false, "label": "Login Page-3", "isController": false}, {"data": [[1.591833E12, 716.6666666666666]], "isOverall": false, "label": "Login Page-4", "isController": false}, {"data": [[1.591833E12, 1899.6666666666667]], "isOverall": false, "label": "Login Page-5", "isController": false}, {"data": [[1.591833E12, 1408.6666666666667]], "isOverall": false, "label": "Login Page-6", "isController": false}, {"data": [[1.591833E12, 160.66666666666666]], "isOverall": false, "label": "Recover Playlist-0", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Recover Playlist-1", "isController": false}, {"data": [[1.591833E12, 235.0]], "isOverall": false, "label": "Recover Playlist-2", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Recover Playlist-3", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-6", "isController": false}, {"data": [[1.591833E12, 161.0]], "isOverall": false, "label": "Recover Playlist-4", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-7", "isController": false}, {"data": [[1.591833E12, 385.3333333333333]], "isOverall": false, "label": "Change password-0", "isController": false}, {"data": [[1.591833E12, 1662.0]], "isOverall": false, "label": "Recover Playlist-5", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-8", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Change password-1", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Recover Playlist-6", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-9", "isController": false}, {"data": [[1.59183306E12, 468.0], [1.591833E12, 116.0]], "isOverall": false, "label": "Premium-2", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-3", "isController": false}, {"data": [[1.59183306E12, 223.5], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-4", "isController": false}, {"data": [[1.59183306E12, 1770.5], [1.591833E12, 1886.0]], "isOverall": false, "label": "Premium-5", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Album-6", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Album-7", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Album-8", "isController": false}, {"data": [[1.59183306E12, 161.0], [1.591833E12, 169.0]], "isOverall": false, "label": "Premium-0", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Album-9", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-1", "isController": false}, {"data": [[1.591833E12, 189.0]], "isOverall": false, "label": "Album-2", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Album-3", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Album-4", "isController": false}, {"data": [[1.591833E12, 1302.0]], "isOverall": false, "label": "Album-5", "isController": false}, {"data": [[1.591833E12, 161.66666666666666]], "isOverall": false, "label": "Album-0", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Album-1", "isController": false}, {"data": [[1.59183306E12, 492.5], [1.591833E12, 168.0]], "isOverall": false, "label": "Upgrade-0", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Notifications settings-1", "isController": false}, {"data": [[1.591833E12, 167.66666666666666]], "isOverall": false, "label": "Notifications settings-0", "isController": false}, {"data": [[1.591833E12, 385.3333333333333]], "isOverall": false, "label": "Change password", "isController": false}, {"data": [[1.591833E12, 1298.6666666666667]], "isOverall": false, "label": "Web Player Home-5", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Web Player Home-6", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Web Player Home-3", "isController": false}, {"data": [[1.591833E12, 107.66666666666667]], "isOverall": false, "label": "Web Player Home-4", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Web Player Home-9", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Web Player Home-7", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Web Player Home-8", "isController": false}, {"data": [[1.591833E12, 161.66666666666666]], "isOverall": false, "label": "Album", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Web Player Home-1", "isController": false}, {"data": [[1.591833E12, 290.0]], "isOverall": false, "label": "Web Player Home-2", "isController": false}, {"data": [[1.59183306E12, 384.3333333333333]], "isOverall": false, "label": "Upgrade", "isController": false}, {"data": [[1.591833E12, 160.0]], "isOverall": false, "label": "Web Player Home-0", "isController": false}, {"data": [[1.59183306E12, 173.0], [1.591833E12, 164.5]], "isOverall": false, "label": "Library\\artists", "isController": false}, {"data": [[1.591833E12, 270.0]], "isOverall": false, "label": "Search", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Search-7", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Search-8", "isController": false}, {"data": [[1.591833E12, 1791.6666666666667]], "isOverall": false, "label": "Search-5", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Search-6", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Search-9", "isController": false}, {"data": [[1.59183306E12, 168.0], [1.591833E12, 166.0]], "isOverall": false, "label": "About", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Sign Up Page-1", "isController": false}, {"data": [[1.59183306E12, 266.0]], "isOverall": false, "label": "Sign Up Page-0", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Sign Up Page-3", "isController": false}, {"data": [[1.59183306E12, 333.6666666666667]], "isOverall": false, "label": "Sign Up Page-2", "isController": false}, {"data": [[1.59183306E12, 1481.3333333333333]], "isOverall": false, "label": "Sign Up Page-5", "isController": false}, {"data": [[1.591833E12, 270.0]], "isOverall": false, "label": "Search-0", "isController": false}, {"data": [[1.59183306E12, 682.0]], "isOverall": false, "label": "Sign Up Page-4", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Sign Up Page-7", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Sign Up Page-6", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Search-3", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Sign Up Page-9", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Search-4", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Sign Up Page-8", "isController": false}, {"data": [[1.591833E12, 283.0]], "isOverall": false, "label": "Edit profile", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Search-1", "isController": false}, {"data": [[1.591833E12, 278.0]], "isOverall": false, "label": "Search-2", "isController": false}, {"data": [[1.591833E12, 277.6666666666667]], "isOverall": false, "label": "Visit profile", "isController": false}, {"data": [[1.59183306E12, 1219.0], [1.591833E12, 323.5]], "isOverall": false, "label": "Library\\albums", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About-3", "isController": false}, {"data": [[1.591833E12, 169.0]], "isOverall": false, "label": "Library\\playlists-0", "isController": false}, {"data": [[1.59183306E12, 241.0], [1.591833E12, 217.5]], "isOverall": false, "label": "About-2", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About-1", "isController": false}, {"data": [[1.59183306E12, 168.0], [1.591833E12, 166.0]], "isOverall": false, "label": "About-0", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\playlists-3", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About-7", "isController": false}, {"data": [[1.591833E12, 238.0]], "isOverall": false, "label": "Library\\playlists-4", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About-6", "isController": false}, {"data": [[1.591833E12, 220.66666666666666]], "isOverall": false, "label": "Play a song", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\playlists-1", "isController": false}, {"data": [[1.59183306E12, 409.0], [1.591833E12, 1524.5]], "isOverall": false, "label": "About-5", "isController": false}, {"data": [[1.591833E12, 229.66666666666666]], "isOverall": false, "label": "Library\\playlists-2", "isController": false}, {"data": [[1.59183306E12, 740.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About-4", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\playlists-7", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\playlists-8", "isController": false}, {"data": [[1.591833E12, 1651.0]], "isOverall": false, "label": "Library\\playlists-5", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About-9", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\playlists-6", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About-8", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\playlists-9", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\albums-8", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\albums-9", "isController": false}, {"data": [[1.591833E12, 169.0]], "isOverall": false, "label": "Library\\playlists", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Liked Songs-1", "isController": false}, {"data": [[1.59183306E12, 381.6666666666667]], "isOverall": false, "label": "Liked Songs-0", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Liked Songs-3", "isController": false}, {"data": [[1.59183306E12, 260.3333333333333]], "isOverall": false, "label": "Liked Songs-2", "isController": false}, {"data": [[1.59183306E12, 1044.0]], "isOverall": false, "label": "Liked Songs-5", "isController": false}, {"data": [[1.59183306E12, 257.33333333333337]], "isOverall": false, "label": "Liked Songs-4", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Liked Songs-7", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Liked Songs-6", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Liked Songs-9", "isController": false}, {"data": [[1.59183306E12, 0.0]], "isOverall": false, "label": "Liked Songs-8", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\albums-4", "isController": false}, {"data": [[1.59183306E12, 2002.0], [1.591833E12, 2054.5]], "isOverall": false, "label": "Library\\albums-5", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\albums-6", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\albums-7", "isController": false}, {"data": [[1.59183306E12, 1219.0], [1.591833E12, 323.5]], "isOverall": false, "label": "Library\\albums-0", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\albums-1", "isController": false}, {"data": [[1.59183306E12, 563.0], [1.591833E12, 286.0]], "isOverall": false, "label": "Library\\albums-2", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\albums-3", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59183306E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.591833E12, "maxY": 3331.0, "series": [{"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium", "isController": false}, {"data": [[1.591833E12, 216.33333333333331]], "isOverall": false, "label": "Visit profile-1", "isController": false}, {"data": [[1.591833E12, 222.66666666666666]], "isOverall": false, "label": "Visit profile-2", "isController": false}, {"data": [[1.591833E12, 267.3333333333333]], "isOverall": false, "label": "Visit profile-3", "isController": false}, {"data": [[1.591833E12, 265.3333333333333]], "isOverall": false, "label": "Visit profile-4", "isController": false}, {"data": [[1.591833E12, 235.66666666666666]], "isOverall": false, "label": "Visit profile-5", "isController": false}, {"data": [[1.591833E12, 122.0]], "isOverall": false, "label": "Visit profile-6", "isController": false}, {"data": [[1.591833E12, 370.0]], "isOverall": false, "label": "Visit profile-7", "isController": false}, {"data": [[1.591833E12, 310.6666666666667]], "isOverall": false, "label": "Visit profile-8", "isController": false}, {"data": [[1.591833E12, 112.0]], "isOverall": false, "label": "Visit profile-0", "isController": false}, {"data": [[1.591833E12, 113.33333333333333]], "isOverall": false, "label": "Edit profile-0", "isController": false}, {"data": [[1.591833E12, 117.0]], "isOverall": false, "label": "Edit profile-1", "isController": false}, {"data": [[1.591833E12, 319.3333333333333]], "isOverall": false, "label": "Visit profile-9", "isController": false}, {"data": [[1.591833E12, 215.33333333333331]], "isOverall": false, "label": "Edit profile-6", "isController": false}, {"data": [[1.591833E12, 336.0]], "isOverall": false, "label": "Edit profile-7", "isController": false}, {"data": [[1.591833E12, 212.66666666666666]], "isOverall": false, "label": "Edit profile-8", "isController": false}, {"data": [[1.591833E12, 318.0]], "isOverall": false, "label": "Login", "isController": false}, {"data": [[1.591833E12, 219.66666666666666]], "isOverall": false, "label": "Edit profile-9", "isController": false}, {"data": [[1.591833E12, 61.0]], "isOverall": false, "label": "Edit profile-2", "isController": false}, {"data": [[1.591833E12, 86.0]], "isOverall": false, "label": "Edit profile-3", "isController": false}, {"data": [[1.591833E12, 81.66666666666667]], "isOverall": false, "label": "Edit profile-4", "isController": false}, {"data": [[1.591833E12, 227.0]], "isOverall": false, "label": "Library\\artists-1", "isController": false}, {"data": [[1.591833E12, 61.666666666666664]], "isOverall": false, "label": "Edit profile-5", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\artists-0", "isController": false}, {"data": [[1.591833E12, 154.66666666666666]], "isOverall": false, "label": "Library\\artists-3", "isController": false}, {"data": [[1.591833E12, 114.33333333333334]], "isOverall": false, "label": "Library\\artists-2", "isController": false}, {"data": [[1.59183306E12, 184.0], [1.591833E12, 116.5]], "isOverall": false, "label": "Library\\artists-5", "isController": false}, {"data": [[1.591833E12, 170.33333333333334]], "isOverall": false, "label": "Library\\artists-4", "isController": false}, {"data": [[1.59183306E12, 308.0], [1.591833E12, 151.0]], "isOverall": false, "label": "Library\\artists-7", "isController": false}, {"data": [[1.591833E12, 221.66666666666666]], "isOverall": false, "label": "Library\\artists-6", "isController": false}, {"data": [[1.59183306E12, 306.0], [1.591833E12, 324.5]], "isOverall": false, "label": "Library\\artists-9", "isController": false}, {"data": [[1.59183306E12, 319.0], [1.591833E12, 160.0]], "isOverall": false, "label": "Create playlist", "isController": false}, {"data": [[1.59183306E12, 305.0], [1.591833E12, 335.5]], "isOverall": false, "label": "Library\\artists-8", "isController": false}, {"data": [[1.591833E12, 2166.0]], "isOverall": false, "label": "Login Page", "isController": false}, {"data": [[1.591833E12, 204.33333333333334]], "isOverall": false, "label": "Change password-2", "isController": false}, {"data": [[1.591833E12, 272.0]], "isOverall": false, "label": "Change password-3", "isController": false}, {"data": [[1.591833E12, 303.6666666666667]], "isOverall": false, "label": "Change password-4", "isController": false}, {"data": [[1.591833E12, 180.33333333333334]], "isOverall": false, "label": "Change password-5", "isController": false}, {"data": [[1.591833E12, 336.0]], "isOverall": false, "label": "Change password-6", "isController": false}, {"data": [[1.59183306E12, 327.0], [1.591833E12, 344.0]], "isOverall": false, "label": "Upgrade-9", "isController": false}, {"data": [[1.591833E12, 322.6666666666667]], "isOverall": false, "label": "Change password-7", "isController": false}, {"data": [[1.591833E12, 319.6666666666667]], "isOverall": false, "label": "Change password-8", "isController": false}, {"data": [[1.591833E12, 311.6666666666667]], "isOverall": false, "label": "Change password-9", "isController": false}, {"data": [[1.591833E12, 707.0]], "isOverall": false, "label": "Login Page-7", "isController": false}, {"data": [[1.591833E12, 77.66666666666666]], "isOverall": false, "label": "Notifications settings-5", "isController": false}, {"data": [[1.59183306E12, 206.66666666666666]], "isOverall": false, "label": "Upgrade-5", "isController": false}, {"data": [[1.591833E12, 748.0]], "isOverall": false, "label": "Login Page-8", "isController": false}, {"data": [[1.591833E12, 86.0]], "isOverall": false, "label": "Notifications settings-4", "isController": false}, {"data": [[1.59183306E12, 242.5], [1.591833E12, 318.0]], "isOverall": false, "label": "Upgrade-6", "isController": false}, {"data": [[1.59183306E12, 103.66666666666666]], "isOverall": false, "label": "Sign Up Page", "isController": false}, {"data": [[1.591833E12, 455.3333333333333]], "isOverall": false, "label": "Login Page-9", "isController": false}, {"data": [[1.591833E12, 45.66666666666667]], "isOverall": false, "label": "Notifications settings-3", "isController": false}, {"data": [[1.59183306E12, 318.5], [1.591833E12, 337.0]], "isOverall": false, "label": "Upgrade-7", "isController": false}, {"data": [[1.591833E12, 82.33333333333334]], "isOverall": false, "label": "Notifications settings-2", "isController": false}, {"data": [[1.59183306E12, 311.5], [1.591833E12, 317.0]], "isOverall": false, "label": "Upgrade-8", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Notifications settings", "isController": false}, {"data": [[1.591833E12, 315.3333333333333]], "isOverall": false, "label": "Notifications settings-9", "isController": false}, {"data": [[1.59183306E12, 157.0], [1.591833E12, 334.0]], "isOverall": false, "label": "Upgrade-1", "isController": false}, {"data": [[1.591833E12, 221.66666666666666]], "isOverall": false, "label": "Notifications settings-8", "isController": false}, {"data": [[1.59183306E12, 235.0], [1.591833E12, 138.0]], "isOverall": false, "label": "Upgrade-2", "isController": false}, {"data": [[1.591833E12, 106.33333333333334]], "isOverall": false, "label": "Notifications settings-7", "isController": false}, {"data": [[1.59183306E12, 209.0], [1.591833E12, 235.0]], "isOverall": false, "label": "Upgrade-3", "isController": false}, {"data": [[1.59183306E12, 214.66666666666666]], "isOverall": false, "label": "Liked Songs", "isController": false}, {"data": [[1.591833E12, 108.33333333333334]], "isOverall": false, "label": "Notifications settings-6", "isController": false}, {"data": [[1.59183306E12, 259.0], [1.591833E12, 293.0]], "isOverall": false, "label": "Upgrade-4", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Recover Playlist", "isController": false}, {"data": [[1.591833E12, 317.3333333333333]], "isOverall": false, "label": "Recover Playlist-7", "isController": false}, {"data": [[1.591833E12, 2166.6666666666665]], "isOverall": false, "label": "Login Page-0", "isController": false}, {"data": [[1.591833E12, 314.3333333333333]], "isOverall": false, "label": "Recover Playlist-8", "isController": false}, {"data": [[1.591833E12, 802.6666666666667]], "isOverall": false, "label": "Login Page-1", "isController": false}, {"data": [[1.591833E12, 303.3333333333333]], "isOverall": false, "label": "Recover Playlist-9", "isController": false}, {"data": [[1.591833E12, 299.3333333333333]], "isOverall": false, "label": "Login Page-2", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Web Player Home", "isController": false}, {"data": [[1.591833E12, 264.0]], "isOverall": false, "label": "Login Page-3", "isController": false}, {"data": [[1.591833E12, 303.0]], "isOverall": false, "label": "Login Page-4", "isController": false}, {"data": [[1.591833E12, 495.0]], "isOverall": false, "label": "Login Page-5", "isController": false}, {"data": [[1.591833E12, 824.0]], "isOverall": false, "label": "Login Page-6", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Recover Playlist-0", "isController": false}, {"data": [[1.591833E12, 107.66666666666667]], "isOverall": false, "label": "Recover Playlist-1", "isController": false}, {"data": [[1.591833E12, 131.66666666666666]], "isOverall": false, "label": "Recover Playlist-2", "isController": false}, {"data": [[1.591833E12, 176.66666666666669]], "isOverall": false, "label": "Recover Playlist-3", "isController": false}, {"data": [[1.59183306E12, 1178.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-6", "isController": false}, {"data": [[1.591833E12, 180.0]], "isOverall": false, "label": "Recover Playlist-4", "isController": false}, {"data": [[1.59183306E12, 336.5], [1.591833E12, 305.0]], "isOverall": false, "label": "Premium-7", "isController": false}, {"data": [[1.591833E12, 218.33333333333334]], "isOverall": false, "label": "Change password-0", "isController": false}, {"data": [[1.591833E12, 132.66666666666666]], "isOverall": false, "label": "Recover Playlist-5", "isController": false}, {"data": [[1.59183306E12, 162.5], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-8", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Change password-1", "isController": false}, {"data": [[1.591833E12, 217.66666666666666]], "isOverall": false, "label": "Recover Playlist-6", "isController": false}, {"data": [[1.59183306E12, 328.5], [1.591833E12, 310.0]], "isOverall": false, "label": "Premium-9", "isController": false}, {"data": [[1.59183306E12, 353.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-2", "isController": false}, {"data": [[1.59183306E12, 200.5], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-3", "isController": false}, {"data": [[1.59183306E12, 606.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-4", "isController": false}, {"data": [[1.59183306E12, 366.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-5", "isController": false}, {"data": [[1.591833E12, 328.6666666666667]], "isOverall": false, "label": "Album-6", "isController": false}, {"data": [[1.591833E12, 113.33333333333333]], "isOverall": false, "label": "Album-7", "isController": false}, {"data": [[1.591833E12, 217.66666666666666]], "isOverall": false, "label": "Album-8", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Premium-0", "isController": false}, {"data": [[1.591833E12, 317.6666666666667]], "isOverall": false, "label": "Album-9", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 327.0]], "isOverall": false, "label": "Premium-1", "isController": false}, {"data": [[1.591833E12, 84.33333333333333]], "isOverall": false, "label": "Album-2", "isController": false}, {"data": [[1.591833E12, 83.0]], "isOverall": false, "label": "Album-3", "isController": false}, {"data": [[1.591833E12, 79.33333333333333]], "isOverall": false, "label": "Album-4", "isController": false}, {"data": [[1.591833E12, 107.0]], "isOverall": false, "label": "Album-5", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Album-0", "isController": false}, {"data": [[1.591833E12, 110.33333333333333]], "isOverall": false, "label": "Album-1", "isController": false}, {"data": [[1.59183306E12, 324.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Upgrade-0", "isController": false}, {"data": [[1.591833E12, 315.6666666666667]], "isOverall": false, "label": "Notifications settings-1", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Notifications settings-0", "isController": false}, {"data": [[1.591833E12, 218.33333333333334]], "isOverall": false, "label": "Change password", "isController": false}, {"data": [[1.591833E12, 192.66666666666666]], "isOverall": false, "label": "Web Player Home-5", "isController": false}, {"data": [[1.591833E12, 220.33333333333331]], "isOverall": false, "label": "Web Player Home-6", "isController": false}, {"data": [[1.591833E12, 211.33333333333334]], "isOverall": false, "label": "Web Player Home-3", "isController": false}, {"data": [[1.591833E12, 247.33333333333334]], "isOverall": false, "label": "Web Player Home-4", "isController": false}, {"data": [[1.591833E12, 311.6666666666667]], "isOverall": false, "label": "Web Player Home-9", "isController": false}, {"data": [[1.591833E12, 330.0]], "isOverall": false, "label": "Web Player Home-7", "isController": false}, {"data": [[1.591833E12, 310.3333333333333]], "isOverall": false, "label": "Web Player Home-8", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Album", "isController": false}, {"data": [[1.591833E12, 104.0]], "isOverall": false, "label": "Web Player Home-1", "isController": false}, {"data": [[1.591833E12, 193.0]], "isOverall": false, "label": "Web Player Home-2", "isController": false}, {"data": [[1.59183306E12, 216.0]], "isOverall": false, "label": "Upgrade", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Web Player Home-0", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "Library\\artists", "isController": false}, {"data": [[1.591833E12, 101.0]], "isOverall": false, "label": "Search", "isController": false}, {"data": [[1.591833E12, 214.33333333333334]], "isOverall": false, "label": "Search-7", "isController": false}, {"data": [[1.591833E12, 217.33333333333334]], "isOverall": false, "label": "Search-8", "isController": false}, {"data": [[1.591833E12, 166.0]], "isOverall": false, "label": "Search-5", "isController": false}, {"data": [[1.591833E12, 342.0]], "isOverall": false, "label": "Search-6", "isController": false}, {"data": [[1.591833E12, 326.6666666666667]], "isOverall": false, "label": "Search-9", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About", "isController": false}, {"data": [[1.59183306E12, 775.6666666666667]], "isOverall": false, "label": "Sign Up Page-1", "isController": false}, {"data": [[1.59183306E12, 103.66666666666666]], "isOverall": false, "label": "Sign Up Page-0", "isController": false}, {"data": [[1.59183306E12, 535.3333333333333]], "isOverall": false, "label": "Sign Up Page-3", "isController": false}, {"data": [[1.59183306E12, 143.66666666666669]], "isOverall": false, "label": "Sign Up Page-2", "isController": false}, {"data": [[1.59183306E12, 399.66666666666663]], "isOverall": false, "label": "Sign Up Page-5", "isController": false}, {"data": [[1.591833E12, 101.0]], "isOverall": false, "label": "Search-0", "isController": false}, {"data": [[1.59183306E12, 535.0]], "isOverall": false, "label": "Sign Up Page-4", "isController": false}, {"data": [[1.59183306E12, 484.6666666666667]], "isOverall": false, "label": "Sign Up Page-7", "isController": false}, {"data": [[1.59183306E12, 112.0]], "isOverall": false, "label": "Sign Up Page-6", "isController": false}, {"data": [[1.591833E12, 296.0]], "isOverall": false, "label": "Search-3", "isController": false}, {"data": [[1.59183306E12, 831.3333333333334]], "isOverall": false, "label": "Sign Up Page-9", "isController": false}, {"data": [[1.591833E12, 270.3333333333333]], "isOverall": false, "label": "Search-4", "isController": false}, {"data": [[1.59183306E12, 100.33333333333334]], "isOverall": false, "label": "Sign Up Page-8", "isController": false}, {"data": [[1.591833E12, 113.33333333333333]], "isOverall": false, "label": "Edit profile", "isController": false}, {"data": [[1.591833E12, 224.66666666666666]], "isOverall": false, "label": "Search-1", "isController": false}, {"data": [[1.591833E12, 169.66666666666666]], "isOverall": false, "label": "Search-2", "isController": false}, {"data": [[1.591833E12, 112.0]], "isOverall": false, "label": "Visit profile", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 159.5]], "isOverall": false, "label": "Library\\albums", "isController": false}, {"data": [[1.59183306E12, 313.0], [1.591833E12, 120.0]], "isOverall": false, "label": "About-3", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\playlists-0", "isController": false}, {"data": [[1.59183306E12, 145.0], [1.591833E12, 123.5]], "isOverall": false, "label": "About-2", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About-1", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 0.0]], "isOverall": false, "label": "About-0", "isController": false}, {"data": [[1.591833E12, 187.33333333333334]], "isOverall": false, "label": "Library\\playlists-3", "isController": false}, {"data": [[1.59183306E12, 340.0], [1.591833E12, 332.0]], "isOverall": false, "label": "About-7", "isController": false}, {"data": [[1.591833E12, 177.33333333333334]], "isOverall": false, "label": "Library\\playlists-4", "isController": false}, {"data": [[1.59183306E12, 320.0], [1.591833E12, 327.5]], "isOverall": false, "label": "About-6", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Play a song", "isController": false}, {"data": [[1.591833E12, 216.66666666666666]], "isOverall": false, "label": "Library\\playlists-1", "isController": false}, {"data": [[1.59183306E12, 147.0], [1.591833E12, 115.0]], "isOverall": false, "label": "About-5", "isController": false}, {"data": [[1.591833E12, 112.33333333333333]], "isOverall": false, "label": "Library\\playlists-2", "isController": false}, {"data": [[1.59183306E12, 301.0], [1.591833E12, 128.5]], "isOverall": false, "label": "About-4", "isController": false}, {"data": [[1.591833E12, 317.6666666666667]], "isOverall": false, "label": "Library\\playlists-7", "isController": false}, {"data": [[1.591833E12, 306.3333333333333]], "isOverall": false, "label": "Library\\playlists-8", "isController": false}, {"data": [[1.591833E12, 125.33333333333333]], "isOverall": false, "label": "Library\\playlists-5", "isController": false}, {"data": [[1.59183306E12, 342.0], [1.591833E12, 327.0]], "isOverall": false, "label": "About-9", "isController": false}, {"data": [[1.591833E12, 332.6666666666667]], "isOverall": false, "label": "Library\\playlists-6", "isController": false}, {"data": [[1.59183306E12, 320.0], [1.591833E12, 163.5]], "isOverall": false, "label": "About-8", "isController": false}, {"data": [[1.591833E12, 309.3333333333333]], "isOverall": false, "label": "Library\\playlists-9", "isController": false}, {"data": [[1.59183306E12, 807.0], [1.591833E12, 314.0]], "isOverall": false, "label": "Library\\albums-8", "isController": false}, {"data": [[1.59183306E12, 831.0], [1.591833E12, 309.5]], "isOverall": false, "label": "Library\\albums-9", "isController": false}, {"data": [[1.591833E12, 0.0]], "isOverall": false, "label": "Library\\playlists", "isController": false}, {"data": [[1.59183306E12, 216.0]], "isOverall": false, "label": "Liked Songs-1", "isController": false}, {"data": [[1.59183306E12, 214.66666666666666]], "isOverall": false, "label": "Liked Songs-0", "isController": false}, {"data": [[1.59183306E12, 289.0]], "isOverall": false, "label": "Liked Songs-3", "isController": false}, {"data": [[1.59183306E12, 154.0]], "isOverall": false, "label": "Liked Songs-2", "isController": false}, {"data": [[1.59183306E12, 207.66666666666666]], "isOverall": false, "label": "Liked Songs-5", "isController": false}, {"data": [[1.59183306E12, 274.3333333333333]], "isOverall": false, "label": "Liked Songs-4", "isController": false}, {"data": [[1.59183306E12, 329.3333333333333]], "isOverall": false, "label": "Liked Songs-7", "isController": false}, {"data": [[1.59183306E12, 106.66666666666666]], "isOverall": false, "label": "Liked Songs-6", "isController": false}, {"data": [[1.59183306E12, 324.0]], "isOverall": false, "label": "Liked Songs-9", "isController": false}, {"data": [[1.59183306E12, 209.0]], "isOverall": false, "label": "Liked Songs-8", "isController": false}, {"data": [[1.59183306E12, 3331.0], [1.591833E12, 238.5]], "isOverall": false, "label": "Library\\albums-4", "isController": false}, {"data": [[1.59183306E12, 1211.0], [1.591833E12, 169.0]], "isOverall": false, "label": "Library\\albums-5", "isController": false}, {"data": [[1.59183306E12, 1313.0], [1.591833E12, 330.0]], "isOverall": false, "label": "Library\\albums-6", "isController": false}, {"data": [[1.59183306E12, 1311.0], [1.591833E12, 316.0]], "isOverall": false, "label": "Library\\albums-7", "isController": false}, {"data": [[1.59183306E12, 0.0], [1.591833E12, 159.5]], "isOverall": false, "label": "Library\\albums-0", "isController": false}, {"data": [[1.59183306E12, 1318.0], [1.591833E12, 185.0]], "isOverall": false, "label": "Library\\albums-1", "isController": false}, {"data": [[1.59183306E12, 463.0], [1.591833E12, 190.0]], "isOverall": false, "label": "Library\\albums-2", "isController": false}, {"data": [[1.59183306E12, 3157.0], [1.591833E12, 169.0]], "isOverall": false, "label": "Library\\albums-3", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59183306E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 80.0, "minX": 1.591833E12, "maxY": 16345.0, "series": [{"data": [[1.59183306E12, 6514.0], [1.591833E12, 16345.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.59183306E12, 84.0], [1.591833E12, 80.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.59183306E12, 1472.6], [1.591833E12, 527.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.59183306E12, 6407.040000000003], [1.591833E12, 13513.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.59183306E12, 2520.7999999999997], [1.591833E12, 1406.5]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59183306E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 280.0, "minX": 1.0, "maxY": 12585.0, "series": [{"data": [[2.0, 12585.0], [8.0, 646.0], [9.0, 524.5], [12.0, 477.0], [13.0, 459.0], [14.0, 415.0], [15.0, 348.0], [4.0, 1718.0], [1.0, 10512.0], [16.0, 463.0], [17.0, 280.0], [18.0, 297.5], [19.0, 365.0], [20.0, 363.5], [22.0, 380.0], [23.0, 398.5], [6.0, 1234.5], [25.0, 301.0], [7.0, 490.5], [29.0, 411.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 2087.0], [2.0, 2002.0], [9.0, 1375.0], [12.0, 1573.0], [13.0, 1653.0], [14.0, 1182.0], [15.0, 1348.0], [4.0, 1458.0], [16.0, 1909.0], [17.0, 1613.0], [18.0, 1967.5], [19.0, 2049.0], [20.0, 1261.5], [22.0, 1449.5], [23.0, 1082.0], [6.0, 1376.0], [25.0, 1244.0], [7.0, 2064.5], [29.0, 880.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 29.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 2019.5, "series": [{"data": [[2.0, 911.0], [8.0, 0.0], [9.0, 245.5], [12.0, 0.0], [13.0, 0.0], [14.0, 0.0], [15.0, 0.0], [4.0, 661.0], [1.0, 1067.0], [16.0, 0.0], [17.0, 0.0], [18.0, 0.0], [19.0, 0.0], [20.0, 0.0], [22.0, 0.0], [23.0, 0.0], [6.0, 0.0], [25.0, 0.0], [7.0, 0.0], [29.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 1881.0], [2.0, 2002.0], [9.0, 867.5], [12.0, 714.0], [13.0, 744.0], [14.0, 483.0], [15.0, 766.0], [4.0, 949.0], [16.0, 538.0], [17.0, 470.0], [18.0, 1023.0], [19.0, 828.0], [20.0, 672.0], [22.0, 687.0], [23.0, 922.0], [6.0, 1205.0], [25.0, 634.5], [7.0, 2019.5], [29.0, 605.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 29.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 2.0833333333333335, "minX": 1.591833E12, "maxY": 7.4, "series": [{"data": [[1.59183306E12, 2.0833333333333335], [1.591833E12, 7.4]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59183306E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.3, "minX": 1.591833E12, "maxY": 4.016666666666667, "series": [{"data": [[1.59183306E12, 0.6333333333333333], [1.591833E12, 2.4]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.59183306E12, 0.3], [1.591833E12, 0.75]], "isOverall": false, "label": "400", "isController": false}, {"data": [[1.59183306E12, 1.3833333333333333], [1.591833E12, 4.016666666666667]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.59183306E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.591833E12, "maxY": 0.05, "series": [{"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-9-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-failure", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-6-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-5-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-1-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-6-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-4-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login Page-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-5-failure", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Premium-0-success", "isController": false}, {"data": [[1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Login Page-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\artists-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-1-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-3-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-0-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666]], "isOverall": false, "label": "Sign Up Page-4-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-9-success", "isController": false}, {"data": [[1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Visit profile-4-failure", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-1-success", "isController": false}, {"data": [[1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Upgrade-4-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-0-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666]], "isOverall": false, "label": "About-4-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-0-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-4-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-1-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-6-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-5-failure", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Upgrade-0-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-8-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login Page-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-0-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-8-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-8-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Upgrade-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-5-failure", "isController": false}, {"data": [[1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Notifications settings-4-failure", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Upgrade-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-8-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-8-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-2-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-0-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-4-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Upgrade-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-1-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-0-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-1-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-7-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-5-failure", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\artists-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-8-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-failure", "isController": false}, {"data": [[1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Login Page-4-success", "isController": false}, {"data": [[1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Login Page-4-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\artists-0-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-5-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-4-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Play a song-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\artists-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-failure", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-2-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-5-failure", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login Page-1-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-9-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-5-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-0-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-0-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-7-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-5-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-6-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Upgrade-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login Page-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-2-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Upgrade-1-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\artists-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-3-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-1-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-5-failure", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Upgrade-5-failure", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-5-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-6-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Create playlist-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login Page-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-1-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-4-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-7-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Upgrade-9-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-7-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-1-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-0-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333]], "isOverall": false, "label": "Sign Up Page-4-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\artists-5-failure", "isController": false}, {"data": [[1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Visit profile-4-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-3-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\artists-9-success", "isController": false}, {"data": [[1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-4-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-0-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-5-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-6-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login Page-0-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-2-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login Page-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-4-success", "isController": false}, {"data": [[1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Notifications settings-4-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333]], "isOverall": false, "label": "Upgrade-4-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-2-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\artists-1-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-1-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-failure", "isController": false}, {"data": [[1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Recover Playlist-4-failure", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-0-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-1-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\artists-4-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-9-success", "isController": false}, {"data": [[1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Library\\playlists-4-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-5-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-0-success", "isController": false}, {"data": [[1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Recover Playlist-4-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-7-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-9-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333]], "isOverall": false, "label": "Liked Songs-4-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\artists-failure", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-8-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Upgrade-7-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-0-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-5-failure", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666]], "isOverall": false, "label": "Liked Songs-4-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-3-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login Page-8-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Visit profile-2-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\albums-3-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Sign Up Page-6-success", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Change password-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Album-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Recover Playlist-1-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-4-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Upgrade-2-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\artists-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Library\\playlists-7-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Search-9-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Web Player Home-failure", "isController": false}, {"data": [[1.59183306E12, 0.05]], "isOverall": false, "label": "Liked Songs-1-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Edit profile-3-success", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-6-success", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Notifications settings-2-success", "isController": false}, {"data": [[1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Library\\playlists-4-success", "isController": false}, {"data": [[1.59183306E12, 0.03333333333333333], [1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Premium-1-success", "isController": false}, {"data": [[1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "Change password-4-failure", "isController": false}, {"data": [[1.591833E12, 0.05]], "isOverall": false, "label": "Login Page-5-failure", "isController": false}, {"data": [[1.59183306E12, 0.016666666666666666], [1.591833E12, 0.03333333333333333]], "isOverall": false, "label": "About-failure", "isController": false}, {"data": [[1.591833E12, 0.016666666666666666]], "isOverall": false, "label": "Change password-4-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59183306E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.5333333333333333, "minX": 1.591833E12, "maxY": 5.816666666666666, "series": [{"data": [[1.59183306E12, 1.7833333333333334], [1.591833E12, 5.816666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.59183306E12, 0.5333333333333333], [1.591833E12, 1.35]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.59183306E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
