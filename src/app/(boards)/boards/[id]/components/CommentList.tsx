"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import DefaultProfile from "@/assets/icons/defaultProfile.svg";
import EditIcon from "@/assets/icons/pencilIcon.svg";
import DeleteIcon from "@/assets/icons/trashIcon.svg";
import { ICommentList } from "@/apis/comment/getComment";
import dayjs from "dayjs";
import Image from "next/image";
import deleteComment from "@/apis/comment/deleteComment";
import CommonModal from "@/_components/CommonModal";
import DeleteModal from "./DeleteModal";

interface ICommentListProps {
  list: ICommentList;
  myId: number | undefined;
  onDelete: () => void;
}

function CommentList({ list, myId, onDelete }: ICommentListProps) {
  const { id, content, createdAt, writer } = list;
  const { id: writerId, image, name } = writer;
  const [viewModal, setViewModal] = useState(false);
  const isMyComment = writerId === myId;
  const formattedDate = dayjs(createdAt).format("YYYY.MM.DD.");

  const handleViewModal = () => {
    setViewModal(!viewModal);
  };

  const handleClickDeleteButton = async () => {
    try {
      await deleteComment(id);
      onDelete();
    } catch (error) {
      console.error("Failed to fetch Delete Comment: ", error);
    }
    handleViewModal();
  };

  return (
    <>
      <li className="flex gap-[15px] rounded-[10px] px-5 py-4 shadow-custom-shadow sm:gap-5 sm:px-[30px] sm:py-5 lg:py-[22px]">
        <div className="flex h-10 w-10 overflow-hidden rounded-full sm:h-[50px] sm:w-[50px]">
          {image ? (
            <Image src={image} alt={name} style={{ objectFit: "cover" }} />
          ) : (
            <DefaultProfile width="100%" height="100%" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between gap-1">
            <span className="font-semibold leading-[1.7] text-primary-gray-500 sm:text-lg sm:leading-[1.4]">
              {name}
            </span>
            {isMyComment && (
              <div className="flex gap-[15px] sm:gap-5">
                <button className="flex h-5 w-5 items-center justify-center p-[3px] sm:h-6 sm:w-6 sm:p-[3.5px]">
                  <EditIcon />
                </button>
                <button
                  onClick={handleViewModal}
                  className="flex h-5 w-5 items-center justify-center px-[3.75px] py-[3px] sm:h-6 sm:w-6 sm:px-[4.5px] sm:pb-[3.5px] sm:pt-[3.62px]"
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
          <p className="mb-1 text-sm leading-[1.7] text-primary-gray-500 sm:mb-[10px] sm:mt-[6px] sm:text-base">
            {content}
          </p>
          <span className="text-xs leading-[1.5] text-primary-gray-400 sm:text-sm">{formattedDate}</span>
        </div>
      </li>
      <CommonModal active={viewModal} close={handleViewModal}>
        <DeleteModal onClick={handleClickDeleteButton} />
      </CommonModal>
    </>
  );
}

export default CommentList;
