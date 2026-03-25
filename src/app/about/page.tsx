import { Container } from "@/components/ui/Container";
import Image from "next/image";

export default function AboutPage() {
  const sections = [
    {
      id: 1,
      image: "/product/88.jpg",
      title: "من نحن",
      placeholder: "هوديات لكل ذوق ولكل ستايل من الكلاسيكي للعصري ، كل كولكشن بحكي قصة",
      imageRight: true,
    },
    {
      id: 2,
      image: "/product/99.png",
      title: "فكرتنا",
      placeholder: "مش بس هوديات ، إحنا بنعطيك كل تصميم بتناغم مع يومك ، شخصيتك ، وأسلوبك",
      imageRight: false,
    },
    {
      id: 3,
      image: "/product/111.png",
      title: "وعدنا إلكم",
      placeholder: "راحة وجودة بتضل معك مهما تغير الزمن",
      imageRight: true,
    }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* Background Watermark Logo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0 flex items-center justify-center w-full">
        <Image src="/qotton_logo.png" alt="" width={800} height={400} className="w-full max-w-[800px] h-auto object-contain" aria-hidden="true" />
      </div>

      <Container className="py-24 relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-8">
          <div className="flex justify-center mb-8 drop-shadow-2xl">
            <Image src="/qotton_logo.png" alt="قطن" width={260} height={90} className="w-[180px] md:w-[260px] h-auto object-contain" />
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-text mb-4">عـــن <span className="text-[#fcc874]">قـطـن</span></h1>
          <div className="w-48 md:w-64 h-1 bg-[#fcc874]/50 mx-auto rounded-full mb-12" />
        </div>

        {/* Alternating Sections */}
        <div className="w-full space-y-24 md:space-y-32">
          {sections.map((section) => (
            <div key={section.id} className={`flex flex-col gap-12 lg:gap-20 items-center ${section.imageRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

              {/* Image Column */}
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-surface border border-border/40 shadow-xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700 z-10 pointer-events-none" />
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 relative z-0"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                <h2 className="text-3xl lg:text-5xl font-heading font-bold text-text flex items-center gap-4">
                  <span className="w-12 h-1 bg-accent rounded-full inline-block"></span>
                  {section.title}
                </h2>
                <div className="prose prose-lg text-text/80 leading-relaxed font-light">
                  <p className="border-r-4 border-accent/40 pr-6 py-4 text-2xl italic text-text/90 bg-surface/30 rounded-l-2xl">
                    {section.placeholder}
                  </p>
                  <p className="text-lg mt-6 text-muted/80">

                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
