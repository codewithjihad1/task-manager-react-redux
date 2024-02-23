import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { useGetTeamQuery } from "../../features/teams/teamApi";
import { useEditTaskMutation } from "../../features/add/addTaskApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTaskQuery } from "../../features/tasks/tasksApi";

export default function AddNewTask() {
  const { data: projects } = useGetProjectsQuery();
  const { data: team } = useGetTeamQuery();
  const navigate = useNavigate();
  const { id: taskId } = useParams();

  const { data: task } = useGetTaskQuery(taskId);
  const {
    taskName: initName,
    teamMember: initMember,
    project: initProject,
    deadline: initDeadline,
  } = task || {};

  // local state
  const [taskName, setTaskName] = useState("");
  const [teamMember, setTeamMember] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    setTaskName(initName);
    setTeamMember(initMember?.name);
    setProjectName(initProject?.projectName);
    setDeadline(initDeadline);
  }, [initDeadline, initMember, initName, initProject]);

  const [editTask, { isSuccess }] = useEditTaskMutation();

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let projectIndex = projects.findIndex(
      (curItem) => curItem.projectName === projectName
    );
    let teamIndex = team.findIndex((curItem) => curItem.name === teamMember);

    editTask({
      id: taskId,
      data: {
        taskName,
        teamMember: team[teamIndex],
        project: projects[projectIndex],
        deadline: deadline,
        status: "pending",
      },
    });
  };
  if (isSuccess) navigate("/");

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
                value={teamMember}
                onChange={(e) => setTeamMember(e.target.value)}
              >
                <option value="" hidden>
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
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              >
                <option value="" hidden>
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
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="text-right">
              <button type="submit" className="lws-submit">
                Update Task
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
