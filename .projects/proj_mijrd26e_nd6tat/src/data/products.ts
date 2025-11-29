import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max (256GB) 钛金属",
    price: 9999,
    category: "手机通讯",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800",
    description: "A17 Pro芯片，钛金属机身，操作按钮，USB-C接口。",
    isSelfOperated: true,
    comments: "200万+",
    tags: ["秒杀", "免息"]
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 头戴式无线降噪耳机",
    price: 2499,
    category: "数码配件",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
    description: "双芯驱动，8麦克风降噪，30小时续航。",
    isSelfOperated: true,
    comments: "50万+",
    tags: ["新品"]
  },
  {
    id: 3,
    name: "Nike Air Force 1 '07 空军一号",
    price: 749,
    category: "运动鞋包",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    description: "经典百搭，舒适气垫，潮流必备。",
    isSelfOperated: false,
    comments: "10万+",
    tags: ["热销"]
  },
  {
    id: 4,
    name: "Herman Miller Aeron 人体工学椅",
    price: 9800,
    category: "家具建材",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800",
    description: "全方位调节，Pellicle网布，保护脊椎。",
    isSelfOperated: true,
    comments: "2万+",
    tags: ["放心购"]
  },
  {
    id: 5,
    name: "小米手环 8 Pro 智能运动手表",
    price: 399,
    category: "智能设备",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=800",
    description: "1.74英寸大屏，独立GNSS定位，14天续航。",
    isSelfOperated: true,
    comments: "100万+",
    tags: ["秒杀"]
  },
  {
    id: 6,
    name: "Ray-Ban 雷朋 飞行员太阳镜",
    price: 1280,
    category: "钟表眼镜",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800",
    description: "经典G-15镜片，金属镜框，防紫外线。",
    isSelfOperated: false,
    comments: "5万+",
    tags: []
  },
  {
    id: 7,
    name: "Dyson 戴森 V12 Detect Slim 吸尘器",
    price: 4499,
    category: "家用电器",
    image: "https://images.unsplash.com/photo-1558317374-a309d24ff284?auto=format&fit=crop&q=80&w=800",
    description: "激光探测，智能调速，轻量化设计。",
    isSelfOperated: true,
    comments: "20万+",
    tags: ["白条免息"]
  },
  {
    id: 8,
    name: "LEGO 乐高 机械组 法拉利 Daytona SP3",
    price: 2999,
    category: "玩具乐器",
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800",
    description: "1:8比例还原，V12引擎，收藏级积木。",
    isSelfOperated: true,
    comments: "1万+",
    tags: ["赠品"]
  }
];