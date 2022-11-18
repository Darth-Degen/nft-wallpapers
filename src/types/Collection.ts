
export interface Collection {
  id: string;
  name: string;
  type: string;
  logo: Logo;
  supply: number;
  url: string;
  version?: string;
}

interface Logo {
  path: string;
  width: number;
  height: number;
}