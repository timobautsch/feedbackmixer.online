"use client";

import useSessions from "@/hooks/useSessions";
import { SessionItem } from "@/types/common";
import EditSessions from "./edit-sessions";
import { useState } from "react";

interface Props {
  sessionList?: SessionItem[];
  teacher_id: string;
  selectSession: (id: string) => void;
}

const Sessions = ({ sessionList, teacher_id, selectSession }: Props) => {
  // const sortedSessionList = sessionList?.sort((a, b) =>
  //   a.name.localeCompare(b.name)
  // );
  const {
    sessionData,
    editSessionId,
    editedSession,
    handleRemoveSession,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleKeyDown,
  } = useSessions(sessionList, teacher_id);
  return (
    <div>
      <div className="flex flex-col gap-2 lg:items-start h-1/2 2sm:items-center overflow-y-auto max-h-96">
        {sessionData?.map((sessionItem: SessionItem) => {
          const { name, id } = sessionItem;
          const isEditing = editSessionId === id;
          return (
            <EditSessions
              key={id}
              editedSession={editedSession}
              handleEditClick={handleEditClick}
              handleInputChange={handleInputChange}
              handleKeyDown={handleKeyDown}
              handleRemoveSession={handleRemoveSession}
              handleSaveClick={handleSaveClick}
              id={id}
              isEditing={isEditing}
              name={name}
              selectSession={selectSession}
              sessionItem={sessionItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sessions;
