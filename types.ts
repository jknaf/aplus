
export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  path: string;
  altText: string;
}

export type ProjectCategory = 'Skatepark' | 'Pumptrack' | 'Hockey-Bande' | 'Grillstelle' | 'Umkleidekabine';

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
}