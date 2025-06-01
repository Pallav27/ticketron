interface TicketProps {
  tickets: {
    heading: string;
    content: string;
    category: string;
    createdAt: string;
  }[];
}

const categoryColors: Record<string, string> = {
  Technical: 'badge-error',
  Billing: 'badge-warning',
  General: 'badge-info',
};

export default function TicketList({ tickets }: TicketProps) {
  return (
    <div className="space-y-4">
      {tickets.map((ticket, i) => (
        <div key={i} className="card shadow-md p-4 bg-base-100">
          <div className="flex justify-between">
            <h4 className="text-lg font-semibold">{ticket.heading}</h4>
            <span className={`badge ${categoryColors[ticket.category] || 'badge-neutral'}`}>{ticket.category}</span>
          </div>
          <p className="mt-2 text-sm">{ticket.content}</p>
        </div>
      ))}
    </div>
  );
}