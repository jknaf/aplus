// page-flip bringt keine Typen mit; nur was Blaetterkatalog.tsx nutzt
declare module 'page-flip' {
  export class PageFlip {
    constructor(el: HTMLElement, opt: Record<string, unknown>);
    loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
    on(ev: 'flip', cb: (e: { data: unknown }) => void): this;
    flipNext(): void;
    flipPrev(): void;
    destroy(): void;
  }
}
declare module '*?url' { const url: string; export default url; }
