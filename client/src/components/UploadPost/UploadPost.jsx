import React, { useContext, useState } from "react";
import { uploadPost } from "../../utils/api/api";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import userPic from "../Post/assets/user.png";
import { POST_TYPES } from "../../constants/constants";

const UploadPost = () => {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [type, setType] = useState(POST_TYPES[0]);
  const { user } = useContext(AuthContext);

  const handlePostUpload = async () => {
    setLoading(true);
    try {
      const res = await uploadPost(user._id, desc, file, type);
      toast.success("Post has been Uploaded Successfully!");
      setFile(null);
      setPreview(null);
      setDesc("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Post Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="w-full h-[170px] rounded-lg shadow-lg ">
      <div className="wrapper p-[10px]">
        <div className="top flex items-center">
          <img
            src={user.profilePicture ? user.profilePicture : userPic}
            alt="profilepic"
            className="w-[50px] h-[50px] rounded-full mr-[10px] object-cover"
          />
          <input
            type="text"
            placeholder="What's your Link request?"
            className="w-[80%] focus:outline-none"
            onChange={(e) => setDesc(e.target.value)}
          />
          {preview && (
            <img
              src={preview}
              alt="Image Preview"
              className="w-[50px] h-[50px] rounded-md object-cover ml-[15px]"
            />
          )}
        </div>
        <hr className="m-[20px]" />
        <div className="bottom flex items-center justify-between">
          <div className="flex ml-[20px]">
            <label
              htmlFor="file"
              className="flex items-center mr-[15px] cursor-pointer"
            >
              <span>Upload an Image</span>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".png, .jpg, .jpeg"
              />
            </label>
            <select onChange={(e) => setType(e.target.value)}>
              {POST_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            disabled={loading}
            onClick={handlePostUpload}
            className="bg-green-600 text-white p-[7px] rounded-lg font-bold"
          >
            {loading ? "Submitting" : "Submit Request 🔗"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPost;
