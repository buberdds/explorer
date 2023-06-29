import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { COLORS } from '../../../styles/theme/colors'
import ButtonBase from '@mui/material/ButtonBase'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const clipboardTooltipDuration = 2000

type CopyToClipboardProps = {
  value: string
  label?: string
}

const StyledIconButton = styled(ButtonBase)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  border: 0,
  background: 'none',
  cursor: 'pointer',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  padding: 0,
  marginLeft: theme.spacing(4),
}))

export const CopyToClipboard: FC<CopyToClipboardProps> = ({ value, label }) => {
  const { t } = useTranslation()
  const timeout = useRef<number | undefined>(undefined)
  const ariaLabel = t('clipboard.label')
  const [isCopied, setIsCopied] = useState(false)
  const handleCopyToClipboard = useCallback(() => {
    if (isCopied) {
      return
    }
    window.navigator.clipboard.writeText(value)
    setIsCopied(true)
  }, [isCopied, value])
  const hideTooltip = useCallback(
    () => (timeout.current = window.setTimeout(() => setIsCopied(false), clipboardTooltipDuration)),
    [],
  )

  useEffect(() => {
    return () => {
      if (timeout.current) {
        window.clearTimeout(timeout.current)
      }
    }
  }, [])

  return (
    <Tooltip arrow onOpen={hideTooltip} open={isCopied} placement="right" title={t('clipboard.success')}>
      {label ? (
        <Button
          variant="outlined"
          color="secondary"
          sx={{ textTransform: 'capitalize' }}
          onClick={handleCopyToClipboard}
          aria-label={ariaLabel}
        >
          {label}
        </Button>
      ) : (
        <StyledIconButton color="inherit" onClick={handleCopyToClipboard} aria-label={ariaLabel}>
          <ContentCopyIcon sx={{ fontSize: '1.25em', color: COLORS.brandDark }} />
        </StyledIconButton>
      )}
    </Tooltip>
  )
}
