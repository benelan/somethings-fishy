import React, { useState } from "react";
import {
  CalciteButton,
  CalciteSlider,
  CalciteIcon,
} from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/calcite/calcite.css";

function App() {
  const [sliderValue, setSliderValue] = useState<number | null>(50);

  return (
    <>
      <h1>
        Sample Template
        <CalciteIcon icon="banana" />
      </h1>
      <p>
        This is a sample using Calcite Components React, which can be used to
        reproduce and report issues.
      </p>
      <CalciteButton>Test</CalciteButton>
      <CalciteSlider
        min={1}
        max={100}
        value={sliderValue}
        step={1}
        onCalciteSliderUpdate={(e) =>
          setSliderValue((e?.target as HTMLCalciteSliderElement)?.value)
        }
      />
      <p>The slider currently has a value of {sliderValue}</p>
    </>
  );
}

export default App;
