export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  message: string;
  budget?: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  created_at: string;
  status: "new" | "contacted" | "qualified" | "closed";
  source: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  published_at: string;
  read_time: number;
  featured_image?: string;
  tags: string[];
  seo: {
    meta_title: string;
    meta_description: string;
    og_image?: string;
  };
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  services: string[];
  featured_image?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price_from?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
  rating: number;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
