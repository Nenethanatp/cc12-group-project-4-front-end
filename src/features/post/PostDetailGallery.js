import {useState} from 'react';
import FsLightbox from 'fslightbox-react';

function PostDetailGallery({post}) {
  const [toggler, setToggler] = useState(false);

  const postImages = post.PostImages.map(posterImage => posterImage.imageUrl);

  return (
    <>
      <div className='mx-5'>
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {post.PostImages.length && post.PostImages.map((posterImage, index) => {
            return (<div key={index}>
              <img
                key={index}
                src={posterImage.imageUrl}
                alt={post.content}
                onClick={() => setToggler(!toggler)}
                className="w-[100%]"
              />
            </div>)
          })}
        </div>
      </div>

      <FsLightbox
        toggler={toggler}
        sources={postImages}
      />
    </>
  );
}

export default PostDetailGallery;