import { FC } from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Table, TableCellAlign } from '../../components/Table'
import { TransactionStatusIcon } from '../../components/TransactionStatusIcon'
import { RuntimeTransactionLabel } from '../../components/RuntimeTransactionLabel'
import { TrimLinkLabel } from '../../components/TrimLinkLabel'
import { RuntimeTransaction } from '../../../oasis-indexer/generated/api'
import ArrowIcon, { ArrowDirection } from '../../icons/ArrowIcon'
import { COLORS } from '../../../styles/theme/colors'
import { emeraldRoute } from '../../../routes'

const StyledCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: `-${theme.spacing(5)}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: theme.spacing(5),
  height: theme.spacing(5),
  color: COLORS.eucalyptus,
  backgroundColor: COLORS.lightGreen,
  borderRadius: theme.spacing(5),
  margin: theme.spacing(3),
}))

type TableRuntimeTransaction = RuntimeTransaction & {
  markAsNew?: boolean
}

type TransactionProps = {
  isLoading: boolean
  limit: number
  pagination?: boolean
  transactions?: TableRuntimeTransaction[]
}

export const Transactions: FC<TransactionProps> = ({ isLoading, limit, pagination = true, transactions }) => {
  const { t } = useTranslation()
  const tableColumns = [
    { content: t('common.table.status') },
    { content: t('common.table.hash') },
    { content: t('common.table.block') },
    { content: t('common.table.age') },
    { content: t('common.table.type') },
    { content: t('common.table.from'), width: '150px' },
    { content: t('common.table.to'), width: '150px' },
    { content: t('common.table.txnFee') },
    { align: TableCellAlign.Right, content: t('common.table.value') },
  ]
  const tableRows = transactions?.map(transaction => ({
    key: transaction.hash!,
    data: [
      {
        content: <TransactionStatusIcon success={transaction.success!} />,
        key: 'success',
      },
      {
        content: <TrimLinkLabel label={transaction.hash!} to="transaction" />,

        key: 'hash',
      },
      {
        content: (
          <Link
            component={RouterLink}
            to={`${emeraldRoute}/blocks/${encodeURIComponent(transaction.round!)}`}
          >
            {transaction.round}
          </Link>
        ),
        key: 'round',
      },
      {
        content: '-',
        key: 'age',
      },
      {
        content: <RuntimeTransactionLabel method={transaction.method!} />,
        key: 'type',
      },
      {
        align: TableCellAlign.Right,
        content: (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              pr: 4,
            }}
          >
            <TrimLinkLabel label={transaction.sender_0!} to="account" />
            <StyledCircle>
              <ArrowIcon arrowDirection={ArrowDirection.RIGHT} />
            </StyledCircle>
          </Box>
        ),

        key: 'from',
      },
      {
        content: <TrimLinkLabel label={transaction.to!} to="account" />,
        key: 'to',
      },
      {
        align: TableCellAlign.Right,
        content: t('common.table.valueInRose', { value: transaction.fee_amount }),
        key: 'fee_amount',
      },
      {
        align: TableCellAlign.Right,
        content: t('common.table.valueInRose', { value: transaction.amount }),
        key: 'value',
      },
    ],
    markAsNew: transaction.markAsNew,
  }))

  return (
    <Table
      columns={tableColumns}
      rows={tableRows}
      rowsNumber={limit}
      name={t('transactions.latest')}
      isLoading={isLoading}
      pagination={pagination}
    />
  )
}