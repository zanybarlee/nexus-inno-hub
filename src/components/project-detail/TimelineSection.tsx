
interface TimelineEvent {
  event: string;
  date: string;
  status: string;
}

interface TimelineSectionProps {
  timeline: TimelineEvent[];
  timelineStatusColors: Record<string, string>;
}

const TimelineSection = ({ timeline, timelineStatusColors }: TimelineSectionProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-card rounded-xl border shadow-sm p-6 h-full">
        <h2 className="text-xl font-semibold mb-6">Project Timeline</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-1 bottom-1 w-0.5 bg-gray-200"></div>
          
          {/* Timeline events */}
          <div className="space-y-8 relative pl-12">
            {timeline.map((event, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className={`absolute left-[-40px] p-[5px] rounded-full ${timelineStatusColors[event.status]}`}>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                
                {/* Event content */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium">{event.event}</h3>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                  <span className="text-xs font-medium mt-1">
                    Status: {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
