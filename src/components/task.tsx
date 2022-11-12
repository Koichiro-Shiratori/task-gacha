import { Task } from "../types/task";

export const TaskView: React.FC<{ task?: Task }> = ({ task }) => {
  return (
    <>
      {task ? (
        <>
          <h2>
            <a href={task.html_url} target="_blank">
              {task.title}
            </a>
          </h2>
          <div>
            <ul>
              {task.labels.map((label) => (
                <li key={label.name}>{label.name}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <h2>タスクがありません</h2>
      )}
    </>
  );
};
