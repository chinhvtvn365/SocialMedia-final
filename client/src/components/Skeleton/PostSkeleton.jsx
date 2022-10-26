import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./PostSkeleton.css";
const PostSkeleton = ({cards}) => {
  return (
    Array(cards).fill(0).map((item, idx) => (
        <div className="PostSkeleton" key={idx}>
      <div className="PostSkeleton-header">
        <div className="PostSkeleton-header-img">
          <Skeleton circle width={40} height={40} />
        </div>
        <div className="PostSkeleton-header-name">
          <Skeleton count={2} />
        </div>
      </div>
      <div className="PostSkeleton-desc">
        <Skeleton />
      </div>
      <div className="PostSkeleton-img">
        <Skeleton height={300} />
      </div>
      <div className="PostSkeleton-cmt">
        <Skeleton height={50} count={2} />
      </div>
    </div>
    ))
    
  );
};

export default PostSkeleton;
