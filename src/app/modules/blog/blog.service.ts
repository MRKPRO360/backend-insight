import { IBlog } from './blog.interface';
import Blog from './blog.model';

const getAllBlogsFromDB = async () => {
  return await Blog.find();
};

const getABlogFromDB = async (id: string) => {
  return await Blog.findById(id);
};

const createABlogInDB = async (payload: IBlog) => {
  return await Blog.create(payload);
};

const updateABlogInDB = async (id: string, payload: Partial<IBlog>) => {
  return await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteABlogFromDB = async (id: string) => {
  return await Blog.findByIdAndDelete(id);
};

const BlogServices = {
  getAllBlogsFromDB,
  getABlogFromDB,
  updateABlogInDB,
  createABlogInDB,
  deleteABlogFromDB,
};

export default BlogServices;
