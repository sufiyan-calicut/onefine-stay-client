import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DonutChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.value);
  }, [props]);

  return (
    <ResponsiveContainer width={500} height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey='sales'
          nameKey='day'
          cx='50%'
          cy='50%'
          outerRadius={100}
          innerRadius={60}
          fill='#8884d8'
          paddingAngle={0}
          startAngle={90}
          endAngle={-270}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
