import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../pagination/Ads.css"

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import AdsProduct from '../AdsProduct/AdsProduct';
import Product2 from '../AdsProduct2/AdsProduct2';
import AdsProduct2 from '../AdsProduct2/AdsProduct2';
import AdsProduct3 from '../AdsProduct3/AdsProduct3';

export default function AdsSwp() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwipers"
            >
                <SwiperSlide><AdsProduct/></SwiperSlide>
                <SwiperSlide><AdsProduct2 /></SwiperSlide>
                <SwiperSlide><AdsProduct3 /></SwiperSlide>
                
                <div className="autoplay-progress text-black" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>

    
    );

}
