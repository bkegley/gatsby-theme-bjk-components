/** @jsx jsx */
import {jsx, Box, Flex, Styled} from 'theme-ui'

const CoffeeCard = ({coffee}) => {
  return (
    <Flex sx={{flexDirection: 'column', bg: 'white', borderRadius: '5px', p: 4, boxShadow: 'small'}}>
      <Box>
        <Styled.h4>{coffee.name}</Styled.h4>
      </Box>
      <Box>{coffee.notes}</Box>
    </Flex>
  )
}

export default CoffeeCard
