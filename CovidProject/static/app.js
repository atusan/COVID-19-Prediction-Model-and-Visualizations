Highcharts.chart('plot', {
  chart: {
      type: 'packedbubble',
      height: '100%'
  },
  title: {
      text: 'Covid 19 Incident Rate in Major counties in California'
  },
  tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value} Incident rate<sub></sub>'
  },
  plotOptions: {
      packedbubble: {
          minSize: '30%',
          maxSize: '120%',
          zMin: 0,
          zMax: 900,
          layoutAlgorithm: {
              splitSeries: false,
              gravitationalConstant: 0.01
          },
          dataLabels: {
              enabled: true,
              format: '{point.name}',
              filter: {
                  property: 'y',
                  operator: '>',
                  value: 10
              },
              style: {
                  color: 'black',
                  textOutline: 'none',
                  fontWeight: 'normal'
              }
          }
      }
  },
  series: [{
      name: 'California',
      data: [{
          name: 'Los Angeles',
          value: 108.8,
          Deaths: 200
          
      }, {
          name: 'Santa Clara',
          value: 95.0
      },
      {
          name: "San Diego",
          value: 62.5
      },
      {
          name: "Riverside",
          value: 91.6
      },
      {
          name: "San Bernardino",
          value: 47.3
      },
      {
          name: "Alameda",
          value: 60.3
      },
      {
          name: "Sacramento",
          value: 56.6
      },
      {
          name: "San Mateo",
          value: 100
      },
      {
          name: "Orange",
          value: 44
      },
      {
          name: "San Francisco",
          value: 115
      },
      {
          
     
          
     
      }]
  }, 
     

  ]
});