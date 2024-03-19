import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import FlexibleCallLayout from "components/meeting/callLayout/FlexibleLayoutView";
import { Loader2 } from "lucide-react";

export default function CallUI() {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  return (
    <div>
      <FlexibleCallLayout />
    </div>
  );
}
