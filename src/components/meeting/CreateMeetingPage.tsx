"use client";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import DescriptionInput from "./DescriptionInput";
import { useState } from "react";
import StartTimeInput from "./StartTimeInput";
import ParticipantsInput from "./ParticipantsInput";
import MeetingCall from "./MeetingLink";
import MeetingLink from "./MeetingLink";

export default function CreateMeetingPage() {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [participantInput, setParticipantInput] = useState("");
  const [call, setCall] = useState<Call>();

  const client = useStreamVideoClient();
  const { user } = useUser();

  async function createMeeting() {
    if (!client || !user) {
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          custom: {
            description: descriptionInput,
          },
        },
      });

      setCall(call);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }
  }

  if (!client || !user) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  return (
    <section className="flex flex-col items-center space-y-6">
      <h1 className="text-center text-2xl font-bold">
        Welcome {user.username}!
      </h1>
      <div className="mx-auto w-80 space-y-6 rounded-md bg-slate-100 p-5">
        <h2 className="text-center text-lg font-bold">Create a new meeting</h2>
        <DescriptionInput
          value={descriptionInput}
          onChange={setDescriptionInput}
        />
        <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} />
        <ParticipantsInput
          value={participantInput}
          onChange={setParticipantInput}
        />
        <button onClick={createMeeting} className="w-full">
          Create meeting
        </button>
      </div>
      {call && <MeetingLink call={call} />}
    </section>
  );
}
