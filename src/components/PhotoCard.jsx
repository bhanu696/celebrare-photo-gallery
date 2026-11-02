
export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        className="h-56 w-full object-cover"
      />

      <div className="flex items-center justify-between p-4">
        <p className="font-medium text-gray-800">
          {photo.author}
        </p>

        <button
          onClick={() => onToggleFavorite(photo.id)}
          aria-label="Toggle favorite"
          className="text-2xl"
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>
    </div>
  );
}
