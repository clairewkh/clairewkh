data_url = '../../data/samples1.json'

d3.json(data_url).then(function(read_data){
    var data1 = read_data;
    console.log(data1)

    var dropDownMenu = d3.select("#selDataset")
        var id_names = data1[0].names;
        console.log(id_names)

        id_names.forEach((i) => {
            dropDownMenu
            .append("option")
            .text(i)
        });

        dropDownMenu.on("change", drop_func);

        function drop_func() 
        {
            var select_id_names = dropDownMenu.property("value");
            console.log(select_id_names);

            var fil_data = data1[0].samples.filter(item => item.id === select_id_names)
            console.log(fil_data)


            var top10_otu = []
            fil_data[0].otu_ids.slice(0,10).forEach(i => 
            {
                var substring = top10_otu.push(`OTU ${i}`
            )});
            var sample_values1 = fil_data[0].sample_values.slice(0,10);
            var top10_labels = fil_data[0].otu_labels.slice(0,10);

        
            console.log(top10_otu)

            //Bar Chart
            var bar_data = 
            [{
                type: 'bar',
                x: sample_values1,
                y: top10_otu,
                text: top10_labels,
                mode: 'markers',
                orientation: 'h',
                marker:
            {
                color: '#FA8072',
                opacity: 0.8,
            }
            }]; 

            var bar_layout = 
            {
                yaxis: {autorange: 'reversed'},
                opacity: 0.6,
                title: "Top 10 OTUs"
            }; 

            Plotly.newPlot('bar', bar_data, bar_layout);

            //Demographics Info
            var fil_meta = data1[0].metadata.filter(item=>item.id === parseInt(select_id_names));
            console.log(fil_meta)

            var demoMetadata = d3.select('#sample-metadata');
            demoMetadata.html("");
            
            demoMetadata.append('p').text(`ID: ${fil_meta[0].id}`);
            demoMetadata.append('p').text(`Ethnicity: ${fil_meta[0].ethnicity}`);
            demoMetadata.append('p').text(`Gender: ${fil_meta[0].gender}`);
            demoMetadata.append('p').text(`Age: ${fil_meta[0].age}`);
            demoMetadata.append('p').text(`Location: ${fil_meta[0].location}`);
            demoMetadata.append('p').text(`BBtype: ${fil_meta[0].bbtype}`);
            demoMetadata.append('p').text(`Wfreq: ${fil_meta[0].wfreq}`);

            //Bubble Graph
            var sample_val = fil_data[0].sample_values;
            var otuIDS = fil_data[0].otu_ids
            var bub_label = fil_data[0].otu_labels
            console.log(bub_label) //Check if it is working or not

            var bub_graph = [{
                x: otuIDS,
                y:sample_val,
                text: bub_label,
                mode:"markers",
                marker:{
                    size:sample_val,
                    color:otuIDS,
                    opacity: 0.9,
                    colorscale:[
                        [0, '#9999CC'],
                        [0.2, '#CC66CC'],
                        [0.2, '#CCCCFF'],
                        [0.4, '#9900FF'],
                        [0.4, '#99CCFF'],
                        [0.6, '#66CCFF'],
                        [0.6, '#6699FF'],
                        [0.8, '#66FFCC'],
                        [0.8, '#99ff33'],
                        [1.0, '#009999'],
                    ]
                }
            }]
            var bub_layout = {
                title: {
                    text: `Test Subject No. ${select_id_names} Belly Button Biodiversity`,
                    font: {
                        family: 'Arial',
                        size: 24,
                        color: 'black'
                    },
                    height:700,
                    width:1400,
                    xaxis:{
                        tickcolor: "red"
                    }
            }}
            Plotly.newPlot("bubble", bub_graph, bub_layout)
            //Gauge-Bonus
            
            var data = [
                {
                    domain: { x: [0, 1], y: [0, 1] },
                    type: 'indicator',
                    mode: 'gauge+number',
                    value: fil_meta[0].wfreq,
                    title: {
                        text: 'Belly Button Washing Frequency <br> Scrubs per Week</i>',
                        font: { size: 26, color: 'Green'}
                    },
                    gauge: {
                        axis: { range: [null, 9] },
                        bar: { color: '#FFFACD', thickness: 0.4 },
                        bordercolor: 'gray',
            
                        steps: [
                            { range: [0, 1], color: '#D8BFD8' },
                            { range: [1, 2], color: '#DDA0DD' },
                            { range: [2, 3], color: '#DA70D6' },
                            { range: [3, 4], color: '#FF00FF'},
                            { range: [4, 5], color: '#BA55D3' },
                            { range: [5, 6], color: '#9932CC' },
                            { range: [6, 7], color: '#9500D3' },
                            { range: [7, 8], color: '#8B008B' },
                            { range: [8, 9], color: '#800080' }
                        ],
                    },
                },
            ];
            // Layout 
            var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
            
            Plotly.newPlot('gauge', data, layout);
                }
        })

















