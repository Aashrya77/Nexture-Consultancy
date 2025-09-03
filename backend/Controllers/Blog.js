const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });        
    }
}

const createBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const newBlog = new Blog({ title, content, images: [], tags });
        
            if (req.files && req.files.length > 0) {
      newBlog.images = req.files.map(file => `uploads/${file.filename}`);
    }
        await newBlog.save();
        res.status(201).json({data: newBlog});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        console.log(error)
    }
}
 
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image, tags } = req.body;
        const updatedData = { title, content, tags };
        
        if(req.file){
            updatedData.image = req.file.path; // Update the image path if a new file is uploaded
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

module.exports = {
    getAllBlogs,
    createBlog,
    deleteBlog, 
    updateBlog
};

