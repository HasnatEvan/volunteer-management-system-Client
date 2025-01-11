import React from 'react';

// Example testimonial data
const testimonials = [
  {
    name: "John Doe",
    title: "Volunteer",
    feedback: "This volunteering opportunity was an incredible experience. I loved helping the community and meeting new people!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    title: "Volunteer",
    feedback: "The work was rewarding, and I gained so many new skills. I'm so grateful for the chance to contribute to such a meaningful cause.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Alice Johnson",
    title: "Volunteer",
    feedback: "I truly enjoyed being part of the team and the positive impact we made. I recommend volunteering to anyone who wants to give back to the community.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Michael Clark",
    title: "Volunteer",
    feedback: "A fantastic way to give back! Volunteering here has been an incredibly fulfilling experience.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Emily Davis",
    title: "Volunteer",
    feedback: "It was a life-changing experience to be part of such an amazing team. I learned a lot and made lifelong friendships.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Chris Williams",
    title: "Volunteer",
    feedback: "The cause is close to my heart, and the work was so fulfilling. I highly recommend volunteering here to anyone.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="lg:text-3xl text-2xl font-bold text-center text-[#1C5253] mb-8">
          𝑾𝒉𝒂𝒕 𝑶𝒖𝒓 𝑽𝒐𝒍𝒖𝒏𝒕𝒆𝒆𝒓𝒔 𝑺𝒂𝒚
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg"
              style={{
                animation: "fadeIn 1s ease-in-out",
                animationDelay: `${index * 0.3}s`,
                animationFillMode: "forwards",
                opacity: 0,
              }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">
                "{testimonial.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
