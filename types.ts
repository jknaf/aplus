
export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  path: string;
  altText: string;
  tuvCertified?: boolean;
  usp?: string;
  material?: string;
  details?: string;
}

export type ProjectCategory = 'Skatepark' | 'Pumptrack' | 'Hockey-Bande' | 'Grillstelle' | 'Umkleidekabine';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  imageUrl: string;
  images: string[];
  description: string;
  longDescription?: string[];
  altText: string;
  productsUsed: {
    name: string;
    path: string;
  }[];
  year?: number;
}

export type PressPublisher =
  | 'kommunaldirekt.de'
  | 'kommunalclick24.de'
  | 'treffpunkt-kommune.de'
  | 'freiraum-gestalten.info'
  | 'flaechenmanager.com';

export interface PressArticle {
  id: string;
  title: string;
  publisher: PressPublisher;
  url: string;
  teaser: string;
  year?: number;
}
