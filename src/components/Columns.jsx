/*
 * Author: Kyle Spragg
 * File: Columns.jsx
 * Purpose: This file defines the column structure for a data table, 
 *          specifying the data fields to be displayed and their properties.
 */
export const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Object",
      selector: (row) => row.object_detected, 
      sortable: true,
    },
    {
      name: "Confidence",
      selector: (row) => row.confidence,
      sortable: true,
    },
    {
      name: "Latitude",
      selector: (row) => row.latitude,
    },
    {
      name: "Longitude",
      selector: (row) => row.longitude,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toLocaleString(),
      sortable: true,
    },
  ];
