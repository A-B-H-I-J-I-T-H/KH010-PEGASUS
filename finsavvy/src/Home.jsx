import React, { useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,Sector } from 'recharts';

function Home() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
      sectorId: 1
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
      sectorId: 1
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
      sectorId: 2
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
      sectorId: 2
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
      sectorId: 3
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
      sectorId: 3
    },
  ];
  const dataPieChart = [
    { name: 'Data 1', value: 400, sectorId: 1 },
    { name: 'Data 2', value: 300, sectorId: 2 },
    { name: 'Data 3', value: 200, sectorId: 3 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  const [selectedSector, setSelectedSector] = useState(null);
  const [hoveredSector, setHoveredSector] = useState(null);

  const handlePieClick = (entry) => {
    setSelectedSector(entry.sectorId);
  };
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius-1}
          outerRadius={outerRadius + 20}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        
      </g>
    );
  };
  
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon'/>
          </div>
          <h1>300</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon'/>
          </div>
          <h1>12</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon'/>
          </div>
          <h1>33</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ALERTS</h3>
            <BsFillBellFill className='card_icon'/>
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className='charts'>
        {selectedSector == null && (
          <div>
            <h1>WELCOME</h1>
            <h2>ABHIJITH S</h2>
          </div>
        )}

      {selectedSector !== null && (
          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              width={500}
              height={300}
              data={data.filter(entry => entry.sectorId === selectedSector)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barCategoryGap={80}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={500} height={300}>
            <Tooltip />
            <Legend />
            <Pie
              data={dataPieChart}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={100}
              innerRadius={50}
              fill='#8884d8'
              onClick={handlePieClick}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
            >
              {dataPieChart.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={selectedSector === entry.sectorId ? 'none' : 'white'}
                  strokeWidth={selectedSector === entry.sectorId ? 0 : 1}
                  onMouseEnter={() => {
                    onPieEnter();
                  }}
                  onMouseLeave={() => setHoveredSector(null)}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        
      </div>
    </main>
  );
}

export default Home;
