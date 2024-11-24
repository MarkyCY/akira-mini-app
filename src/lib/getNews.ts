export interface Entry {
    id: number;
    title: string;
    link: string;
    published: string;
    updated: string;
    summary: string;
    category: string[];
  }
  
  export interface Props {
    entries: Entry[];
  }