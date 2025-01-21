import React, { useState, useEffect } from 'react';
import CustomDataGrid from '../Components/CustomDatagrid'; // Import your CustomDataGrid component
import { Button, Modal, TextField, Box } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Tablethree() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const navigate=useNavigate()

  const [rows, setRows] = useState(() => {
    const storedData = localStorage.getItem('linewise');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({
    id: '',
    lineno: '',
    brand: '',
    state: '',
    batchno: '',
    sku: '',
    target: '',
  });

  const columns = [
    { field: 'lineno', headerName: 'Line No', width: 200 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'batchno', headerName: 'Batch No', width: 150 },
    { field: 'sku', headerName: 'SKU', width: 150 },
    { field: 'target', headerName: 'Target', width: 150 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button startIcon={<Edit />} onClick={() => handleEdit(params.row)}>
            Edit
          </Button>
          <Button
            startIcon={<Delete />}
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const [id,setId]=useState(null)
    const [countdown,setCountdown]=useState(60)
  
    function startTimer(){
      if(!id){
        const intervalId=setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
              navigate("/four")
            }
            return prevCountdown - 1;
          });
        }, 1000);
        setId(intervalId)
      }
    }
    // Load data from localStorage on component mount
    useEffect(() => {
      return () => {
        startTimer();
        if(id){
          clearInterval(id)
        }
      }
    }, [id]);

  // Save data to localStorage whenever rows change
  useEffect(() => {
    localStorage.setItem('linewise', JSON.stringify(rows));
  }, [rows]);

  const handleAdd = () => {
    setNewRow({
      id: Date.now(), // Unique ID for each row
      lineno: '',
      brand: '',
      state: '',
      batchno: '',
      sku: '',
      target: '',
    });
    setEditingRow(null);
    setOpenModal(true);
  };

  const handleEdit = (row) => {
    setNewRow(row);
    setEditingRow(row);
    setOpenModal(true);
  };

  const handleSave = () => {
    if (editingRow) {
      setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    } else {
      setRows([...rows, newRow]);
    }
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Line Wise Production Programme</h1>
      <div style={{display:"flex", justifyContent:"space between", padding:"30px 10px"}}>
      <div style={{display:"flex" , padding:"10px 5px", gap:"20px"}}>
      <button onClick={startTimer} style={{padding:"5px 20px", border:"1px solid", borderRadius:"10px", fontSize:"20px", fontWeight:"bolder"}} disabled={!!id}>Start</button>
        <button 
        style={{padding:"5px 20px", border:"1px solid", borderRadius:"10px", fontSize:"20px", color:"white", fontWeight:"bolder", backgroundColor:"red"}}
        onClick={()=>{
          if (id) {
            clearInterval(id);
            setId(null); 
            console.log("Timer stopped");
          }
        }}>Stop</button>
      </div>
     
      <p style={{ fontSize: "20px", width: "100%", textAlign: "right", padding:"0px 30px" }}>
          Time left: <span style={{ fontWeight: "bold" }}>{countdown}</span>{" "}
          seconds
        </p>
        </div>
      
      <Button
        startIcon={<Add />}
        onClick={handleAdd}
        variant="contained"
        color="primary"
        style={{ marginBottom: '10px' }}
      >
        Add New
      </Button>

      <div style={{ height: 400, width: '100%' }}>
        <CustomDataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            p: 3,
            backgroundColor: 'white',
            margin: 'auto',
            marginTop: '10%',
            width: 400,
          }}
        >
          <h2>{editingRow ? 'Edit Data' : 'Add Data'}</h2>
          <TextField
            fullWidth
            label="Line No"
            value={newRow.lineno}
            onChange={(e) => setNewRow({ ...newRow, lineno: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Brand"
            value={newRow.brand}
            onChange={(e) => setNewRow({ ...newRow, brand: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="State"
            value={newRow.state}
            onChange={(e) => setNewRow({ ...newRow, state: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Batch No"
            value={newRow.batchno}
            onChange={(e) => setNewRow({ ...newRow, batchno: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="SKU"
            value={newRow.sku}
            onChange={(e) => setNewRow({ ...newRow, sku: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Target"
            value={newRow.target}
            onChange={(e) => setNewRow({ ...newRow, target: e.target.value })}
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Tablethree;
