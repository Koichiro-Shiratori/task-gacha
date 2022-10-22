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

export const DesignSelector: React.FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  return <AbstractSelector skillName="デザイン力" onChange={onChange} />;
};

export const CodingSelector: React.FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  return <AbstractSelector skillName="コーディング力" onChange={onChange} />;
};

export const SocialSelector: React.FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  return <AbstractSelector skillName="課題発見力" onChange={onChange} />;
};
