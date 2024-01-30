import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectID: undefined,
    projects: [],
  });

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: id,
      };
    });
  }

  function handleStartProjectState() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: null,
      };
    });
  }

  function handleCancelProjectState() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectID = Math.random().toString();

      const newProject = {
        ...projectData,
        id: projectID,
      };

      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handlerDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectID
        ),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectID
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handlerDeleteProject}
    />
  );

  if (projectState.selectedProjectID === null) {
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelProjectState}
      />
    );
  } else if (projectState.selectedProjectID === undefined) {
    content = <NoProjectSelected onAddProjectState={handleStartProjectState} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <Sidebar
        onAddProjectState={handleStartProjectState}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
