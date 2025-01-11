import React from "react";

const events = [
  {
    title: "Community Clean-Up Drive",
    date: "January 15, 2025",
    description: "Join us in making our neighborhood cleaner and greener! Bring your friends and family along.",
    image: "https://i.ibb.co/f0KPby1/full-shot-people-collecting-garbage.jpg",
  },
  {
    title: "Food Donation Camp",
    date: "January 22, 2025",
    description: "Help us distribute food to those in need. Your small contribution can make a big difference.",
    image: "https://i.ibb.co/C7fbK8F/smiley-female-volunteer-holding-box-with-food-donations.jpg",
  },
  {
    title: "Blood Donation Campaign",
    date: "February 5, 2025",
    description: "Be a hero by donating blood and saving lives. Register now to secure your spot.",
    image: "https://i.ibb.co/cXnZBtk/1352.jpg",
  },
];

const UpcommingEvent = () => {
  const fadeInStyle = {
    animation: "fadeIn 1.5s ease-in-out",
  };

  const hoverEffect = {
    transform: "scale(1.05)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const defaultEffect = {
    transform: "scale(1)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  return (
    <div style={fadeInStyle} className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1C5253] mb-8">
          𝑼𝒑𝒄𝒐𝒎𝒊𝒏𝒈 𝑬𝒗𝒆𝒏𝒕𝒔
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden"
              style={defaultEffect}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = hoverEffect.transform;
                e.currentTarget.style.boxShadow = hoverEffect.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = defaultEffect.transform;
                e.currentTarget.style.boxShadow = defaultEffect.boxShadow;
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-60 object-cover" // Updated height to h-60
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcommingEvent;
