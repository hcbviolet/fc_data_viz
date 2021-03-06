$(document).ready(function() {
    var currentYear = new Date().getFullYear();
    var year;
    document.getElementById("year-button").onclick = function (){
        year = document.getElementById("year-input").value;
        $.ajax({
            url: "https://flat-circle-app.herokuapp.com/api/predictions?year=" + year,
            headers: {
            'X-Auth-Token' : "xAqO541unK52OdXpnfSGWZUW/c3EZy+ANcMO3rJFepzrhy/p8j7zK6DcFC1J98i35zRsH8hPG2qzbMyDshSBmw=="
            }
        }).then(function(data) {
            var trendData = data.filter(function (trend) {
                return trend !== null;
            });

            var total = trendData.length;
            var interval = 255 / total;

            trendData.forEach(function(trend, index) {
                var lengths = [];
                var arcLength = trend.endyear - trend.startyear;
                trend.arcLength = arcLength;
              });
            trendData.sort(function(a,b){
              return b.arcLength - a.arcLength;
            });
            trendData.forEach(function(trend, index){
              //sort array by arcLength, then:
              var trendColor = index * interval;
              var arcColor = "rgb(" + trendColor + "," + trendColor + "," + trendColor + ")";
              var point = currentYear - trend.endyear;
              var vis = d3.select("body").selectAll(".trend-display").append("svg");
              var pi = Math.PI;
              var arc = d3.svg.arc()
                  .innerRadius(3.5*trend.arcLength)
                  .outerRadius(3.5*(trend.arcLength + 10))
                  .startAngle(.5 * pi)
                  .endAngle(-.5 * pi)
              vis.attr("width", "500").attr("height", "500").attr("viewbox", "0 0 500 500")
                  .classed("trend-arc", true)
                  .append("path")
                  .attr("d", arc)
                  .attr("fill", arcColor)
                  .attr("transform", "translate(400,400)");
            })
        });
    }
});

var trendDashboard = new Vue({
  el: '#trend-dashboard',
  components: {
    'trend-container': {
      template: `<div class="trend-display"></div>`,
    }
  },
  data: {
    state: null
  },
  methods: {
    submitYear: function() {
      this.state = 'display';
      $('#input-container').removeClass("new-input");
      $('#input-container').addClass("used-input");
    }
  }
});
