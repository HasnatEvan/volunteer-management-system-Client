import React from 'react';

const Testimonials = () => {
    const feedbacks = [
        {
            id: 1,
            name: "Sarah",
            image: "https://i.ibb.co/Cw8sY1M/environment-volunteer-concept-with-women-holding-boxes-donations.jpg",
            review: "Volunteering here has been an amazing experience. I learned so much and made great connections. It's been truly fulfilling to help others in need.",
        },
        {
            id: 2,
            name: "Michael",
            image: "https://i.ibb.co/Cw8sY1M/environment-volunteer-concept-with-women-holding-boxes-donations.jpg",
            review: "A very fulfilling experience. I was able to give back to the community and meet wonderful people. It has made a lasting impact on me.",
        },
        {
            id: 3,
            name: "Jessica",
            image: "https://i.ibb.co/Cw8sY1M/environment-volunteer-concept-with-women-holding-boxes-donations.jpg",
            review: "I highly recommend volunteering. It's a rewarding experience that helps both you and your community. I’ve made lifelong friendships through these initiatives.",
        },
        {
            id: 4,
            name: "David",
            image: "https://i.ibb.co/Cw8sY1M/environment-volunteer-concept-with-women-holding-boxes-donations.jpg",
            review: "Volunteering here allowed me to discover new skills and contribute meaningfully to society. The team is fantastic and welcoming.",
        },
        {
            id: 5,
            name: "Olivia",
            image: "https://i.ibb.co/Cw8sY1M/environment-volunteer-concept-with-women-holding-boxes-donations.jpg",
            review: "Being a volunteer has opened my eyes to the challenges people face. It’s a heartwarming experience that I encourage everyone to try.",
        },
        {
            id: 6,
            name: "James",
            image: "https://i.ibb.co/Cw8sY1M/environment-volunteer-concept-with-women-holding-boxes-donations.jpg",
            review: "I never expected volunteering to change my perspective so drastically. The work we did was impactful, and it was a great way to give back.",
        },
    ];

    return (
        <div className="w-full py-16 bg-gradient-to-r from-blue-500 to-teal-500">
            <div className="max-w-6xl mx-auto text-center text-white">
                <h2 className="text-3xl font-bold mb-8">What Volunteers Say</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {feedbacks.map((feedback) => (
                        <div 
                            key={feedback.id} 
                            className="bg-white p-6 rounded-xl shadow-lg max-w-xs w-full sm:w-80 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:translate-y-2"
                        >
                            <img 
                                src={feedback.image} 
                                alt={feedback.name} 
                                className="w-16 h-16 rounded-full mx-auto border-4 border-blue-500 transform transition-all duration-300 hover:scale-110"
                            />
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">{feedback.name}</h3>
                            <p className="mt-2 text-gray-600">{feedback.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
