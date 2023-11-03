import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import Blog from "../components/Blog";
import "../utils/Category.scss"
const CategoryBlog = () => {
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const getCategoryBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "Blogs");
    const categoryBlogQuery = query(blogRef, where("category", "==", category));
    const docSnapshot = await getDocs(categoryBlogQuery);
    let categoryBlogs = [];
    docSnapshot.forEach((doc) => {
      categoryBlogs.push({ id: doc.id, ...doc.data() });
    });
    setCategoryBlogs(categoryBlogs);
    setLoading(false);
  };

  useEffect(() => {
    getCategoryBlogs();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="__a">
          <div className="__b">
            Category: <strong>{category.toLocaleUpperCase()}</strong>
          </div>
          {categoryBlogs?.map((x) => (
            <div className="__category">
              <Blog key={x.id} {...x} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBlog;
