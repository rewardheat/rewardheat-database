//this is the graph

$(async function () {
  "use strict";
  // Dashboard 1 Morris-chart
  const fullData = await fetch('/getlcoh2data').then(res => res.json())

  let yKeyIdx = []
  for (let i = 1; i <= fullData.labels.length; i++) {
    yKeyIdx.push(i)
  }

  const config = {
    data: fullData.data,
    xkey: 0,
    xLabelAngle: 80,
    ykeys: yKeyIdx,
    labels: fullData.labels,
    fillOpacity: 0.6,
    hideHover: 'auto',
    behaveLikeLine: true,
    resize: true,
    pointFillColors: ['#ffffff'],
    pointStrokeColors: ['black'],
    lineColors: ['gray', 'red'],
    element: 'stacked2',
    // stacked: true,
    // hideHover: 'always',
    barColors: ["#141414", "#f05e1b"],
    hoverCallback: function (index, options, content, row) {
      for (let i = 0; i < row.length; i++) {
        document.getElementById(`value-lcoh2-${i}`).textContent = row[i]
      }
    }
  };

  Morris.Bar(config);
});