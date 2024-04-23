import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className=" flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.title.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="4"
            value={message}
            onChange={onChange}
            className="w-full p-2 border  border-gray-300 rounded-md"
            placeholder="Enter your Message .."
          ></textarea>

          <Link to={`mailto:${landlord.email}?subject=${listing.title}&body=${message}`} className="bg-blue-700 text-white uppercase rounded-lg p-2 text-center hover:opacity-95" >
          Send message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
