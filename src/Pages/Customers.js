import React, { Component } from 'react';
import '../style/Customers.css';
import TopNav from '../components/TopNav';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import customers from '../testdata/customers.json';
import CustomerModal from '../components/CustomerModal';

export default function Customers(){

    const [formData, setFormdata] = React.useState({})
    const [rows, setRows] = React.useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

    function createData(name, address, city, country, contactNumber, email) {
        return {name, address, city, country, contactNumber, email};
      }
      
   

      function handleChange(event){

        const {name, value} = event.target;

        setFormdata(prevData =>{
            return {...prevData, [name] : value}
        })

      }

      function addCustomer(){
        setRows(prevData =>{
            return [...prevData, createData(formData.CustomerName, formData.Address, formData.City, formData.Country, formData.ContactNumber) ]})
        
        setFormdata({})
      }


      function handleSubmit(event){
        event.preventDefault()
        addCustomer()
      }


      function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }

      function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      

      function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }

      const headCells = [
        {
            id: 'ID',
            numeric: false,
            disablePadding: true,
            label: 'ID',
          },{
          id: 'Customer Name',
          numeric: false,
          disablePadding: true,
          label: 'Customer Name',
        },
        {
          id: 'Address',
          numeric: true,
          disablePadding: false,
          label: 'Address',
        },
        {
          id: 'City',
          numeric: true,
          disablePadding: false,
          label: 'City',
        },
        {
          id: 'Country',
          numeric: true,
          disablePadding: false,
          label: 'Country',
        },
        {
          id: 'Contact Number',
          numeric: true,
          disablePadding: false,
          label: 'Contact Number',
        },
        {
            id: 'Email',
            numeric: true,
            disablePadding: false,
            label: 'Email',
          },
      ];
      
      function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
          props;
        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
        return (
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          );
        }
        
        EnhancedTableHead.propTypes = {
          numSelected: PropTypes.number.isRequired,
          onRequestSort: PropTypes.func.isRequired,
          onSelectAllClick: PropTypes.func.isRequired,
          order: PropTypes.oneOf(['asc', 'desc']).isRequired,
          orderBy: PropTypes.string.isRequired,
          rowCount: PropTypes.number.isRequired,
        };
        
        function EnhancedTableToolbar(props) {
          const { numSelected } = props;
        
          return (
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                  bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
              }}
            >
              {numSelected > 0 ? (
                <Typography
                  sx={{ flex: '1 1 100%' }}
                  color="inherit"
                  variant="subtitle1"
                  component="div"
                >
                  {numSelected} selected
                </Typography>
              ) : (
                <Typography
                  sx={{ flex: '1 1 100%' }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  Customers
                </Typography>
              )}
        
              {numSelected > 0 ? (
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon onClick={handleDelete} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Filter list">
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Toolbar>
          );
        }

        function handleDelete(){
           
            delete rows[selected]

        }
        
        EnhancedTableToolbar.propTypes = {
          numSelected: PropTypes.number.isRequired,
        };
        
     
           
            const handleRequestSort = (event, property) => {
              const isAsc = orderBy === property && order === 'asc';
              setOrder(isAsc ? 'desc' : 'asc');
              setOrderBy(property);
            };
          
            const handleSelectAllClick = (event) => {
              if (event.target.checked) {
                const newSelected = rows.map((n) => n.name);
                setSelected(newSelected);
                return;
              }
              setSelected([]);
            };
          
            const handleClick = (event, name) => {
              const selectedIndex = selected.indexOf(name);
              let newSelected = [];
          
              if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
              } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
              } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
              } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                  selected.slice(0, selectedIndex),
                  selected.slice(selectedIndex + 1),
                );
              }
          
              setSelected(newSelected);
            };
          
            const handleChangePage = (event, newPage) => {
              setPage(newPage);
            };
          
            const handleChangeRowsPerPage = (event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            };
          
            const handleChangeDense = (event) => {
              setDense(event.target.checked);
            };
          
            const isSelected = (name) => selected.indexOf(name) !== -1;
          
            // Avoid a layout jump when reaching the last page with empty rows.
            const emptyRows =
              page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
          
            const visibleRows = React.useMemo(
              () =>
                stableSort(rows, getComparator(order, orderBy)).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                ),
              [order, orderBy, page, rowsPerPage, rows ],
            );
          
            React.useEffect(()=>{
              setRows(customers)
            },[rows])
     
    return(
        <div className='Customers'>
            <TopNav/>
            <div className='wrapper'>
                <div className='customer-header'>
                <form onSubmit={handleSubmit} className='customer-form'>
                        <button onClick={handleOpen} className='add-customer-btn' name="Add" type='submit' value="Add">Add Customer</button>
                </form>
                <CustomerModal open={open} handleClose = {handleClose}/>
                </div>
                <div className='table'>
                <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(index);
                const labelId = `enhanced-table-checkbox-${index}`;
   
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, index)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {index}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>     
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.contactNumber}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>

                </div>
            </div>
        </div>
    )
}


