import React from "react";
import { useSelector } from "react-redux";
// import { getTimelinePost } from "../../Redux/Actions/PostActions";
import Post from "./../Post/Post";
import "./Posts.css";
import PostSkeleton from "./../Skeleton/PostSkeleton";
import Message from "./../LoadingError/Error";

 
const Posts = ({ location }) => {

  // const params = useParams();
  //const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userLogin.userInfo);
  const { posts, loading, error } = useSelector((state) => state.postTimeline);
  const { postUser, loadingPost, errorPost } = useSelector((state) => state.getPostUserById);
  // const { post } = useSelector((state) => state.postCreate);

  // useEffect(() => {
  //   dispatch(getTimelinePost(user._id));
  // }, [post]);

  // if (params.id) {
  //   posts = posts.filter((post) => post.userId === params.id);
  // }
  // useEffect(() => {
  //   dispatch(getTimelinePost(user._id));
  // }, [posts])

  return (
    <div className="Posts">
      {location === "postTimeline" ? (
        <>
          {loading ? (
            <PostSkeleton cards={4} />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              {posts.map((post, id) => {
                return <Post postData={post} user={user} key={id} />;
              })}
            </>
          )}
        </>
      ) : (
        <>
          {loadingPost ? (
            <PostSkeleton cards={4} />
          ) : errorPost ? (
            <Message variant="alert-danger">{errorPost}</Message>
          ) : (
            <>
              {postUser.map((post, id) => {
                return <Post postData={post} user={user} key={id} />;
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Posts;
