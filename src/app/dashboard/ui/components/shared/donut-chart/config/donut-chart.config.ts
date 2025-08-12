import { EChartsOption } from 'echarts';

export interface ValuesDonutChart {
  left: {
    value: number;
    name: string;
    color: string;
  };
  right: {
    value: number;
    name: string;
    color: string;
  };
}

export const createDonutChartConfig = (): EChartsOption => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: '#000000',
      borderColor: '#000000',
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
      },
      extraCssText: 'border-radius: 8px; padding: 8px 12px;',
      position: 'right',
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: 'Users',
        type: 'pie',
        radius: ['70%', '85%'],
        center: ['50%', '60%'],
        startAngle: 180,
        endAngle: 360,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false, // Desactivar labels
        },
        emphasis: {
          label: {
            show: false, // Desactivar labels en hover también
          },
        },
        labelLine: {
          show: false,
        },
        data: [],
      },
    ],
  };
};

export const createDonutChartLightConfig = ({
  left,
  right,
}: ValuesDonutChart): EChartsOption => {
  const baseConfig = createDonutChartConfig();

  return {
    ...baseConfig,
    series: [
      {
        name: 'Users',
        type: 'pie',
        radius: ['70%', '85%'],
        center: ['50%', '60%'],
        startAngle: 180,
        endAngle: 360,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: left.value,
            name: left.name,
            itemStyle: {
              color: left.color,
            },
          },
          {
            value: right.value,
            name: right.name,
            itemStyle: {
              color: right.color,
            },
          },
        ],
      },
    ],
  };
};

export const createDonutChartDarkConfig = ({
  left,
  right,
}: ValuesDonutChart): EChartsOption => {
  const baseConfig = createDonutChartConfig();

  return {
    ...baseConfig,
    series: [
      {
        name: 'Users',
        type: 'pie',
        radius: ['70%', '85%'],
        center: ['50%', '60%'],
        startAngle: 180,
        endAngle: 360,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: left.value,
            name: left.name,
            itemStyle: {
              color: left.color,
              borderColor: left.color,
              borderWidth: 2,
            },
          },
          {
            value: right.value,
            name: right.name,
            itemStyle: {
              color: right.color,
              borderColor: right.color,
              borderWidth: 2,
            },
          },
        ],
      },
    ],
  };
};
