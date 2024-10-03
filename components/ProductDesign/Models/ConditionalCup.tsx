import { store } from "@/store";
import { useSnapshot } from "valtio";
import { Cup4oz } from "./Paper/Cup4oz";
import { Cup8oz } from "./Paper/Cup8oz";
import { Cup9oz } from "./Paper/Cup9oz";
import { Cup12oz } from "./Paper/Cup12oz";
import { Cup2oz } from "./Paper/Cup2oz";
import { useEffect } from "react";
import { V1Large } from "./Plastic/V1Large";
import { V1Medium } from "./Plastic/V1Medium";
import { V1Small } from "./Plastic/V1Small";
import { V1ExtraSmall } from "./Plastic/V1ExtraSmall";
import { V2Large } from "./Plastic/V2Large";
import { V2Medium } from "./Plastic/V2Medium";
import { V2Small } from "./Plastic/V2Small";
import { V2ExtraLarge } from "./Plastic/V2ExtraLarge";
import { Highball } from "./Plastic/Highball";
import { useRouter } from "next/router";
import { Double8oz } from "./Double/Double8oz";
import { Double9oz } from "./Double/Double9oz";
import { Double12oz } from "./Double/Double12oz";

const ConditionalCup = () => {
  const { selectedProduct } = useSnapshot(store);
  const { push } = useRouter();

  useEffect(() => {
    store.isOrbitControl = true;
    store.productUploadImage = "/demo-logo.png";
  }, [selectedProduct]);

  switch (selectedProduct) {
    case "paper 8 oz":
      return <Double8oz scale={1.4} />;

    case "paper 9 oz":
      return <Double9oz scale={1.4} />;

    case "paper 12 oz":
      return <Double12oz scale={1.4} />;

    case "paper 2 oz 60ml":
      return <Cup2oz scale={1.4} />;

    case "paper 4 oz 120ml":
      return <Cup4oz scale={1.4} />;

    case "paper 8 oz 240ml":
      return <Cup8oz scale={1.4} />;

    case "paper 9 oz 250ml":
      return <Cup9oz scale={1.4} />;

    case "paper 12 oz 500ml":
      return <Cup12oz scale={1.4} />;

    case "plastic v1 large":
      return <V1Large scale={1} />;

    case "plastic v1 medium":
      return <V1Medium scale={1.2} />;

    case "plastic v1 small":
      return <V1Small scale={1.2} />;

    case "plastic v1 extra small":
      return <V1ExtraSmall scale={1.2} />;

    case "plastic v2 large":
      return <V2Large scale={1.2} />;

    case "plastic v2 medium":
      return <V2Medium scale={1.2} />;

    case "plastic v2 small":
      return <V2Small scale={1.2} />;

    case "plastic v2 extra large":
      return <V2ExtraLarge scale={1.2} />;

    case "plastic highball":
      return <Highball scale={1.2} />;

    default:
      push("/products");
      return <></>;
  }
};

export default ConditionalCup;
