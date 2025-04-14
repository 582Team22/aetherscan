const express = require("express");
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile').development);
const router = express.Router();

router.post("/logDetection", async (req, res) => {
    try {
        const detectionObject = req.body
        const detectionJSON = JSON.stringify(detectionObject);
        await knex("drone_detections").insert({
            detection_data: detectionJSON,
          });
          res.json({ message: "Detection inserted" });  
    } catch (error){
        console.error("Error inserting detection:", error);
        res.status(500).json({error: "Error inserting detection"})
    }
})

router.get("/detections", async(req, res)=> {
    try{

        const detections = await knex("drone_detections").orderBy("created_at", "desc");

        const parsedDetections = detections.map((det) => {
        return {
            ...det,
            detection_data: JSON.parse(det.detection_data),
        };
        });

        res.json(parsedDetections);

    } catch (error){
        console.error("Error fetching detections:", error)
        res.status(500).json({ error: "Error fetching detections" });
    }
})


module.exports = router;
