import {FC, useState} from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  IconButton,
  TextField, TablePagination,
} from '@mui/material'
import { Delete } from '@mui/icons-material'

import { useGroceryList } from 'hooks/useGrocery'
import * as React from "react";

const GroceryList: FC<{ isEditing?: boolean }> = ({ isEditing }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const { data, isLoading, isError, error } = useGroceryList({  page: page+1,  pageSize:rowsPerPage });


  console.log(data?.data)
  const groceries = data?.data ?? [];
  const total = data?.total ?? 0;

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Status</TableCell>
            {isEditing && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {groceries?.map((item: GroceryItem) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{isEditing ? <TextField value={item.quantity} /> : item.quantity}</TableCell>
              <TableCell>
                <Checkbox checked={item.status === 'HAVE'} />
              </TableCell>
              {isEditing && (
                <TableCell>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
      />
    </TableContainer>
  )
}

export default GroceryList
