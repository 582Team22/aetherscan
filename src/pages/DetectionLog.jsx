import React, {useState, useEffect} from 'react';
import DataTable from "react-data-table-component";
import {columns} from "../components/Columns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function  DetectionLog () {
    const [detections, setDetections] = useState([]);

    useEffect(() => {
        fetchDetections();
    }, []);

    const fetchDetections = async()=> {
        try {

            fetch("http://localhost:8080/droneDetected/logDetection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ object_detected: "animal", confidence: 0.77, latitude: 38.8951, longitude: -77}, { object_detected: "person", confidence: 0.98, latitude: 38.8951, longitude: -77}),
              })
                .then((r) => r.json())
                .then(console.log)
                .catch(console.error);

            const response = await fetch("http://localhost:8080/droneDetected/detections");
            let data = await response.json();
            console.log("data", data);
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
        } catch (error){
            console.error("Error fecthing detections:", error);
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
        <div style={{ width: "95%", margin: "2rem auto" }}>
          <h1 className="text-2xl mb-4 font-bold text-center">Detections Log</h1>
          <button
            onClick={handleDownloadReport}
            style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
          >
            Download PDF
          </button>
          <DataTable
            columns={columns}
            data={detections}
            pagination
            highlightOnHover
            striped
          />
        </div>
      );
};

export default DetectionLog;