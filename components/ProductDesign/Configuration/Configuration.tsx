import {
  Collapse,
  Delete,
  HorizontalArrow,
  Move,
  Upload,
  VerticalArrow,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus
} from "../Icons";
import s from "./config.module.scss";
import ColorBtn from "./ColorBtn";
import { useRef, useState } from "react";
import { store } from "@/store";
import { useSnapshot } from "valtio";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";
import axios from "axios";
import { OrbitControls as OC } from "three-stdlib";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "@/components/Common/Button";
import BasicModal from './Modal';
import ImagesModal from './templatesModal';
const Configuration = ({
  orbitFollow,
}: {
  orbitFollow: React.RefObject<OC>;
}) => {
  const { addItem } = useCart();
  const {
    isOrbitControl,
    cartProduct,
    printOnBothSide,
    handleSaveCanvas,
    productUploadImage,
    handleCenterArrow,
    currentProductPrice,
  } = useSnapshot(store);
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const detailBoxRef = useRef<HTMLDivElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const photoEditorUrl  = process.env.NEXT_PUBLIC_PHOTO_EDITOR_LINK ?? "https://www.fotor.com/photo-editor-app/editor/effect"
  const [isCopperOpen, setIsCopperOpen] = useState<boolean>(false);
  const [cropFile, setCropFile] = useState<File>();
  const [image, setImage] = useState("/home/hero-bg.png");
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(1);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(new File([],""));
  // Open Modal
  const openModal = () => {
    setOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setOpen(false);
  };
  const handleRangeInput = (event : any) => {
    store.positionY = positionY;
    setPositionY(event.target.value);
  }
  const handleImageSize = (type : string) => {
    store.positionZ = positionZ;
    if(type == "plus"){
      setPositionZ(positionZ + 0.1);

    }else{
      setPositionZ(positionZ - 0.1);
    }
  }
  const handleUpload = (e: any) => {
    setCropFile(undefined);
    let file : any  ;
    if(open == true){
      setOpen(false);
      file = e ;
    }else if (uploadImageRef.current?.files){
      file = uploadImageRef.current?.files[0];
    }
      setImageFile(file);
      // create an image element with that selected file
      var img = new Image();
      img.src = window.URL.createObjectURL(file);
      // as soon as the image has been loaded
      img.onload = () => {
        var width = img.naturalWidth,
          height = img.naturalHeight;
        // unload it
        window.URL.revokeObjectURL(img.src);
        // check its dimensions
        if (width !== height) {
          detailBoxRef.current!.style.backgroundImage = `url(${URL.createObjectURL(
            file
          )})`;
          store.productUploadImage = URL.createObjectURL(file);
        } else {
          let files;
          if (e.dataTransfer) {
            files = e.dataTransfer.files;
          } else if (e.target) {
            files = e.target.files;
          }
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result as any);
          };
          reader.readAsDataURL(files[0]);
          setIsCopperOpen(true);
          uploadImageRef.current!.value = "";
          toast.info("Only accepts 1:1 aspect ratio images", {
            theme: "dark",
          });
        }
      };
    
  };

  const handleDeleteUploadImage = () => {
    detailBoxRef.current!.style.backgroundImage = "url(/demo-logo.png)";
    store.productUploadImage = "/demo-logo.png";
  };

  const handleMovement = () => {
    orbitFollow.current?.reset();
    store.isOrbitControl = !isOrbitControl;
  };

  const handleAddToCart = async () => {
    try {
      
      let image = await handleSaveCanvas();
      const formdata = new FormData();
      formdata.append(
        "file",
        cropFile ? cropFile : imageFile
      );
      formdata.append("alt", "source-product-img");
      let sourceImage = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER!}/api/media`,
        data: formdata,
      });
      addItem({
        id: `${Date.now()}`,
        name: cartProduct,
        price: currentProductPrice,
        imgUrl: `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER}${image!.url}`,
        imgId: image!.id,
        sourceImgId: sourceImage.data.doc.id,
        printOnBothSide: printOnBothSide,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleAddToCartWithToastPromise = () => {
    if (productUploadImage !== "/demo-logo.png") {
      if (currentProductPrice !== 0) {
        toast.promise(
          handleAddToCart,
          {
            pending: "Processing... 😊",
            success: "Product Added To Cart",
            error: "Something Wrong",
          },
          { theme: "dark" }
        );
      } else {
        toast.error("Please Select Quantity", { theme: "dark" });
      }
    } else {
      toast.error("Please Upload Image", { theme: "dark" });
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob((blob) => {
      let file = new File([blob!], "cropImage.png", { type: "image/png" });
      setCropFile(file);
    }, "image/png");
    detailBoxRef.current!.style.backgroundImage = `url(${cropper!
      .getCroppedCanvas()
      .toDataURL()})`;
    store.productUploadImage = cropper!.getCroppedCanvas().toDataURL();
    setIsCopperOpen(false);
  };

  const handleCopperCancel = () => {
    setIsCopperOpen(false);
  };

  return (
    <>

      <div data-active={isCopperOpen} className={s.copper}>
        <div data-active={isCopperOpen} className={s.copper_popup}>
          <div className={s.copper_head}>
            <h2>Crop Image</h2>
            <div>
              <Button onClick={handleCopperCancel} varients="secondary">
                Cancel
              </Button>
              <Button onClick={handleCrop} varients="black">
                Crop
              </Button>
            </div>
          </div>
          <div className={s.copper_cover}>
            <Cropper
              src={image}
              // Cropper.js options
              className={s.copper_crop}
              initialAspectRatio={1 / 1}
              guides={false}
              ref={cropperRef}
              aspectRatio={1 / 1}
            />
          </div>
        </div>
      </div>
      <div className={s.main}>
      <div>

      {/* Modal component, conditionally rendered */}
      <BasicModal open={open} closeModal={closeModal} handleUpload={handleUpload} uploadImageRef={uploadImageRef}/>
    </div>
        <div className={s.upload}>
          <h2>Upload Image</h2>
          <Collapse />
        </div>
        <div className={s.detail}>
          <div ref={detailBoxRef} className={s.detail_box}>
            <button onClick={handleDeleteUploadImage} data-box>
              <Delete />
            </button>
            {/* <button onClick={handleMovement} data-box>
              <Move />
            </button> */}
          </div>
          {/* <button onClick={handleCenterArrow}>
            <VerticalArrow /> <span>Centre Vertically</span>
          </button> */}
          {/* <button>
          <HorizontalArrow /> <span>Centre Horizontally</span>
        </button> */}    
        <ColorBtn />
          <div className={s.uploadBtn}>
            <input
              onChange={handleUpload}
              ref={uploadImageRef}
              accept="image/png, image/jpeg"
              type="file"
              id="react-upload"
              hidden
            />
            <label htmlFor="react-upload">
              <Upload />
              <span>Upload New Image</span>
            </label>
            <br></br>
            <label htmlFor="react-upload">
              <Upload />
              <button onClick={openModal}>Design Image</button>
            </label>
          </div>
   
        </div>
        <div className={s.desc}>
          <div className={s.checkbox}>
            <input
              onChange={(e) => (store.printOnBothSide = e.target.checked)}
              type="checkbox"
              id="react-checkbox"
              checked={printOnBothSide}
            />
            <div className={s.checkbox_circle}>
              <div />
            </div>
            <label htmlFor="react-checkbox">
              Print on both sides of the cup.
            </label>
          </div>
          {/* <p>
          Netus tortor nibh sed aliquet in vitae. Massa neque augue dignissim
          vel quam. In convallis lacus netus ornare ut tempus orci.
        </p> */}
        
            <div
          style={{
            display: 'flex',
            flexDirection: 'column',  // Stack everything vertically
            alignItems: 'center',
            gap: '20px',              // Space between the sections
          }}
        >
          <div
            style={{
              display: 'flex',        // Horizontal layout for button and slider
              gap: '10px',            // Space between button and slider
            }}
          >
            <button style={{ height: '100px', width: '100px' , border : "none", background: 'transparent'}} onClick={() => handleImageSize("plus")}>
              <MagnifyingGlassPlus />
            </button>

            <button className="MagnifyingGlassMinus" style={{ height: '100px', width: '100px', border : "none", background: 'transparent' }} onClick={() => handleImageSize("minus")}>
              <MagnifyingGlassMinus />
            </button>

          </div>

          <input
            type="range"
            style={{ width: '200px' }}    // Adjust width if needed
            onChange={handleRangeInput}
            min={-50}
            max={50}
            step={1}
            value={positionY}
          />
        </div>

        <button className={s.addToCartBtn} onClick={handleAddToCartWithToastPromise}>Add to cart</button>
        </div>
      </div>
    </>
  );
};

export default Configuration;
