// This is the updated data structure with 3 levels of dummy content
const placeholderMenuData = [
  {
    id: 1,
    title: "Electronics & Gadgets", // Level 1
    subCategories: [
      {
        id: 101,
        title: "Mobile Accessories", // Level 2
        items: ["Power Banks", "Phone Cases", "Screen Protectors", "Charging Cables"] // Level 3
      },
      {
        id: 102,
        title: "Audio Gear", // Level 2
        items: ["Wireless Earbuds", "Bluetooth Speakers", "Noise Cancelling Headphones"] // Level 3
      }
    ]
  },
  {
    id: 2,
    title: "Fashion & Apparel", // Level 1
    subCategories: [
      {
        id: 201,
        title: "Men's Wear", // Level 2
        items: ["Polo Shirts", "Denim Jeans", "Formal Blazers", "Cotton Shorts"] // Level 3
      },
      {
        id: 202,
        title: "Women's Collection", // Level 2
        items: ["Summer Dresses", "Handbags", "Activewear", "Jewelry Sets"] // Level 3
      }
    ]
  },
  {
    id: 3,
    title: "Home & Lifestyle", // Level 1
    subCategories: [
      {
        id: 301,
        title: "Kitchen Essentials", // Level 2
        items: ["Air Fryers", "Electric Kettles", "Knife Sets", "Silicone Utensils"] // Level 3
      },
      {
        id: 302,
        title: "Smart Home", // Level 2
        items: ["Smart Bulbs", "Security Cameras", "Motion Sensors"] // Level 3
      }
    ]
  }
];
