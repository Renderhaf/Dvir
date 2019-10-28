class EChart {
  constructor(can, datasetinfo) {
    this.configInfo = {
      type: "line",
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: false,
        elements: 
        {
          point:{
              radius: 0 // can be turned off
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false, // can be turned on
              }
            }
          ]
        },
        animation: { // can be turned off
          duration: 0
        }
      }
    };

    let newdataset = {
      label: datasetinfo.lable,
      data: [],
      backgroundColor: datasetinfo.backgroundC,
      borderColor: datasetinfo.borderC,
      borderWidth: 1
    };
    this.configInfo.data.datasets.push(newdataset);
    

    this.can = can;
    this.chart = new Chart(this.can, this.configInfo);
  }

  addData(datasetindex, data) {
    this.configInfo.data.datasets[datasetindex].data.push(data);
  }

  addLable(lablename) {
    this.configInfo.data.labels.push(lablename);
  }

  clearData(dataindex){
    this.configInfo.data.datasets[dataindex].data = [];
  }

  clearLables(){
    this.configInfo.data.labels = [];
  }

  update(){
    this.chart.update();
  }
}
