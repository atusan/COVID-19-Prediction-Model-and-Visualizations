console.log("Chart.js")
d3.csv("https://zappa-hxh4j3i7m.s3.amazonaws.com/static/COVID19_Cases_US.csv").then(function(Covid) {
    // Cast the hours value to a number for each piece of tvData
    Covid.forEach(function(data) {
        data.Deaths = +data.Deaths;
        data.Confirmed = +data.Confirmed;
    });
    var f = d3.format("%");

    var states = Covid.map(data => data.States);
    var deaths = Covid.map(data => data.Deaths);
    //var rates =Covid.map(data=> f(data.Deaths/data.Confirmed))
    var rates =Covid.map(data=> (data.Deaths/data.Confirmed))

    console.log(states)
    console.log(deaths)
    console.log(rates)
    var data = [{
        x: states,
        y: rates,
        type: 'bar'

    }];
    var layout = {
        yaxis: {
          tickformat: '%' ,
          title: 'Death Ratio by State',
          barmode: 'stack'
      }
      
    };
    Plotly.newPlot('myDiv', data,layout);
    
    var data2 = [{
        values: deaths,
        labels: states,
        type: 'pie'
      }];
      
      var layout2 = {
        height: 700,
        width: 1000,
        title: 'Deaths Impact as a Country',
        barmode: 'stack'
      };
     


    Plotly.newPlot('myDiv2', data2,layout2);
});