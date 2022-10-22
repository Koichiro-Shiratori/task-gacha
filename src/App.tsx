import { createContext, useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import "./App.css";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const rarities = ["ノーマル", "レア", "スーパーレア", "スーパースペシャルレア"];
const skillLevels = ["初心者", "中級者", "上級者"];

export const SkillsContext = createContext({ design: 0, coding: 0, social: 0 });

const AbstractSelector: React.FC<{
  skillName: string;
  onChange: (value: number) => void;
}> = ({ skillName, onChange }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <>
      <strong>{skillName}</strong>
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

const DesignSelector: React.FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  return <AbstractSelector skillName="デザイン力" onChange={onChange} />;
};

const CodingSelector: React.FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  return <AbstractSelector skillName="コーディング力" onChange={onChange} />;
};

const SocialSelector: React.FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  return <AbstractSelector skillName="課題発見力" onChange={onChange} />;
};

type User = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
};

type Task = {
  url: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  title: string;
  state: string;
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
};

// Buttonという名前のReactのFunctional Componentを作成
const Button: React.FC<{ skills: any }> = ({ skills }) => {
  // useState hookでtask, setTaskを初期化
  // https://ja.reactjs.org/docs/hooks-state.html
  const [task, setTask] = useState<Task | undefined>(undefined);

  const { data } = useSWR<Task[]>(
    "https://api.github.com/repos/Koichiro-Shiratori/task-gacha/issues",
    fetcher
  );

  // buttonをクリックしたら呼び出されるコールバック関数
  const onClick = () => {
    if (!data) {
      return;
    }
    // raritiesのなかからランダムに一つ取り出す
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];

    // 各スキルごとに対応可能なレベル
    const designLevels = skillLevels
      .slice(0, skills.design + 1)
      .map((level) => "デザイン力: " + level);
    console.log(designLevels);
    const codingLevels = skillLevels
      .slice(0, skills.coding + 1)
      .map((level) => "コーディング力: " + level);
    console.log(codingLevels);
    const socialLevels = skillLevels
      .slice(0, skills.social + 1)
      .map((level) => "課題発見力: " + level);
    console.log(socialLevels);

    // tasksの中からrarityにマッチするものだけを取り出す
    const newTasks = data?.filter((_task) => {
      const labelNames = _task.labels.flatMap((label) => label.name);
      return (
        labelNames.includes("レア度: " + rarity) &&
        designLevels
          .map((level) => labelNames.includes(level))
          .includes(true) &&
        codingLevels
          .map((level) => labelNames.includes(level))
          .includes(true) &&
        socialLevels.map((level) => labelNames.includes(level)).includes(true)
      );
    });
    // 取り出されたタスク
    console.log(newTasks.map((_task) => _task.title));
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
