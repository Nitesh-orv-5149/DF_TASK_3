import Link from "next/link";
import { Star, Train, Music } from "lucide-react";
import { BaseEvent } from "@/types/eventTypes";
import { IMovie } from "@/types/event/eventInterfaces";

interface EventCardProps {
  CardData: IMovie | any;
}

export default function Card({ CardData }: EventCardProps) {
  if (!CardData) {
    return <div className="text-white">Event not found</div>;
  }

  const getSubtitle = () => {
    switch (CardData.type) {
      case 'movie':
        return `⭐ ${CardData.rating}`;
      case 'train':
        return `🚂 ${CardData.departure}`;
      case 'concert':
        return `🎵 ${CardData.performer}`;
      default:
        return CardData.rating ? `⭐ ${CardData.rating}` : '';
    }
  };

  return (
    <Link
      href={`/${CardData.type}s/${CardData._id}`}
      className="group relative md:w-[240px] md:h-[200px] w-[180px] h-[180px] overflow-hidden"
    >
      {/* Main card container with multiple layers */}
      <div className="relative w-full h-full bg-gradient-to-br border-2 border-gray-600 rounded-2xl p-6 transition-all duration-500 group-hover:scale-105 group-hover:border-gray-300 group-hover:shadow-2xl group-hover:shadow-black/50 backdrop-blur-sm">
        
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gray-200/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gray-100/10 rounded-full blur-xl group-hover:w-20 group-hover:h-20 transition-all duration-500"></div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full blur-lg group-hover:w-16 group-hover:h-16 transition-all duration-500"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-center items-center text-center space-y-6">
          {/* Title with enhanced styling */}
          <h2 className="md:text-2xl text-lg font-black bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent leading-tight group-hover:scale-105 transition-transform duration-300">
            {CardData.title}
          </h2>
          
          {/* Decorative divider */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:w-20 transition-all duration-300"></div>
          
          {/* Subtitle with glow effect */}
          <p className="text-gray-200 text-lg font-semibold group-hover:text-white transition-colors duration-300 drop-shadow-lg">
            {getSubtitle()}
          </p>
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-400 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-400 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 via-gray-600/20 to-gray-800/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </Link>
  );
}