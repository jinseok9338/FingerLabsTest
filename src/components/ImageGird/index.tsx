import React, { useState } from "react";
import { Techa } from "../../types/techa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImageGridProps {
  techas: Techa[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ techas }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTecha, setSelectedTecha] = useState<Techa | null>(null);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techas.map((techa) => (
          <div
            key={techa.name}
            className="relative cursor-pointer"
            onClick={() => {
              setSelectedTecha(techa);
              setModalOpen(true);
            }}
          >
            <LazyLoadImage
              src={techa.image}
              alt={techa.name}
              effect="blur"
              className="w-full h-auto transition-transform transform hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-60 text-white w-full">
              {techa.name}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg  relative max-w-xl w-full max-h-[100vh] flex flex-col">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-xl"
            >
              &times;
            </button>
            {selectedTecha && (
              <div className=" z-50 overflow-y-scroll mt-2 flex-grow scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedTecha.name}
                </h2>
                <img
                  src={selectedTecha.image}
                  alt={selectedTecha.name}
                  className="w-full h-auto mb-4"
                />
                <p className="mb-4">{selectedTecha.description}</p>
                <ul>
                  {selectedTecha.attributes.map((attr) => (
                    <li key={attr.trait_type}>
                      <strong>{attr.trait_type}:</strong> {attr.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div
            className="absolute inset-0"
            onClick={() => setModalOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
