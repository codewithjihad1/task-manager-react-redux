import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { useGetTeamQuery } from "../../features/teams/teamApi";
import { useAddTaskMutation } from "../../features/add/addTaskApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddNewTask() {
  const { data: projects } = useGetProjectsQuery();
  const { data: team } = useGetTeamQuery();
  const navigate = useNavigate();

  // local state
  const [taskName, setTaskName] = useState("");
  const [teamMember, setTeamMember] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");

  const [addTask] = useAddTaskMutation();

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let projectIndex = projects.findIndex(
      (curItem) => curItem.projectName === projectName
    );
    let teamIndex = team.findIndex((curItem) => curItem.name === teamMember);

    addTask({
      taskName,
      teamMember: team[teamIndex],
      project: projects[projectIndex],
      deadline: deadline,
      status: "pending",
    });

    navigate("/");
  };

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label htmlFor="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                required
                placeholder="Implement RTK Query"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                name="teamMember"
                id="lws-teamMember"
                required
                onChange={(e) => setTeamMember(e.target.value)}
              >
                <option value="" hidden selected>
                  Select Job
                </option>
                {team?.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>
              <select
                id="lws-projectName"
                name="projectName"
                required
                onChange={(e) => setProjectName(e.target.value)}
              >
                <option value="" hidden selected>
                  Select Project
                </option>
                {projects?.map((project) => (
                  <option key={project.id} value={project.projectName}>
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-deadline"
                required
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="text-right">
              <button type="submit" className="lws-submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
