import Project from "../models/Project.js";
import Podcast from "../models/Podcast.js";

// Create a new project
export const createProject = async (req, res) => {
  try {

    const project = await Project.create({ title: req.body.title, user: req.user.id });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
};


export const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch projects by user
    const projects = await Project.find({ user: userId }).sort({ createdAt: -1 });

    // Add podcast count to each project
    const projectsWithCounts = await Promise.all(
      projects.map(async (project) => {
        const fileCount = await Podcast.countDocuments({ project: project._id });
        return {
          _id: project._id,
          title: project.title,
          createdAt: project.createdAt,
          fileCount,
        };
      })
    );

    res.status(200).json(projectsWithCounts);
  } catch (error) {
    console.error("Failed to get projects:", error);
    res.status(500).json({ message: "Failed to get projects" });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Find the project by ID and ensure it belongs to the current user
    const project = await Project.findOne({ _id: id, user: userId });

    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    // Count podcasts for the project
    const fileCount = await Podcast.countDocuments({ project: id });

    // Return project details with file count
    res.status(200).json({
      _id: project._id,
      title: project.title,
      createdAt: project.createdAt,
      fileCount,
    });
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

// Upload podcast
export const uploadPodcast = async (req, res) => {
  try {
    const { name, transcript, project } = req.body;
    const podcast = await Podcast.create({ name, transcript, project: project });
    res.status(201).json(podcast);
  } catch (err) {
    res.status(500).json({ message: "Error uploading podcast" });
  }
};

// Get podcasts for a project
export const getPodcasts = async (req, res) => {
  const podcasts = await Podcast.find({ project: req.params.projectId });
  res.json(podcasts);
};

// View single podcast
export const viewPodcast = async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);
  if (!podcast) return res.status(404).json({ message: "Podcast not found" });
  res.json(podcast);
};

// Delete podcast
export const deletePodcast = async (req, res) => {
  await Podcast.findByIdAndDelete(req.params.id);
  res.json({ message: "Podcast deleted" });
};

// Edit podcast
export const editPodcast = async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);
  if (!podcast) return res.status(404).json({ message: "Podcast not found" });

  podcast.name = req.body.name || podcast.name;
  podcast.transcript = req.body.transcript || podcast.transcript;
  await podcast.save();
  res.json(podcast);
};
