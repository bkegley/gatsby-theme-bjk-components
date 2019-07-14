/** @jsx jsx */
import {
  jsx,
  Layout as DefaultLayout,
  Header as HeaderWrapper,
  Footer as FooterContainer,
  Main,
  Container,
  Styled,
} from 'theme-ui'
import Header from './Header'
import Footer from './Footer'
import {Global} from '@emotion/core'

const Layout = ({children}) => {
  return (
    <Styled.root>
      <DefaultLayout>
        <Global
          styles={{
            '*': {
              boxSizing: 'border-box',
            },
            body: {
              margin: 0,
            },
          }}
        />
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <Main>
          <Container>{children}</Container>
        </Main>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </DefaultLayout>
    </Styled.root>
  )
}

export default Layout
