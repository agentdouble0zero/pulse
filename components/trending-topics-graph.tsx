'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Topic {
  id: string
  group: number
  value: number
}

interface Link {
  source: string
  target: string
  value: number
}

interface GraphData {
  nodes: Topic[]
  links: Link[]
}

const sampleData: GraphData = {
  nodes: [
    { id: "Technology", group: 1, value: 20 },
    { id: "AI", group: 1, value: 15 },
    { id: "Blockchain", group: 1, value: 10 },
    { id: "Politics", group: 2, value: 18 },
    { id: "Climate Change", group: 3, value: 12 },
    { id: "Health", group: 4, value: 14 },
    { id: "COVID-19", group: 4, value: 8 },
    { id: "Sports", group: 5, value: 10 },
  ],
  links: [
    { source: "Technology", target: "AI", value: 1 },
    { source: "Technology", target: "Blockchain", value: 1 },
    { source: "AI", target: "Health", value: 1 },
    { source: "Politics", target: "Climate Change", value: 1 },
    { source: "Health", target: "COVID-19", value: 1 },
  ]
}

export function TrendingTopicsGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = 600
    const height = 400

    svg.attr('width', width).attr('height', height)

    const simulation = d3.forceSimulation(sampleData.nodes)
      .force("link", d3.forceLink(sampleData.links).id((d: any) => d.id))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))

    const link = svg.append("g")
      .selectAll("line")
      .data(sampleData.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value))

    const node = svg.append("g")
      .selectAll("circle")
      .data(sampleData.nodes)
      .join("circle")
      .attr("r", (d) => 5 + d.value / 2)
      .attr("fill", "#40F8FF")

    const text = svg.append("g")
      .selectAll("text")
      .data(sampleData.nodes)
      .join("text")
      .text((d) => d.id)
      .attr("font-size", "10px")
      .attr("dx", 12)
      .attr("dy", 4)
      .attr("fill", "white")

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y)

      text
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y)
    })

    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <div className="bg-[#001166] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Trending Topics</h2>
      <svg ref={svgRef} className="w-full h-[400px]" />
    </div>
  )
}

