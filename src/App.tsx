import { createContext, useCallback, useEffect, useState } from "react";
import useSWR from 'swr';
import reactLogo from "./assets/react.svg";
import "./App.css";

const fetcher = (url:string) => fetch(url).then(r => r.json());

const rarities = ["ノーマル", "レア", "スーパーレア", "スーパースペシャルレア"];

export const SkillsContext = createContext({ design: 0, coding: 0, social: 0 });

const DesignSelector: React.FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <>
      <strong>デザイン力</strong>
      {" : "}
      <select
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      >
        <option value={0}>初心者</option>
        <option value={1}>中級者</option>
        <option value={2}>上級者</option>
      </select>
    </>
  );
};

const CodingSelector: React.FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <>
      <strong>コーディング力</strong>
      {" : "}
      <select
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      >
        <option value={0}>初心者</option>
        <option value={1}>中級者</option>
        <option value={2}>上級者</option>
      </select>
    </>
  );
};
const SocialSelector: React.FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <>
      <strong>課題発見力</strong>
      {" : "}
      <select
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      >
        <option value={0}>初心者</option>
        <option value={1}>中級者</option>
        <option value={2}>上級者</option>
      </select>
    </>
  );
};

type User = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
}

type Task = {
  url: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  title: string;
  state: string,
  assignee: User | null;
  assignees: User[] | [];
  user: User;
  labels: [
    {
      id: number;
      name: string;
      color: string;
    }
  ];
}

// Buttonという名前のReactのFunctional Componentを作成
const Button: React.FC<{ skills: any }> = ({ skills }) => {
  // useState hookでtask, setTaskを初期化
  // https://ja.reactjs.org/docs/hooks-state.html
  const [task, setTask] = useState<Task | undefined>(undefined);

  const { data } = useSWR<Task[]>('https://api.github.com/repos/Koichiro-Shiratori/task-gacha/issues', fetcher);
  console.log(data);

  // buttonをクリックしたら呼び出されるコールバック関数
  const onClick = () => {
    if (!data) {
      return;
    }
    // raritiesのなかからランダムに一つ取り出す
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    // tasksの中からrarityにマッチするものだけを取り出す
    const newTasks = data?.filter((_task) => {
      return (
        _task.labels.filter((label) => (label.name === 'レア度: '+rarity)).length > 0 &&
        _task.labels.filter((label) => (label.name === 'デザイン力: '+ (['初心者', '中級者', '上級者'][skills.design]))).length > 0 &&
        _task.labels.filter((label) => (label.name === 'コーディング力: '+ (['初心者', '中級者', '上級者'][skills.coding]))).length > 0 &&
        _task.labels.filter((label) => (label.name === '課題発見力: '+ (['初心者', '中級者', '上級者'][skills.social]))).length > 0
      );
    });
    // newTasksのなかからランダムに一つ取り出してtaskという変数にsetする
    const newTask = newTasks[Math.floor(Math.random() * newTasks.length)];
    setTask(newTask);
  };

  return (
    <>
      <button type="button" onClick={onClick}>
        ガチャを引く
      </button>
      {task ? (
        <>
          <h2>
            {task.title}
          </h2>
          <div>
            <ul>
              {task.labels.map((label) => (
                <li>{label.name}</li>
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

function App() {
  const [skills, setSkills] = useState({ design: 0, coding: 0, social: 0 });

  const setDesign = useCallback(
    (value: number) => {
      setSkills({
        design: value,
        coding: skills.coding,
        social: skills.social,
      });
    },
    [skills]
  );
  const setCoding = useCallback(
    (value: number) => {
      setSkills({
        design: skills.design,
        coding: value,
        social: skills.social,
      });
    },
    [skills]
  );
  const setSocial = useCallback(
    (value: number) => {
      setSkills({
        design: skills.design,
        coding: skills.coding,
        social: value,
      });
    },
    [skills]
  );

  return (
    <SkillsContext.Provider value={{ design: 0, coding: 0, social: 0 }}>
      <div className="App">
        <pre>{JSON.stringify(skills)}</pre>
        <div className="card">
          <div>
            <DesignSelector onChange={setDesign} />
          </div>
          <div>
            <CodingSelector onChange={setCoding} />
          </div>
          <div>
            <SocialSelector onChange={setSocial} />
          </div>
          <br />
          <Button skills={skills} />
        </div>
      </div>
    </SkillsContext.Provider>
  );
}

export default App;
