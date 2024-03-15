type GetToMailLinkProps = {
  meetingLink: string;
  startAt?: Date;
  description: string;
};

export default function getToMailLink({
  meetingLink,
  startAt,
  description,
}: GetToMailLinkProps) {
  const startDateFormatted = startAt
    ? startAt.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : undefined;

  const subject = `Join my meeting${startDateFormatted ? " at " + startDateFormatted : ""}`;
  const body = `Join my meeting at ${meetingLink}${startDateFormatted ? "\n\nThe meeting starts at " + startDateFormatted + "." : "\n\nThe meeting starts now."}${description ? "\n\nDescription: " + description : ""}`;

  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
