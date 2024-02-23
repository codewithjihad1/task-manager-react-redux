import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../../features/filters/filterSlice";
import { useGetProjectsQuery } from "../../../features/projects/projectsApi";

export default function ProjectsList() {
  const [activeProjects, setActiveProjects] = useState([]);
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();
  const dispatch = useDispatch();

  // set active projects when projects loaded
  useEffect(() => {
    setActiveProjects(projects);
  }, [projects]);

  useEffect(() => {
    dispatch(updateFilter({ activeProjects }));
  }, [activeProjects, dispatch]);

  // handle project change
  const handleChange = (e, project) => {
    if (e.target.checked) {
      setActiveProjects([...activeProjects, project]);
    } else {
      setActiveProjects(
        activeProjects.filter((curItem) => curItem.id !== project.id)
      );
    }
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error.message}</div>;
  } else if (!isLoading && !isError && projects?.length === 0) {
    content = <div>Projects not found!</div>;
  } else if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => {
      const { projectName, colorClass, id } = project;
      return (
        <div className="checkbox-container" key={project.id}>
          <input
            type="checkbox"
            className={colorClass}
            id={id}
            checked={activeProjects?.includes(project)}
            onChange={(e) => handleChange(e, project)}
          />
          <label htmlFor={id} className="label">
            {projectName}
          </label>
        </div>
      );
    });
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
