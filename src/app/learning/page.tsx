import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";

export default function LearningPage() {
  // Dummy data - later managed via Admin CMS
  const programmes = [
    {
      id: 1,
      title: "Foundations of Islamic Jurisprudence",
      type: "Weekly Class",
      instructor: "Sheikh Abdullah",
      date: "Every Friday",
      time: "4:00 PM - 5:30 PM",
      location: "Main Auditorium, Dhaka",
      seatsAvailable: 45,
      fee: "Free",
    },
    {
      id: 2,
      title: "Comprehensive Zakat Workshop 2026",
      type: "Special Workshop",
      instructor: "Mufti Rahman",
      date: "15 Nov 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Conference Hall B",
      seatsAvailable: 12,
      fee: "৳500",
    },
    {
      id: 3,
      title: "Arabic Language Mastery (Level 1)",
      type: "Course",
      instructor: "Ustadh Mahmud",
      date: "Every Saturday & Sunday",
      time: "6:00 PM - 7:30 PM",
      location: "Online (Zoom)",
      seatsAvailable: 100,
      fee: "৳2500",
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Classes & Workshops</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Register for our weekly educational classes, special workshops, and training programmes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium shadow-sm transition hover:bg-gray-800">All Programmes</button>
          <button className="px-6 py-2 bg-white text-gray-600 border rounded-full font-medium hover:bg-gray-50 transition">Weekly Classes</button>
          <button className="px-6 py-2 bg-white text-gray-600 border rounded-full font-medium hover:bg-gray-50 transition">Workshops</button>
          <button className="px-6 py-2 bg-white text-gray-600 border rounded-full font-medium hover:bg-gray-50 transition">Online Courses</button>
        </div>

        {/* Programme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((prog) => (
            <div key={prog.id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition flex flex-col overflow-hidden">
              {/* Banner Image Placeholder */}
              <div className="h-40 bg-slate-200 relative flex items-center justify-center">
                <span className="text-slate-400 font-medium">Programme Banner</span>
                <div className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                  {prog.type}
                </div>
              </div>
              
              {/* Details */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{prog.title}</h3>
                <p className="text-gray-600 text-sm mb-4 font-medium">Instructor: {prog.instructor}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{prog.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{prog.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{prog.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{prog.seatsAvailable} Seats Available</span>
                  </div>
                </div>
                
                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <span className="text-lg font-bold text-gray-900">{prog.fee}</span>
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition">
                    Register <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}