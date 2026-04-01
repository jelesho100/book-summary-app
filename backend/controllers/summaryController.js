const Summary = require("../models/Summary");

createSummary = async (req, res) => {
    res.json({message: "Create summary"});
};
readSummary = async (req, res) => {
    res.json({message: "Read summary"});
};
updateSummary = async (req, res) => {
    res.json({message: "Update summary"});
};
deleteSummary = async (req, res) => {
    res.json({message: "Delete summary"});
};