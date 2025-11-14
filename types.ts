
export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  path: string;
  altText: string;
  tuvCertified?: boolean;
}

export type ProjectCategory = 'Skatepark' | 'Pumptrack' | 'Hockey-Bande' | 'Grillstelle' | 'Umkleidekabine' | 'BMX-Anlage' | 'Spezialbau';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  imageUrl: string;
  images: string[];
  description: string;
  altText: string;
  productsUsed: {
    name: string;
    path: string;
  }[];
  year?: number;
}