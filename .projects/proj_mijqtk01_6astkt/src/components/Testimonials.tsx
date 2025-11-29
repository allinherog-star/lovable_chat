import React from 'react';

const testimonials = [
  {
    content: "DevBlog 团队的技术实力令人印象深刻。他们不仅按时交付了项目，还提出了许多优化建议，极大地提升了产品的用户体验。",
    author: "Sarah Chen",
    role: "CTO, TechStart",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "与他们合作非常愉快。沟通顺畅，响应迅速，最终的官网效果超出了我们的预期。强烈推荐！",
    author: "Michael Park",
    role: "Founder, DesignLab",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "专业的团队，专业的服务。他们帮助我们将复杂的业务逻辑转化为简洁直观的界面，客户反馈非常好。",
    author: "Emily Davis",
    role: "Product Manager, CloudSys",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <div id="testimonials" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            客户评价
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            听听与我们合作过的伙伴怎么说
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
              <p className="text-gray-600 italic mb-8 relative">
                <span className="text-4xl text-indigo-200 absolute -top-4 -left-2">"</span>
                {testimonial.content}
              </p>
              <div className="flex items-center">
                <img 
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
