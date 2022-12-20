import { FC } from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { TooltipContent, type Formatters } from './Tooltip'

export type BarChartProps = Formatters & {
  data: any[]
  dataKey: string
}

export const BarChart: FC<BarChartProps> = ({ data, dataKey, formatters }) => (
  <ResponsiveContainer width="100%" aspect={4}>
    <RechartsBarChart data={data} margin={{ right: 0, bottom: 0 }}>
      <CartesianGrid vertical={false} stroke="#f0f3f5" />
      <YAxis
        tick={{ fill: '#3333C4', strokeWidth: 0, fontWeight: 600 }}
        axisLine={false}
        tickLine={false}
        type="number"
        padding={{ bottom: 20 }}
      />
      <Tooltip
        cursor={false}
        wrapperStyle={{ outline: 'none' }}
        content={<TooltipContent formatters={formatters} />}
        offset={15}
      />
      <Bar dataKey={dataKey} barSize={12} fill="#3138bc" radius={[10, 10, 0, 0]} />
    </RechartsBarChart>
  </ResponsiveContainer>
)