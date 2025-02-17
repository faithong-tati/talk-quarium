import { Box, styled } from '@mui/material'
import React from 'react'
import AtomTypography from '../atoms/AtomTypography'

interface MoleculeEmptyStateCardProps {
  text1: string
  text2?: string
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
  text1,
  text2,
}: MoleculeEmptyStateCardProps) {
  return (
    <StyledEmptyStateBox>
      <AtomTypography color="--grey-300" labelVariant="title-2">
        {text1}
      </AtomTypography>
      {text2 && (
        <AtomTypography color="--grey-300" labelVariant="title-1">
          {text2}
        </AtomTypography>
      )}
    </StyledEmptyStateBox>
  )
}
