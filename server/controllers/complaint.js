import Complaint from '../models/Complaint.js';

const postComplaint = async (req, res) => {
    try {
        const { user, parent, class: classId, category, description } = req.body;

        if ( !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const newComplaint = new Complaint({
            user,
            parent,
            class: classId,
            category,
            description
        });

        const savedComplaint = await newComplaint.save();

        res.status(201).json({
            success: true,
            message: "Complaint created successfully",
            complaint: savedComplaint
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating complaint",
            error: error.message
        });
    }
};

const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json({
            success: true,
            message: "Complaints fetched successfully",
            complaints
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching complaints",
            error: error.message
        });
    }
}

export { postComplaint ,getComplaints}
