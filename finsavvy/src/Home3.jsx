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
  ];

  const dataPieChart = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
    { name: "Geek-i-knack", students: 200 },
    { name: "Geek-o-mania", students: 1000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {/* Bar Chart */}
      <div>
        <h2>Bar Chart</h2>
        <ResponsiveContainer width={300} height={300}>
          <BarChart
            data={dataBarChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <Bar dataKey="value" fill="#8884d8" />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div>
        <h2>Pie Chart</h2>
        <ResponsiveContainer width={300} height={300}>
          <PieChart width={300} height={300}>
          <Pie
                    data={dataPieChart}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={250}
                    innerRadius={150}
                    fill="green"
                    label={({ name, students }) =>
                        `${name}: ${students}`
                    }
                />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
