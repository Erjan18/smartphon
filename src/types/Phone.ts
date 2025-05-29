export interface Phone {
  id: string;
  name: string;
  brand: string;
  releaseYear: number;
  os: string;
  price: number;
  oldPrice?: number;
  popularity: number;
  images: string[];
  description: string;
  screen: {
    size: number;
    type: string;
    resolution: string;
    refreshRate: number;
  };
  processor: {
    name: string;
    cores: number;
    frequency: string;
  };
  memory: {
    ram: number;
    storage: number;
    expandable: boolean;
  };
  cameras: {
    main: number;
    front: number;
    features: string[];
  };
  battery: {
    capacity: number;
    fastCharging: string;
    wirelessCharging?: boolean;
  };
  dimensions: {
    height: number;
    width: number;
    thickness: number;
    weight: number;
  };
  connectivity: {
    bluetooth: string;
    wifi: string;
    nfc: boolean;
    usb: string;
  };
  features: {
    title: string;
    description: string;
  }[];
}