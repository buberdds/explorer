import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../../utils/renderWithProviders'
import { SearchResultsView } from '../'
import { suggestedParsedAccount, suggestedParsedBlock } from '../../../utils/test-fixtures'

describe('SearchResultsView', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2023, 1, 1))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it.todo('unskip tests') // TODO: fix deep links
  it.skip('block should correctly link to transactions', () => {
    renderWithProviders(
      <SearchResultsView
        searchQueries={{
          blockHeight: {
            isLoading: false,
            results: [suggestedParsedBlock],
          },
          txHash: { isLoading: false, results: [] },
          oasisAccount: { isLoading: false, results: [] },
          evmBech32Account: { isLoading: false, results: [] },
        }}
        roseFiatValue={1}
      />,
    )
    expect(screen.getByText('1,396,255')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '10 transactions' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '10 transactions' })).toHaveAttribute(
      'href',
      '/emerald/blocks/1396255#transactions',
    )
  })

  it.skip('account should correctly link to erc-20 tokens', () => {
    renderWithProviders(
      <SearchResultsView
        searchQueries={{
          blockHeight: { isLoading: false, results: [] },
          txHash: { isLoading: false, results: [] },
          oasisAccount: { isLoading: false, results: [] },
          evmBech32Account: { isLoading: false, results: [suggestedParsedAccount] },
        }}
        roseFiatValue={1}
      />,
    )
    expect(screen.getByText('EVM tokens')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '337325.43837 FTP' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '337325.43837 FTP' })).toHaveAttribute(
      'href',
      '/emerald/account/0xBA504818FdD8D3dBA2Ef8fD9B4F4D5c71aD1d1D3/tokens/erc-20#oasis1qpssvkplnlpzdvwxpgmrhf9j5lkyvaylcvujhjhg',
    )
  })
})
