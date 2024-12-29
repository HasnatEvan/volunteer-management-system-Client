import React from 'react';

const UpcomingEvent = () => {
    const events = [
        {
            id: 1,
            title: "Tree Plantation Drive",
            date: "2025-01-10",
            description: "Join us for a tree plantation drive in the city park. A green future starts with us.",
            location: "City Park, Downtown",
            time: "10:00 AM - 2:00 PM",
        },
        {
            id: 2,
            title: "Community Clean-up",
            date: "2025-02-15",
            description: "Let's come together to clean our local streets and parks for a cleaner environment.",
            location: "Central Park, Midtown",
            time: "8:00 AM - 12:00 PM",
        },
        {
            id: 3,
            title: "Beach Clean-up Drive",
            date: "2025-03-20",
            description: "Help us clean up the beaches and protect marine life from pollution.",
            location: "Sunny Beach, West Coast",
            time: "9:00 AM - 1:00 PM",
        },
    ];

    return (
        <div className="w-full py-16 bg-gradient-to-r from-green-400 to-teal-500">
            <div className="max-w-6xl mx-auto text-center text-white">
                <h2 className="text-3xl font-bold mb-8">Upcoming Volunteer Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div 
                            key={event.id} 
                            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:translate-y-2"
                        >
                            <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
                            <p className="mt-2 text-gray-600"><strong>Date:</strong> {event.date}</p>
                            <p className="mt-2 text-gray-600"><strong>Time:</strong> {event.time}</p>
                            <p className="mt-2 text-gray-600"><strong>Location:</strong> {event.location}</p>
                            <p className="mt-4 text-gray-800">{event.description}</p>
                            <button 
                                className="mt-6 py-2 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105"
                            >
                                More Info
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvent;
