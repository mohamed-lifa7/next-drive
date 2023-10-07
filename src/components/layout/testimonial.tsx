import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/constants";
import type { TestimonialsProps } from "@/types";
const Testimonial = () => {
  return (
    <section className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="leadi mb-8 text-center text-4xl font-bold text-primary">
          What People are saying.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <CardTestimonial {...testimonial} key={testimonial.id} />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;

const CardTestimonial = (user: TestimonialsProps) => {
  return (
    <Card>
      <CardContent className="my-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none ">{user.name}</p>
              <p className="text-sm text-muted-foreground ">{user.username}</p>
            </div>
          </div>
        </div>
        <p className="mx-2 my-6">{user.content}</p>
      </CardContent>
    </Card>
  );
};
