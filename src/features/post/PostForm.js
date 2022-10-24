import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getTypes } from "../../store/typeSlice";
import { useDispatch } from "react-redux";
import { useLoading } from "../../context/LoadingContext";
import { toast } from "react-toastify";
import PostFormImage from "./PostFormImage";
import AddPhotoButton from "./AddPhotoButton";

function PostForm({ handleCreatePost, toggleCreatePost }) {
  const fileEl = useRef();

  const { startLoading, stopLoading } = useLoading();

  const user = useSelector((state) => state.auth.user);
  const [input, setInput] = useState({
    content: "",
    typeId: 1,
    userId: user.id,
    latitude: 13.5,
    longitude: 100,
    postImages: [],
  });

  const handleSetPostImage = (value) => {
    setInput({ ...input, postImages: [...input.postImages, value] });
  };

  const onCreatePost = async (e) => {
    try {
      e.preventDefault();

      if (!input.content) {
        return toast.error("content is required");
      }
      if (!input.typeId) {
        return toast.error("type is required");
      }
      if (!input.latitude || !input.longitude) {
        return toast.error("location is required");
      }

      startLoading();
      await handleCreatePost(input);

      input.content = "";
      input.typeId = 1;
      input.userId = user.id;
      input.latitude = 13.5;
      input.longitude = 100;
      input.postImages = [];
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  return (
    <form
      onSubmit={onCreatePost}
      className="h-full w-full p-6 flex justify-center bg-white rounded-t-xl"
    >
      <div className="flex flex-col items-center h-auto w-[100%]  ">
        <div className="items-center w-full">
          <div className="h-12 w-12">
            <button
              className="bg-gray-200 rounded-full p-2 material-symbols-outlined"
              type={"button"}
              onClick={toggleCreatePost}
            >
              keyboard_arrow_down
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-[100%] mt-5">
          <textarea
            className="bg-gray-200 w-full rounded-2xl p-4"
            placeholder="what were you thinking?"
            rows="5"
            value={input.content}
            onChange={(e) => setInput({ ...input, content: e.target.value })}
          ></textarea>

          <div className="w-full pt-5">
            <select
              id="categoryId"
              name="categoryId"
              value={input.typeId}
              className="bg-gray-200 w-full rounded-2xl p-4"
              onChange={(e) =>
                setInput({ ...input, typeId: parseInt(e.target.value) })
              }
            >
              <option value="1">Cat#1</option>
              <option value="2">Cat#2</option>
              <option value="3">Cat#3</option>
              <option value="4">Cat#4</option>
            </select>
          </div>

          <div
            className="flex flex-col items-center w-full mt-5"
            style={{ maxWidth: "300px" }}
          >
            <label htmlFor="postImage" className="form-label">
              อัพโหลดรูปภาพ
            </label>
            <div>
              {input.postImages.length !== 0 ? (
                <>
                  {input.postImages.map((postImage, index) => {
                    return (
                      <PostFormImage
                        key={index}
                        postImage={postImage}
                        index={index}
                        input={input}
                        setInput={setInput}
                      />
                    );
                  })}
                </>
              ) : (
                <AddPhotoButton />
              )}
            </div>
            <input
              type="file"
              className="d-none"
              ref={fileEl}
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleSetPostImage(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
        <button className="bg-amber-400 rounded-3xl p-3 text-lg font-semibold w-full mt-5">
          POST
        </button>
      </div>
    </form>
  );
}

export default PostForm;
