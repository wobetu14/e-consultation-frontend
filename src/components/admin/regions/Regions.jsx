import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react'
import axios from '../../../axios/AxiosGlobal'
import Header from '../AdminHeader';
import { DataGrid } from '@mui/x-data-grid';
import { SignalCellularNullOutlined } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';
import { useTable } from 'react-table';
import '../../Table.css'
import { useSortBy, useGlobalFilter, usePagination } from 'react-table';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterTable from '../FilterTable';


const Regions = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode); 
    const [regionsData, setRegionsData]=useState([]);

    const fetchRegions =async() =>{
      return await  axios.get('regions')
        .then(res=>res.data.data)
        .then(res=>{
          setRegionsData(res.data)
        }).catch(error=>{
          console.log(error.message);
        })
      }
      
    useEffect(()=>{ 
      fetchRegions()
    },[]);

    const COLUMNS = [
        {
          Header: 'ID',
          accessor: 'id',
        },
        {
          Header: 'Region Name',
          accessor: 'name',
        },
        {
          Header: 'Created By',
          accessor: 'created_by',
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const data=useMemo(() =>regionsData, [regionsData]); 


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage, 
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter
    } =useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy, usePagination);

    const {globalFilter, pageIndex, pageSize }=state; 

   
  return (
    <Box m='0 20px' width={'95%'}>
      <Header title="Regions" subtitle="Manage Regions" />

      <FilterTable filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <ArrowDownwardIcon fontSize='small' />
                        : <ArrowUpwardIcon fontSize='small' />
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <Box mt='10px'>
        <span>
          {/* <strong> */}
            Page {pageIndex+1} of {pageOptions.length}  &nbsp;
          {/* </strong> */}
        </span>
        <select value={pageSize} onChange={(e)=>setPageSize(Number(e.target.value))}>
               {
                  [5, 10, 20,25, 100].map((pageSize)=>(
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))
               }
          </select>
          <span style={{ marginRigt:"3px" }}>&nbsp;</span>
          <Button variant="outlined" size="small" sx={{ marginRight:"3px" }} onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>
          <Button variant="outlined" size="small" sx={{ marginRight:"3px" }} onClick={()=>previousPage()} disabled={!canPreviousPage}>Prev</Button>
          <Button variant="outlined" size="small" sx={{ marginRight:"3px" }} onClick={()=>nextPage()} disabled={!canNextPage}>Next</Button>
          <Button variant="outlined" size="small" sx={{ marginRight:"3px" }} onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</Button>
      </Box>

      </Box> 
  )
}

export default Regions