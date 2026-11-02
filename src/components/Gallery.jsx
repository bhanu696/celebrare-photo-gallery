import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";
import favouritesReducer from "../reducers/favouritesReducer";

export default function Gallery() {
  // Fetch photos from our custom hook
  const { photos, loading, error } = useFetchPhotos();

  // Search input state
  const [searchTerm, setSearchTerm] = useState("");

  // Favourite state using useReducer
  const [favorites, dispatch] = useReducer(
    favouritesReducer,
    [],
    () => {
      try {
        return JSON.parse(localStorage.getItem("favorites")) || [];
      } catch {
        return [];
      }
    }
  );

  // Save favourites whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Search handler
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // Toggle favourite
  const handleToggleFavorite = (photoId) => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: photoId,
    });
  };

  // Filter photos using search term
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

 return (
  <div className="min-h-screen bg-gray-100 px-4 py-8">
    <div className="mx-auto max-w-7xl">

      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Photo Gallery
      </h1>

      <p className="mb-6 text-gray-500">
        Explore photos and save your favourites.
      </p>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search photos by author..."
        value={searchTerm}
        onChange={(event) => handleSearch(event.target.value)}
        className="mb-8 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
      />

      {/* Loading state */}
      {loading && (
        <div className="py-16 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading photos...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <p className="py-10 text-center text-red-600">
          Error: {error}
        </p>
      )}

      {/* Photo grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={favorites.includes(photo.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <p className="col-span-full py-10 text-center text-gray-500">
              No photos found.
            </p>
          )}
        </div>
      )}

    </div>
  </div>
);
}