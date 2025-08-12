import { EChartsOption } from 'echarts';

export const createBaseLineChartConfig = (): EChartsOption => {
  return {
    title: {
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#000',
      textStyle: {
        color: '#fff',
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#00000099',
          type: 'dashed',
          width: 1,
        },
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
      backgroundColor: '#f5f5f5',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 400,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#696FFB1F', '#696FFB0A'],
        },
      },
    },
    yAxis: {
      type: 'value',
      position: 'right',
      min: 0,
      max: 30000,
      interval: 10000,
      axisLabel: {
        formatter: function (value: number) {
          if (value === 0) return '$0';
          if (value === 10000) return '$10k';
          if (value === 20000) return '$20k';
          return `$${value / 1000}k`;
        },
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 400,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        data: [],
        lineStyle: {
          color: '#696efa',
          width: 3,
        },
        itemStyle: {
          color: '#ffffff',
          borderColor: '#696efa',
          borderWidth: 2,
        },
        symbol: 'circle',
        symbolSize: 8,
        smooth: false,
      },
      {
        name: 'Target',
        type: 'line',
        data: [],
        lineStyle: {
          color: '#ff7f0e',
          width: 3,
        },
        itemStyle: {
          color: '#ffffff',
          borderColor: '#ff7f0e',
          borderWidth: 2,
        },
        symbol: 'circle',
        symbolSize: 8,
        smooth: false,
      },
    ],
  };
};
