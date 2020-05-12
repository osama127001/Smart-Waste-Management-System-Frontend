export interface Dustbin {
  id: string;
  location: { lat: number, lng: number };
  stopover: boolean;
  region: string;
  status: number;
  address: string;
}
