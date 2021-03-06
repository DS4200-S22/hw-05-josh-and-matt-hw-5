// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;

// Append svg object to the body of the page to house Scatterplot1
const svg1 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

const svg2 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 


const svg3 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

// Initialize brush for Scatterplot1 and points. We will need these to be global. 
let brush1; 
let brush2; 
let myCircles1;
let myCircles2; 
let bars;

// Define color scale
const color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica"])
                .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {
  
  // We will need scales for all of the following charts to be global
  let x1, y1, x2, y2, x3, y3;  

  // We will need keys to be global
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    xKey1 = "Sepal_Length";
    yKey1 = "Petal_Length";

    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create X scale
    x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg1.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey1)
      );

    // Finx max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create Y scale
    y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg1.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey1)
      );

    // Add points
    myCircles1 = svg1.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x1(d[xKey1]))
                              .attr("cy", (d) => y1(d[yKey1]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    brush1 = d3.brush()

    svg1
    .call( brush1                
      .extent( [ [0,0], [width,height] ] ) 
      .on("start brush", updateChart1)
    )

  }

  {
    xKey2 = "Sepal_Width";
    yKey2 = "Petal_Width";

    // Find max x
    let maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // Create X scale
    x2 = d3.scaleLinear()
                .domain([0,maxX2])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x2))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey2)
      );

    // Finx max y 
    let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // Create Y scale
    y2 = d3.scaleLinear()
                .domain([0, maxY2])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y2)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey2)
      );

    // Add points
    myCircles2 = svg2.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x2(d[xKey2]))
                              .attr("cy", (d) => y2(d[yKey2]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);


    // creates and adds a brush for the second scatterplot.
    brush2 = d3.brush();
    svg2
    .call( brush2         
      .extent( [ [0,0], [width,height] ] )
      .on("start brush", updateChart2) 
    );
  }

  {
    // Hardcoded barchart data
    const data1 = [
      {Species: 'setosa', occurance: 50},
      {Species: 'versicolor', occurance: 50},
      {Species: 'virginica', occurance: 50}
    ];

    // Find max y value to plot  
    let maxY1 = d3.max(data1, function(d) { return d.occurance; });

    // Create y scale   
    let yScale1 = d3.scaleLinear()
                .domain([0,maxY1])
                .range([height-margin.bottom,margin.top]); 

    // Create x scale
    let xScale1 = d3.scaleBand()
                .domain(d3.range(data1.length))
                .range([margin.left, width - margin.right])
                .padding(0.1); 

    // Add y axis to webpage 
    svg3.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) 
      .call(d3.axisLeft(yScale1)) 
      .attr("font-size", '20px'); 

    // Add x axis to webpage  
    svg3.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(xScale1) 
                .tickFormat(i => data1[i].Species))  
        .attr("font-size", '20px');  
  

    // Add bars to the webpage, bind events needed for tooltips 
    bars = svg3.selectAll(".bar") 
      .data(data1) 
      .enter()  
      .append("rect") 
        .attr("id", (data1) => data1.Species)
        .attr("x", (data1,i) => xScale1(i)) 
        .attr("y", (data1) => yScale1(data1.occurance)) 
        .attr("height", (data1) => (height - margin.bottom) - yScale1(data1.occurance)) 
        .attr("width", xScale1.bandwidth()) 
        .style("fill", (data1) => color(data1.Species))
        .style("opacity", 0.5)
  }

  // Call to removes existing brushes 
  function clear() {
      svg1.call(brush1.move, null);
      svg1.call(brush2.move, null);
  }

  // Call when Scatterplot1 is brushed 
  function updateChart1(brushEvent) {
      const allIDs = new Set();
    
      extent = brushEvent['selection']

      // selects and borders all nodes brushed in the first scatterplot.
      myCircles1.classed("selected", function(d){ const brushed = isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]));
        if (brushed){
          allIDs.add(d.id);
        }
         return brushed});

      // highlights all coorisponding nodes in the second scatterplot.
      myCircles2.classed("selected", function(d){ return allIDs.has(d.id) } )
  }

  // Call when Scatterplot2 is brushed 
  function updateChart2(brushEvent) {

    const allIDs = new Set();
    const selectedSpec = new Set();

    extent = brushEvent['selection']
    
    //  selects all the nodes in the second scatter plot, keeps track of their ID and selected species.
    myCircles2.classed("selected", function(d){ const brushed = isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]));
      if (brushed){
        allIDs.add(d.id);
       selectedSpec.add(d.Species)
      }
       return brushed});


    // highlights all coorisponding nodes in scatter plot 1.
    myCircles1.classed("selected", function(d){ return allIDs.has(d.id) } )

    // highlights the corrisponding species represented in the bar chart.
    bars.classed("selected", function(d){ console.log(d.Species); return selectedSpec.has(d.Species) } )
  }

    //Finds dots within the brushed region
    function isBrushed(brush_coords, cx, cy) {
      if (brush_coords === null) return;

      var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    }
});
