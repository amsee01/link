import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import coverImage from "./assets/coverImage.jpg";
import NewsFeed from "../../components/NewsFeed/NewsFeed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ALL } from "../../constants/constants";
import { API, getTimeLinePost, getUserProfileData } from "../../utils/api/api";
import { useParams } from "react-router-dom";
import noProfilePic from "./assets/user.png";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [editDescMode, setEditDescMode] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(ALL);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [refreshPosts, setRefreshPosts] = useState(0);

  // get user profile info
  useEffect(() => {
    const getUserProfileInfo = async () => {
      try {
        const res = await getUserProfileData(username);
        setUser(res.data.userInfo);
        setNewDesc(res.data.userInfo.desc || "");
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfileInfo();
  }, [username]);

  // get user posts
  useEffect(() => {
    const userPosts = async () => {
      try {
        const res = await getTimeLinePost(username);
        setPosts(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    userPosts();
  }, [username, refreshPosts]);

  // filter user posts
  useEffect(() => {
    // handle "Everything" case
    if (filter === ALL) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.type === filter));
    }
  }, [posts, filter]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setProfileImage(file);
      setEditMode(true);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    if (previewImage) {
      const formData = new FormData();
      formData.append("profilePicture", profileImage);
      try {
        const res = await API.put(
          `/users/${currentUser._id}/profile-picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(res.data.message);
        setLoading(false);
        setUser({ ...user, profilePicture: res.data.user.profilePicture });
        setPreviewImage(null);
        setEditMode(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to Update Profile Picture");
        console.log(error);
      }
    } else {
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setPreviewImage(null);
    setEditMode(false);
    setEditDescMode(false);
  };

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleDescSave = async () => {
    setLoading(true);
    try {
      const res = await API.put(`/users/${currentUser._id}/desc`, {
        desc: newDesc,
      });
      toast.success(res.data.message);
      setLoading(false);
      setUser({ ...user, desc: newDesc });
      setEditDescMode(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to Update Description");
      console.log(error);
    }
  };

  const handleRefreshPosts = () => {
    setRefreshPosts(refreshPosts + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar onFilterChange={handleFilterChange} />
        <div style={{ flex: 9 }}>
          <div>
            <div className="h-[350px] relative">
              <img
                src={user.coverPicture || coverImage}
                alt="cover picture"
                className="w-full h-[250px] object-cover"
              />
              <img
                src={previewImage || user.profilePicture || noProfilePic}
                alt="profile picture"
                className="w-[150px] h-[150px] rounded-full object-cover absolute left-0 right-0 m-auto top-[150px] border-[3px] border-white"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-2xl">{user.username}</h1>
              {editDescMode ? (
                <div className="flex flex-col items-center">
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="mt-2.5 p-2 border rounded-md"
                  />
                  <div className="flex mt-2.5">
                    <button
                      onClick={handleDescSave}
                      className="bg-green-600 px-5 py-2 text-white rounded-md hover:bg-green-700 transition"
                    >
                      {loading ? "Saving Changes" : "Save Changes"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 ml-2 px-5 py-2 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{user.desc || "Looking to make connections!"}</span>
                  {username === currentUser?.username && (
                    <>
                      <div className="flex mt-2.5">
                        <label
                          htmlFor="profilePicture"
                          className="text-white cursor-pointer bg-green-600 px-5 py-2 rounded-md hover:bg-green-700 transition"
                        >
                          Edit Profile Photo
                        </label>
                        <button
                          onClick={() => setEditDescMode(true)}
                          className="bg-blue-600 ml-2 px-5 py-2 text-white rounded-md hover:bg-blue-700 transition"
                        >
                          Edit Description
                        </button>
                      </div>
                      <input
                        type="file"
                        id="profilePicture"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </>
                  )}
                </>
              )}
              {editMode && (
                <div className="flex mt-2.5">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 px-5 py-2 text-white rounded-md hover:bg-green-700 transition"
                  >
                    {loading ? "Saving Changes" : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 ml-2 px-5 py-2 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex">
            <NewsFeed
              posts={filteredPosts}
              sorted
              removePost={(post) => handleRefreshPosts()}
            />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
