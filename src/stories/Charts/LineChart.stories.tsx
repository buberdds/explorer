import { ComponentMeta, ComponentStory } from '@storybook/react'
import Card from '@mui/material/Card'
import React from 'react'
import { LineChart } from '../../app/components/charts/LineChart'
import { intlDateFormat } from '../../app/utils/dateFormatter'

export default {
  title: 'Example/Charts/LineChart',
  component: LineChart,
} satisfies ComponentMeta<typeof LineChart>

interface TimeDataItem {
  x: Date
  y: number
}

const timeData: TimeDataItem[] = [
  {
    x: new Date('2023-01-01T00:00:00.000Z'),
    y: 5,
  },
  {
    x: new Date('2023-01-02T00:00:00.000Z'),
    y: 30,
  },
  {
    x: new Date('2023-01-03T00:00:00.000Z'),
    y: 50,
  },
  {
    x: new Date('2023-01-04T00:00:00.000Z'),
    y: 43,
  },
  {
    x: new Date('2023-01-05T00:00:00.000Z'),
    y: 20,
  },
  {
    x: new Date('2023-01-06T00:00:00.000Z'),
    y: -20,
  },
  {
    x: new Date('2023-01-07T00:00:00.000Z'),
    y: 30,
  },
]

const Template: ComponentStory<typeof LineChart<TimeDataItem>> = args => {
  return (
    <Card sx={{ width: '500px', height: '300px' }}>
      <LineChart {...args} />
    </Card>
  )
}

export const SampleLineChart = Template.bind({})
SampleLineChart.args = {
  data: timeData,
  dataKey: 'y',
  formatters: {
    data: (value: number) => `${value} TPS`,
    label: (value: string) => intlDateFormat(new Date(value)),
  },
}
