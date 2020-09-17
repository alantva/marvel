// React Imports
import { useEffect, useState } from 'react'

// Redux Imports
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCharacters } from '../../store/actions/characters.action'

// MUI Imports
import MuiBox from '@material-ui/core/Box'
import MuiCircularProgress from '@material-ui/core/CircularProgress'
import MuiGrid from '@material-ui/core/Grid'
import MuiButton from '@material-ui/core/Button'
import MuiSortByAlpha from '@material-ui/icons/SortByAlpha'
import MuiKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import MuiKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import MuiTable from '@material-ui/core/Table'
import MuiTableFooter from '@material-ui/core/TableFooter'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTablePagination from '@material-ui/core/TablePagination'

// Molecules Imports
import CharacterCard from '../molecules/CharacterCard'

// Atoms Imports
import TextField from '../atoms/TextField'

// MUI Styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  searchBox: {
    marginBottom: theme.spacing(1),
    '& > *:not(:first-child)': {
      marginLeft: theme.spacing(1),
    }
  }
}))

// GridItems Components
const renderGridItems = (characters) => {
  // if "characters.error" is true, it means that the api has returned a error
  if (characters?.error) {
    return (
      <MuiGrid key={`MuiGridItemTemplateCharacters_Loading`} item xs={12}>
        <MuiBox display="flex" justifyContent="center">{characters?.error.message}</MuiBox>
      </MuiGrid>
    )
  }
  // if "characters.loading" is true, it means that the api hasn't returned anything yet
  if (characters?.loading) {
    return (
      <MuiGrid key={`MuiGridItemTemplateCharacters_Loading`} item xs={12}>
        <MuiBox display="flex" justifyContent="center">
          <MuiCircularProgress />
        </MuiBox>
      </MuiGrid>
    )
  }
  // turns the data returned from the search into components for each item
  const items = characters?.results?.reduce((res, character) => [
    ...res,
    <MuiGrid key={`MuiGridItemTemplateCharacters_${character.id}`} item xs={12} sm={4} md={3}>
      <CharacterCard character={character} />
    </MuiGrid>
  ], [])
  // if "items" is an empty array, it means that the api returned 0 values ​​for the search
  if (!items.length) {
    return (
      <MuiGrid key={`MuiGridItemTemplateCharacters_NoData`} item xs={12}>
        <MuiBox display="flex" justifyContent="center">No data found.</MuiBox>
      </MuiGrid>
    )
  }
  // returns search items
  return items
}

// Component
const TemplateCharacters = (props) => {
  // MUI Styles
  const classes = useStyles()

  // States
  const [pagination, setPagination] = useState({
    nameStartsWith: '',
    limit: 8,
    orderBy: 'name',
    offset: 0,
  })

  // Effects
  // Run after did mount
  useEffect(() => {
    props.fetchCharacters(pagination)
  }, [])

  // Run after "pagination" change
  useEffect(() => {
    props.fetchCharacters(pagination)
  }, [pagination])

  // Methods
  // This method is responsible for calling a search whenever something new is typed
  const handleSearch = (event) => {
    const nameStartsWith = event.target.value
    setPagination({ ...pagination, offset: 0, nameStartsWith })
  }

  // This method is responsible for calling a search whenever a new order is requested
  const handleOrderBy = () => {
    const orderBy = pagination.orderBy !== 'name' ? 'name' : '-name'
    setPagination({ ...pagination, offset: 0, orderBy })
  }

  // This method is responsible for calling a search whenever a page is changed
  const handleChangePage = (event, p) => {
    const offset = p * pagination.limit
    setPagination({ ...pagination, offset })
  }

  // This method is responsible for calling a search whenever rows per page is changed
  const handleChangeRowsPerPage = (event) => {
    const limit = parseInt(event.target.value, 10)
    setPagination({ ...pagination, offset: 0, limit })
  }

  // Render
  return (
    <>
      <MuiBox display="flex" className={classes.searchBox}>
        {/* Search Field */}
        <TextField placeholder="Buscar..." value={pagination.searchValue} onChange={handleSearch} />
        {/* OrderBy Button */}
        <MuiButton onClick={handleOrderBy}>
          <MuiSortByAlpha />
          {pagination.orderBy === 'name' ? <MuiKeyboardArrowDown /> : <MuiKeyboardArrowUp />}
        </MuiButton>
      </MuiBox>
      {/* Characters List */}
      <MuiGrid container spacing={2}>
        {renderGridItems(props.characters)} 
      </MuiGrid>
      {/* Table Pagination */}
      <MuiTable>
        <MuiTableFooter>
          <MuiTableRow>
            <MuiTablePagination
              count={props.characters?.total || 0}
              page={pagination.offset / pagination.limit}
              onChangePage={handleChangePage}
              labelRowsPerPage="Ver"
              rowsPerPageOptions={[8, 16, 32]}
              rowsPerPage={pagination.limit}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </MuiTableRow>
        </MuiTableFooter>
      </MuiTable>
    </>
  )
}

const mapStateToProps = (state) => ({
  characters: state.characters
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCharacters
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TemplateCharacters)
