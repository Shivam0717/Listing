import React, { useState, useEffect } from 'react';
import CustomDataGrid from '../Components/CustomDatagrid'; // Import your CustomDataGrid component
import { Button, Modal, TextField, Box } from '@mui/material';
import { Add, Edit, Delete, PsychologyOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Tabletwo() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const navigate = useNavigate()

  const [rows, setRows] = useState(() =>{
    const storedData = localStorage.getItem('productQuantities');
  
      return storedData? JSON.parse(storedData):'';
    
    
  });

  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({
    id: '',
    brand: '',
    '750ML': '',
    '375ML': '',
    '180ML': '',
    '2LTR': '',
  });

  const columns = [
    { field: 'brand', headerName: 'BRAND', width: 200 },
    { field: '750ML', headerName: '750ML', width: 150 },
    { field: '375ML', headerName: '375ML', width: 150 },
    { field: '180ML', headerName: '180ML', width: 150 },
    { field: '2LTR', headerName: '2LTR', width: 150 },
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

  const [idd,setId]=useState(null)
  const [countdown,setCountdown]=useState(60)
  const [ongoing,setOngoing]=useState(true)

  function startTimer(){
  setOngoing(true)
    if(!idd){
      const intervalId=setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(intervalId); // Clear the interval when countdown reaches 1
            setId(null); // Reset interval ID
            setOngoing(false); // Update ongoing state
            navigate("/three"); // Navigate to the desired route
            return 0; // Ensure countdown stops at 0
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
      if (idd) {
        clearInterval(idd); // Ensure the interval is cleared on unmount
        console.log("Timer cleared on unmount");
      }
    };
  }, [idd]);


  // Save data to localStorage whenever rows change
  useEffect(() => {
    localStorage.setItem('productQuantities', JSON.stringify(rows));
  }, [rows]);

  const handleAdd = () => {
    setNewRow({
      id: Date.now(), // Unique ID for each row
      brand: '',
      '750ML': '',
      '375ML': '',
      '180ML': '',
      '2LTR': '',
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
    <div >
      <h1 style={{textAlign:"center"}}>Product Quantities Table</h1>
      <div style={{display:"flex", justifyContent:"space between", padding:"30px 10px"}}>
        <div >
          <div style={{display:"flex" , padding:"10px 5px", gap:"20px"}}>
          <button onClick={startTimer} style={{padding:"5px 20px", border:"1px solid", borderRadius:"10px", fontSize:"20px", fontWeight:"bolder"}} disabled={!!idd}>Start</button>
        <button 
        style={{padding:"5px 20px", border:"1px solid", borderRadius:"10px", fontSize:"20px", color:"white", fontWeight:"bolder", backgroundColor:"red"}}
        onClick={()=>{
          if (idd) {
            clearInterval(idd);
            setId(null); 
            setOngoing(false)
            console.log("Timer stopped");
          }
        }}>Stop</button>
          </div>
       
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
      <div>
  <button
    onClick={() => navigate('/two')}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
F.G stock 2  </button>
  <button
    onClick={()=>navigate('/three')}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
    Line Wise
  </button>
  <button
    onClick={()=>navigate('/four')}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
Hourly Production  </button>
<button
    onClick={() => setSelectedState("Rajasthan")}
    style={{
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, transform 0.2s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
    onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
  >
    Rajasthan
  </button>
  
</div>
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
            label="Brand"
            value={newRow.brand}
            onChange={(e) => setNewRow({ ...newRow, brand: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="750ML"
            type="number"
            value={newRow['750ML']}
            onChange={(e) =>
              setNewRow({ ...newRow, '750ML': e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="375ML"
            type="number"
            value={newRow['375ML']}
            onChange={(e) =>
              setNewRow({ ...newRow, '375ML': e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="180ML"
            type="number"
            value={newRow['180ML']}
            onChange={(e) =>
              setNewRow({ ...newRow, '180ML': e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="2LTR"
            type="number"
            value={newRow['2LTR']}
            onChange={(e) =>
              setNewRow({ ...newRow, '2LTR': e.target.value })
            }
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

export default Tabletwo;
