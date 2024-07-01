import Image from "next/image";

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
    width: number;
    height: number;

    onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
}
export const ProductImage = ({
    src,
    alt,
    className,
    style,
    width,
    height,

    onMouseEnter,
    onMouseLeave
}:Props) => {
    const localSrc = (src)
        ? src.startsWith('http') //htttp://urlcompletodelaimagen.jpg
            ? src
            : `/products/${src}`
        // : '/imgs/placeholder.jpg'
        : 'https://res.cloudinary.com/dozzu7xhx/image/upload/v1719806561/perfil/p8osbgzrxslbx2bygvft.png'
  return (
    <Image
      src={ localSrc }
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
