import React from 'react';
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Home = () => {
  const dataBarChart = [
    { name: 'Category A', value: 300 },
    { name: 'Category B', value: 500 },
    { name: 'Category C', value: 200 },
    { name: 'Category D', value: 400 },
    { name: 'Category E', value: 600 },
  ];

  const dataPieChart = [
    { name: 'Data 1', value: 400 },
    { name: 'Data 2', value: 300 },
    { name: 'Data 3', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', width:"100%" }}>
      {/* Bar Chart */}
      <div>
        <ResponsiveContainer width={500} height={300}>
          <BarChart
            data={dataBarChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap={50}
          >
            <Bar dataKey="value" fill="#8884d8"/>
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div>
        <ResponsiveContainer width={300} height={300}>
          <PieChart width={300} height={300}>
            <Pie
              data={dataPieChart}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {dataPieChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
