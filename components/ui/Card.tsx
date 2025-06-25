import Link from "next/link";
import Image from "next/image";
import { Star, Users } from "lucide-react";
import { BaseEvent } from "@/types/eventTypes";
import { IMovie } from "@/types/event/eventInterfaces";

const MovieCard = ({ CardData } : { CardData: IMovie }) => {

  if (!CardData) {
    return <div>event not found</div>
  }

  return (
    <Link
      href={`/${CardData.type}s/${CardData._id}`}
      className="bg-dark-2/50 block w-full max-w-60 border-2 border-dark-2/70 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
    >
      <div className="w-full h-64 relative">
        <Image
          src={"/placeholder-image.png"}
          alt={CardData.title || "Movie Poster"}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{CardData.title}</h2>

        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="flex items-center gap-1 text-yellow-400">
            <Star size={16} />
            {CardData.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
