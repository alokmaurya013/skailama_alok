import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  uploadPodcast,
  getPodcasts,
  viewPodcast,
  deletePodcast,
  editPodcast,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createproject", protect, createProject);
router.get("/projects", protect, getProjects);
router.get("/project/:id", protect, getProjectById);
router.post("/createpodcast", protect, uploadPodcast);
router.get("/podcasts/:projectId", protect, getPodcasts);
router.get("/podcast/:id", protect, viewPodcast);
router.delete("/podcast/:id", protect, deletePodcast);
router.put("/podcast/:id", protect, editPodcast);

export default router;
