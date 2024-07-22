import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, To } from 'react-router-dom'

export type TablePaginationProps = {
  compact?: boolean
  linkToPage: (page: number) => To
  rowsPerPage: number
  selectedPage: number
  totalCount: number | undefined
  isTotalCountClipped: boolean | undefined
}

export const TablePagination: FC<TablePaginationProps> = ({
  compact,
  selectedPage,
  linkToPage,
  rowsPerPage,
  totalCount,
  isTotalCountClipped,
}) => {
  const { t } = useTranslation()

  if (!totalCount) {
    return null
  }
  const totalCountBoundary = totalCount + (selectedPage - 1) * rowsPerPage
  const numberOfPages = Math.ceil(totalCountBoundary / rowsPerPage)

  if (numberOfPages <= 1) {
    return null
  }

  return (
    <Pagination
      count={numberOfPages}
      page={selectedPage}
      renderItem={item => (
        <PaginationItem
          slots={{
            first: () => <>{t('pagination.first')}</>,
            last: () => <>{isTotalCountClipped ? '…' : t('pagination.last')}</>,
          }}
          component={Link}
          to={item.page == null ? '' : linkToPage(item.page)}
          preventScrollReset={true}
          {...item}
          sx={isTotalCountClipped && item.type === 'last' ? { pointerEvents: 'none', cursor: 'default' } : {}}
        />
      )}
      showFirstButton
      showLastButton
      size="small"
      sx={{ marginTop: compact ? 2 : 5 }}
    />
  )
}
