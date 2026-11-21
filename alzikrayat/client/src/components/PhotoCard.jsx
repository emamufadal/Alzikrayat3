import { Link } from 'react-router-dom';
import { imageUrl } from '../api.js';
import { formatDate, fullName } from '../utils.js';

// layout is either "grid" or "list"
function PhotoCard({ photo, layout = 'grid' }) {
  const detailPath = `/photos/${photo._id}`;

  return (
    <article className={`photo-card ${layout}`}>
      <Link to={detailPath} className="photo-frame">
        <img src={imageUrl(photo.fileName)} alt={photo.title} loading="lazy" />
      </Link>
      <div className="photo-info">
        <h3>
          <Link to={detailPath}>{photo.title}</Link>
        </h3>
        <p className="meta">
          {fullName(photo.userId)}, {formatDate(photo.dateTime)}
        </p>
        {layout === 'list' && photo.description && (
          <p className="photo-description">{photo.description}</p>
        )}
      </div>
    </article>
  );
}

export default PhotoCard;
