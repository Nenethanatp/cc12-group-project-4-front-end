import { useState } from 'react';
import FsLightbox from 'fslightbox-react';

function PostDetailGallery({ post }) {
  const [toggler, setToggler] = useState(false);

  const postImages = post.PostImages.map((posterImage) => posterImage.imageUrl);

  return (
    <>
      <div className='w-[100%]'>
        <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2'>
          {post.PostImages.length !== 0 &&
            post.PostImages.map((posterImage, index) => {
              return (
                <div key={index} className='h-[250px]'>
                  <img
                    key={index}
                    src={posterImage.imageUrl}
                    alt={post.content}
                    onClick={() => setToggler(!toggler)}
                    className='w-full h-full object-cover rounded-2xl customBgMorph'
                  />
                </div>
              );
            })}
        </div>
      </div>

      <FsLightbox toggler={toggler} sources={postImages} />
    </>
  );
}

export default PostDetailGallery;
