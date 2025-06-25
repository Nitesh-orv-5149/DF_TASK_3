import { ArrowRight, Film, Music, Train } from "lucide-react";
import Link from "next/link";

export default function ServicesSection() {

  const categories = [
    {
      title: "Movies",
      href: "/movies",
      icon: Film,
      description: "Cinema & Entertainment",
    },
    {
      title: "Trains",
      href: "/trains",
      icon: Train,
      description: "Railway Bookings",
    },
    {
      title: "Concerts",
      href: "/concerts",
      icon: Music,
      description: "Live Performances",
    },
  ];

    return (
    <>
     <section className="space-y-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link href={category.href} key={index} className="block">
                <div 
                    className="group border rounded-full border-gray-800 hover:border-gray-700 transition-all duration-300 hover:bg-gray-900/50 cursor-pointer">
                  <div className="p-8 md:p-12">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="rounded-full p-3 border border-gray-700 group-hover:border-gray-600 transition-colors duration-300">
                          <Icon size={24} className="text-gray-400 group-hover:text-light-2 transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1 group-hover:text-light-2 transition-colors duration-300">
                            {category.title}
                          </h3>
                          <p className="text-gray-500 group-hover:text-light-2 font-light">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      
                      <ArrowRight 
                        size={20} 
                        className="text-gray-600 group-hover:text-light-2 group-hover:translate-x-3 transition-all duration-300" 
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
    </>
    )
}
