import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

interface PageProps {
  searchParams: Promise<{
    year?: string;
    month?: string;
  }>;
}

export default async function SchedulePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const now = new Date();
  const currentYear = Number(params.year) || now.getFullYear();
  const currentMonth = Number(params.month) || now.getMonth() + 1;

  await dbConnect();

  // Fetch events for the current month
  const startDate = new Date(currentYear, currentMonth - 1, 1);
  const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59);

  const events = await Event.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).lean();

  // Create a map of events by date
  const eventsByDate: Record<number, typeof events> = {};
  events.forEach((event) => {
    const day = new Date(event.date).getDate();
    if (!eventsByDate[day]) {
      eventsByDate[day] = [];
    }
    eventsByDate[day].push(event);
  });

  // Calculate calendar grid
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Create calendar weeks
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = new Array(7).fill(null);

  // Fill in the first week
  for (let i = 0; i < firstDay; i++) {
    week[i] = null;
  }

  let currentDay = 1;
  for (let i = firstDay; i < 7; i++) {
    week[i] = currentDay++;
  }
  weeks.push(week);

  // Fill remaining weeks
  while (currentDay <= daysInMonth) {
    week = new Array(7).fill(null);
    for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
      week[i] = currentDay++;
    }
    weeks.push(week);
  }

  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      {/* Header with navigation */}
      <div className="mb-8 flex items-center justify-center gap-4">
        {/* Previous month */}
        <a
          href={`/news/schedule?year=${prevYear}&month=${prevMonth}`}
          className="flex h-12 w-12 items-center justify-center rounded hover:bg-gray-100"
        >
          <span className="text-2xl text-gray-600">&lt;</span>
        </a>

        {/* Current month display */}
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            {currentYear}.{currentMonth.toString().padStart(2, '0')}
          </h1>

          {/* Month/Year selectors */}
          <form className="flex items-center justify-center gap-2" method="get" action="/news/schedule">
            <select
              name="year"
              defaultValue={currentYear}
              className="rounded border border-gray-300 px-3 py-1 text-sm"
            >
              {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map((year) => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>

            <select
              name="month"
              defaultValue={currentMonth}
              className="rounded border border-gray-300 px-3 py-1 text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}월
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded bg-gray-700 px-4 py-1 text-sm text-white hover:bg-gray-800"
            >
              바로가기
            </button>
          </form>
        </div>

        {/* Next month */}
        <a
          href={`/news/schedule?year=${nextYear}&month=${nextMonth}`}
          className="flex h-12 w-12 items-center justify-center rounded hover:bg-gray-100"
        >
          <span className="text-2xl text-gray-600">&gt;</span>
        </a>
      </div>

      {/* Calendar */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          {/* Header */}
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-red-600">
                일
              </th>
              <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                월
              </th>
              <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                화
              </th>
              <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                수
              </th>
              <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                목
              </th>
              <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-gray-700">
                금
              </th>
              <th className="border border-gray-300 p-3 text-center text-sm font-semibold text-blue-600">
                토
              </th>
            </tr>
          </thead>

          {/* Calendar body */}
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const isSunday = dayIndex === 0;
                  const isSaturday = dayIndex === 6;
                  const dayEvents = day ? eventsByDate[day] || [] : [];

                  return (
                    <td
                      key={dayIndex}
                      className="border border-gray-300 p-2 align-top"
                      style={{ height: '120px' }}
                    >
                      {day && (
                        <>
                          {/* Day number */}
                          <div
                            className={`mb-1 text-sm ${
                              isSunday
                                ? 'text-red-600 font-semibold'
                                : isSaturday
                                  ? 'text-blue-600 font-semibold'
                                  : 'text-gray-700'
                            }`}
                          >
                            {day}
                          </div>

                          {/* Events */}
                          {dayEvents.map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className="mb-1 rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-700"
                              style={{
                                backgroundColor: event.color || undefined,
                                color: event.color ? '#fff' : undefined,
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
