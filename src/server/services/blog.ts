import { turso } from "../db/client";
import { BlogItem } from "../types/blog";

type Pagination = {
  page: number;
  per_page: number;
};

export const getBlogs = async (pagination: Pagination) => {
  try {
    const { page, per_page } = pagination;

    // Validate pagination parameters
    if (page <= 0 || per_page <= 0) {
      throw new Error("Page and per_page must be greater than 0");
    }

    const offset = (page - 1) * per_page;
    const limit = per_page;

    // Get total count of blog entries
    const countResult = await turso.execute(
      "SELECT COUNT(*) as total FROM blog"
    );
    const total = Number(countResult.rows[0].total);

    // Get paginated data
    const query = `SELECT * FROM blog LIMIT ${limit} OFFSET ${offset}`;
    const result = await turso.execute(query);

    return {
      data: result.rows,
      total,
      page,
      per_page,
    };
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};

export const getBlogById = async (id: number) => {
  try {
    const query = `SELECT * FROM blog WHERE id = ${id}`;
    const result = await turso.execute(query);
    if (!result.rows.length) {
      throw new Error(`Blog with id ${id} not found`);
    }
    return result.rows[0];
  } catch (error) {
    console.error("Failed to fetch blog by id:", error);
    throw error;
  }
};

export const createBlogArticle = async (blog: BlogItem) => {
  try {
    const query = `INSERT INTO blog (title, body, description, image, slug) VALUES ('${blog.title}', '${blog.body}', '${blog.description}', '${blog.image}', '${blog.slug}')`;
    const result = await turso.execute(query);
    return result.rows[0];
  } catch (error) {
    console.error("Failed to create blog:", error);
    throw error;
  }
};
