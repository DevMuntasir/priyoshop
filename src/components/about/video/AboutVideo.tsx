import { ClickToPlayVideo } from "@/components/ui/ClickToPlayVideo";
import { Reveal } from "@/components/ui/Reveal";

export function AboutVideo() {
  return (<>
    <Reveal direction="scale" delay={0.1}>
      <ClickToPlayVideo
        videoPath="/video/1.mp4"
        title="YouTube video player"

      />
    </Reveal>

  </>)
}