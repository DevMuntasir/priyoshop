import { Button } from "../ui/Button";


export default function AboutCTA() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-ps-md shadow" >
        <div className=" bg-[url(/about/p.png)] bg-cover  bg-center bg-no-repeat  text-center">
          <div className="flex min-h-80 items-center bg-white/70 px-4 py-10 backdrop-blur-[2px] sm:px-6">


            <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
              <h2 className="font-display text-ps-h4 font-bold text-ps-black sm:text-ps-h3 md:text-ps-h2">
                Wants to partner with us?
              </h2>

              <p className="mt-5 font-body text-ps-sm leading-relaxed text-ps-black sm:mt-6 sm:text-ps-body">
                Interested in partnering? Join us to unlock exclusive benefits and
                grow together. Let's achieve great results as partners.
              </p>

              <Button className="mt-5" size="lg" >
                Contact Us
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
