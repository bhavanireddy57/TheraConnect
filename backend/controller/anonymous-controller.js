/*import User from "../models/userModel.js";
import Anonymous from "../models/anonymousSchema.js";

export const getAnonymousPosts = async (req, res) => {
    try {
      const anonymousPosts = await Anonymous.find({});
      return res.status(200).json(anonymousPosts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

export const createAnonymousPost = async (req, res) => {
    try {
        const { title, article, tags } = req.body;

        const newPost = new Anonymous({
            title,
            article,
            tags
        });

        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};*/


// controller/anonymous-controller.js
/*import AnonymousPost from "../models/anonymousSchema.js";

// ✅ Get all anonymous posts
export const getAnonymousPosts = async (req, res) => {
  try {
    const posts = await AnonymousPost.find({})
      .sort({ createdAt: -1 })
      .lean();

    console.log("📌 SERVER FETCHED POSTS:", posts);
    return res.status(200).json(posts);
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return res.status(500).json({ msg: "Error fetching posts" });
  }
};

// ✅ Create a new anonymous post
export const createAnonymousPost = async (req, res) => {
  try {
    const { title, article, tags, options } = req.body;
    const newPost = new AnonymousPost({
      title,
      article,
      tags,
      options,
      createdBy: req.user?.id || null,
    });

    await newPost.save();
    console.log("✅ New anonymous post created:", newPost);

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("❌ Error creating post:", error);
    return res.status(500).json({ msg: "Error creating post" });
  }
};*/



import AnonymousPost from "../models/anonymousSchema.js";

// GET all anonymous posts (public)
export const getAnonymousPosts = async (req, res) => {
  try {
    const posts = await AnonymousPost.find({}).sort({ createdAt: -1 }).lean();
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error fetching posts" });
  }
};

// CREATE anonymous post (protected)
export const createAnonymousPost = async (req, res) => {
  try {
    const { title, article, tags, options } = req.body;
    const newPost = new AnonymousPost({
      title,
      article,
      tags,
      options,
      createdBy: req.user?.id || null,
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error creating post" });
  }
};

