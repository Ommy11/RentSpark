import { useState , useEffect} from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../Firebase.js";
import { useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";

function Services() {
    const navigate = useNavigate();
    const params = useParams();
  const {currentUser} = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrl: [],
    title: "",
    description: "",
    price: 0,
    category: "",
    address: "",
    contact: "",
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(formData);

  useEffect(() => {
      const fetchListing = async () => {
          const listingId = params.listingId;
          // console.log(listingId);
          const res = await fetch(`/api/listing/get/${listingId}`); 
          const data = await res.json();
          if(data.success === false){
            console.log(data.message);
            return;
          }
          setFormData(data);
      };

        fetchListing();
  }, [params.listingId]);



  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrl.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrl: formData.imageUrl.concat(urls),
          });

          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed, please try again");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can upload a maximum of 6 images");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrl: formData.imageUrl.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    if (formData.imageUrl.length < 1) 
      return setError("Please upload at least one image");
    setLoading(true);
    setError(false);
    const res = await fetch(`/api/listing/update/${params.listingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        userRef: currentUser._id,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success === false) {
      setError(data.message);
    }
    navigate(`/listing/${data._id}`);
   } catch (error) {
    setLoading(false);
    setError(error.message);
    
   }
  };
 
  return (
    <main className="p-3 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-10">
        Update the Services
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <label htmlFor="name" className="text-lg font-semibold">
            Service Name :{" "}
          </label>
          <input
            type="text"
            className="border-2 border-slate-300 rounded-lg p-2"
            id="title"
            minLength="1"
            // maxLength='20'
            required
            onChange={handleChange}
            value={formData.title}
          />
          <label htmlFor="category" className="text-lg font-semibold">
            Category :{" "}
          </label>
          <input
            type="text"
            className="border-2 border-slate-300 rounded-lg p-2"
            id="category"
            minLength='1'
            // maxLength='20'
            required
            onChange={handleChange}
            value={formData.category}
            />
          <label htmlFor="description" className="text-lg font-semibold">
            Description :{" "}
          </label>
          <textarea
            name="Description"
            className="border-2 border-slate-300 rounded-lg p-2"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <label htmlFor="address" className="text-lg font-semibold">
            Address :{" "}
          </label>
          <input
            type="text"
            className="border-2 border-slate-300 rounded-lg p-2"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <label htmlFor="contact" className="text-lg font-semibold">
            Contact :{" "}
          </label>
          <input
            type="number"
            className="border-2 border-slate-300 rounded-lg p-2"
            id="contact"
            required
            onChange={handleChange}
            value={formData.contact}
          />

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="price" className="text-lg font-semibold">
                Price :{" "}
              </label>
              <input
                type="number"
                id="price"
                min="0"
                max="100000000000"
                required
                className="p-3 border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.price}
              />
              <p>(Rs.)Per day</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold ">
            Images:
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              multiple
              accept="image/*"
              required
              className="p-3 border border-gray-300 rounded-w-full"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3  bg-green-700 text-white border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 "
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-600">{imageUploadError && imageUploadError}</p>
          {formData.imageUrl.length > 0 &&
            formData.imageUrl.map((urls, index) => (
              <div
                key={urls}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={urls}
                  alt="listed images"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  type="button"
                  className="p-3 bg-red-700 text-white rounded-lg hover:opacity-90"
                >
                  Remove
                </button>
              </div>
            ))}
          <button disabled={loading || uploading} className="p-3 bg-slate-900 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
            {loading ? "Adding..." : "Update "}
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default Services;
