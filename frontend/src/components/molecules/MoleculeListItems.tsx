import { Box, styled } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { Theme } from '@/constants/enums'
import { useAuth } from '@/contexts'
import AtomTypography from '../atoms/AtomTypography'

interface MoleculeListItemsProps {
  items: {
    icon: ReactNode
    label: string
    labelVariant: string
    labelActiveVariant: string
    path: string
    isRequireAuth: boolean
  }[]
  theme?: Theme
  onClick?: () => void
}

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`

const StyledItemBox = styled(Box)`
  display: flex;
  padding: 8px 28px;
  gap: 12px;
  align-items: center;
  height: 40px;
`

export default function MoleculeListItems(props: MoleculeListItemsProps) {
  const { items, theme = Theme.LIGHT, onClick } = props
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const isLightTheme = theme === Theme.LIGHT
  const sxColor = isLightTheme ? 'var(--green-100)' : 'var(--green-500)'

  return (
    <StyledBox>
      {items.map((item, index) => {
        const isActive = pathname === item.path

        return (
          <StyledItemBox
            sx={{
              cursor:
                !isAuthenticated && item.isRequireAuth
                  ? 'not-allowed'
                  : 'pointer',
            }}
            key={index}
            onClick={() => {
              if (!isAuthenticated) {
                return
              }

              onClick?.()
              router.push(item.path)
            }}
          >
            <Box
              sx={{
                color: sxColor,
                height: '24px',
                width: '24px',
              }}
            >
              {item.icon}
            </Box>

            <AtomTypography
              labelVariant={
                isActive ? item.labelActiveVariant : item.labelVariant
              }
              color={isLightTheme ? '--green-100' : '--green-500'}
              sx={{
                opacity:
                  (!isAuthenticated && item.isRequireAuth) || !isActive
                    ? 0.5
                    : 1,
              }}
            >
              {item.label}
            </AtomTypography>
          </StyledItemBox>
        )
      })}
    </StyledBox>
  )
}
