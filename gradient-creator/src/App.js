import { useRef, useState } from "react";

const defaultColor = {
  first: "#7E2ADB",
  second: "#9129E4",
  third: "#B227F4",
};

const defaultOpacity = {
  first: "0",
  second: "50",
  third: "100",
};

const App = () => {
  const [color, setColor] = useState({
    first: defaultColor.first,
    second: defaultColor.second,
    third: defaultColor.third,
  });

  const [opacity, setOpacity] = useState({
    first: defaultOpacity.first,
    second: defaultOpacity.second,
    third: defaultOpacity.third,
  });

  const cssRef = useRef(null);

  const handleHexChange = (e) => {
    switch (e.target.id) {
      case "first":
        setColor({ ...color, first: e.target.value });
        break;
      case "second":
        setColor({ ...color, second: e.target.value });
        break;
      case "third":
        setColor({ ...color, third: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleOpacityChange = (e) => {
    switch (e.target.id) {
      case "first":
        setOpacity({ ...opacity, first: e.target.value });
        break;
      case "second":
        setOpacity({ ...opacity, second: e.target.value });
        break;
      case "third":
        setOpacity({ ...opacity, third: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleReset = (e) => {
    switch (e.target.id) {
      case "first":
        setColor({ ...color, first: defaultColor.first });
        setOpacity({ ...opacity, first: defaultOpacity.first });
        break;
      case "second":
        setColor({ ...color, second: defaultColor.second });
        setOpacity({ ...opacity, second: defaultOpacity.second });
        break;
      case "third":
        setColor({ ...color, third: defaultColor.third });
        setOpacity({ ...opacity, third: defaultOpacity.third });
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ width: 500 }}>
      <div
        style={{
          height: 200,
          background: `linear-gradient(90deg, ${color.first} ${opacity.first}%, ${color.second} ${opacity.second}%, ${color.third} ${opacity.third}%)`,
        }}
      />

      <ColorForm
        id="first"
        color={color.first}
        opacity={opacity.first}
        handleOpacityChange={handleOpacityChange}
        handleHexChange={handleHexChange}
        handleReset={handleReset}
      />

      <ColorForm
        id="second"
        color={color.second}
        opacity={opacity.second}
        handleOpacityChange={handleOpacityChange}
        handleHexChange={handleHexChange}
        handleReset={handleReset}
      />

      <ColorForm
        id="third"
        color={color.third}
        opacity={opacity.third}
        handleOpacityChange={handleOpacityChange}
        handleHexChange={handleHexChange}
        handleReset={handleReset}
      />

      <div>
        <textarea
          type="text"
          style={{
            marginTop: 50,
          }}
          ref={cssRef}
          value={`
		  background: 
		    linear-gradient(
				90deg,
				${color.first}, ${opacity.first},
				${color.second}, ${opacity.second},
				${color.third}, ${opacity.third},
			);
		  `}
          rows="10"
          cols="35"
          disabled
        />
        <button
          onClick={() => {
            cssRef.current.select();
            document.execCommand("copy");
            document.getSelection().removeAllRanges();
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

const ColorForm = ({
  id,
  color,
  opacity,
  handleOpacityChange,
  handleHexChange,
  handleReset,
}) => {
  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <input
        id={id}
        type="number"
        value={opacity}
        min="0"
        max="100"
        onChange={handleOpacityChange}
      />
      <div
        style={{
          width: 50,
          height: 50,
          background: color,
          border: "1px solid",
        }}
      />
      <input
        id={id}
        type="text"
        value={color}
        onChange={handleHexChange}
        maxLength="7"
      />
      <button id={id} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default App;
