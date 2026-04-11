/*

    graphs.js

    graph data structure for SNAP!

    written by Gabriel Barnard
    gabriel.h.barnard@vanderbilt.edu

    TODO:
        * finish edge calculations
        * use a Snap! list for the adjacency matrix
        * find way to toggle between undirected graphs and directed graphs
        * find way to incorporate weight functions
        * graphic for graph data type

*/

function allocateMatrix (size) {
    var adjacencyMatrix;
    adjacencyMatrix = [];
    for (var i = 0; i < size; ++i) {
        adjacencyMatrix[i] = []
        for (var j = 0; j < size; ++j)
            adjacencyMatrix[i][j] = 0;
    }
    return adjacencyMatrix;
}

function createFlowMatrix (size, directed = false) {
    var adjacencyMatrix;
    adjacencyMatrix = allocateMatrix(size);

    // populate the fields
    for (var i = 0; i < size; ++i) {
        for (var j = 0; j < size; ++j) {
            if (i === j || i+1 === j) {
                adjacencyMatrix[i][j] = 1;
                if (!directed) 
                    adjacencyMatrix[j][i] = 1;
            }
        }
    }

    return adjacencyMatrix;
}

function createForkMatrix (size, directed = false) {
    var adjacencyMatrix;
    adjacencyMatrix = allocateMatrix(size);

    // source node
    for (var i = 0; i < size - 1; ++i)
        adjacencyMatrix[0][i] = 1;

    // other nodes
    if (!directed)
        for (var i = 1; i < size - 1; ++i)
            adjacencyMatrix[i][0] = 1;
    for (var i = 1; i < size - 1; ++i)
        adjacencyMatrix[i][size - 1] = 1;

    // destination node
    for (var i = 1; i < size; ++i)
        if (!directed || i === size - 1)
            adjacencyMatrix[size - 1][i] = 1;

    return adjacencyMatrix
}

var Graph;

function Graph(list, type) {
    var contents;
    var size;
    var adjacencyMatrix;

    // create the adjacency matrix
    contents = list.contents;
    size = contents.length;
    if (type === 'directed flow') 
        adjacencyMatrix = createFlowMatrix(size, true);
    else if (type === 'directed fork')
        adjacencyMatrix = createForkMatrix(size, true);

    this.src = contents;
    this.size = size;
    this.adjacencyMatrix = adjacencyMatrix;
}

Graph.prototype.toString = function () {
    var returnString;
    var src, dst;

    returnString = '';
    for (var i = 0; i < this.size; ++i) {
        for (var j = 0; j < this.size; ++j) {
            if (i !== j && this.adjacencyMatrix[i][j] === 1) {
                src = this.src[i].toString();
                dst = this.src[j].toString();
                returnString += `${src} --> ${dst}\n`;
            }
        }
    }

    return returnString;
}

Graph.prototype.getEdges = function () {
    var edges;

    edges = [];
    for (var i = 0; i < this.size; ++i) {
        for (var j = 0; j < this.size; ++j) {
            if (i !== j && this.adjacencyMatrix[i][j] === 1) {
                // check if the src or dst is a graph
                if (this.src[i] instanceof Graph) {
                    var lastElement = this.src[i].getLastElement();         
                }
                src = this.src[i].toString();
                dst = this.src[j].toString();
                edges.push(new List([src, dst]))
            }
        }
    }           

    return new List(edges)
}

Graph.prototype.getLastElement = function () {
    return 0;
}
