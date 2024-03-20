import { buttonClassName } from "components/Button";
import RecordingList from "components/RecordingList";
import Link from "next/link";

export default function MeetingEndedScreen() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This meeting has Ended.</p>
      <Link href="/" className={buttonClassName}>
        Go Home
      </Link>
      <div className="space-y-3">
        <h2 className="text-center text-xl font-bold">Recordings</h2>
        <RecordingList />
      </div>
    </div>
  );
}
