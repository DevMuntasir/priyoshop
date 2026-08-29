import { Button } from "../ui/Button";


export default function AboutCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl  shadow rounded-ps-md" >
        <div className=" bg-[url(/about/p.png)] bg-cover  bg-center bg-no-repeat  text-center">
          <div className=" bg-white/60  h-[300px] backdrop-blur-[2px] content-center">


            <div className="relative z-10 mx-auto content-center  max-w-[60%]">
              <h2 className="text-4xl font-bold text-ps-black md:text-5xl">
                Wants to partner with us?
              </h2>

              <p className="mt-6 text-lg leading-8 text-ps-black ">
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