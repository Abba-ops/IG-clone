import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import {
  HeartIcon as HeartIconFilled,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";

export default function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [viewComment, setViewComment] = useState(false);

  const handleClick = (event) => {
    setViewComment((current) => !current);
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      )[(db, id)]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      )[(db, id)]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-none md:rounded-lg shadow-sm border-gray-300">
      <div className="flex items-center p-2 h-14">
        <img
          src={userImg}
          alt={username}
          className="rounded-full cursor-pointer h-10 w-10 object-contain p-0.5 mr-2 border-red-400 border-[2.5px]"
        />
        <p className="flex-1 font-medium">
          <span className="cursor-pointer">{username}</span>{" "}
          <CheckBadgeIcon
            title="Verified"
            className="h-4 inline text-blue-400"
          />
        </p>
        <EllipsisHorizontalIcon className="h-6 cursor-pointer" />
      </div>
      <img src={img} className="object-cover w-full" />
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled className="btn text-red-500 hover:opacity-100 hover:animate-bounce" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatBubbleOvalLeftIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-[-30deg] pb-1" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-medium mb-1 cursor-pointer">
            {likes.length} {likes.length > 1 ? "likes" : "like"}
          </p>
        )}
        <span className="font-medium mr-1 cursor-pointer">{username}</span>
        {caption}
        <p
          onClick={handleClick}
          className="text-gray-500 mt-1 cursor-pointer text-sm"
        >
          View {comments.length > 1 ? "all" : ""} {comments.length}
          {comments.length > 1 ? " comments" : " comment"}
        </p>
      </p>
      {comments.length > 0 && (
        <div
          className={`ml-9 ${session ? "" : "mb-4"} ${
            viewComment === true ? "h-16" : "hidden"
          } overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-thin`}
        >
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-2">
              <img
                src={comment.data().userImage}
                className="h-6 rounded-full cursor-pointer"
                alt={comment.data().username}
              />
              <p className="text-sm flex-1">
                <span className="font-bold pr-1">
                  <span className="cursor-pointer">
                    {comment.data().username}
                  </span>{" "}
                  <CheckBadgeIcon
                    title="Verified"
                    className="h-4 inline text-blue-400"
                  />
                </span>
                {comment.data().comment}
              </p>
              <Moment
                className="pr-5 text-[0.60rem] text-gray-400 uppercase cursor-pointer"
                fromNow
              >
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {session && <hr />}
      {session && (
        <form className="flex items-center px-3 py-2">
          <FaceSmileIcon className="h-7 cursor-pointer" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className={`font-semibold ${
              !comment.trim() ? "text-blue-200" : "text-blue-500"
            } `}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
