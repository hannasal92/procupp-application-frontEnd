import { proxy } from "valtio";
import { OrbitControls as OC } from "three-stdlib";

type Store = {
  handleSaveCanvas: () => Promise<{ url: string; id: string } | undefined>;
  handleCenterArrow: () => void;
  selecetedProductPriceAndQuantity: { quantity: string; price: number }[];
  selectedProduct: string;
  cartProduct: string;
  fileImage : string,
  productColor: string;
  productUploadImage: string;
  isOrbitControl: boolean;
  printOnBothSide: boolean;
  user: User | undefined;
  previousPathForAddress: string;
  profileType: "personal" | "shipping" | "payment";
  currentProductPrice: number;
  positionY : number,
  positionZ : number,
  selectedAddress:
    | {
        heading: string;
        tag: string;
        address: string;
        number: string;
      }
    | undefined;
};

export const store = proxy<Store>({
  handleSaveCanvas: async () => undefined,
  handleCenterArrow: () => {},
  selectedProduct: "",
  fileImage : "",
  cartProduct: "",
  productColor: "#ffffff",
  productUploadImage: "/demo-logo.png",
  previousPathForAddress: "/",
  printOnBothSide: false,
  isOrbitControl: true,
  user: undefined,
  profileType: "personal",
  selectedAddress: undefined,
  selecetedProductPriceAndQuantity: [],
  currentProductPrice: 0,
  positionY : 0 ,
  positionZ: 1
});
