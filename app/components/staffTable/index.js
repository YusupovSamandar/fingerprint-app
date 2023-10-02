"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { API_URL } from '@/app/apiConfig';
import Paper from '@mui/material/Paper';
import Navbar from "@/app/components/navbar"

const Example = () => {
    const [tableData, setTableData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            const edittingObjId = tableData[row.index]._id
            const editResponse = await axios.put(`${API_URL}/api/staff/${edittingObjId}`, values)
            if (editResponse.status === 200) {
                tableData[row.index] = values;
                setTableData([...tableData]);
            }
            // //send/receive api updates here, then refetch or update local table data for re-render
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            if (
                !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            ) {
                return;
            }
            (async function () {
                const editResponse = await axios.delete(`${API_URL}/api/staff/${tableData[row.index]._id}`);
                if (editResponse.status === 200) {
                    tableData.splice(row.index, 1);
                    setTableData([...tableData]);
                }
            })();
        },
        [tableData],
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'fingerId',
                header: 'Finger ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'fullName',
                header: 'fullName',
            },
        ],
    );

    useEffect(() => {
        (async function () {
            const { data: registeredStaffDT } = await axios.get(`${API_URL}/api/staff`);
            setTableData(registeredStaffDT.reverse());
        })();
    }, [])

    return (
        <>
            <Navbar headingName={"Staff Memberss"} />
            <Paper elevation={3} style={{ margin: "10px" }}>
                <MaterialReactTable
                    columns={columns}
                    data={tableData}
                    editingMode="modal" //default
                    enableColumnOrdering
                    initialState={{
                        columnVisibility: { fingerId: false }
                    }}
                    enableEditing
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip arrow placement="left" title="Edit">
                                <IconButton onClick={() => table.setEditingRow(row)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Delete">
                                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                />
            </Paper>
        </>
    );
};
export default Example;
