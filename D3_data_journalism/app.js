// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 550;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from  data.csv
d3.csv("data.csv").then(function(stateData) {
  
  //Convert the string values
  stateData.forEach(function(data) {
    data.id = +data.id;
    data.poverty = +data.poverty;
    data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    data.ageMoe = +data.ageMoe;
    data.income = +data.income;
    data.incomeMoe = +data.incomeMoe;
    data.healthcare = +data.healthcare;
    data.healthcareLow = +data.healthcareLow;
    data.healthcareHigh = +data.healthcareHigh;
    data.obesity = +data.obesity;
    data.obesityLow = +data.obesityLow;
    data.obesityHigh = +data.obesityHigh;
    data.smokes = +data.smokes;
    data.smokesLow = +data.smokesLow;
    data.smokesHigh = +data.smokesHigh;

    
  });


   //set the x scale 
    const xScale = d3.scaleLinear() 
    .domain(d3.extent(stateData, d => d.age))
    .range([0, chartWidth]);

//set the y sclae
    const yScale = d3.scaleLinear()
    .domain([4,d3.max(stateData, d => d.smokes)])
    .range([chartHeight, 0]);

  
   //set the axis  
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);



  chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(xAxis);
  chartGroup.append("g").call(yAxis);


//Draw the scatter plot of data
chartGroup.selectAll("circle")
.data(stateData)
.enter()
.append("circle")
.attr("cx",function(d, i) {
  return xScale(d.age);
})
.attr("cy",function(d, i) {
  return yScale(d.smokes);
})
.attr("r", "20")
.classed("stateCircle", true);

chartGroup.append("g")
.selectAll('text')
.data(stateData)
.enter()
.append("text")
.attr("x",function(d, i) {
  return xScale(d.age);
})
.attr("y",function(d, i) {
  return yScale(d.smokes);
})
.attr("stroke", "white")
.attr("text-anchor", "middle")
.attr("font-size", "12px")
.attr("font-family", "sans-serif")
.text(d=>d.abbr);

chartGroup.append("text")
.attr("transform", `translate(${chartWidth / 2}, ${chartHeight+25})`)
.attr("text-anchor", "middle")
.text("Age(Median)")
.attr("font-size", "16px")
.attr("fill", "black")
.style("font-weight", "bold");


chartGroup.append("text")
.attr("y", 0 - ((chartMargin.left / 2) + 2))
.attr("x", 0 - (chartHeight / 2))
.attr("text-anchor", "middle")
.text("Smoker(%)")
.attr("font-size", "16px")
.attr("fill", "black")
.style("font-weight", "bold")
.attr("transform", "rotate(-90)");
       



});



