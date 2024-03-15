"use client";

import { useUser } from "@clerk/nextjs";
import {
  Call,
  MemberRequest,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import DescriptionInput from "./DescriptionInput";
import { useState } from "react";
import StartTimeInput from "./StartTimeInput";
import ParticipantsInput from "./ParticipantsInput";
import MeetingLink from "./MeetingLink";
import { getUserId } from "../../app/actions";

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
      const callType = participantInput ? "private-meeting" : "default";
      const call = client.call(callType, id);

      const membersEmail = participantInput
        .split(",")
        .map((email) => email.trim());
      const memberId = await getUserId(membersEmail);
      const members: MemberRequest[] = memberId
        .map((id) => ({ user_id: id, role: "call_member" }))
        .concat({ user_id: user.id, role: "call_member" })
        .filter(
          (val, idx, arr) =>
            arr.findIndex((val2) => val2.user_id === val.user_id) === idx,
        );

      const starts_at = new Date(startTimeInput || Date.now()).toISOString();
      await call.getOrCreate({
        data: {
          starts_at,
          members,
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
