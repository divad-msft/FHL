import { useContext } from "react";
// import { Welcome } from "./sample/Welcome";
import { Home } from "./Home";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";

const showFunction = Boolean(config.apiName);

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  return (
    <div
      className={
        themeString === "default"
          ? "light"
          : themeString === "dark"
          ? "dark"
          : "contrast"
      }
    >
      {/* <Welcome showFunction={showFunction} /> */}
      <Home showFunction={showFunction} />
    </div>
  );
}
