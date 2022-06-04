import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentuser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentuser.followings.includes(user?.id));

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (error) {
                console.log(error)
            }
        };
        getFriends();
    }, [user]);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, { userId: currentuser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, { userId: currentuser._id });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
        } catch (error) {
            console.log(error)
        }
        setFollowed(!followed);
    };

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText"> <b>Ngoc Phuong</b> and <b>5 other friends</b> have a birthday today!</span>
                </div>
                <img className="rightbarAd" src="assets/ad.jpg" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentuser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick} >
                        {followed ? "Unfollow" : "Follow"}
                        {!followed ? <Add /> : <Remove />}
                    </button>
                )}
                <h4 className="rightbarTitle" >User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle" >User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend => (
                        <Link to={"/profile/" + friend.username} style={{ textDecoration: "none", color: "black" }} >
                            <div className="rightbarFollowing">
                                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    )))}
                </div>
            </>
        )
    };

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
