import { Box, styled } from '@mui/material'
import React from 'react'
import AtomTypography from '../atoms/AtomTypography'

interface MoleculeEmptyStateCardProps {
  text: string
}

const StyledEmptyStateBox = styled(Box)`
  padding: 20px;
  background-color: var(--white);
  width: 100%;
  border-radius: 8px;
  text-align: center;
  gap: 10px;
  height: calc(100vh - 600px);

  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function MoleculeEmptyStateCard({
  text,
}: MoleculeEmptyStateCardProps) {
  return (
    <StyledEmptyStateBox>
      <AtomTypography color="--grey-300" labelVariant="title-2">
        {text}
      </AtomTypography>
      <AtomTypography color="--grey-300" labelVariant="title-1">
        Be the first!
      </AtomTypography>
    </StyledEmptyStateBox>
  )
}
