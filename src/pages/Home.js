import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/SideBar";
import TasksContainer from "../components/tasks/TasksContainer";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="container relative">
        <Sidebar />

        <TasksContainer />
      </div>
    </>
  );
}
