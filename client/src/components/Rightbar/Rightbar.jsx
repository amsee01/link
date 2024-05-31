import React, { useContext, useEffect, useState } from "react";
import birthdayIcon from "../../assets/gift.png";
import adImage from "../../assets/ad.jpg";
import profilePic from "./assets/no-profile-image.png";
import OnlineUsers from "../OnlineUsers/OnlineUsers";
import { Users } from "../../data/dummyData";
import { toast } from "react-toastify";
import {
  API,
  followUser,
  getUserFriends,
  unfollowUser,
  getUserProfileData,
} from "../../utils/api/api";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Rightbar = ({ user }) => {
  // const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [isFollowed, setIsFollowed] = useState(
    currentUser?.followings.includes(user?._id)
  );

  useEffect(() => {
    setIsFollowed(currentUser?.followings.includes(user?._id));
  }, [currentUser, user?._id]);

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const res = await getUserFriends(user?._id);
  //       setFriends(res.data.friends);
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getFriends();
  // }, [user?._id]);

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await unfollowUser(currentUser._id, user._id);
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await followUser(currentUser._id, user._id);
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setIsFollowed(!isFollowed);
  };
  const RightBarHome = () => {
    return (
      <>
        <div className="flex items-center">
          <img
            src={birthdayIcon}
            alt="birthday icon"
            className="w-[40px] h-[40px] mr-[10px]"
          />
          <span className="font-semibold text-md">
            <b>Henry Crentsil</b> and <b>52 others</b> have a birthday today
          </span>
        </div>
        <img
          src={adImage}
          alt="advert Image"
          className="w-full rounded-lg mt-[30px] mb-[30px]"
        />
        <h1 className="font-bold text-lg mb-[20px]">Online</h1>
        <ul className="m-0 p-0">
          {Users.map((user) => (
            <OnlineUsers key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const RightBarProfile = () => {
    const [editing, setEditing] = useState(false);
    const [city, setCity] = useState(user.city);
    const [from, setFrom] = useState(user.from);
    const [loading, setLoading] = useState(false);

    const handleEdit = () => {
      setEditing(!editing);
      if (!editing) {
        setCity(city);
        setFrom(from);
      }
    };

    const handleUserCityAndFromSave = async () => {
      setLoading(true);
      try {
        const res = await API.put(
          `/users/${currentUser._id}/updateCityAndFrom`,
          {
            city,
            from,
          }
        );
        setCity(city);
        setFrom(from);
        toast.success(res.data.message);
        setLoading(false);
        setEditing(false);
        console.log(from);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to Update Information");
        console.log(error);
      }
    };

    return (
      <>
        {user.username !== currentUser?.username && (
          <button
            className="bg-green-600 text-white mt-10 mb-5 py-2 px-5 rounded-md cursor-pointer hover:bg-green-700 transition"
            onClick={handleFollow}
          >
            {isFollowed ? "Following" : "Follow"}
          </button>
        )}
        <h1 className="font-bold text-xl mb-[10px] ml-4">About Me</h1>
        <div className="mb-[30px] ml-4">
          <div className="mb-[10px]">
            <span className="font-semibold mr-[15px] text-slate-500">
              Location:
            </span>
            {editing ? (
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded px-2 py-1"
                autoFocus
              />
            ) : (
              <span>{city}</span>
            )}
          </div>
          <div className="mb-[10px]">
            <span className="font-semibold mr-[15px] text-slate-500">
              Major:
            </span>
            {editing ? (
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border rounded px-2 py-1"
                autoFocus
              />
            ) : (
              <span>{from}</span>
            )}
          </div>
          {editing ? (
            <button
              className="bg-blue-600 text-white mt-5 py-2 px-5 rounded-md cursor-pointer hover:bg-blue-700 transition"
              onClick={handleUserCityAndFromSave}
              disabled={loading}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white mt-5 py-2 px-5 rounded-md cursor-pointer hover:bg-blue-700 transition"
              onClick={handleEdit}
            >
              Edit Info
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <div style={{ flex: 3.5 }}>
      <div className="pt-[20px] pr-[20px]">
        {user ? <RightBarProfile /> : <RightBarHome />}
      </div>
    </div>
  );
};

export default Rightbar;
