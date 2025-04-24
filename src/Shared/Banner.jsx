import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    };

    const banners = [
        {
            id: 1,
            img: "https://i.ibb.co/jf2pG5W/environment-volunteer-concept-with-persons-holding-boxes-donations.jpg",
            headline: "Join Hands for a Cause",
            subtitle: "Your contribution can change the world",
            actionText: "Explore Now",
            actionLink: "/allPosts",
        },
        {
            id: 2,
            img: "https://i.ibb.co/Cw8sY1M/environment-volunteer-concept-with-women-holding-boxes-donations.jpg",
            headline: "Work for the Community",
            subtitle: "Together, we can make a difference",
            actionText: "Join Us",
            actionLink: "/allPosts",
        },
        {
            id: 3,
            img: "https://i.ibb.co/GJp2cr0/medium-shot-people-working-together.jpg",
            headline: "Stronger Together",
            subtitle: "Our goal is success",
            actionText: "Learn More",
            actionLink: "/allPosts",
        },
    ];

    return (
        <div className="w-full overflow-hidden relative z-0">
            <Slider {...sliderSettings}>
                {banners.map((banner) => (
                    <div key={banner.id} className="relative">
                        <img
                            src={banner.img}
                            alt={`Banner ${banner.id}`}
                            className="w-full h-[350px] sm:h-[500px] lg:h-[700px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">{banner.headline}</h2>
                            <p className="text-md sm:text-lg lg:text-xl mt-2 text-center">{banner.subtitle}</p>
                            <Link
                                to={banner.actionLink}
                                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                            >
                                {banner.actionText}
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
