import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, XAxis, YAxis } from "recharts";
import { useLang } from "../helpers/LangContext";
import { Tooltip } from "bootstrap";
import { useSize } from "../helpers/SizeContext";

function ChartContainer(props) {
  const { getLsi } = useLang()
  const { listItems } = props
  const { width } = useSize()

  const maxWidth = width - 140
  var targetWidth = 175 * listItems.length
  if (targetWidth > maxWidth) {
    targetWidth= maxWidth
  }
  const data = useMemo(() => {
    return listItems.map(p => { return { name: p.name, done: p.doneParts, notdone: p.totalParts - p.doneParts } })
  }, [listItems])

  return <>
    <BarChart width={targetWidth} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      {/* <Tooltip /> */}
      <Legend />
      <Bar dataKey="done" fill="#8884d8" />
      <Bar dataKey="notdone" fill="#82ca9d" />
    </BarChart>
  </>
}

export default ChartContainer;