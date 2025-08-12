import { EChartsOption } from 'echarts';

export interface RadarChartData {
  name: string;
  value: number;
}

export interface RadarChartConfig {
  data: RadarChartData[];
  maxValue?: number;
}

// Configuración base común para ambos modos
export const createBaseRadarChartConfig = (): EChartsOption => {
  return {
    title: {
      show: false,
    },
    tooltip: {
      show: false,
    },
    radar: {
      radius: '70%',
      center: ['50%', '50%'],
      startAngle: 180,
      splitNumber: 5,
      splitLine: {
        lineStyle: {
          width: 1,
        },
      },
      splitArea: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          width: 1,
        },
      },
    },
  };
};

// Función para crear configuración en modo claro
export const createRadarChartLightConfig = (): EChartsOption => {
  const baseConfig = createBaseRadarChartConfig();

  return {
    ...baseConfig,
    radar: {
      ...baseConfig.radar,
      axisName: {
        color: '#333',
        fontSize: 11,
        rich: {
          value: {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#333',
            padding: [3, 0, 0, 0],
          },
        },
      },
      splitLine: {
        lineStyle: {
          color: ['#e0e0e0'],
          width: 1,
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#e8e8ff', '#e8e8ff', '#e8e8ff', '#e8e8ff', '#f2f2ff'],
        },
      },
      axisLine: {
        lineStyle: {
          color: '#e0e0e0',
        },
      },
    },
    series: [
      {
        ...baseConfig.series,
        data: [],
      },
    ],
  };
};

// Función para crear configuración en modo oscuro
export const createRadarChartDarkConfig = (): EChartsOption => {
  const baseConfig = createBaseRadarChartConfig();

  return {
    ...baseConfig,
    radar: {
      ...baseConfig.radar,
      axisName: {
        color: '#FFFFFF99',
        rich: {
          value: {
            color: '#ffffff',
            padding: [3, 0, 0, 0],
            align: 'center',
          },
        },
      },
      splitLine: {
        lineStyle: {
          color: ['#696FFB14'],
          width: 1,
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#303272', '#303272', '#303272', '#303272', '#282a5f'],
        },
      },
      axisLine: {
        lineStyle: {
          color: '#5e63e0',
        },
      },
    },
  };
};

/**
 * Crea la configuración completa para el gráfico radar.
 *
 * @param data - Array de objetos RadarChartData que contienen los valores a graficar.
 * @param config - Configuración base para el gráfico.
 * @returns Configuración completa para el gráfico radar.
 */
export const createRadarChartConfig = (
  data: RadarChartData[],
  config: EChartsOption,
): EChartsOption => {
  const maxValue = calculateMaxValue(data);

  return {
    ...config,
    radar: {
      ...config.radar,
      axisName: {
        formatter: (name?: string) => {
          if (!name) return '';
          const values = data.map((item) => item.value);
          const regions = data.map((item) => item.name);
          const index = regions.indexOf(name);
          return `${name}\n{value|${values[index]}}`;
        },
        color: '#333',
        fontSize: 11,
        rich: {
          value: {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#333',
            padding: [3, 0, 0, 0],
          },
        },
      },
      indicator: data.map((item) => ({
        name: item.name,
        max: maxValue, // Usar el mismo valor máximo para todos los indicadores
      })),
    },
    series: [
      {
        name: 'Sales by Region',
        type: 'radar',
        data: [
          {
            value: [...data.map((item) => item.value)],
            itemStyle: {
              color: '#3b82f6',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#696FFB52',
                  },
                  {
                    offset: 1,
                    color: '#696FFB',
                  },
                ],
              },
            },
            lineStyle: {
              color: '#696FFB',
              width: 2,
            },
            symbol: 'circle',
            symbolSize: 5,
          },
        ],
      },
    ],
  };
};

/**
 * Calcula el valor máximo para el gráfico radar a partir de los datos proporcionados.
 * Multiplica el valor máximo encontrado por 1.2 para dar un margen visual en el gráfico.
 *
 * @param data - Array de objetos RadarChartData que contienen los valores a graficar.
 * @returns El valor máximo ajustado para usar como límite superior en el radar chart.
 */
export const calculateMaxValue = (data: RadarChartData[]): number => {
  return Math.max(...data.map((item) => item.value)) * 1.2;
};
