export interface BlogData {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  short_desc: string;
  created_at: string;
  updated_at: string;
  category: string;
}

export interface BlogDetailData {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  description: string;
  created_at: string;
  updated_at: string;
  category: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export interface IblogDetail {
  thumbnail?: string;
  id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  status: string;
  is_featured: boolean;
  description: string;
  short_desc: string;
  publish_date: string;
  image: string | null;
  category: number;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
}
