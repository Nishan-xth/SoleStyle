import { Button } from "../button";

const Newsletter = () => {
  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Stay in the Loop</h2>
          <p className="text-lg opacity-90">
            Subscribe to our newsletter and be the first to know about new
            arrivals, exclusive deals, and style tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button size="lg" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
