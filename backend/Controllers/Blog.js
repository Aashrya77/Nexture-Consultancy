const Blog = require('../models/Blog');    

const createSlug = (title = '') => {
    return title
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};

const ensureUniqueSlug = async (baseSlug) => {
    let slug = baseSlug || 'blog';
    let counter = 1;
    while (await Blog.exists({ slug })) {
        counter += 1;
        slug = `${baseSlug || 'blog'}-${counter}`;
    }
    return slug;
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ data: blogs });
    } catch(error) {
        res.status(500).json({msg: error.message})
    }
}


const createBlog = async (req, res) => {
    try {
        const { title, content, tags, status } = req.body;
        let parsedTags = tags;
        if (typeof tags === 'string') {
            parsedTags = tags.trim().length ? JSON.parse(tags) : [];
        }

        const baseSlug = createSlug(title);
        const slug = await ensureUniqueSlug(baseSlug);

        const newBlog = new Blog({ title, slug, content, images: [], tags: parsedTags, status });
        
            if (req.files && req.files.length > 0) {
      newBlog.images = req.files.map(file => `uploads/${file.filename}`);
    }
        await newBlog.save();
        res.status(201).json({data: newBlog});
    } catch (error) {
        if (error && error.code === 11000) {
            return res.status(409).json({ message: 'Duplicate blog', error });
        }
        res.status(500).json({ message: 'Server Error', error });
        console.log(error)
    }
}

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ data: blog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
 
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
    getBlogById,
    createBlog,
    deleteBlog, 
    updateBlog
};

