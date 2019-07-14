/** @jsx jsx */
import React from 'react'
import {jsx, Box, Flex, Container} from 'theme-ui'
import {Link} from 'gatsby'
import useTimer from '../hooks/useTimer'
import {AlignJustify} from 'react-feather'
import {Drawer} from 'gatsby-theme-bjk-components'

const Header = () => {
  const {time, isRunning} = useTimer()
  const [showDrawer, setShowDrawer] = React.useState(false)
  const toggleDrawer = () => setShowDrawer(old => !old)
  return (
    <Box sx={{width: '100%'}}>
      <Container sx={{maxWidth: 1152, width: '100%'}}>
        <Flex sx={{alignItems: 'center'}}>
          <Box sx={{flex: 1}}>
            <span sx={{fontSize: 8, color: 'primary', fontWeight: 'heading'}}>
              {isRunning ? (
                new Date(time.totalTime * 1000).toISOString().substr(14, 5)
              ) : (
                <Link to="/" sx={{textDecoration: 'none', color: 'primary'}}>
                  brewd
                </Link>
              )}
            </span>
          </Box>
          <Flex sx={{display: ['none', 'none', 'flex', 'flex']}}>
            <Box sx={{mr: 3}}>
              <Link to="/" sx={{textDecoration: 'none', color: 'primary'}}>
                Start
              </Link>
            </Box>
            <Box sx={{mr: 3}}>
              <Link to="/coffees" sx={{textDecoration: 'none', color: 'primary'}}>
                Coffees
              </Link>
            </Box>
            <Box>
              <Link to="/sessions" sx={{textDecoration: 'none', color: 'primary'}}>
                Sessions
              </Link>
            </Box>
          </Flex>
          <Flex sx={{display: ['flex', 'flex', 'none', 'none']}}>
            <Box sx={{color: 'primary'}}>
              <AlignJustify onClick={toggleDrawer} />
            </Box>
            <Drawer open={showDrawer} from="right" onClickOutside={toggleDrawer}>
              <Flex sx={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
                <Box sx={{my: 3}}>
                  <Link to="/" sx={{textDecoration: 'none', color: 'primary'}}>
                    Start
                  </Link>
                </Box>
                <Box sx={{my: 3}}>
                  <Link to="/coffees" sx={{textDecoration: 'none', color: 'primary'}}>
                    Coffees
                  </Link>
                </Box>
                <Box sx={{my: 3}}>
                  <Link to="/sessions" sx={{textDecoration: 'none', color: 'primary'}}>
                    Sessions
                  </Link>
                </Box>
              </Flex>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
