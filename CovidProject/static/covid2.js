function buildData(state) {
    d3.json("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json")
    .then((CovidData) => {
        var features = CovidData.features;
        var attributes = features.map(att => att.attributes)

        //Total info based on each state
        var stateByName = d3.nest()
        .key(function(d) { return d.Province_State; })
        .rollup(function(v) { return {
            count: v.length,
            Confirmed: d3.sum(v, function(d) { return d.Confirmed; }),
            Deaths: d3.sum(v, function(d) { return d.Deaths; }),
            Recovered: d3.sum(v, function(d) { return d.Recovered; })
         }; })
        .entries(attributes);

        //Details info based on cities within each state
        var result = attributes.filter(name => name.Province_State == state)
        var Locations = result.map(loc =>loc.Admin2);
        
        var DeathsLoc = result.map(d =>d.Deaths);
        
        var ConfirmedLoc = result.map(d =>d.Confirmed);
       
        var maxC = Math.max(...ConfirmedLoc);
        var minC = Math.min(...ConfirmedLoc);

        var maxD = Math.max(...DeathsLoc);
        console.log(maxD)
        var minD = Math.min(...DeathsLoc);
       

        // Finding the max number of confirmed cases in the city within the sate
        var maxConfirmed1 = result.filter(c => c.Confirmed == maxC);
        var maxConfirmed2 = maxConfirmed1[0];
        var maxConfirmedName= maxConfirmed2.Admin2;
        console.log(maxConfirmedName)

        // Finding the min number of confirmed cases in the city within the sate
        var minConfirmed1 = result.filter(c => c.Confirmed == minC);
        var minConfirmed2 = minConfirmed1[0];
        var minConfirmedName= minConfirmed2.Admin2;
        console.log(minConfirmedName)

        // Finding the max number of death cases in the city within the sate
        var maxDeath1 = result.filter(d => d.Deaths == maxD);
        var maxDeath2 = maxDeath1[0];
        var maxDeathName= maxDeath2.Admin2;
        console.log(maxDeathName)

        // Finding the min number of death cases in the city within the sate
        var minDeath1 = result.filter(d => d.Deaths == minD);
        var minDeath2 = minDeath1[0];
        var minDeathName= minDeath2.Admin2;
        console.log(minDeathName)

        var result = stateByName.filter(name => name.key == state)
       
       
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h5").html(`
            <b>Total cases: </b>${value.value.Confirmed}<br/> 
            <b>Total deaths: </b>${value.value.Deaths} 
            <br/><br/>
            ${maxConfirmedName} with ${maxC} has the most confirmed cases.<br/>
            ${minConfirmedName} with ${minC} has the least confirmed cases.<br/>
            ${maxDeathName} with ${maxD} has the most death cases.<br/>
            ${minDeathName} with ${minD} has the least death cases`);
        });
    });
}
function buildCharts(state) {
    d3.json("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json")
    .then((CovidData) =>{
        var features = CovidData.features;
        // console.log(features)
        var attributes = features.map(att => att.attributes)
        var stateByName = d3.nest()
        .key(function(d) { return d.Province_State; })
        .rollup(function(v) { return {
            count: v.length,
            Confirmed: d3.sum(v, function(d) { return d.Confirmed; }),
            Deaths: d3.sum(v, function(d) { return d.Deaths; }),
            Recovered: d3.sum(v, function(d) { return d.Recovered; })
         }; })
        .entries(attributes);
        
         //Details info based on cities within each state
        var result = attributes.filter(name => name.Province_State == state)
        var Locations = result.map(loc =>loc.Admin2);
        var DeathsLoc = result.map(d =>d.Deaths)
        var ConfirmedLoc = result.map(d =>d.Confirmed)
        var max = Math.max(...ConfirmedLoc)
        
        
        var size = 0;
        var DeathSizeAdj =[];
        // This function adjusting the size of death numbers to use in chart 
        DeathsLoc.forEach(function(d) {
            if (d > 9000) {
                d = d/250;
                DeathSizeAdj.push(d);
            }
            else if (d <= 9000 && d > 1000) {
                d = d/10;
                DeathSizeAdj.push(d);
            }
            else if (d <= 1000 && d > 500) {
                size = d/2
                DeathSizeAdj.push(size);
            }
            else {
                DeathSizeAdj.push(d);
            }
          });
       

        Trace1 = {
            x:Locations,
            y:ConfirmedLoc,
            text: Locations,
            type: 'scatter',
            // hovermode: "closest",
            mode : 'markers',
            marker: {
                color: 'rgb(234, 153, 153)',
                size: 15,
                // ConfirmedLoc.map(d =>d/20),
                colorscale: "Earth"
            }
            
        };
        data1 = [Trace1];
        layout1 = {
            title:`${state} confirmed cases for each county`,
            // xaxis: { title: "Counties" },
        };


        Plotly.newPlot("bubbleConfirmed", data1, layout1); 


        Trace2 = {
            x:Locations,
            y:DeathsLoc,
            text: Locations,
            type: 'scatter',
            opacity: 0.75,
            // hovermode: "closest",
            mode : 'markers',
            marker: {
                color: 'rgb(234, 153, 153)',
                size: DeathSizeAdj,
                line: {
                color: 'rgb(231, 99, 250)',
                width: 1
            }
                // ConfirmedLoc.map(d =>d/20),
                
            }
            
        };
        data2 = [Trace2];
        layout2 = {
            title:`${state} death cases for each county`,
            yaxis: {
                showline: false
              }
        };

        Plotly.newPlot("bubbleDeath", data2, layout2); 
    
    });
}


function init() {
    
    var selector = d3.select("#selDataset");

    d3.json("https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases_US/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json")
    .then((CovidData) => {

        var features = CovidData.features;
        // console.log(features)
        var attributes = features.map(att => att.attributes)
      
        var Province_State = attributes.map(ps => ps.Province_State)
        
        var stateByName = d3.nest()
        .key(function(d) { return d.Province_State; })
        .rollup(function(v) { return {
            count: v.length,
            Confirmed: d3.sum(v, function(d) { return d.Confirmed; }),
            Deaths: d3.sum(v, function(d) { return d.Deaths; }),
            Recovered: d3.sum(v, function(d) { return d.Recovered; })
          
         }; })
        .entries(attributes);
        
        Object.entries(stateByName).forEach(([key, value]) => {
            selector.append("option").text(`${value.key}`);
        });
        // Use the first sample from the list to build the initial plots
        // console.log(stateByName)
        var firstObject = stateByName[0];
        // console.log(Object.values(stateByName))
        var firstState = firstObject.key;

        buildCharts(firstState);
        buildData(firstState);
    });
}
function optionChanged(newState) {
   // Fetch new data each time a new sample is selected
    buildCharts(newState);
    buildData(newState);
}
// Initialize the dashboard
init();
