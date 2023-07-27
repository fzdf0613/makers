import { MdOutlineAddPhotoAlternate } from "react-icons/md";

type props = {
  customStyle?: string;
};

export default function AddImageIcon({ customStyle }: props) {
  return (
    <MdOutlineAddPhotoAlternate
      className={`w-20 h-20 text-gray-300 ${customStyle}`}
    />
  );
}
