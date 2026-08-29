import { Button } from '@/components/ui/Button';


export function OpportunityServing({ data }: { data: any }) {

  console.log(data);

  return (
    <section className="px-4 py-12 ">
      <div className="relative container mx-auto overflow-hidden rounded-3xl bg-[url('/opportunities/banner.png')] bg-cover bg-center bg-no-repeat ">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-red-500 blur-3xl" />
        </div>

        <div className="relative z-10  items-center gap-10 px-8 py-10 flex lg:px-12">
          {/* Left Content */}
          <div className="max-w-2xl text-white ">
            <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
              Unlock Bangladesh’s Next Retail Growth Story
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/90">
              Partner with PriyoShop to reach retailers, strengthen
              distribution, and build smarter growth across Bangladesh.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="filled" size="lg" className="!bg-white !text-ps-black">
                Partner with Us
              </Button>

              <Button size="lg" className="!bg-transparent !border-[1px] !border-white">
                Talk with Our Team
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end max-w-[400px] w-full">

          </div>
        </div>
      </div>
    </section>
  );
}
