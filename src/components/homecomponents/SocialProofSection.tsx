import { motion } from "framer-motion";

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

const SocialProofSection = () => {
  const users: User[] = [
    { id: 1, name: "Lucas Silva", username: "@lucassilva", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    { id: 2, name: "Maria Santos", username: "@mariasantos", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    { id: 3, name: "Pedro Costa", username: "@pedrocosta", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
    { id: 4, name: "Ana Oliveira", username: "@anaoliveira", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    { id: 5, name: "Gabriel Lima", username: "@gabriellima", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    { id: 6, name: "Julia Ferreira", username: "@juliaferreira", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
    { id: 7, name: "Rafael Mendes", username: "@rafaelmendes", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
    { id: 8, name: "Camila Rocha", username: "@camilarocha", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  ];

  const duplicatedUsers = [...users, ...users];

  return (
    <section className="py-24 overflow-hidden bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            Junte-se à nossa comunidade
          </h2>
          <p className="text-[var(--color-text)] opacity-80 text-lg">
            Milhares de criadores já estão usando Neo.se
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10" />

        <motion.div
          className="flex gap-6"
          animate={{ x: [0, -1600] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedUsers.map((user, index) => (
            <motion.div
              key={`${user.id}-${index}`}
              className="flex-shrink-0 glass-card p-7 rounded-2xl flex items-center gap-4 min-w-[250px] transition-all duration-300 cursor-pointer group"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/50"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
              </div>
              <div>
                <div className="font-semibold  text-[var(--color-text)]  transition-colors">
                  {user.name}
                </div>
                <div className="text-sm  text-[var(--color-text)] opacity-70">{user.username}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default SocialProofSection;