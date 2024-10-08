"use client";
import React, { useRef } from "react";
import IconCross from "../icons/IconCross";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  selectedTag: String[];
  addTag: (tag: string) => void;
  removeTag: (tag: String) => void;
};

const AddTag = ({ selectedTag, addTag, removeTag }: Props) => {
  const tagRef = useRef<HTMLInputElement>(null);

  const check = () => {
    const newTag = tagRef.current?.value.trim();
    if (newTag) {
      addTag(newTag);
      if (tagRef.current) {
        tagRef.current.value = "";
      }
    }
  };

  return (
    <>
      <div className=" mt-2 border py-3 px-1 border-gray-300 flex gap-2 items-center rounded-[5px] ">
        <h1>Tags:</h1>
        {selectedTag?.map((el, index) => (
          <div
            className=" border relative border-dashboardBlueShadow px-1 text-button rounded-[5px] "
            key={index}
          >
            <span
              onClick={() => removeTag(el)}
              className=" border border-gray-300 cursor-pointer rounded-full absolute top-[-8px] right-[-8px] "
            >
              <IconCross className=" stroke-delete size-4" />
            </span>
            <span>{el}</span>
          </div>
        ))}
      </div>
      <div className=" mb-2 space-x-2 ">
        <label htmlFor="tag">Add Tags:</label>
        <input
          className=" rounded-[5px] px-2 py-1 border border-dashboardBlueShadow "
          ref={tagRef}
          type="text"
          id="tag"
        />
        <Button
          type="button"
          className=" bg-dashboardBlueShadow hover:bg-button text-button hover:text-white "
          onClick={check}
        >
          add
        </Button>
      </div>
    </>
  );
};

export default AddTag;
