import { Techa } from "../../types/techa";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImageGridProps {
  techas: Techa[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ techas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {techas.map((techa) => (
        <div key={techa.name} className="relative">
          <LazyLoadImage
            src={techa.image}
            alt={techa.name}
            effect="blur"
            placeholderSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAabsAAAFYBAMAAAA4l08BAAAAJFBMVEX////q6urS0tLx8fH8/Pz5+fnt7e3i4uL29vbd3d3n5+fX19daR20aAAAE50lEQVR42u3avW8bdRjA8YtyTg0TJyoXPEZiiLy4cuO67XIRTilMQdgogiWWVYMylVdjZ3HltBgmCLSW8VJLEKMbs6DI/xzPc9ekThrfueNz+n4qdfEN/fb5vZzbOA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSKtM4WFenxzspjL..."
            className="w-full h-auto transition-transform transform hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-60 text-white w-full">
            {techa.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
