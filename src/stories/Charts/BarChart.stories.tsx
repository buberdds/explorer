import { ComponentMeta, Story } from '@storybook/react'
import Box from '@mui/material/Box'
import React from 'react'
import { intlDateFormat } from '../../app/utils/dateFormatter'
import { BarChart } from '../../app/components/charts/BarChart'

export default {
  title: 'Example/Charts/BarChart',
  component: BarChart,
} as ComponentMeta<typeof BarChart>

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

const Template: Story<typeof BarChart> = args => {
  return (
    <Box sx={{ width: '500px' }}>
      <BarChart<TimeDataItem> data={[]} dataKey={'y'} {...args} />
    </Box>
  )
}

export const SampleBarChart = Template.bind({})
SampleBarChart.args = {
  data: timeData,
  dataKey: 'y',
  formatters: {
    data: (value: number) => `${value} TPS`,
    label: (value: string) => intlDateFormat(new Date(value)),
  },
}
