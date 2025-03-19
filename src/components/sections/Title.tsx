"use client";

import Image from "next/image";

interface TitleProps {
  title: string;
  image: string;
  objectPosition?: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  image,
  objectPosition = "center 80%",
}) => {
  return (
    <section className="relative w-full h-[200px] md:h-[250px] flex items-center px-8 md:px-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover", objectPosition }}
          quality={100}
          priority
        />
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-darkblue/70"></div>
      </div>

      {/* Title Content */}
      <div className="relative z-10 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      </div>
    </section>
  );
};

export default Title;
