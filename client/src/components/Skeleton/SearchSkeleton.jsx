import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SearchSkeleton.css";
const SearchSkeleton = ({items}) => {
  return (
    Array(items).fill(0).map((item, idx) => (
        <div className="SearchSkeleton" key={idx}>
         <Skeleton circle width={40} height={40} />
         <div className="SearchSkeleton-info">
          <Skeleton count={2} />
        </div>
    </div>
    )
  )
  )
};

export default SearchSkeleton;
