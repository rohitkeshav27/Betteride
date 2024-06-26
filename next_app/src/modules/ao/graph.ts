export const name = 'Graph'
export const src = `function NewGraph(options)
    local graph = {
        data = {

        },
        layout = {
            title = "Simple Graph",
            xaxis = { title = "x-axis" },
            yaxis = { title = "y-axis" }
        }
    }
    return graph
end

function SetTitle(graph, title)
    graph.layout.title = title
end

function SetXLabel(graph, title)
    graph.layout.xaxis.title = title
end

function SetYLabel(graph, title)
    graph.layout.yaxis.title = title
end

function AddLine(graph, x1, y1, x2, y2, name, color)
    if type(x1) ~= "number" or type(y1) ~= "number" or type(x2) ~= "number" or type(y2) ~= "number" then
        error("x1, y1, x2, y2 must be integers")
    end
    local data = {
        x = { x1, x2 },
        y = { y1, y2 },
        type = "scatter",
        mode = "lines"
    }
    if name then
        data.name = name
    end
    if color then
        data.line = { color = color }
    end
    table.insert(graph.data, data)
end

function AddBar(graph, x, y, name, color)
    if type(x) ~= "number" or type(y) ~= "number" then
        error("x and y must be integers")
    end
    local data = {
        x = {x},
        y = {y},
        type = "bar"
    }
    if name then
        data.name = name
    end
    if color then
        data.marker = { color = color }
    end
    table.insert(graph.data, data)
end

function AddPoint(graph, x, y, name, color)
    if type(x) ~= "number" or type(y) ~= "number" then
        error("x and y must be integers")
    end
    local data = {
        x = {x},
        y = {y},
        type = "scatter"
    }
    if name then
        data.name = name
    end
    if color then
        data.marker = { color = color }
    end
    table.insert(graph.data, data)
end

function ShowGraph(graph)
    local json = require("json")
    local x = graph
    x.__render_gfx = true
    return json.encode(x)
end
`