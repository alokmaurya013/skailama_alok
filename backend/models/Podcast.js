import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' ,required:true},
  name: { type: String, required: true },
  transcript: { type: String, required: true },
}, { timestamps: true });

const Podcast= mongoose.model('Podcast', podcastSchema);
export default Podcast;
