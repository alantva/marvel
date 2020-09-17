// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import MuiAvatar from '@material-ui/core/Avatar'
import MuiBox from '@material-ui/core/Box'
import MuiCard from '@material-ui/core/Card'
import MuiCardHeader from '@material-ui/core/CardHeader'
import MuiCardContent from '@material-ui/core/CardContent'
import MuiDivider from '@material-ui/core/Divider'
import MuiTypography from '@material-ui/core/Typography'

// MUI Styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: `0px 2px 3px ${theme.palette.primary.main}` ,
  },
  avatar: {
    width: 64,
    height: 64
  },
  title: {
    height: 64,
    marginTop: theme.spacing(1),
    textTransform: 'capitalize'
  },
  content: {
    height: 80,
    marginTop: theme.spacing(1),
    overflow: 'auto',
    textAlign: 'center'
  }
}))

// Component
const CharacterCard = ({ character, ...props }) => {
  // MUI Styles
  const classes = useStyles()

  // State
  const [name, setName] = useState('')
  const [realName, setRealName] = useState('')
  const [avatar, setAvatar] = useState('/logo.svg')
  const [description, setDescription] = useState('Top Secret Information')

  // Effect
  useEffect(() => {
    setName(extCharacterName(character))
    setRealName(extCharacterRealName(character))
    setAvatar(extCharacterAvatar(character))
    if (character?.description) setDescription(character?.description)
  }, [])

  // Methods
  const extCharacterName = character =>
    character?.name?.replace(/\s\(.*\)/, '')

  const extCharacterRealName = character => {
    const characterWiki = character?.urls?.find(url => url.type === 'wiki')
    if (!characterWiki?.url) return null
    const characterRealName = /\((.*)\)/g.exec(characterWiki.url)
    if (!characterRealName) return null
    return decodeURIComponent(characterRealName[1]?.replace(/_/g, ' '))
  }

  const extCharacterAvatar = character =>
    `${character?.thumbnail?.path}.${character?.thumbnail?.extension}`

  // Render
  return (
    <MuiCard className={classes.root} {...props} color="primary">
      {/* Card Header */}
      <MuiCardHeader
        avatar={<MuiAvatar alt={name} src={avatar} className={classes.avatar} />}
        title={<MuiTypography variant="body1" gutterBottom>{name}</MuiTypography>}
        subheader={<MuiTypography variant="body2" color="primary">{realName || name}</MuiTypography>}
      />
      <MuiDivider />
      {/* Card Content */}
      <MuiCardContent>
        <MuiBox display="flex" justifyContent="center" className={classes.content}>
          <MuiTypography variant="caption">{description}</MuiTypography>
        </MuiBox>
      </MuiCardContent>
    </MuiCard>
  )
}

export default React.forwardRef((props, ref) => <CharacterCard {...props} innerRef={ref} />)
