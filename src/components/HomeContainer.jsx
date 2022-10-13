import React from 'react'
import Delivery from '../assets/img/delivery.png';
import Hero from '../assets/img/heroBg.png';
import { HeroProducts } from '../utils/data';
import { motion } from 'framer-motion';

const HomeContainer = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
            <div className="py-2 md:px-10 flex flex-1 flex-col md:items-start items-center justify-center gap-4 w-full">
                <div className="flex items-center gap-2 justify-center bg-orange-200 pl-4 pr-1 py-1 rounded-full">
                    <p className='text-base text-orange-500 font-semibold'>Door delivery</p>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
                        <img src={Delivery} className="w-full h-full object-contain" alt="door-delivery"/>
                    </div>
                </div>
                <p className='xxl:text-[4.5rem]  lg:text[4rem] md:text-[2rem] font-bold tracking-wide text-headingColor md:text-left text-center'>
                    We Deliver In <br /> <span className='text-orange-600 xxl:text-[4.5rem] lg:text[4.5rem] md:text-[2.5rem]'>Your City</span> Instantly
                </p>
                <p className='text-base text-textColor md:text-left text-center md:w-[80%] '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi rerum nulla molestiae temporibus vero asperiores nisi, ab consequuntur molestias pariatur ut, dolorum mollitia harum! Nesciunt repudiandae facilis atque ducimus modi.</p>
                <button className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out">Order now</button>
            </div>
            <div className="py-2 flex flex-1 flex-col md:items-start items-center justify-center gap-2 w-full relative">
                <img src={Hero} className="ml-auto h-510 w-full lg:w-auto lg:h-650" alt="hero-bg"/>
                <div className='xxl:w-[80%] h-full absolute top-0 left-0 flex items-center justify-center mt-5 py-12 xxl:px-32 lg:py-10 sm:gap-1 md:gap-8 flex-wrap'>
                    {
                        HeroProducts && HeroProducts.map((Product) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                key={Product.id}
                                className='lg:w-190 min-w-[100px] m-3 lg:m-0 py-4 xxl:py-5 sm:p-1 bg-cardOverlay backdrop-blur-md rounded-xl flex flex-col items-center justify-center shadow-lg'>
                                <img src={Product.imageSrc} className="lg:w-40 -mt-20 w-32" alt="ice-cream-one"/>
                                <p className='lg:text-lg font-semibold text-textColor'>{Product.name}</p>
                                <p className='lg:text-sm text-[12px] text-lightTextGray font-semibold lg:my-1'>{Product.decp}</p>
                                <p className='text-sm font-semibold text-headingColor'>
                                    <span className='text-red-600'>₹</span> {Product.price}
                                </p>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default HomeContainer