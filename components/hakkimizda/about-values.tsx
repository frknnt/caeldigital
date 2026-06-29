import React from 'react';
import { Rocket, Lightbulb, Handshake, Sparkles } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: "Innovation",
      icon: <Rocket className="text-white w-8 h-8" strokeWidth={1.5} />,
      description: "Innovation drives everything we do. We leverage emerging technologies, challenge conventions, and explore new possibilities to create solutions. Through insight, experimentation, and strategy, we craft transformative experiences that fuel growth, redefine standards, and create meaningful impact—ensuring every project shapes the future with purpose."
    },
    {
      title: "Creativity",
      icon: <Lightbulb className="text-white w-8 h-8" strokeWidth={1.5} />,
      description: "Creativity is the core of our agency. We transform ideas into compelling experiences that inspire, engage, and resonate. By blending imagination with strategy, we craft innovative solutions that stand out in crowded markets. Every project is an opportunity to explore new perspectives, push boundaries, and deliver work that is both original and impactful, leaving a lasting impression."
    },
    {
      title: "Collaboration",
      icon: <Handshake className="text-white w-8 h-8" strokeWidth={1.5} />,
      description: "At the heart of our work lies collaboration—bringing together diverse talents, perspectives, and expertise to achieve results. We foster open communication, encourage co-creation, and build strong partnerships with clients, ensuring every project reflects shared vision and purpose. By working together, we transform ideas into impactful solutions that drive innovation and lasting value."
    },
    {
      title: "Excellence",
      icon: <Sparkles className="text-white w-8 h-8" strokeWidth={1.5} />,
      description: "Excellence drives everything we do. From concept to execution, we pursue the highest standards in design, strategy, and delivery. Every detail matters, every decision is intentional, and every outcome reflects our commitment to quality. By continually refining our skills and processes, we ensure each project not only meets expectations but sets new benchmarks in creativity and performance."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 lg:p-12">
      {/* Dörtlü Grid Yapısı */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl w-full">
        
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-[#f4f5f7] rounded-[32px] p-8 lg:p-10 w-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col justify-start"
          >
            {/* İkon Kutusu */}
            <div className="w-[72px] h-[72px] bg-[#222222] rounded-[24px] flex items-center justify-center shadow-[0_15px_25px_-10px_rgba(0,0,0,0.6)] mb-8 shrink-0">
              {feature.icon}
            </div>

            {/* Başlık */}
            <h3 className="text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
              {feature.title}
            </h3>

            {/* Metin */}
            <p className="text-gray-500 text-[15px] leading-relaxed font-light">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}