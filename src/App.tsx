import { createContext, useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const rarities = [
  "ノーマル",
  "レア",
  "スーパーレア",
  "スーパースペシャルレア",
];

type Task = {
  rarity: string;
  task: string;
  skills: {
    design: number;
    coding: number;
    social: number;
  }
}
const tasks: Task[] = [
  {rarity: "ノーマル", task: "バグを発見する", skills:{design: 0, coding: 0, social: 0}},
  {rarity: "レア", task: "バグを修正する", skills:{design: 0, coding: 1, social: 0}},
  {rarity: "スーパーレア", task: "新機能を提案する", skills:{design: 1, coding: 1, social: 5}},
  {rarity: "スーパーレア", task: "新機能を実装する", skills:{design: 0, coding: 3, social: 0}},
  {rarity: "スーパーレア", task: "デザインを磨き上げる", skills:{design: 5, coding: 1, social: 0}},
  {rarity: "スーパースペシャルレア", task: "タスクを追加できるようにする", skills:{design: 0, coding: 3, social: 0}},
];

export const SkillsContext = createContext({design: 0, coding: 0, social: 0});

const DesignSelector: React.FC<{onChange: (value: number) => void}> = ({onChange}) => {
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
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </>
  );
};

const CodingSelector: React.FC<{onChange: (value: number) => void}> = ({onChange}) => {

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
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </>
  );
};
const SocialSelector: React.FC<{onChange: (value: number) => void}> = ({onChange}) => {
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
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </>
  );
};

// Buttonという名前のReactのFunctional Componentを作成
const Button: React.FC<{skills: any}> = ({skills}) => {
  // useState hookでtask, setTaskを初期化
  // https://ja.reactjs.org/docs/hooks-state.html
  const [task, setTask] = useState<Task | undefined>(undefined);

  // buttonをクリックしたら呼び出されるコールバック関数
  const onClick = () => {
    // raritiesのなかからランダムに一つ取り出す
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    // tasksの中からrarityにマッチするものだけを取り出す
    const newTasks = tasks.filter((t) => {
      return t.rarity === rarity && t.skills.design <= skills.design && t.skills.coding <= skills.coding;
    });
    // newTasksのなかからランダムに一つ取り出してtaskという変数にsetする
    const newTask = newTasks[Math.floor(Math.random() * newTasks.length)]
    setTask(newTask)
  };

  return (
    <>
      <button type="button" onClick={onClick}>
        ガチャを引く
      </button>
      {task ? (
        <h2>{task.rarity} : {task.task}</h2>
        ) :
        <h2>タスクがありません</h2>
      }
    </>
  );
};

function App() {
  const [skills, setSkills] = useState({design: 0, coding: 0, social: 0});

  const setDesign = useCallback((value: number) => {
    setSkills({design: value, coding: skills.coding, social: skills.social})
  }, [skills]);
  const setCoding = useCallback((value: number) => {
    setSkills({design: skills.design, coding: value, social: skills.social})
  }, [skills]);
  const setSocial = useCallback((value: number) => {
    setSkills({design: skills.design, coding: skills.coding, social: value})
  }, [skills]);

  return (
    <SkillsContext.Provider value={{design: 0, coding: 0, social: 0}}>
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
            <SocialSelector onChange={setSocial}/>
          </div>
          <br />
          <Button skills={skills} />
        </div>
      </div>
    </SkillsContext.Provider>
  )
}

export default App
