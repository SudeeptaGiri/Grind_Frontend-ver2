import { Divider } from "semantic-ui-react";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import Upload from "../components/Upload";
import { Link } from "react-router-dom";



const media = [
  { url: 'https://www.youtube-nocookie.com/embed/Ixen74288kU', },
  { url: 'https://www.youtube-nocookie.com/embed/pmlr0IcdSPk', },
]

export default function Start() {
    return (
      <div className={`min-h-screen text-neutral-500 bg-slate-950 flex`}>
        <main className="grid place-items-center gap-8 w-full bg-slate-50 rounded-3xl overflow-hidden m-5 p-8">
          <Title className='text-center uppercase'>Way To Begin</Title>
          <div className="grid gap-4">
            <Divider horizontal>Learning Forward Defense In Cricket</Divider>
            <p className="text-justify text-lg max-w-5xl">Forward defense is an important defensive shot used in cricket to prevent the ball from hitting the stumps. It involves the batsman playing a forward defensive shot with a straight bat to the bowler, and is usually used against fast bowlers. It requires good technique and timing, as the bat must be angled slightly towards the ball so that it can be defended. To master this shot, the batsman must practice angles and timing, and practice with different speeds and lengths from the bowler. The batsman must also maintain a good balance, and not commit too early or too late. With the right technique and the right amount of practice, the forward defense shot can become a great weapon for any batsman.</p>
          </div>
          <div className="grid gap-4">
            <Divider horizontal>Suggested Videos</Divider>
            <div className="flex gap-16 justify-between">
              {media.map((m, i) =>
                <iframe key={i} className="w-96 h-56 rounded-2xl" src={m.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              )}
            </div>
          </div>
          <div className="grid gap-4 mt-6 min-w-fit">
            <Divider horizontal>Advanced Analysis</Divider>
            <p className="text-justify text-lg max-w-5xl">We at Grind offer you our advanced AI tools that help you learn the best practices of any sport. Now that you know the basics of the shot, try your maneuver and let us rate your skills! </p>
          </div>
          <div className="grid gap-4 mt-6 min-w-fit">
            <Divider horizontal>Upload your Shot</Divider>
            <Upload />
          </div>
          <Link to="/">
            <Button size='lg' className='bg-slate-900 hover:bg-slate-950 text-neutral-300 font-semibold text-lg mt-4'>Get Started</Button>
          </Link>
        </main>
      </div>
    );
}