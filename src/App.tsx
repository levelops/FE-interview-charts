import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import rawData from "./tickets.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// Components
import Filter from './components/Filter';

function App() {
  const [chartData, setChartData] = useState<Array<any>>([]);
  
  const filterData = (tickets:any) => {
    return tickets.filter((data:any)=> {
      // Do the filtering here


      return true;
    });
  }

  useEffect(() => {
    let dataByAssignee = new Map<string, number>();

    let filteredData = filterData(rawData.records);

    for (let data of filteredData) {
      if (data !== undefined && data.assignee !== undefined) {
        dataByAssignee.set(data.assignee, (dataByAssignee.get(data.assignee) || 1) + 1);
      }
    }
    for (const [assignee, ticketsCount] of dataByAssignee) {
      setChartData(prevState => ([
        ...prevState,
        {assignee, ticketsCount}
      ]));
    }
  }, [rawData.records])

  return (
    <>
      <div className='parent-container'>
        <div className='filters-panel'>
          <Filter filterName='Status' options={[]}/>
          <Filter filterName='Priority' options={[]}/>
          <Filter filterName='Issue type' options={[]}/>
        </div>
        <div className='charts-container'>
          <BarChart
            width={1000}
            height={800}
            data={chartData}
          >
            <XAxis dataKey='assignee' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='ticketsCount' fill='#8884d8' />
          </BarChart>
        </div>
      </div>
    </>

  );
}

export default App;
