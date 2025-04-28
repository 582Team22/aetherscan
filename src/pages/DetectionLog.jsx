/*
 * Author: Kyle Spragg
 * File: DetectionLog.jsx
 * Purpose: This component displays a log of detections made by the drone, 
 *          allowing users to view detection data in a table format. 
 *          It also provides functionality to download the detection log as a PDF.
 */

import React, { useState, useEffect } from 'react'; // Importing React and hooks for state and effect management
import { Box, Typography, Button, Paper } from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling
import DataTable from "react-data-table-component"; // Importing DataTable component for displaying data in a table
import { columns } from "../components/Columns"; // Importing column definitions for the data table
import jsPDF from "jspdf"; // Importing jsPDF for generating PDF documents
import autoTable from "jspdf-autotable"; // Importing autoTable for creating tables in PDFs
import { Download as DownloadIcon } from '@mui/icons-material'; // Importing download icon

// Creating a styled Paper component with custom styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Adding padding to the Paper component
  height: '100%', // Setting height to 100%
  borderRadius: theme.shape.borderRadius * 2, // Customizing border radius
}));

// Creating a styled Box component for the title
const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Using flexbox for layout
  alignItems: 'center', // Aligning items to the center
  justifyContent: 'center', // Centering content horizontally
  marginBottom: theme.spacing(3), // Adding margin below the title box
}));

// Creating a styled Button component with custom styles
const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(3), // Adding margin below the button
  '& .MuiSvgIcon-root': { // Targeting the icon within the button
    marginRight: theme.spacing(1), // Adding margin to the right of the icon
  },
}));

// Defining the DetectionLog functional component
function DetectionLog() {
  const [detections, setDetections] = useState([]); // State for storing detection data

  // Effect to fetch detections when the component mounts
  useEffect(() => {
    fetchDetections(); // Calling the function to fetch detections
  }, []);

  // Function to fetch detection data from the server
  const fetchDetections = async () => {
    try {
      // Sending a POST request to log a detection (mock data)
      fetch("http://localhost:8080/droneDetected/logDetection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { object_detected: "animal", confidence: 0.77, latitude: 38.8951, longitude: -77 },
          { object_detected: "person", confidence: 0.98, latitude: 38.8951, longitude: -77 }
        ),
      })
        .then((r) => r.json()) // Parsing the response to JSON
        .then(console.log) // Logging the response
        .catch(console.error); // Catching and logging any errors

      // Fetching detection data from the server
      const response = await fetch("http://localhost:8080/droneDetected/detections");
      let data = await response.json(); // Parsing the response to JSON
      data = data.map((det) => { // Mapping through the detection data
        let detectionObj = det.detection_data; // Extracting detection data
        if (typeof detectionObj === "string") {
          detectionObj = JSON.parse(detectionObj); // Parsing stringified detection data
        }
        return {
          ...det, // Spreading the original detection object
          ...detectionObj, // Spreading the detection data
        };
      });
      setDetections(data); // Setting the fetched detection data to state
    } catch (error) {
      console.error("Error fetching detections:", error); // Logging any errors during fetching
    }
  };

  // Function to handle downloading the detection report as a PDF
  const handleDownloadReport = () => {
    const doc = new jsPDF(); // Creating a new jsPDF instance

    const tableColumn = columns.map((col) => col.name); // Extracting column names for the PDF table
    const tableRows = detections.map((rowData) => // Mapping through detection data to create rows
      columns.map((col) => {
        if (typeof col.selector === "function") {
          return col.selector(rowData); // Using the selector function to get the value for the row
        }
        return ""; // Returning an empty string if no selector
      })
    );

    autoTable(doc, { // Adding the table to the PDF
      head: [tableColumn], // Setting the table header
      body: tableRows, // Setting the table body
      startY: 20, // Starting Y position for the table
    });

    doc.text("Detections Report", 14, 15); // Adding title to the PDF
    doc.save("detections_report.pdf"); // Saving the PDF with a filename
  };

  // Rendering the DetectionLog component
  return (
    <Box> // Main container for the component
      <Typography variant="h4" gutterBottom> // Header for the detection log
        Detections Log
      </Typography>
      <StyledPaper elevation={1}> // Using the styled Paper component
        <TitleBox> // Title box for detection history
          <Typography variant="h6"> // Subheader for detection history
            Detection History
          </Typography>
        </TitleBox>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}> // Centering the download button
          <StyledButton
            variant="contained" // Button variant
            color="primary" // Button color
            onClick={handleDownloadReport} // Handling button click
            startIcon={<DownloadIcon />} // Adding download icon to the button
          >
            Download PDF // Button text
          </StyledButton>
        </Box>
        <DataTable // DataTable for displaying detection data
          columns={columns} // Setting columns for the table
          data={detections} // Setting data for the table
          pagination // Enabling pagination
          highlightOnHover // Highlighting rows on hover
          striped // Adding striped rows
          theme="default" // Setting default theme
          customStyles={{ // Custom styles for the table
            header: {
              style: {
                fontSize: '1.25rem', // Setting font size for header
                fontWeight: 500, // Setting font weight for header
                paddingLeft: '8px', // Adding padding to the left of header
                paddingRight: '8px', // Adding padding to the right of header
              },
            },
            headRow: {
              style: {
                backgroundColor: '#f5f5f5', // Setting background color for header row
                minHeight: '52px', // Setting minimum height for header row
              },
            },
            rows: {
              style: {
                fontSize: '0.875rem', // Setting font size for rows
                minHeight: '48px', // Setting minimum height for rows
              },
            },
          }}
        />
      </StyledPaper>
    </Box>
  );
}

// Exporting the DetectionLog component for use in other parts of the application
export default DetectionLog;