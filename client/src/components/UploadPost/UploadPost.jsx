import React, { useContext, useState } from "react";
import { uploadPost } from "../../utils/api/api";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import userPic from "../Post/assets/user.png";
import { POST_TYPES } from "../../constants/constants";
import "./UploadPost.css"
import TextareaAutosize from 'react-textarea-autosize';

function setNativeValue(element, value) {
  let lastValue = element.value;
  element.value = value;
  let event = new Event("input", { target: element, bubbles: true });
  // React 15
  event.simulated = true;
  // React 16
  let tracker = element._valueTracker;
  if (tracker) {
      tracker.setValue(lastValue);
  }
  element.dispatchEvent(event);
}


const UploadPost = ({refreshFn}) => {
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
      refreshFn()

      var input = document.getElementById("posttypingarea");
      setNativeValue(input, "");

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
    <div className="stretchy w-full rounded-lg shadow-lg p-[20px] bg-white mb-4">
      <div className="wrapper flex flex-col">
        <div className="top flex items-center mb-4">
          <img
            src={user.profilePicture ? user.profilePicture : userPic}
            alt="profilepic"
            className="w-[50px] h-[50px] rounded-full mr-[10px] object-cover"
          />
          <TextareaAutosize
            id="posttypingarea"
            type="text"
            placeholder="What's your Link request?"
            className="flex-grow focus:outline-none border border-gray-300 rounded-lg p-2"
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
        <hr className="mb-4" />
        <div className="bottom flex items-center justify-between">
          <div className="flex items-center">
            <label htmlFor="file" className="flex items-center cursor-pointer">
              <span className="mr-2">Upload an Image</span>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".png, .jpg, .jpeg"
              />
            </label>
            <select
              onChange={(e) => setType(e.target.value)}
              className="ml-4 border border-gray-300 rounded-lg p-2"
            >
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
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold whitespace-nowrap"
          >
            {loading ? "Submitting" : "Submit Request 🔗"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPost;
