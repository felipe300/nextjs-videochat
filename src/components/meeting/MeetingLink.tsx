import { Call } from "@stream-io/video-react-sdk";

type MeetingCallProps = {
  call: Call;
};

export default function MeetingCall({ call }: MeetingCallProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
  return <div className="text-center">{meetingLink}</div>;
}
