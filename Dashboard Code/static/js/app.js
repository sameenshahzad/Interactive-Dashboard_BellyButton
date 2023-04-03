
// Load 'samples.json' directly using a single line of command/code
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
  console.log(data);

  // Get the list of subject IDs from the data
  var subjectIDs = data.names;

  // Populate the dropdown menu with the list of subject IDs
  var select = d3.select("#selDataset");
  subjectIDs.forEach(function(subjectID) {
    select.append("option").text(subjectID);
  });

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
  function plotTop10OTUs(subjectID) {
    // Get the data for the selected subject ID
    var subjectData = data.samples.filter(function(sample) {
      return sample.id === subjectID;
    })[0];

    // Get the top 10 sample values, otu_ids, and otu_labels
    var sampleValues = subjectData.sample_values.slice(0, 10).reverse();
    var otuIDs = subjectData.otu_ids.slice(0, 10).map(id => "OTU " + id).reverse();

    // Create the trace for the horizontal bar chart
    var trace = {
      x: sampleValues,
      y: otuIDs,
      type: "bar",
      orientation: "h",
      marker: {
        color: sampleValues,
        colorscale: "Inferno",     //other option:"Plasma", "Inferno", "Magma","Cividis", "Turbo","Rainbow"
        line: {
          color: "dark blue",
          width: 1.5
        }
      }
    };

    // Create the layout for the horizontal bar chart
    var layout = {
      title: "Top 10 OTUs Found in the Sample",
      xaxis: {title: "Sample Values"},
      yaxis: {title: "OTU IDs"}
    };

    // Plot the horizontal bar chart
    Plotly.newPlot("bar", [trace], layout);
  }

  // Call the plotTop10OTUs function with the first subject ID
  plotTop10OTUs(subjectIDs[0]);
});

// --------------------------------------------------------
// Create a bubble chart that displays each sample.

// Use otu_ids for the x values, sample_values for the y values, sample_values for the marker size, otu_ids for the marker colors, 
// otu_labels for the text values.

d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
  
  // Get the first sample data
  var sampleData = data.samples[0];

  // Get the x, y, size, and color values
  var xValues = sampleData.otu_ids;
  var yValues = sampleData.sample_values;
  var sizeValues = sampleData.sample_values;
  var colorValues = sampleData.otu_ids;
  var textValues = sampleData.otu_labels;

  // Create the trace for the bubble chart
  var trace = {
    x: xValues,
    y: yValues,
    mode: "markers",
    marker: {
      size: sizeValues,
      color: colorValues,
      colorscale: "Plasma"   //other option:"Plasma", "Inferno", "Magma","Cividis", "Turbo","Viridis"
    },
    text: textValues
  };

  // Create the layout for the bubble chart
  var layout = {
    title: "OTU IDs and Sample Values",
    xaxis: {title: "OTU IDs"},
    yaxis: {title: "Sample Values"}
  };

  // Plot the bubble chart
  Plotly.newPlot("bubble", [trace], layout);
});



// Display 

d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {

// Get the metadata for the first sample
var sampleMetadata = data.metadata[0];

// Get the metadata keys
var metadataKeys = Object.keys(sampleMetadata);

// Get the metadata values
var metadataValues = Object.values(sampleMetadata);

// Create an empty panel element to display the metadata
var metadataPanel = d3.select("#sample-metadata");

// Loop through the metadata keys and values and add them to the panel
for (var i = 0; i < metadataKeys.length; i++) {
metadataPanel.append("h6").text(metadataKeys[i] + ": " + metadataValues[i]);
}
});


// Update all the plots when a new sample is selected.
// Call the plotTop10OTUs and updateMetadata functions whenever the value of the dropdown menu changes
function optionChanged(subjectID) {
  plotTop10OTUs(subjectID);
  updateMetadata(subjectID);
  updateBubblePlot(subjectID);
}