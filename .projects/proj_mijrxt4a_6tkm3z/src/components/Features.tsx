import React from 'react';
import { Shield, Zap, Globe, Cpu, BarChart, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Lightning Fast",
    description: "Optimized for speed, Nova ensures your applications run smoother than ever before."
  },
  {
    icon: <Shield className="w-6 h-6 text-green-400" />,
    title: "Bank-Grade Security",
    description: "Enterprise-level security protocols to keep your data safe and compliant."
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: "Global CDN",
    description: "Deploy content to the edge with our worldwide content delivery network."
  },
  {
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    title: "AI Powered",
    description: "Integrated AI tools to automate workflows and enhance decision making."
  },
  {
    icon: <BarChart className="w-6 h-6 text-pink-400" />,
    title: "Real-time Analytics",
    description: "Get deep insights into your performance with our advanced dashboard."
  },
  {
    icon: <Layers className="w-6 h-6 text-orange-400" />,
    title: "Seamless Integration",
    description: "Connects effortlessly with your favorite tools and services via API."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Nova?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to build world-class products, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-colors group"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;