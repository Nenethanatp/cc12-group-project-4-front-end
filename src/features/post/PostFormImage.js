
function PostFormImage({ postImage, index, input, setInput }) {
  const { postImages } = input;
  // console.log(postImages);
  const handleDeletePhoto = () => {
    // console.log(postImages[index]);
    postImages.splice(index, 1);
    setInput({ ...input, postImages: postImages });
  };
  return (
    <div className="relative">
      <i
        className="fa-regular fa-xmark absolute top-3 right-2 w-[20px] "
        onClick={handleDeletePhoto}
      />

      <img
        src={URL.createObjectURL(postImage)}
        className="img-fluid mt-2 "
        alt="post"
      />
    </div>
  );
}

export default PostFormImage;
