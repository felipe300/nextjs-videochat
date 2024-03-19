import useStreamCall from "hooks/useStreamCall";
import { useState } from "react";
import CallLayoutView from "./CallLayoutView";
import CallLayaourButtons from "./CallLayoutButtons";
import { CallControls } from "@stream-io/video-react-sdk";
import EndCallButton from "../EndCallButton";
import { useRouter } from "next/navigation";

export type CallLayout = "sp-vertical" | "sp-horizontal" | "sp-grid";

export default function FlexibleCallLayout() {
  const [layout, setLayout] = useState<CallLayout>("sp-vertical");
  const call = useStreamCall();

  const router = useRouter();

  return (
    <div className="space-y-3">
      <CallLayaourButtons layout={layout} setLayout={setLayout} />
      <CallLayoutView layout={layout} />
      <CallControls onLeave={() => router.push(`/meeting/${call.id}/left`)} />
      <EndCallButton />
    </div>
  );
}
