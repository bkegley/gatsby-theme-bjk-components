/** @jsx jsx */
import {jsx, Flex, Box, Container} from 'theme-ui'
import {Heart} from 'react-feather'

const Footer = () => {
  return (
    <Flex sx={{bg: 'primary', width: '100%'}}>
      <Container sx={{maxWidth: 1152, width: '100%'}}>
        <Flex sx={{py: 4, width: '100%', alignItems: 'center', justifyContent: 'center', fontSize: 2}}>
          <span sx={{mr: 2}}>Made with </span>
          <Box sx={{mr: 2, color: 'white'}}>
            <Heart />
          </Box>
          <span>in South Dakota</span>
        </Flex>
      </Container>
    </Flex>
  )
}

export default Footer
