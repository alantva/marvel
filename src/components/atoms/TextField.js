// MUI Imports
import MuiTextField from '@material-ui/core/TextField'

// Component
const TextField = (props) => (
  <MuiTextField variant="outlined" autoComplete="off" color="primary" {...props} />
)

export default React.forwardRef((props, ref) => <TextField {...props} innerRef={ref} />)
