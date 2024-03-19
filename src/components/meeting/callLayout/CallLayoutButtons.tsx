import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGrid,
} from "lucide-react";
import { CallLayout } from "./FlexibleLayoutView";

type CallLayaourButtonsProps = {
  layout: CallLayout;
  setLayout: (layout: CallLayout) => void;
};

export default function CallLayaourButtons({
  layout,
  setLayout,
}: CallLayaourButtonsProps) {
  return (
    <div className="mx-auto w-fit space-x-6">
      <button onClick={() => setLayout("sp-vertical")}>
        <BetweenVerticalEnd
          className={layout !== "sp-vertical" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("sp-horizontal")}>
        <BetweenHorizonalEnd
          className={layout !== "sp-horizontal" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("sp-grid")}>
        <LayoutGrid className={layout !== "sp-grid" ? "text-gray-400" : ""} />
      </button>
    </div>
  );
}
