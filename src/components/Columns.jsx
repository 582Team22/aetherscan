/*
 * Author: Kyle Spragg
 * File: Columns.jsx
 * Purpose: This file defines the column structure for a data table, 
 *          specifying the data fields to be displayed and their properties.
 */

// Exporting the columns array for use in a data table
export const columns = [
    {
      name: "ID", // Column name displayed in the table header
      selector: (row) => row.id, // Function to select the ID from each row
      sortable: true, // Indicates that this column can be sorted
    },
    {
      name: "Object", // Column name for the detected object
      selector: (row) => row.object_detected, // Function to select the detected object from each row
      sortable: true, // Indicates that this column can be sorted
    },
    {
      name: "Confidence", // Column name for the confidence level
      selector: (row) => row.confidence, // Function to select the confidence level from each row
      sortable: true, // Indicates that this column can be sorted
    },
    {
      name: "Latitude", // Column name for the latitude value
      selector: (row) => row.latitude, // Function to select the latitude from each row
    },
    {
      name: "Longitude", // Column name for the longitude value
      selector: (row) => row.longitude, // Function to select the longitude from each row
    },
    {
      name: "Created At", // Column name for the creation timestamp
      selector: (row) => new Date(row.created_at).toLocaleString(), // Function to format the creation date
      sortable: true, // Indicates that this column can be sorted
    },
];
