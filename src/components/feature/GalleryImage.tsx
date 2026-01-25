interface GalleryImageProps {
  src: string;
  span?: string;
}

export const GalleryImage = ({ src, span = "" }: GalleryImageProps) => {
  return (
    <div className={`gallery-img overflow-hidden rounded-2xl ${span}`}>
      <img
        src={src}
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
        alt="Office Life"
      />
    </div>
  );
};
