// Next Imports
import Head from 'next/head'

// MUI Imports
import MuiContainer from '@material-ui/core/Container'
import MuiTypography from '@material-ui/core/Typography'

// Molecules Imports
import AppBar from '../components/molecules/AppBar'

// MUI Styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrapper: {
    minHeight: '100vh',
    paddingTop: 72,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
      paddingTop: 56, 
    }, 
    [theme.breakpoints.up('sm')]: { 
      paddingTop: 72, 
    }, 
  },
}))

// Styled Components
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const ChildrenWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
  margin-bottom: 10px;
`

const PageTitleWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
  margin-bottom: 10px;
`

// Head Title Component
const HeadTitle = ({ title }) => (
  <Head>
    <title>{`Marvel >> ${title}`}</title>
  </Head>
)

// Page Title Component
const PageTitle = ({ title }) => (
  <PageTitleWrapper>
    <MuiTypography variant="h3">{title}</MuiTypography>
  </PageTitleWrapper>
)

// Component
const LayoutMain = ({ title, children }) => {
  // MUI Styles
  const classes = useStyles()

  // Render
  return (
    <>
      {/* Page Header Title */}
      {title ? <HeadTitle title={title} /> : null}
      <MuiContainer component="main" maxWidth="lg">
        {/* AppBar */}
        <AppBar />
        <Wrapper className={classes.wrapper}>
          {/* Page Title */}
          {title ? <PageTitle title={title} /> : null}
          {/* Children Wrapper */}
          <ChildrenWrapper>
            {children}
          </ChildrenWrapper>
        </Wrapper>
      </MuiContainer>
    </>
  )
}

export default LayoutMain
