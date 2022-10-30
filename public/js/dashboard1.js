//this is the graph

$(async function () {
  "use strict";
  // Dashboard 1 Morris-chart
  const fullData = await fetch('/getlcohdata').then(res => res.json())

  let yKeyIdx = []
  for (let i = 1; i < fullData.labels.length; i++) {
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
    element: 'stacked',
    stacked: true,
    // hideHover: 'always',
    barColors: ["#141414", "#282828", "#3c3c3c", "#4f4f4f", "#636363", "#777777", "#8b8b8b", "#9f9f9f", "#b3b3b3", "#c6c6c6", "#dadada"],
    hoverCallback: function (index, options, content, row) {
      for (let i = 0; i < row.length; i++) {
        document.getElementById(`value-lcoh-${i}`).textContent = row[i]
      }
    }
  };

  Morris.Bar(config);
});