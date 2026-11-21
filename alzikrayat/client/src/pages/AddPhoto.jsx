import { useNavigate } from 'react-router-dom';
import UploadForm from '../components/UploadForm.jsx';

function AddPhoto({ user }) {
  const navigate = useNavigate();

  return (
    <section className="form-page">
      <h1>Add a photo</h1>
      <UploadForm user={user} onUploaded={(photo) => navigate(`/photos/${photo._id}`)} />
    </section>
  );
}

export default AddPhoto;
