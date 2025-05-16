import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MathJax } from "better-react-mathjax"
import Zmage from "../ui/zoom-image";

export default function DocCarousel() {
  const problemImages = [
    "/images/problem1.jpg",
    "/images/problem2.jpg",
    "/images/problem3.jpg",
    "/images/problem4.jpg",
    "/images/problem5.jpg",
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-10">📚 Example Problems</h2>
          
          <Carousel 
            className="w-full mx-auto px-4" 
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {problemImages.map((src, index) => (
                <CarouselItem key={index} className="p-2">
                  <div className="rounded-md object-contain mx-auto max-h-[500px] w-auto">
                    <Zmage 
                      src={src} 
                      alt={`Problem ${index + 1}`} 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-10" />
            <CarouselNext className="-right-4 md:-right-10"/>
          </Carousel>
          
          <div className="mt-10">
            <h3 className="text-xl font-bold text-left mb-3">Answer Requirements:</h3>
            <div className="text-left">
              <ul className="list-disc pl-5">
                <li className="mb-2">Single symbolic expressions (e.g., <MathJax inline>{"$\\sqrt{\\frac{2g}{3R}}$"}</MathJax>)</li>
                <li className="mb-2">Equivalent forms accepted</li>
                <li className="mb-2">No numerical approximations</li>
                <li className="mb-2">No equation chains</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
