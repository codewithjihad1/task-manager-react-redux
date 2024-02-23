import React from "react";
import ProjectsList from "./projects/ProjectsList";
import TeamMembers from ".//projects/TeamMembers";

export default function SideBar() {
  return (
    <div className="sidebar">
      <ProjectsList />
      <TeamMembers />
    </div>
  );
}
