import React, { useEffect, useState, MouseEvent, useRef } from 'react';
import { Chart as ChartJS, 
LinearScale,
CategoryScale,
BarElement,
PointElement,
LineElement,
Legend,
Tooltip} from 'chart.js';
import type { InteractionItem } from 'chart.js';
import { Chart, getElementAtEvent } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import { MONTHS, NAMED_COLORS } from '../utils/utils';
import './DashboardChart.css'

export interface IDashboardChartProps {
    data: {[key: string]: number[]},
    selectedOptions: {[key: string]: string},
    toggleSchool: string,
    showSchool: boolean
}

interface IChartDataSet {
    label: string,
    data: number[],
    borderColor: string,
    pointStyle: string,
    pointRadius: number,
    pointHoverRadius: number,
    pointBackgroundColor: string,
    hoverBackgroundColor: string,
    hidden: boolean,
}
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
  );

function DashboardChart({data, toggleSchool, showSchool, selectedOptions}: IDashboardChartProps) {
    const [labels] = useState(MONTHS);
    const [datasets, setDataSets] = useState<IChartDataSet[]>([]);
    const [options] = useState<any>({
        responsive: true, maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
        }
    });
    const [pointStyle] = useState('circle');
    const [pointRadius] = useState(8);
    const [pointHoverRadius] = useState(10);
    const [pointBackgroundColor] = useState("#ffffff");
    const navigate = useNavigate();

    const chartRef = useRef<ChartJS>(null);
    useEffect(() => {
        buildDataSet();
    },[data]);
    useEffect(() => {
        toggleDataSet();
    },[toggleSchool, showSchool]);
    
    return ( 
        <div className='chart-area'>
            <Chart 
                ref={chartRef}
                type='line'
                data={{labels, datasets: datasets}}
                options={options}
                onClick={onChartClick}
        /> 
        </div>
    );

    function buildDataSet(){
        const datasets = [];
        let schoolIndex = 0;
        for (const label in data){
            datasets.push(
                {
                    label: label,
                    data: data[label],
                    borderColor: NAMED_COLORS[schoolIndex],
                    pointStyle: pointStyle,
                    pointRadius: pointRadius,
                    pointHoverRadius: pointHoverRadius,
                    pointBackgroundColor: pointBackgroundColor,
                    hoverBackgroundColor: NAMED_COLORS[schoolIndex],
                    hidden: false
                }
            )
            schoolIndex++;
        }
        setDataSets(datasets);
    }
    function toggleDataSet(){
        const clonedDataSet = datasets.map((data) => {
            if(data.label === toggleSchool)
                data.hidden = !showSchool;
            return data
        });

        setDataSets(clonedDataSet);
    }
    function onChartClick (event: MouseEvent<HTMLCanvasElement>) {
        const { current: chart } = chartRef;
    
        if (!chart) {
          return;
        }
    
        const clickedElement :InteractionItem[] = getElementAtEvent(chart, event);
        if (!clickedElement.length) return;
        const { datasetIndex, index } = clickedElement[0];
        navigate("/schooldetails", { state: 
            { country: selectedOptions["country"], 
              camp: selectedOptions["camp"],  
              school: datasets[datasetIndex].label,
              month : labels[index],
              lessons : datasets[datasetIndex].data[index]
            }});
    }
}

export default DashboardChart;