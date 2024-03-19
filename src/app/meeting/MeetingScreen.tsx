import { useCallStateHooks } from "@stream-io/video-react-sdk";
import MeetingEndedScreen from "./MeetingEndedScreen";
import UpcomingMeetingScreen from "./UpcomingMeetingScreen";
import { useState } from "react";
import useStreamCall from "hooks/useStreamCall";
import SetupUI from "./SetupUI";
import CallUI from "./CallUI";

export default function MeetingScreen() {
  const call = useStreamCall();

  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const callEndedAt = useCallEndedAt();
  const callStartAt = useCallStartsAt();

  const [setupComplete, setSetupComplete] = useState(false);

  async function handleSetupComplete() {
    call.join();
    setSetupComplete(true);
  }

  const callIsInFuture = callStartAt && new Date(callStartAt) > new Date();
  const callHasEnded = !!callEndedAt;

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }

  if (callIsInFuture) {
    return <UpcomingMeetingScreen />;
  }

  const description = call.state.custom.description;

  return (
    <div className="space-y-6">
      {description && (
        <p className="text-center">
          Meeting description: <span className="font-bold">{description}</span>
        </p>
      )}
      {setupComplete ? (
        <CallUI />
      ) : (
        <SetupUI onSetuComplete={handleSetupComplete} />
      )}
    </div>
  );
}
