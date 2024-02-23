import TaskListItem from "./TaskListItem";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import { useSelector } from "react-redux";

export default function TaskList() {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const { activeProjects, search } = useSelector((state) => state.filters);

  // filter by active projects
  const filterByActiveProjects = (task) => {
    const taskExist = activeProjects.find(
      (project) =>
        project.id === task.project.id && project.name === task.project.name
    );

    if (taskExist) {
      return true;
    } else {
      return false;
    }
  };

  // filter by search
  const filterBySearch = (task) => {
    if (search) {
      return task.taskName
        .trim()
        .toLowerCase()
        .includes(search.trim().toLowerCase());
    } else {
      return true;
    }
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error.message}</div>;
  } else if (!isLoading && !isError && tasks?.length === 0) {
    content = <div>Tasks not found!</div>;
  } else if (!isLoading && !isError && tasks?.length > 0) {
    const taskToShow = tasks
      .filter(filterByActiveProjects)
      .filter(filterBySearch);

    content =
      taskToShow?.length > 0
        ? taskToShow.map((task) => <TaskListItem key={task.id} task={task} />)
        : "Task not found!";
  }

  return <div className="lws-task-list">{content}</div>;
}
