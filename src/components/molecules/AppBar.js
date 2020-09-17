// MUI Imports
import MuiAppBar from '@material-ui/core/AppBar'
import MuiToolbar from '@material-ui/core/Toolbar'

// Atoms Imports
import Logo from '../atoms/Logo'

// MUI Styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}))

// Styled Components
import styled from 'styled-components'

const LogoWrapper = styled.div`
  margin: 5px;
  padding-top: 5px;
`

// Component
const AppBar = (props) => {
  // MUI Styles
  const classes = useStyles()

  // Render
  return (
    <MuiAppBar position="fixed" className={classes.appBar} {...props}>
      <MuiToolbar>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </MuiToolbar>
    </MuiAppBar>
  )
}

export default React.forwardRef((props, ref) => <AppBar {...props} innerRef={ref} />)
