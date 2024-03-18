import {
  DeviceSettings,
  VideoPreview,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import useStreamCall from "hooks/useStreamCall";
import PermissionPrompt from "components/PermissionPrompt";
import { useEffect, useState } from "react";
import Button from "components/Button";
import AudioVolumeIndicator from "components/AudioVolumeIndicator";

type SetupUIProps = {
  onSetuComplete: () => void;
};

export default function SetupUI({ onSetuComplete }: SetupUIProps) {
  const call = useStreamCall();
  const { useMicrophoneState, useCameraState } = useCallStateHooks();

  const micState = useMicrophoneState();
  const camState = useCameraState();

  const [micCamDisabled, setMicCamDisabled] = useState(false);

  useEffect(() => {
    if (micCamDisabled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [micCamDisabled, call]);

  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
    return <PermissionPrompt />;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center gap-3">
        <AudioVolumeIndicator />
        <DeviceSettings />
      </div>
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={micCamDisabled}
          onChange={(e) => setMicCamDisabled(e.target.checked)}
        />
        Join with mic and camera off
      </label>
      <Button onClick={onSetuComplete}>Join metting</Button>
    </div>
  );
}
