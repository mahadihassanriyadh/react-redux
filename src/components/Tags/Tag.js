import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagRemoved, tagSelected } from "../../features/filter/filterSlice";

const Tag = ({ tag }) => {
  const { title } = tag;
  const dispatch = useDispatch();
  const { selectedTags } = useSelector((state) => state.filter);

  const isSelected = selectedTags.includes(title);

  const handleSelect = () => {
    if (isSelected) {
      dispatch(tagRemoved(title));
    } else {
      dispatch(tagSelected(title));
    }
  };
  return (
    <div
      className={`${
        isSelected ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
      } px-4 py-1 rounded-full cursor-pointer`}
      onClick={handleSelect}
    >
      {title}
    </div>
  );
};

export default Tag;

// selected
// <div className="bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer">
//   redux
// </div>;
