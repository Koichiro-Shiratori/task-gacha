import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const rarities = [
  "ノーマル",
  "レア",
  "スーパーレア",
  "スーパースペシャルレア",
];

const tasks = [
  {rarity: "ノーマル", task: "バグを発見する"},
  {rarity: "ノーマル", task: "新機能を提案する"},
  {rarity: "レア", task: "バグを修正する"},
  {rarity: "スーパーレア", task: "タスクを追加できるようにする"},
  {rarity: "スーパーレア", task: "デザインを磨き上げる"},
  {rarity: "スーパースペシャルレア", task: "タスクガチャを完成させる"},
];

// Buttonという名前のReactのFunctional Componentを作成
const Button: React.FC = () => {
  // useState hookでtask, setTaskを初期化
  // https://ja.reactjs.org/docs/hooks-state.html
  const [task, setTask] = useState(tasks[0]);

  // buttonをクリックしたら呼び出されるコールバック関数
  const onClick = () => {
    // raritiesのなかからランダムに一つ取り出す
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    // tasksの中からrarityにマッチするものだけを取り出す
    const newTasks = tasks.filter((t) => {
      return t.rarity === rarity;
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
      <h2>{task.rarity} : {task.task}</h2>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <div className="card">
        <Button />
      </div>
    </div>
  )
}

export default App
