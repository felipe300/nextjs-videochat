"use client";

import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import useLoadCall from "hooks/useLoadCall";
import { useUser } from "@clerk/nextjs";
import MeetingScreen from "../MeetingScreen";

type MeetingPageProps = {
  id: string;
};

export default function MeetingPage({ id }: MeetingPageProps) {
  const { user, isLoaded: userLoaded } = useUser();
  const { call, callLoading } = useLoadCall(id);

  if (!userLoaded || callLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  const notAllowToJoin =
    call?.type === "private-meeting" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (!call) {
    return <p className="text-center font-bold">Call not found</p>;
  }

  if (notAllowToJoin) {
    return (
      <p className="text-center font-bold">
        You do not have permission to enter this meeting
      </p>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        <MeetingScreen />
      </StreamTheme>
    </StreamCall>
  );
}
