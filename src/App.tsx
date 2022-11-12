import { createContext, useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import GitHubButton from 'react-github-btn'
import {
  CodingSelector,
  DesignSelector,
  SocialSelector,
} from "./components/selector";
import { TaskView } from "./components/task";
import { Task } from "./types/task";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const skillLevels = ["初心者", "中級者", "上級者"];

export const SkillsContext = createContext({ design: 0, coding: 0, social: 0 });

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

    // tasksの中からスキルにマッチするものだけを取り出す
    const newTasks = data?.filter((_task) => {
      const labelNames = _task.labels.flatMap((label) => label.name);
      return (
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
      <button
        type="button"
        onClick={onClick}
        style={{
          fontSize: "24px",
          border: "1px solid black",
          borderRadius: "4px",
          padding: "4px"
        }}
      >
        ガチャを引く
      </button>
      <TaskView task={task} />
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      
<GitHubButton href="https://github.com/Koichiro-Shiratori/task-gacha/issues" data-size="large" data-show-count="true" aria-label="Issue Koichiro-Shiratori/task-gacha on GitHub">Issue</GitHubButton>
        <div style={{ fontSize: "18px" }}>
          <div>
            <DesignSelector onChange={setDesign} />
          </div>
          <div>
            <CodingSelector onChange={setCoding} />
          </div>
          <div>
            <SocialSelector onChange={setSocial} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <Button skills={skills} />
        </div>
      </div>
    </SkillsContext.Provider>
  );
}

export default App;
