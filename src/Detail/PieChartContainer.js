import { useMemo } from "react";
import { Pie, PieChart } from "recharts";
import { useLang } from "../helpers/LangContext";
import { useSize } from "../helpers/SizeContext";

function PieChartContainer(props) {
  const { getLsi } = useLang()
  const {itemList} = props
  const { width } = useSize()

  const targetWidth = width - 100
  const RADIAN = Math.PI / 180;
  const indexDone = 0;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        { index === indexDone ? getLsi("detailItemCompleate") : getLsi("detailItemNotCompleate")} {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const { valueDone, valueNotDone } = useMemo(() => {
    const notDone = itemList.filter(p => !p.done).length;
    const done = itemList.filter(p => p.done).length;
    return { valueDone: done, valueNotDone: notDone }
  })

  return <PieChart width={targetWidth} height={320}>
    <Pie
      data={[{ name: 'Done', value: valueDone }, { name: 'NotDone', value: valueNotDone }]}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={150}
      fill="#8884d8"
      label={renderCustomizedLabel} />
  </PieChart>
}

export default PieChartContainer;