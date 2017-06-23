var BarChart = require("react-chartjs").Bar;

var barChart = React.createClass({



  render: function() {
    return <BarChart data={chartData} options={chartOptions}/>
  }
});
