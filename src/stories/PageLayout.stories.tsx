import { Meta, StoryFn } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { EmptyState } from '../app/components/EmptyState'
import { PageLayout } from '../app/components/PageLayout'

export default {
  title: 'Example/PageLayout',
  component: PageLayout,
  decorators: [withRouter],
} satisfies Meta<typeof PageLayout>

const Template: StoryFn<typeof PageLayout> = args => (
  <PageLayout {...args}>
    <EmptyState title="EmptyState" description="EmptyState" />
  </PageLayout>
)

const emeraldRoute = {
  routePath: '/:layer',
  routeParams: { layer: 'emerald' },
}

export const Emerald = {
  render: Template,
  parameters: {
    layout: 'fullscreen',
    reactRouter: emeraldRoute,
  },
}

export const EmeraldIpad = {
  render: Template,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'ipad' },
    reactRouter: emeraldRoute,
  },
}

export const EmeraldMobile = {
  render: Template,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iphone6' },
    reactRouter: emeraldRoute,
  },
}

const searchRoute = {
  routePath: '/search',
}

export const Search = {
  render: Template,
  parameters: {
    layout: 'fullscreen',
    reactRouter: searchRoute,
  },
}

export const SearchIpad = {
  render: Template,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'ipad' },
    reactRouter: searchRoute,
  },
}

export const SearchMobile = {
  render: Template,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iphone6' },
    reactRouter: searchRoute,
  },
}
