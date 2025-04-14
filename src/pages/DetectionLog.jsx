import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import DataTable from "react-data-table-component";
import { columns } from "../components/Columns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download as DownloadIcon } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
}));

const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  },
}));

function DetectionLog() {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    fetchDetections();
  }, []);

  const fetchDetections = async () => {
    try {
      fetch("http://localhost:8080/droneDetected/logDetection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { object_detected: "animal", confidence: 0.77, latitude: 38.8951, longitude: -77 },
          { object_detected: "person", confidence: 0.98, latitude: 38.8951, longitude: -77 }
        ),
      })
        .then((r) => r.json())
        .then(console.log)
        .catch(console.error);

      const response = await fetch("http://localhost:8080/droneDetected/detections");
      let data = await response.json();
      data = data.map((det) => {
        let detectionObj = det.detection_data;
        if (typeof detectionObj === "string") {
          detectionObj = JSON.parse(detectionObj);
        }
        return {
          ...det,
          ...detectionObj,
        };
      });
      setDetections(data);
    } catch (error) {
      console.error("Error fetching detections:", error);
    }
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    const tableColumn = columns.map((col) => col.name);
    const tableRows = detections.map((rowData) =>
      columns.map((col) => {
        if (typeof col.selector === "function") {
          return col.selector(rowData);
        }
        return "";
      })
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.text("Detections Report", 14, 15);
    doc.save("detections_report.pdf");
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Detections Log
      </Typography>
      <StyledPaper elevation={1}>
        <TitleBox>
          <Typography variant="h6">
            Detection History
          </Typography>
        </TitleBox>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleDownloadReport}
            startIcon={<DownloadIcon />}
          >
            Download PDF
          </StyledButton>
        </Box>
        <DataTable
          columns={columns}
          data={detections}
          pagination
          highlightOnHover
          striped
          theme="default"
          customStyles={{
            header: {
              style: {
                fontSize: '1.25rem',
                fontWeight: 500,
                paddingLeft: '8px',
                paddingRight: '8px',
              },
            },
            headRow: {
              style: {
                backgroundColor: '#f5f5f5',
                minHeight: '52px',
              },
            },
            rows: {
              style: {
                fontSize: '0.875rem',
                minHeight: '48px',
              },
            },
          }}
        />
      </StyledPaper>
    </Box>
  );
}

export default DetectionLog;