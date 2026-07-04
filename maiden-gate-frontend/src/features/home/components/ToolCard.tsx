import { ArrowRight } from "lucide-react";

import Card from "../../../shared/components/Card/Card";

type ToolCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function ToolCard({ title, description, image }: ToolCardProps) {
  return (
    <Card
      className="
        overflow-hidden
        group
        cursor-pointer
      "
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full
            object-cover

            transition-transform
            duration-500

            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-[#050816]
            via-transparent
            to-transparent
          "
        />
      </div>

      <div className="p-6">
        <h3
          className="
            text-2xl
            font-bold

            text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3

            leading-7

            text-stone-400
          "
        >
          {description}
        </p>

        <div
          className="
            mt-6

            flex
            items-center
            gap-2

            font-semibold

            text-orange-400
          "
        >
          Saiba mais
          <ArrowRight
            size={18}
            className="
              transition-transform
              duration-300

              group-hover:translate-x-1
            "
          />
        </div>
      </div>
    </Card>
  );
}
