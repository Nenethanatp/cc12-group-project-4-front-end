function PostFormImage({ postImage, index, input, setInput }) {
  const { postImages } = input;
  console.log(postImages);
  const handleDeletePhoto = () => {
    console.log(postImages[index]);
    postImages.splice(index,1)
    setInput({ ...input, postImages: postImages})
  };
  return (
    <div className="relative">
      <i
        className="fa-regular fa-xmark absolute top-2 right-2 w-[20px] h-[20px] z-10 bg-red-200"
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
