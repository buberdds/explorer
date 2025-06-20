import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { useGetConsensusProposals } from '../../../oasis-nexus/api'
import { NUMBER_OF_ITEMS_ON_DASHBOARD } from '../../../config'
import { COLORS } from '../../../styles/theme/colors'
import { ConsensusScope } from '../../../types/searchScope'
import { NetworkProposalsList } from '../../components/NetworkProposalsList'
import { RouteUtils } from 'app/utils/route-utils'
import { ErrorBoundary } from '../../components/ErrorBoundary'

const limit = NUMBER_OF_ITEMS_ON_DASHBOARD

const NetworkProposalsCardContent: FC<{ scope: ConsensusScope }> = ({ scope }) => {
  const { network } = scope
  const proposalsQuery = useGetConsensusProposals(network, { limit })

  return (
    <NetworkProposalsList
      proposals={proposalsQuery.data?.data.proposals}
      isLoading={proposalsQuery.isLoading}
      limit={limit}
      pagination={false}
    />
  )
}

export const NetworkProposalsCard: FC<{ scope: ConsensusScope }> = ({ scope }) => {
  const { t } = useTranslation()
  const { network } = scope

  return (
    <Card>
      <CardHeader
        disableTypography
        component="h3"
        title={t('networkProposal.listTitle')}
        action={
          <Link
            component={RouterLink}
            to={RouteUtils.getProposalsRoute(network)}
            sx={{ color: COLORS.brandDark }}
          >
            {t('common.viewAll')}
          </Link>
        }
      />
      <CardContent>
        <ErrorBoundary light={true}>
          <NetworkProposalsCardContent scope={scope} />
        </ErrorBoundary>
      </CardContent>
    </Card>
  )
}
