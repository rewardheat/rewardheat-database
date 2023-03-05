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
    barColors: ["#2a5d6b", "#495f68", "#606164", "#736360", "#86645d", "#976659", "#a86655", "#b96751", "#c9674d", "#da6649", "#ea6544"],
    hoverCallback: function (index, options, content, row) {
      for (let i = 0; i < row.length; i++) {
        document.getElementById(`value-lcoh-${i}`).textContent = row[i]
      }
    }
  };

  Morris.Bar(config);
});