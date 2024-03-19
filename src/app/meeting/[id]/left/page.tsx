import { buttonClassName } from "components/Button";
import { cn } from "lib/utils";
import Link from "next/link";

type EndCallProps = {
  params: {
    id: string;
  };
};

export default function EndCall({ params: { id } }: EndCallProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-bold">You left this meeting.</p>
      <Link
        href={`/meeting/${id}`}
        className={cn(buttonClassName, "bg-gray-500 hover:bg-gray-600")}
      >
        Rejoin
      </Link>
    </div>
  );
}
