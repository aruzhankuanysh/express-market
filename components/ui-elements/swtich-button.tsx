import React, { useEffect, useState } from "react";

interface SwitchButtonProps {
  checked?: boolean;
  disabled?: boolean;
  onlabel?: string;
  offlabel?: string;
  onstyle?: string;
  offstyle?: string;
  size?: string;
  style?: string;
  width?: number | null;
  height?: number | null;
  color?: string;
  onChange?(checked: boolean): void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  checked: initialChecked = false,
  disabled: initialDisabled = false,
  onlabel = "On",
  offlabel = "Off",
  onstyle = "primary",
  offstyle = "light",
  color = "primary",
  size = "",
  style = "",
  width,
  height,
  onChange,
}) => {
  const [checked, setChecked] = useState<boolean>(initialChecked);
  const [disabled, setDisabled] = useState<boolean>(initialDisabled);

  useEffect(() => {
    if (typeof initialChecked === "boolean" && initialChecked !== checked) {
      setChecked(initialChecked);
    }
  }, [initialChecked]);

  const toggle = () => {
    if (!disabled) {
      const newChecked = !checked;
      setChecked(newChecked);
      if (onChange) onChange(newChecked);
    }
  };

  const enable = () => {
    setDisabled(false);
  };

  const disable = () => {
    setDisabled(true);
  };

  const switchStyle: React.CSSProperties = {};
  if (width) switchStyle.width = `${width}px`;
  if (height) switchStyle.height = `${height}px`;

  const labelStyle: React.CSSProperties = {};
  if (height) labelStyle.lineHeight = `calc(${height}px * 0.8)`;

  const switchClassName = `switch btn ${
    checked ? `on btn-${color}` : `off `
  } ${size ? `btn-${size}` : ""} ${style}`;

  const switchOnClassName = `switch-on btn btn-${color} ${
    size ? `btn-${size}` : ""
  }`;
  const switchOffClassName = `switch-off btn btn-${offstyle} ${
    size ? `btn-${size}` : ""
  }`;
  const switchHandleClassName = `switch-handle btn btn-light ${
    size ? `btn-${size}` : ""
  }`;

  return (
    <div className={switchClassName} style={switchStyle} onClick={toggle}>
      <div className="switch-group">
        <span className={switchOnClassName} style={labelStyle}>
          {onlabel}
        </span>
        <span className={switchOffClassName} style={labelStyle}>
          {offlabel}
        </span>
        <span className={switchHandleClassName} />
      </div>
    </div>
  );
};

export default SwitchButton;
