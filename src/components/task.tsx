import { Task } from "../types/task";

export const TaskView: React.FC<{ task?: Task }> = ({ task }) => {
  return (
    <>
      {task ? (
        <>
          <h2>{task.title}</h2>
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
