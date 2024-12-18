import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BlogServices from './blog.service';

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    result: result.length,
    message: 'Blogs retrieved sucessfully!',
    data: result,
  });
});

const getABlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getABlogFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog retrieved sucessfully!',
    data: result,
  });
});

const createABlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createABlogInDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs created sucessfully!',
    data: result,
  });
});

const updateABlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateABlogInDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs updated sucessfully!',
    data: result,
  });
});

const deleteABlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BlogServices.deleteABlogFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted sucessfully!',
    data: result,
  });
});

const BlogControllers = {
  getAllBlogs,
  getABlog,
  updateABlog,
  createABlog,
  deleteABlog,
};

export default BlogControllers;
