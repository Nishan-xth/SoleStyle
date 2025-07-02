import React from "react";
import { Card, CardContent } from "../card";
import { features } from "@/lib/constant/data";

const Features = () => {
  return (
    <section className="px-5 sm:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="text-center p-4 group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <CardContent className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
