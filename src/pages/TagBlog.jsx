import React, { useContext, useEffect, useState } from "react";
import MyContext from "../context/Context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";
import Blog from "../components/Blog";

const TagBlog = () => {
  const context = useContext(MyContext);
  const { mode } = context;
  const [TagBlogs, setTagBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tag } = useParams();
  const getTagBlogs = async () => {
    setLoading(true);
    const blogRef = collection(db, "Blogs");
    const tagBlogQuery = query(blogRef, where("tags", "array-contains", tag));
    const docSnapshot = await getDocs(tagBlogQuery);
    let tagBlogsArray = [];
    docSnapshot.forEach((doc) => {
      tagBlogsArray.push({ id: doc.id, ...doc.data() });
    });
    setTagBlogs(tagBlogsArray);
    setLoading(false);
  };
  useEffect(() => {
    getTagBlogs();
  }, []);
  console.log(TagBlogs);
  return (
    <div>
      <div>
        <h3>
          Tag: <strong>{tag.toLocaleUpperCase()}</strong>
        </h3>
      </div>
      <div>
        {TagBlogs?.map((x) => (
          <div key={x.id}>
            <Blog  {...x} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagBlog;
