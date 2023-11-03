import React from 'react'
import Card from './Card'

const RelatedBlogs = ({RelatedBlog,id}) => {
    // console.log(RelatedBlog);
  return (
    <div>
    <div className="blog-heading text-start pt-3 py-2 mb-4">
      Related Blogs
    </div>
    <div className="col-md-12 text-left justify-content-center">
      <div className="row gx-5">
        {RelatedBlog.length === 1 && (
          <h5 className="text-center">
            Related Blogs not found with this current blog
          </h5>
        )}
        {RelatedBlog
          ?.filter((blogs) => blogs.id !== id)
          .map((item) => (
            <Card {...item} />
          ))}
      </div>
    </div>
  </div>
  )
}

export default RelatedBlogs