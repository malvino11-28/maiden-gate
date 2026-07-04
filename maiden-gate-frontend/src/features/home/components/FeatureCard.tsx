import type { ReactNode } from "react";

import Card from "../../../shared/components/Card/Card";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card
      className="
        p-8

        text-center
      "
    >
      <div
        className="
            mx-auto
            mb-6

            flex
            h-20
            w-20
            items-center
            justify-center

            rounded-full

            bg-gradient-to-br
            from-orange-500/20
            to-amber-500/20

            text-orange-400
        "
      >
        {icon}
      </div>

      <h3
        className="
          text-2xl
          font-semibold

          text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-4

          leading-7

          text-stone-400
        "
      >
        {description}
      </p>
    </Card>
  );
}
