import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import Blog from './blog.model';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(['title', 'content'])
    .filter()
    .sort()
    .paginate();

  return await blogQuery.modelQuery;
};

const getABlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('author');
  if (!result) throw new AppError(400, 'This blog does not exists');
  return result;
};

const createABlogInDB = async (payload: IBlog, userData: JwtPayload) => {
  //CHECK IF THE USER IS EXISTS
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) throw new AppError(403, 'User does not exist!');

  return (await Blog.create({ ...payload, author: user._id })).populate(
    'author',
  );
};

const updateABlogInDB = async (
  id: string,
  userData: JwtPayload,
  payload: Partial<IBlog>,
) => {
  //CHECK IF THE USER IS EXISTS
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) throw new AppError(403, 'User does not exist!');

  //CHECK IF THE BLOG IS EXISTS
  const blog = await Blog.isBlogExistsById(id);

  if (!blog) throw new AppError(403, 'Blog does not exist!');

  // CHECK IF THE CURRENT BLOG USER IS THE AUTHOR OF THIS BLOG
  const isOwnBlog = blog.author.toString() === user._id.toString();

  if (!isOwnBlog)
    throw new AppError(403, "You don't have permission to update other blog!");

  return await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('author');
};

const deleteABlogFromDB = async (id: string, userData: JwtPayload) => {
  //CHECK IF THE USER IS EXISTS
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) throw new AppError(403, 'User does not exist!');

  //CHECK IF THE BLOG IS EXISTS
  const blog = await Blog.isBlogExistsById(id);

  if (!blog) throw new AppError(403, 'Blog does not exist!');

  // CHECK IF THE CURRENT BLOG USER IS THE AUTHOR OF THIS BLOG
  const isOwnBlog = blog.author.toString() === user._id.toString();

  if (!isOwnBlog)
    throw new AppError(403, "You don't have permission to delete other blog!");

  await Blog.findByIdAndDelete(id);
  return null;
};

const BlogServices = {
  getAllBlogsFromDB,
  getABlogFromDB,
  updateABlogInDB,
  createABlogInDB,
  deleteABlogFromDB,
};

export default BlogServices;
