"use client";

import CrossIcon from "@/components/icons/cross-icon";
import EditIcon from "@/components/icons/edit-icon";
import { Input } from "@/components/ui/input";
import { SessionItem } from "@/types/common";
import React, { useEffect, useRef, useState } from "react";
import DeleteModal from "./delete-modal";

interface Props {
  id: string;
  editedSession: any;
  isEditing: boolean;
  handleInputChange: any;
  handleKeyDown: any;
  handleSaveClick: any;
  sessionItem: SessionItem;
  selectSession: (id: string) => void;
  name: string;
  handleEditClick: any;
  handleRemoveSession: (id: string) => void;
}

function EditSessions({
  id,
  isEditing,
  editedSession,
  handleInputChange,
  handleKeyDown,
  handleEditClick,
  handleSaveClick,
  name,
  selectSession,
  sessionItem,
  handleRemoveSession,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [deleteData, setDeleteData] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState<boolean>(false);

  const handleOpenDeleteModal = (sessionItem: SessionItem) => {
    setShowDeleteConfirmationModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteConfirmationModal(false);
  };

  const confirmDelete = () => {
    handleCloseDeleteModal();
    handleRemoveSession(id);
    selectSession("");
  };

  useEffect(() => {
    if (inputRef?.current && isEditing) {
      inputRef?.current?.focus();
    }
  }, [inputRef, isEditing]);

  return (
    <>
      <div className="w-full text-white font-bold text-lg grid grid-cols-7">
        <div className="w-full col-span-5">
          {isEditing ? (
            <Input
              ref={inputRef}
              type="text"
              name="name"
              value={editedSession.name || ""}
              onChange={handleInputChange}
              onKeyDown={(e) => handleKeyDown(e, sessionItem.id)}
              onDoubleClick={() => handleSaveClick(id)}
              onBlur={() => handleSaveClick(id)}
              className="border-b border-black w-full text-black p-2 h-8 focus-within:border-none text-lg focus-visible:ring-offset-0 focus:ring-0"
            />
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => selectSession(id)}
              onDoubleClick={() => handleEditClick(sessionItem)}
            >
              {name}
            </p>
          )}
        </div>
        <button
          className="col-span-1"
          onClick={() => handleOpenDeleteModal(sessionItem)}
        >
          <CrossIcon />
        </button>
        <button
          className="col-span-1"
          onClick={() => {
            if (isEditing) {
              handleSaveClick(id);
            } else {
              handleEditClick(sessionItem);
            }
          }}
        >
          <EditIcon />
        </button>
      </div>
      <DeleteModal
        isOpen={showDeleteConfirmationModal}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default EditSessions;
