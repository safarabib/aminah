"use client";

import { Users, Search, BookOpen, GraduationCap, HeartHandshake, Quote } from "lucide-react";

export default function AboutPage() {
  const areasOfWork = [
    {
      title: "Qur'anic Community Building",
      icon: <Users className="w-8 h-8 text-aminah-gold" />,
      desc: "Developing knowledgeable, responsible, and cooperative communities through the teachings of the Holy Qur'an and Sunnah. We seek to strengthen faith, moral character, social solidarity, justice, mutual responsibility, and collective well-being."
    },
    {
      title: "Qur'anic Research and Study",
      icon: <Search className="w-8 h-8 text-aminah-gold" />,
      desc: "Promoting advanced study and systematic research into the Holy Qur'an, Sunnah, Islamic scholarship, and their relevance to contemporary social, economic, educational, and ethical challenges. Our aim is to encourage informed understanding, critical reflection, and knowledge-based solutions grounded in authentic Islamic principles."
    },
    {
      title: "Qur'anic Publications & Knowledge Dissemination",
      icon: <BookOpen className="w-8 h-8 text-aminah-gold" />,
      desc: "Publishing and disseminating books, journals, research papers, articles, and educational resources that promote authentic Qur'anic knowledge, Islamic understanding, intellectual development, and practical guidance for everyday life."
    },
    {
      title: "Qur'anic Education and Training",
      icon: <GraduationCap className="w-8 h-8 text-aminah-gold" />,
      desc: "Organising educational programmes, courses, seminars, workshops, and training initiatives to deepen understanding of the Holy Qur'an and Sunnah, develop practical capabilities, nurture moral leadership, and encourage the application of Islamic principles in personal, family, professional, and community life."
    },
    {
      title: "Sustainable Zakat Programme",
      icon: <HeartHandshake className="w-8 h-8 text-aminah-gold" />,
      desc: "Developing Shariah-compliant Zakat initiatives guided by the Qur'anic principles of social responsibility, economic justice, compassion, and the rights of eligible recipients. Through responsible Zakat management, beneficiary development, education, and sustainable empowerment initiatives, we aim to address socioeconomic challenges while preserving the specific rules and objectives of Zakat established by Islamic law."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a110f] font-serif text-aminah-ivory selection:bg-aminah-gold selection:text-aminah-green flex flex-col">
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <p className="text-aminah-gold/70 text-[10px] font-sans tracking-[0.3em] uppercase mb-4">Who We Are</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-aminah-gold mb-6 leading-tight tracking-wide">About Aminah</h1>
            <p className="text-xl md:text-2xl text-aminah-ivory/80 italic font-serif leading-relaxed">
              Building a Knowledge-Based and Secure Society Through Qur&apos;anic Guidance
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-6 text-aminah-ivory/70 text-base md:text-lg leading-loose mb-16 text-justify">
            <p>
              The name Aminah draws inspiration from the Qur&apos;anic concept of safety, security, and tranquillity. It reflects our aspiration to contribute towards building a society where individuals and communities can live with faith, dignity, knowledge, justice, and security under the guidance of the Holy Qur&apos;an and the Sunnah of Prophet Muhammad (peace and blessings be upon him).
            </p>
            <p>
              Despite receiving the gift of life and countless provisions from Allah, humanity often remains ungrateful to its Creator. Today, even with remarkable advancements in science and technology, the world continues to face profound insecurity in almost every aspect of life, including faith, life, wealth, the environment, honour, and justice. Throughout history, Allah has sent Prophets and Messengers to guide humanity towards truth, righteousness, and lasting security through divine revelation.
            </p>
          </div>

          {/* Quranic Verse Section */}
          <div className="bg-[#111c19] border border-aminah-gold/20 p-8 md:p-12 mb-16 relative overflow-hidden group hover:border-aminah-gold/50 transition-colors duration-500">
            <Quote className="absolute top-6 left-6 w-24 h-24 text-aminah-gold/5 z-0" />
            <div className="relative z-10 text-center">
              <p className="text-aminah-gold/80 font-sans text-xs tracking-[0.2em] uppercase mb-8">Allah the Almighty presents a powerful example:</p>
              
              <p dir="rtl" className="text-2xl md:text-3xl lg:text-4xl text-aminah-gold mb-8 leading-[1.8] font-arabic">
                وَضَرَبَ اللّٰهُ مَثَلًا قَرْيَةً كَانَتْ اٰمِنَةً مُّطْمَئِنَّةً يَّأْتِيْهَا رِزْقُهَا رَغَدًا مِّنْ كُلِّ مَكَانٍ فَكَفَرَتْ بِاَنْعُمِ اللّٰهِ فَاَذَاقَهَا اللّٰهُ لِبَاسَ الْجُوْعِ وَالْخَوْفِ بِمَا كَانُوْا يَصْنَعُوْنَ
              </p>
              
              <p className="text-aminah-ivory/80 italic text-lg md:text-xl leading-relaxed mb-4">
                &quot;And Allah presents the example of a town that was secure and peaceful, with its provision coming to it abundantly from every place. But it became ungrateful for the blessings of Allah, so Allah made it taste the consequences of hunger and fear because of what they used to do.&quot;
              </p>
              <p className="text-aminah-gold/60 font-sans text-sm tracking-widest uppercase">(Surah An-Nahl, 16:112)</p>
            </div>
          </div>

          {/* Core Philosophy */}
          <div className="space-y-6 text-aminah-ivory/70 text-base md:text-lg leading-loose mb-20 text-justify">
            <p>
              This Qur&apos;anic example reminds us that material prosperity and technological advancement alone cannot guarantee the security and well-being of a society. True security requires gratitude to Allah, faith, moral responsibility, justice, and adherence to divine guidance.
            </p>
            <p>
              Humanity has repeatedly lost its way by pursuing deceptive paths and neglecting the wisdom of revelation. Recognising this reality, Aminah was established with the vision of contributing to the development of individuals and communities through the knowledge, wisdom, and guidance of the Holy Qur&apos;an.
            </p>
            <p>
              We believe that the Holy Qur&apos;an is Allah&apos;s greatest guidance for humanity and that the Sunnah of Prophet Muhammad (peace and blessings be upon him) provides the practical example of living by its teachings. Through sincere adherence to the Qur&apos;an and Sunnah, advanced study, systematic research, publication, education, training, and practical application, Aminah seeks to connect revealed knowledge with the challenges and realities of contemporary life.
            </p>
            <p>
              Our purpose is not merely to disseminate knowledge, but to encourage its understanding, reflection, application, and contribution to individual and collective development. We aspire to nurture a generation that understands its responsibilities towards Allah, fellow human beings, and the world around them.
            </p>
          </div>

          {/* Areas of Work */}
          <div className="mb-20">
            <h2 className="text-3xl text-aminah-gold mb-10 text-center">Our Areas of Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {areasOfWork.map((area, index) => (
                <div key={index} className={`bg-[#111c19] border border-aminah-gold/10 hover:border-aminah-gold/40 p-8 transition-all duration-300 ${index === 4 ? "md:col-span-2 md:w-2/3 md:mx-auto" : ""}`}>
                  <div className="mb-6 bg-aminah-gold/5 w-16 h-16 flex items-center justify-center border border-aminah-gold/20">
                    {area.icon}
                  </div>
                  <h3 className="text-xl text-aminah-ivory mb-4">{area.title}</h3>
                  <p className="text-aminah-ivory/60 text-sm leading-relaxed font-sans">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Aspiration */}
          <div className="border-t border-b border-aminah-gold/20 py-12 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a110f] px-4">
              <span className="text-aminah-gold font-sans text-xs tracking-[0.3em] uppercase">Our Aspiration</span>
            </div>
            <div className="space-y-6 text-aminah-ivory/80 text-lg leading-relaxed max-w-3xl mx-auto">
              <p>
                Aminah aspires to become a centre of Qur&apos;anic learning, research, publication, education, and community development, where revealed knowledge inspires understanding, understanding leads to meaningful action, and action contributes to the well-being of humanity.
              </p>
              <p>
                We envision a knowledge-based and secure society in which individuals are grounded in faith, enriched with Qur&apos;anic knowledge, guided by the Sunnah, committed to justice, and empowered to contribute positively to their communities.
              </p>
              <p className="text-aminah-gold italic text-xl mt-8">
                &quot;Through sincere adherence to the Holy Qur&apos;an and the Sunnah of Prophet Muhammad (peace and blessings be upon him), Aminah seeks to contribute towards building a sphere of safety, dignity, and prosperity in which present and future generations can flourish.&quot;
              </p>
            </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-aminah-gold/20 py-8 text-center mt-auto">
        <p className="text-aminah-ivory/40 font-sans text-xs tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} AMINAH. Knowledge for all.
        </p>
      </footer>
    </div>
  );
}