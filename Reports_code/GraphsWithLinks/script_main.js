
   jQuery(function(){

    chartIt();
    chartIt1();
    chartIt2();

    async function chartIt(){

                    const data = await getData_ServerSide();
                    const ctx = document.getElementById('myChart').getContext('2d');
                    const myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.xLabels,
                            datasets: [{
                                label: 'v3.3.1',
                                data: data.y1Labels,
                                fill: false,
                                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                                borderColor: ['rgba(4, 4, 4, 1)'],
                                borderWidth: 1
                            },
                            {
                                label: 'v3.3',
                                data: data.yLabels,
                                fill: false,
                                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                                borderColor: ['rgba(255, 99, 132, 1)'],
                                borderWidth: 1
                            },
                            {
                                label: '',
                                data: data.chartURLs,
                                hidden: false,
                                fill:true,
                                backgroundColor: "white",
                                borderColor: "white",
                                borderWidth: 1
                            }
                        ]
                    }

                    });

                    $("#myChart").click(
                        function(event){
                            var activepoints = myChart.getElementsAtEvent(event);
                         //   if(activepoints.length > 0)
                         //   {
                            console.log(""+activepoints.length);

                            var clickedIndex = activepoints[0]["_index"];
                           // console.log("NarendraTesting"+data.linkValue[1]);
                            //window.location.href = linkValue[clickedIndex]
                            console.log(""+clickedIndex);
                            console.log(""+myChart.data.datasets[2].data[clickedIndex]);
                          //working:  window.location.href = myChart.data.datasets[2].data[clickedIndex]
                                window.open(myChart.data.datasets[2].data[clickedIndex], '_blank');
                          //   window.location.href = "https://www.google.com"
                         //   }

                        }
                    )

            }


            async function chartIt1(){

                const data = await getData_ClientSide();
                const ctx = document.getElementById('myChart1').getContext('2d');
                const myChart1 = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.xLabels,
                        datasets: [{
                            label: 'v3.3.1',
                            data: data.y1Labels,
                            fill: false,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                            borderColor: ['rgba(4, 4, 4, 1)'],
                            borderWidth: 1
                        },
                        {
                            label: 'v3.3',
                            data: data.yLabels,
                            fill: false,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)'],
                            borderWidth: 1
                        },
                        {
                            label: '',
                            data: data.chartURLs,
                            hidden: false,
                            fill:true,
                            backgroundColor: "white",
                            borderColor: "white",
                            borderWidth: 1
                        }
                    ]
                    }

                });

                $("#myChart1").click(
                    function(event){
                        var activepoints = myChart1.getElementsAtEvent(event);
                     //   if(activepoints.length > 0)
                     //   {
                        console.log(""+activepoints.length);

                        var clickedIndex = activepoints[0]["_index"];
                       // console.log("NarendraTesting"+data.linkValue[1]);
                        //window.location.href = linkValue[clickedIndex]
                        console.log(""+clickedIndex);
                        console.log(""+myChart1.data.datasets[2].data[clickedIndex]);
                      //working:  window.location.href = myChart.data.datasets[2].data[clickedIndex]
                            window.open(myChart1.data.datasets[2].data[clickedIndex], '_blank');
                      //   window.location.href = "https://www.google.com"
                     //   }

                    }
                )

        }


        async function chartIt2(){

            const data = await getData_ServerSideVsClientSide();
            const ctx = document.getElementById('myChart2').getContext('2d');
            const myChart2 = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.xLabels,
                    datasets: [{
                        label: 'Client side',
                        data: data.y1Labels,
                        fill: false,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(4, 4, 4, 1)'],
                        borderWidth: 1
                    },
                    {
                        label: 'Server side',
                        data: data.yLabels,
                        fill: false,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)'],
                        borderWidth: 1
                    },
                    {
                        label: '',
                        data: data.chartURLs,
                        hidden: false,
                        fill:true,
                        backgroundColor: "white",
                        borderColor: "white",
                        borderWidth: 1
                    }
                ]
                }

            });



            $("#myChart2").click(
                function(event){
                    var activepoints = myChart2.getElementsAtEvent(event);
                 //   if(activepoints.length > 0)
                 //   {
                    console.log(""+activepoints.length);

                    var clickedIndex = activepoints[0]["_index"];
                   // console.log("NarendraTesting"+data.linkValue[1]);
                    //window.location.href = linkValue[clickedIndex]
                    console.log(""+clickedIndex);
                    console.log(""+myChart2.data.datasets[2].data[clickedIndex]);
                  //working:  window.location.href = myChart.data.datasets[2].data[clickedIndex]
                        window.open(myChart2.data.datasets[2].data[clickedIndex], '_blank');
                  //   window.location.href = "https://www.google.com"
                 //   }

                }
            )

    }


    async function getData_ServerSide() {

                                const xLabels = [];
                                const yLabels = [];
                                const y1Labels = [];
                                const chartURLs = [];


                                const response = await fetch('IM_ServerBuildSpecificResult.csv');
                                const data = await response.text();

                                const table = data.split('\n');



            table.forEach(row => {

                                const column = row.split(',');
                                const resp = column [0];
                                yLabels.push(resp);
                                const labelF = column [1];
                                y1Labels.push(labelF);
                                const labelE = column [2];
                                xLabels.push(labelE);
                               const linkValue = column [3];
                               chartURLs.push(linkValue);



                                console.log(resp,labelF,labelE,linkValue);


                                 });

                                 return { xLabels, yLabels, y1Labels,chartURLs};
                                 }

       async function getData_ClientSide() {

                                    const xLabels = [];
                                    const yLabels = [];
                                    const y1Labels = [];
                                    const chartURLs = [];
                                    const response = await fetch('IM_ClientBuildSpecificResult.csv');
                                    const data = await response.text();
                                    const table = data.split('\n');



                table.forEach(row => {

                                    const column = row.split(',');
                                    const resp = column [0];
                                    yLabels.push(resp);
                                    const labelF = column [1];
                                    y1Labels.push(labelF);
                                    const labelE = column [2];
                                    xLabels.push(labelE);
                                   const linkValue = column [3];
                                   chartURLs.push(linkValue);
                                    console.log(resp,labelF,labelE,linkValue);
                                     });
                                     return { xLabels, yLabels, y1Labels,chartURLs};
                                     }

        async function getData_ServerSideVsClientSide() {

                                        const xLabels = [];
                                        const yLabels = [];
                                        const y1Labels = [];
                                        const chartURLs = [];
                                        const response = await fetch('IM_ServerVsClientCurrentBuild.csv');
                                        const data = await response.text();
                                        const table = data.split('\n');
                    table.forEach(row => {
                                        const column = row.split(',');
                                        const resp = column [0];
                                        yLabels.push(resp);
                                        const labelF = column [1];
                                        y1Labels.push(labelF);
                                        const labelE = column [2];
                                        xLabels.push(labelE);
                                       const linkValue = column [3];
                                       chartURLs.push(linkValue);
                                        console.log(resp,labelF,labelE,linkValue);
                                         });
                                         return { xLabels, yLabels, y1Labels,chartURLs};
                                         }


                                })


