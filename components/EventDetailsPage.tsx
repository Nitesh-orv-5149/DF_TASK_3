"use client"

import { formatDate, formatTime } from "@/utils/formatDateTime"
import { Calendar, Clock, MapPin, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode, useState } from "react"
import { IConcert, IMovie, ITrain } from "@/types/event/eventInterfaces" 
import Modal from "@/components/Modal"

type BaseProps = {
    eventid: string;
    description?: (event: any) => ReactNode;
  };
  
  type MovieProps = BaseProps & {
    type: 'movie';
    event: IMovie;
  };
  
  type TrainProps = BaseProps & {
    type: 'train';
    event: ITrain;
  };
  
  type ConcertProps = BaseProps & {
    type: 'concert';
    event: IConcert;
  };
  
  type Props = MovieProps | TrainProps | ConcertProps;
  

export default function EventDetailsPage({event, eventid, type, description} : Props) {

    const [open, setOpen] = useState(false);
    const [seatCount, setSeatCount] = useState(1);


    if (!event) {
        return <div className="text-center text-lg font-semibold">Event not found</div>;
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-dark-2/70 to-30%">
            {/* Hero Section */}
            <section className="relative flex items-center justify-center py-8">
                <div className="flex items-center gap-8 mt-20">
                    {/* Title and Info Right - Centered */}
                <div className="flex flex-col justify-center items-center relative py-8">
                    {/* Subtle background accents */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
                    
                    {/* Enhanced title */}
                    <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent text-center leading-tight tracking-tight">
                        {event?.title}
                    </h1>
                    
                    {/* Description wrapper */}
                    <div className="text-gray-300 text-lg leading-relaxed max-w-3xl text-center">
                        {description?.(event)}
                    </div>
                    
                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-6"></div>
                </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-8 py-8 mt-10">
                <div className="max-w-4xl mx-auto">
                {/* Event Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Date & Time Card */}
                    <div className="bg-gradient-to-r from-dark-1/70 to-dark-2/50 p-6 rounded-4xl transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-6 h-6 text-light-2" />
                        <h3 className="font-semibold text-light-2">Date & Time</h3>
                    </div>
                    <p className="text-sm mb-1">{formatDate(event.datetime)}</p>
                    <p className="text-xl font-bold">{formatTime(event.datetime)}</p>
                    </div>

                    {/* Location Card */}
                    <div className="bg-gradient-to-r from-dark-1/70 to-dark-2/50 p-6 rounded-4xl transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-6 h-6 text-light-2" />
                        <h3 className="font-semibold text-light-2">Location</h3>
                    </div>
                    { type === 'movie' && <p className="text-xl font-bold">{event.location}</p> }
                    { type === 'concert' && <p className="text-xl font-bold">{event.location}</p> }
                    { type === 'train' && <p className="text-xl font-bold">{event.departure}</p> }
                    
                    </div>

                    {/* Availability Card */}
                    <div className="bg-gradient-to-r from-dark-1/70 to-dark-2/50 p-6 rounded-4xl transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                        <Users className="w-6 h-6 text-light-2" />
                        <h3 className="font-semibold text-light-2">Availability</h3>
                    </div>
                    <p className="text-xl font-bold">{event.availableSeats || 'none'} seats</p>
                    <p className=" text-sm">Available</p>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="bg-gradient-to-r from-dark-1/70 to-dark-2/50 p-8 rounded-4xl mb-8">
                    <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-4xl font-bold mb-2 text-light-1">Ticket Price</h3>
                        <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">
                            ₹{event.price}
                        </span>
                        <span className="">per ticket</span>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Book Now Section */}
                <div className="bg-gradient-to-r from-dark-1/70 to-dark-2/50 p-4 rounded-4xl ">
                    <div className="text-center mb-6">
                    <h3 className="text-4xl font-bold mb-2 text-light-1">Ready to Experience the Epic?</h3>
                    <p className="">Secure your seats now for this amazing {event.type} experience</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <button onClick={() => setOpen(true)} className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-light-1/70 to-light-2/50 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-4xl hover:shadow-blue-500/25">
                        Book Now
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4-2 rounded-full font-semibold transition-all duration-300">
                        Add to Wishlist
                    </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="text-center p-4 rounded-xl">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-light-2" />
                        <p className="text-sm">Duration</p>
                        <p className= "font-semibold">2h 45m</p>
                    </div>
                    {type == 'movie' && (<div className="text-center p-4 rounded-xl">
                        <Star className="w-6 h-6 mx-auto mb-2 text-light-2" />
                        <p className="text-sm">Rating</p>
                        <p className= "font-semibold">{event.rating}/10</p>
                    </div>)}
                    <div className="text-center p-4 rounded-xl">
                        <Users className="w-6 h-6 mx-auto mb-2 text-light-2" />
                        <p className="text-sm">Seats Left</p>
                        <p className= "font-semibold">{event.availableSeats}</p>
                    </div>
                    { type == 'movie' && 
                    <div className="text-center p-4 rounded-xl">
                        <MapPin className="w-6 h-6  mx-auto mb-2 text-light-2" />
                        <p className="text-sm">City</p>
                        <p className="text-xl font-bold">{event.location}</p>
                    </div>
                    }      
                </div>
                </div>
            </section>

            {/* number of seats modal  */}
            <Modal isOpen={open} onClose={() => setOpen(false)} title="Booking Info">
                <div className="flex flex-col items-center justify-center">
                    <h2>select number of seats</h2>
                    <div className="flex items-center justify-center py-4 space-x-4">
                        <button
                            onClick={() => setSeatCount(prev => Math.max(1, prev - 1))}
                            className="text-light-2 hover:text-light-1 px-3 py-1 rounded text-lg"
                        >
                            −
                        </button>

                        <span className="text-xl font-semibold">{seatCount}</span>

                        <button
                            onClick={() => setSeatCount(prev => Math.min(10, prev + 1))}
                            className="text-light-2 hover:text-light-1 px-3 py-1 rounded text-lg"
                        >
                            +
                        </button>
                    </div>
                    <Link href={`/booking?eventid=${eventid}&seats=${seatCount}&type=${event.type}`}>
                        <button className="bg-light-2 hover:bg-light-1 font-semibold text-dark-2 p-2 rounded-full duration-200 transition-all">continue Booking</button>
                    </Link>
                </div>
            </Modal>

        </main>
        
    )
}