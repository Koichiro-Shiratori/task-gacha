import { useEffect, useState } from "react";

const AbstractSelector: React.FC<{
  skillName: string;
  onChange: (value: number) => void;
}> = ({ skillName, onChange }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div style={{ display: "flex", margin: "10px 0" }}>
      <strong style={{ minWidth: "8em" }}>{skillName}</strong>
      <select
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        style={{ fontSize: "18px", padding: "4px" }}
      >
        <option value={0}>初心者</option>
        <option value={1}>中級者</option>
        <option value={2}>上級者</option>
      </select>
    </div>
  );
};

export const DesignSelector: React.FC<{
  onChange: (value: number) => void;
}> = ({ onChange }) => {
  return <AbstractSelector skillName="デザイン力" onChange={onChange} />;
};

export const CodingSelector: React.FC<{
  onChange: (value: number) => void;
}> = ({ onChange }) => {
  return <AbstractSelector skillName="コーディング力" onChange={onChange} />;
};

export const SocialSelector: React.FC<{
  onChange: (value: number) => void;
}> = ({ onChange }) => {
  return <AbstractSelector skillName="課題発見力" onChange={onChange} />;
};
