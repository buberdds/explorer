import Box from '@mui/material/Box'
import { Meta, StoryFn } from '@storybook/react'
import { SubPageCard } from '../app/components/SubPageCard'
import { TextSkeleton } from '../app/components/Skeleton'
import { ComponentProps } from 'react'

export default {
  title: 'Example/SubPageCard',
} satisfies Meta<any>

const Template: StoryFn<Partial<ComponentProps<typeof SubPageCard>>> = args => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 400px)', gap: 2 }}>
      <SubPageCard title="Title" {...args}>
        <TextSkeleton numberOfRows={3} />
      </SubPageCard>
      <SubPageCard title="Title" subheader="Subheader" {...args}>
        <TextSkeleton numberOfRows={3} />
      </SubPageCard>
      <SubPageCard isLoadingTitle={true} {...args}>
        <TextSkeleton numberOfRows={3} />
      </SubPageCard>
    </Box>
  )
}

export const Featured = {
  render: Template,
  args: {
    featured: true,
  },
}

export const NonFeatured = {
  render: Template,
  args: {
    featured: false,
  },
}

export const Mobile = {
  render: Template,
  args: {
    featured: true,
  },
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iphone6' },
  },
}
