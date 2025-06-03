"use client";

import React from "react";
import Image from "next/image";
import Child from "../Images/main/child.png";
import flow from "../Images/Icons.png";

function Banner() {
  return (
    <div className="container m-4 mx-auto px-4 py-8 bg-amber-300 rounded-lg">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <Image
            src={Child}
            width={500}
            height={500}
            alt="Picture of the author"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
          <h2 className="text-4xl mb-4 font-bold">Why Choose us</h2>
          <p className="text-gray-700 font-medium text-xl">
            Choose us for personalized support tailored to ADHD, ASD, and
            Dyslexia. Our evidence-based approach, inclusive community, and
            user-friendly design create a positive impact. We prioritize
            continuous improvement and encourage parental involvement for a
            holistic student well-being experience.
          </p>
          <Image
            src={flow}
            width={500}
            height={500}
            alt="Picture of the author"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
