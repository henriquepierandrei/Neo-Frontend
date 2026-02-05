import React from 'react';
import {
  Link2,
  BarChart3,
  DollarSign,
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  Heart
} from 'lucide-react';

const HeroSection: React.FC = () => {
  // Avatares para Social Proof
  const avatars = [
    'https://i.pravatar.cc/100?img=1',
    'https://i.pravatar.cc/100?img=2',
    'https://i.pravatar.cc/100?img=3',
    'https://i.pravatar.cc/100?img=4',
    'https://i.pravatar.cc/100?img=5',
  ];

  // Cards de recursos
  const features = [
    {
      icon: Link2,
      title: 'Redes Sociais',
      description: 'Divulgue quantas redes sociais desejar no seu perfil divulgando tudo em um só link.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
    },
    {
      icon: BarChart3,
      title: 'Músicas e Vídeos',
      description: 'Personalize com músicas, vídeos do YouTub e plano de fundo animados.',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
    },
    {
      icon: DollarSign,
      title: 'Monetização',
      description: 'Venda produtos direto pelo seu link.',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <section className="relative min-h-screen bg-[var(--color-background)] overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow Principal - Topo */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-secondary)/30 0%, var(--color-primary)/10 40%, transparent 70%)',
          }}
        />

        {/* Glow Secundário - Esquerda */}
        <div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--color-primary)/40 0%, transparent 60%)',
          }}
        />

        {/* Glow Terciário - Direita */}
        <div
          className="absolute top-1/3 -right-32 w-[400px] h-[400px] opacity-15"
          style={{
            background: 'radial-gradient(circle, var(--color-accent)/30 0%, transparent 60%)',
          }}
        />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        {/* Badge Superior */}
        <div className="flex justify-center mb-8">
          <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-secondary)/10] to-[var(--color-primary)/10] border border-[var(--color-secondary)] backdrop-blur-sm cursor-pointer hover:border-[var(--color-secondary)]/40 transition-all duration-300">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-secondary)/5] to-[var(--color-primary)/5] blur-xl group-hover:blur-2xl transition-all" />
            <Heart className="w-4 h-4 text-[var(--color-secondary)] animate-pulse" />
            <span className="relative text-sm font-medium bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] bg-clip-text text-transparent">
              Compartilhe-se para o mundo!
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Título Principal */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text)] leading-[1.1]">
            <span className="block">Mostre para o mundo</span>
            <span className="block mt-2">Seus links.</span>
            <span className="block mt-2 bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              Um só lugar.
            </span>
          </h1>
        </div>

        {/* Subtítulo */}
        <p className="text-center text-lg sm:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Conecte sua audiência a todo o seu conteúdo com uma interface de
          <span className="text-[var(--color-text)] font-medium"> alto padrão </span>
          e análises em
          <span className="text-[var(--color-text)] font-medium"> tempo real</span>.
        </p>

        {/* Botões CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* Botão Principal */}
          <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-secondary)]/25">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)]" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            <Zap className="relative w-5 h-5 fill-current" />
            <span className="relative">Criar meu Link Grátis</span>
          </button>

          {/* Botão Secundário */}
          <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[var(--color-text)] rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-[var(--color-border)] rounded-full group-hover:bg-white/10  transition-all duration-300" />
            <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-50" />
            <Play className="relative w-4 h-4 fill-current" />
            <span className="relative">Ver Exemplos</span>
          </button>
        </div>

        {/* Social Proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          {/* Avatares Sobrepostos */}
          <div className="flex -space-x-3">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className="relative w-10 h-10 rounded-full ring-2 ring-[var(--color-border)] overflow-hidden transition-transform hover:scale-110 hover:z-10"
                style={{ zIndex: avatars.length - index }}
              >
                <img
                  src={avatar}
                  alt={`User ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Online Indicator para o último */}
                {index === avatars.length - 1 && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[var(--color-border)]" />
                )}
              </div>
            ))}

            {/* More Users Indicator */}
            <div className="relative w-10 h-10 rounded-full ring-2 ring-[var(--color-border)] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">+5K</span>
            </div>
          </div>

          {/* Texto */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              Junte-se a <span className="text-white font-semibold">+5.000</span> usuários
            </span>
          </div>
        </div>

        {/* Cards de Recursos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card Container */}
              <div
                className="relative p-8 overflow-hidden transition-all duration-700 ease-out hover:scale-[1.03] cursor-pointer h-full flex flex-col"
                style={{ borderRadius: 'var(--border-radius-xl)' }}
              >
                {/* Layered Backgrounds */}
                <div
                  className="absolute inset-0 backdrop-blur-2xl border transition-all duration-700 group-hover:border-opacity-80"
                  style={{
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--border-radius-xl)'
                  }}
                />

                {/* Animated Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.15] transition-all duration-700 ease-out`}
                  style={{ borderRadius: 'var(--border-radius-xl)' }}
                />

                {/* Glow Effect */}
                <div
                  className={`absolute -inset-[1px] bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700`}
                  style={{ borderRadius: 'var(--border-radius-xl)' }}
                />

                {/* Top Shine */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-60"
                  style={{
                    background: 'linear-gradient(90deg, transparent, var(--color-border), transparent)'
                  }}
                />

                {/* Side Accent Line */}
                <div
                  className={`absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b ${feature.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100`}
                />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon with Animated Background */}
                  <div className="relative mb-6 inline-flex w-fit">
                    {/* Icon Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500 scale-150`}
                      style={{ borderRadius: 'var(--border-radius-md)' }}
                    />

                    {/* Icon Container */}
                    <div
                      className={`relative flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out`}
                      style={{ borderRadius: 'var(--border-radius-md)' }}
                    >
                      <feature.icon className={`w-7 h-7 ${feature.iconColor} drop-shadow-lg`} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-500"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed transition-colors duration-500"
                      style={{
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* CTA with Arrow Animation */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
                    <span
                      className={`${feature.iconColor} opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 -translate-x-2 group-hover:translate-x-0`}
                    >
                      Saiba mais
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 ${feature.iconColor} opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 -translate-x-4 group-hover:translate-x-0 group-hover:translate-x-1`}
                    />
                  </div>
                </div>

                {/* Bottom Right Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div
                    className={`absolute inset-0 bg-gradient-to-tl ${feature.gradient} opacity-5 rounded-tl-[4rem]`}
                  />
                </div>

                {/* Animated Particle Effect */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ borderRadius: 'var(--border-radius-xl)' }}
                >
                  <div
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:animate-ping"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;