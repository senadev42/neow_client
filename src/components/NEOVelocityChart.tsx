import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { transformData } from '../utils/tableutils';
import { NearEarthObjectsData } from '../types/neotypes';

const NEOVelocityChart = ({ data }: { data: NearEarthObjectsData })=> {
 const chartData = transformData(data);

 return (
    <BarChart
      width={1200}
      height={500}
      data={chartData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 50,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" interval={0} angle={-45} textAnchor="end" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="y" fill="#14b8a6" />
    </BarChart>
 );
};

export default NEOVelocityChart;
