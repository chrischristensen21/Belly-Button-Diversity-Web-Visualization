
function bellyButton(id) {

  //console.log(id)

  d3.json("samples.json").then((data) => {

    console.log(data)

    let samplesFiltered = data.samples.filter(obj => obj.id == id);

    //console.log(filteredData)

    let otu_ids_OTU = samplesFiltered[0].otu_ids.map(otu => "OTU " + otu);
    let otu_labels = samplesFiltered[0].otu_labels;
    let sample_values = samplesFiltered[0].sample_values;
    let otu_ids = samplesFiltered[0].otu_ids;
    //console.log(otu_ids);
    //console.log(otu_labels);
    //console.log(sample_values);

    // For the bar chart just take the first 10
    // Meaning you need to for each of the 3 arrays you need to do .slice(0,10).reverse()
    // For the bar chart, x is going to be the sample_values, y is going to be the otu_ids, and text is going to be
    // otu_labels
    let otu_ids_slice = otu_ids_OTU.slice(0, 10).reverse();
    let otu_labels_slice = otu_labels.slice(0, 10).reverse();
    let sample_values_slice = sample_values.slice(0, 10).reverse();
    //console.log(otu_ids_slice)
    //console.log(otu_labels_slice)
    //console.log(sample_values_slice)
    // Now I have everything to do plotly
    // set up the trace, layout, Plotly.newPlot("bar",yourDataName, yourLayoutName)

    var barTrace = {
      x: sample_values_slice,
      y: otu_ids_slice,
      orientation: 'h',
      type:'bar',
      text: otu_labels
    };
    
    var barData = [barTrace];

    var layout = {
      width: 1000
     }
    Plotly.newPlot('bar', barData, layout); 

    //Now do the bubble chart, but it uses all of the data, also don't need to do the .map
    var bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };
    
    var bubbleData = [bubbleTrace];
    
    var layout = {
      
      showlegend: false,
      height: 600,
      width: 1000
    };
    
    Plotly.newPlot('bubble', bubbleData, layout);

    //Now do the metadata demo panel at sample-metadata
  
   
    let metaDataFiltered = data.metadata.filter(obj => obj.id == id);

    console.log(metaDataFiltered);

    let dataBox = d3.select("#sample-metadata");
    
    dataBox.html("")
    Object.entries(metaDataFiltered[0]).forEach(([key, value]) => {
      
    
      dataBox.append("h5").text(key + ":" + value)
    });
    
    






  })
}

d3.json("samples.json").then((data) => {

  let dropdown = d3.select("#selDataset");

  data.names.forEach((id) => {

    dropdown.append("option").text(id).property("value", id);

  })

  bellyButton(data.names[0])

})


function optionChanged(selectedID) {

  bellyButton(selectedID)
}