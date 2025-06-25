"use client";

import axios from 'axios';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

type SeatStatus = 'available' | 'selected' | 'booked';

type Seat = {
    seatNumber: string;
    booked: boolean;
    _id: string;
};

interface seatSelectProps {
    eventid: string;
    seats: Seat[];
    type: string;
    paid: boolean;
    allSelected: (selected: boolean) => void;
}

export default function SeatSelectionComponent({ eventid, seats, type, paid, allSelected }: seatSelectProps) {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [isBooked, setIsBooked] = useState<boolean>(false);
    const numberOfSeats = Number(useSearchParams().get("seats"));
    

    const bookedSeats = useMemo(() => seats.filter(s => s.booked).map(s => s.seatNumber), [seats]);

    const seatMap: Record<string, Seat[]> = useMemo(() => {
        const map: Record<string, Seat[]> = {};
        for (const seat of seats) {
            const row = seat.seatNumber.charAt(0);
            if (!map[row]) map[row] = [];
            map[row].push(seat);
        }

        for (const row in map) {
            map[row].sort((a, b) =>
                parseInt(a.seatNumber.slice(1)) - parseInt(b.seatNumber.slice(1))
            );
        }

        return map;
    }, [seats]);

    const toggleSeat = (seatNumber: string): void => {
        if (bookedSeats.includes(seatNumber)) return;

        setSelectedSeats(prev =>
            prev.includes(seatNumber)
                ? prev.filter(seat => seat !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    useEffect(() => {
        allSelected(selectedSeats.length === numberOfSeats);
    }, [selectedSeats]);    

    const getSeatStatus = (seatNumber: string): SeatStatus => {
        if (bookedSeats.includes(seatNumber)) return 'booked';
        if (selectedSeats.includes(seatNumber)) return 'selected';
        return 'available';
    };

    const getSeatStyles = (status: SeatStatus): string => {
        switch (status) {
            case 'booked':
                return 'bg-dark-2 cursor-not-allowed opacity-50';
            case 'selected':
                return 'bg-light-2 text-dark-2 border-2 border-gray-900';
            case 'available':
            default:
                return 'bg-white border border-gray-300 hover:border-gray-500 cursor-pointer';
        }
    };

    const handleBooking = async () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat to book.");
            return;
        }

        if (selectedSeats.length === numberOfSeats) {
            try {
                const response = await axios.patch(`/api/events/${type}s/${eventid}/booking`, selectedSeats);
                if (response.status === 200) {
                    alert("Seats booked successfully!");
                    setSelectedSeats([]);
                    setIsBooked(true);
                    console.log("searts booked successfully:");
                } else {
                    alert("Failed to book seats. Please try again.");
                }
            } catch (error) {
                console.error("Error booking seats:", error);
                alert("An error occurred while booking seats. Please try again.");
            }
        } else {
            alert(`Please select exactly ${numberOfSeats} seats to book.`);
        }

    }

    useEffect(() => {
        if (!paid || isBooked) return;
        handleBooking();
    }, [paid])
    

    return (
        <main className="flex flex-col p-3 sm:p-6 rounded-lg bg-dark-2/50 h-[80vh] w-full overflow-hidden">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">Select Your Seats</h2>

            {/* Screen */}
            <div className="mb-6 sm:mb-8 flex flex-col items-center">
                <div className="w-1/2 h-1 sm:h-2 bg-gray-300 rounded mb-2"></div>
                <p className="text-center text-xs sm:text-sm ">SCREEN</p>
            </div>

            {/* Seat Grid */}
            <div className="flex-1 flex flex-col justify-center overflow-auto ">
                <div className="space-y-2 sm:space-y-3">
                    {Object.keys(seatMap).sort().map((row: string) => (
                        <div key={row} className="flex items-center justify-center gap-1 sm:gap-2">
                            <span className="w-4 sm:w-6 text-xs sm:text-sm font-medium">{row}</span>
                            <div className="flex gap-0.5 sm:gap-3 flex-wrap">
                                {seatMap[row].map(seat => {
                                    const status = getSeatStatus(seat.seatNumber);

                                    return (
                                        <button
                                            key={seat._id}
                                            onClick={() => toggleSeat(seat.seatNumber)}
                                            disabled={status === 'booked'}
                                            className={`w-6 h-6 sm:w-8 sm:h-8 text-xs font-medium rounded ${getSeatStyles(status)}`}
                                        >
                                            {seat.seatNumber.slice(1)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white border border-gray-300 rounded"></div>
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-light-2 rounded"></div>
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-dark-2 border opacity-50 rounded"></div>
                    <span>Booked</span>
                </div>
            </div>
        </main>
    );
}
