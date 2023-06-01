/* JQuery function to enable click function on graph*/
jQuery(function(){
    drawServerSideResultsChart();
    drawClientSideResultsChart();
    drawServerSideVsClientSideChart();

    async function drawServerSideResultsChart()
        {
            const data = await getData_ServerSide();
            const labelData = await getData_ServerSideColumnHeaders();
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.xLabels,
                    datasets: [
                        {
                            label: labelData.csvColumnHeader0,
                            data: data.csvColumnData3,
                            fill: false,
                            backgroundColor: "Tomato",
                            borderColor: "Tomato",
                            borderWidth: 2
                        },
                        {
                            label: labelData.csvColumnHeader1,
                            data: data.csvColumnData2,
                            fill: false,
                            backgroundColor: "DodgerBlue",
                            borderColor: "DodgerBlue",
                            borderWidth: 2
                        },
                        {
                            label: labelData.csvColumnHeader2,
                            data: data.csvColumnData1,
                            fill: false,
                            backgroundColor: "Violet",
                            borderColor: "Violet",
                            borderWidth: 2
                        },
                        {
                            label: labelData.csvColumnHeader3,
                            data: data.csvColumnData0,
                            fill: false,
                            backgroundColor: "MediumSeaGreen",
                            borderColor: "MediumSeaGreen",
                            borderWidth: 2
                        },
                        {
                            label: '',
                            data: data.chartURLs,
                            hidden: false,
                            fill:true,
                            backgroundColor: "white",
                            borderColor: "white",
                            borderWidth: 2
                        }
                    ]
                }
            });
            $("#myChart").click(function(event)
                {
                    var activepoints = myChart.getElementsAtEvent(event);
                    console.log(""+activepoints.length);
                    var clickedIndex = activepoints[0]["_index"];
                    console.log(""+clickedIndex);
                    console.log(""+myChart.data.datasets[4].data[clickedIndex]);
                    window.open(myChart.data.datasets[4].data[clickedIndex], '_blank');
                }
            )
        }

    async function drawClientSideResultsChart()
        {
            const data = await getData_ClientSide();
            const labelData = await getData_ClientSideColumnHeaders();
            const ctx = document.getElementById('myChart1').getContext('2d');
            const myChart1 = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.xLabels,
                    datasets: [
                        {
                            label: labelData.csvColumnHeader0,
                            data: data.csvColumnData3,
                            fill: false,
                            backgroundColor: "Tomato",
                            borderColor: "Tomato",
                            borderWidth: 2
                        },
                        {
                            label: labelData.csvColumnHeader1,
                            data: data.csvColumnData2,
                            fill: false,
                            backgroundColor: "DodgerBlue",
                            borderColor: "DodgerBlue",
                            borderWidth: 2
                        },
                        {
                            label: labelData.csvColumnHeader2,
                            data: data.csvColumnData1,
                            fill: false,
                            backgroundColor: "Violet",
                            borderColor: "Violet",
                            borderWidth: 2
                        },
                        {
                            label: labelData.csvColumnHeader3,
                            data: data.csvColumnData0,
                            fill: false,
                            backgroundColor: "MediumSeaGreen",
                            borderColor: "MediumSeaGreen",
                            borderWidth: 2
                        },
                        {
                            label: '',
                            data: data.chartURLs,
                            hidden: false,
                            fill:true,
                            backgroundColor: "white",
                            borderColor: "white",
                            borderWidth: 2
                        }
                    ]
                }
            });
            $("#myChart1").click(function(event)
                {
                    var activepoints = myChart1.getElementsAtEvent(event);
                    console.log(""+activepoints.length);
                    var clickedIndex = activepoints[0]["_index"];
                    console.log(""+clickedIndex);
                    console.log(""+myChart1.data.datasets[4].data[clickedIndex]);
                    window.open(myChart1.data.datasets[4].data[clickedIndex], '_blank');
                }
            )
        }

    async function drawServerSideVsClientSideChart()
        {
            const data = await getData_ServerSideVsClientSide();
            const ctx = document.getElementById('myChart2').getContext('2d');
            const myChart2 = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.xLabels,
                    datasets: [
                        {
                            label: 'Client side',
                            data: data.csvColumnData1,
                            fill: false,
                            backgroundColor: "Tomato",
                            borderColor: "Tomato",
                            borderWidth: 2
                        },
                        {
                            label: 'Server side',
                            data: data.csvColumnData0,
                            fill: false,
                            backgroundColor: "MediumSeaGreen",
                            borderColor: "MediumSeaGreen",
                            borderWidth: 2
                        },
                        {
                            label: '',
                            data: data.chartURLs,
                            hidden: false,
                            fill:true,
                            backgroundColor: "white",
                            borderColor: "white",
                            borderWidth: 2
                        }
                    ]
                }
            });
            $("#myChart2").click(function(event)
                {
                    var activepoints = myChart2.getElementsAtEvent(event);
                    console.log(""+activepoints.length);
                    var clickedIndex = activepoints[0]["_index"];
                    console.log(""+clickedIndex);
                    console.log(""+myChart2.data.datasets[2].data[clickedIndex]);
                    window.open(myChart2.data.datasets[2].data[clickedIndex], '_blank');
                }
            )
        }
    async function getData_ServerSide()
        {
            /* xLabels: the labels on x-axis in the chart, contains scenario/ transaction name
               csvColumnData*: the column data of .csv will be stored in these variables
            */
            const xLabels = [];
            const csvColumnData0 = [];
            const csvColumnData1 = [];
            const csvColumnData2 = [];
            const csvColumnData3 = [];
            const chartURLs = [];
            const response = await fetch('IM/IM_ServerBuildSpecificResult.csv');
            const data = await response.text();
            const table=data.split('\n').slice(1);
            table.forEach(row => {
                    const column = row.split(',');
                    const resp = column [0];
                    csvColumnData3.push(resp);
                    const labelW = column [1];
                    csvColumnData2.push(labelW);
                    const labelF = column [2];
                    csvColumnData1.push(labelF);
                    const labelK = column [3];
                    csvColumnData0.push(labelK);
                    const labelE = column [4];
                    xLabels.push(labelE);
                    const linkValue = column [5];
                    chartURLs.push(linkValue);
                    console.log(resp,labelW,labelF,labelK,labelE,linkValue);
            });
                    return { csvColumnData0, csvColumnData1,csvColumnData2,csvColumnData3,xLabels,chartURLs};
        }

    async function getData_ServerSideColumnHeaders()
        {
            const csvColumnHeader0 =[];
            const csvColumnHeader1 =[];
            const csvColumnHeader2 =[];
            const csvColumnHeader3 =[];
            const response = await fetch('IM/IM_ServerBuildSpecificResult.csv');
            const data = await response.text();
            const table = data.split('\n')[0];
            const column = table.split(',');
            const versionValue1 = column [0];
            csvColumnHeader0.push(versionValue1);
            const versionValue2 = column [1];
            csvColumnHeader1.push(versionValue2);
            const versionValue3 = column [2];
            csvColumnHeader2.push(versionValue3);
            const versionValue4 = column [3];
            csvColumnHeader3.push(versionValue4);
            console.log(versionValue1,versionValue2,versionValue3,versionValue4);
            return {csvColumnHeader0,csvColumnHeader1,csvColumnHeader2,csvColumnHeader3};
        }

    async function getData_ClientSide()
        {
            const xLabels = [];
            const csvColumnData0 = [];
            const csvColumnData1 = [];
            const csvColumnData2 = [];
            const csvColumnData3 = [];
            const chartURLs = [];
            const response = await fetch('IM/IM_ClientBuildSpecificResult.csv');
            const data = await response.text();
            const table=data.split('\n').slice(1);

            table.forEach(row => {
                    const column = row.split(',');
                    const resp = column [0];
                    csvColumnData3.push(resp);
                    const labelW = column [1];
                    csvColumnData2.push(labelW);
                    const labelF = column [2];
                    csvColumnData1.push(labelF);
                    const labelK = column [3];
                    csvColumnData0.push(labelK);
                    const labelE = column [4];
                    xLabels.push(labelE);
                    const linkValue = column [5];
                    chartURLs.push(linkValue);
                    console.log(resp,labelW,labelF,labelK,labelE,linkValue);
            });
                    return { csvColumnData0, csvColumnData1,csvColumnData2,csvColumnData3,xLabels,chartURLs};
        }

    async function getData_ClientSideColumnHeaders()
        {
            const csvColumnHeader0 =[];
            const csvColumnHeader1 =[];
            const csvColumnHeader2 =[];
            const csvColumnHeader3 =[];
            const response = await fetch('IM/IM_ClientBuildSpecificResult.csv');
            const data = await response.text();
            const table = data.split('\n')[0];
            const column = table.split(',');
            const versionValue1 = column [0];
            csvColumnHeader0.push(versionValue1);
            const versionValue2 = column [1];
            csvColumnHeader1.push(versionValue2);
            const versionValue3 = column [2];
            csvColumnHeader2.push(versionValue3);
            const versionValue4 = column [3];
            csvColumnHeader3.push(versionValue4);
            console.log(versionValue1,versionValue2,versionValue3,versionValue4);
            return {csvColumnHeader0,csvColumnHeader1,csvColumnHeader2,csvColumnHeader3};
        }

    async function getData_ServerSideVsClientSide()
        {

            const xLabels = [];
            const csvColumnData0 = [];
            const csvColumnData1 = [];
            const chartURLs = [];
            const response = await fetch('IM/IM_ServerVsClientCurrentBuild.csv');
            const data = await response.text();
            const table = data.split('\n');
            table.forEach(row => {
                    const column = row.split(',');
                    const resp = column [0];
                    csvColumnData0.push(resp);
                    const labelF = column [1];
                    csvColumnData1.push(labelF);
                    const labelE = column [2];
                    xLabels.push(labelE);
                    const linkValue = column [3];
                    chartURLs.push(linkValue);
                    console.log(resp,labelF,labelE,linkValue);
            });
                    return { xLabels, csvColumnData0, csvColumnData1,chartURLs};
        }
})