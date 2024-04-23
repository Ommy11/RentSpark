import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../Components/ListingItem";

function Search() {
  const [sidebardata, setSidebardata] = useState({
    search: "",
    category: "all",
    sort: "created_at",
    order: "desc",  
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get("search");
    const category = urlParams.get("category");
    const sort = urlParams.get("sort");
    const order = urlParams.get("order");

    if (search || category || sort || order) {
      setSidebardata({
        search: search || "",
        category: category || "all",
        sort: sort || "created_at",
        order: order || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListing(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "search") {
      setSidebardata({ ...sidebardata, search: e.target.value });
    }

    if (e.target.id === "category") {
      setSidebardata({ ...sidebardata, category: e.target.value });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("search", sidebardata.search);
    urlParams.set("category", sidebardata.category);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listing.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListing([...listing, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap" htmlFor="search">
              Search :{" "}
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              onChange={handleChange}
              value={sidebardata.search}
            />
          </div>
          <div className="flex items-center gap-2 m-3">
            <label className="font-semibold" htmlFor="category">
              Category:
            </label>
            <select
              id="category"
              onChange={handleChange}
              defaultValue={"all"}
              className="border rounded-lg p-3"
              value={sidebardata.category}
            >
              <option value="all">All</option>
              <option value="venue">Event Venues</option>
              <option value="photography">Photography</option>
              <option value="sounds">Sounds and Equipments</option>
              <option value="videography">Videography</option>
              <option value="catering">Catering</option>
              <option value="tents">TentHouse and Lightings</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex items-center gap-2 m-3">
            <label className="font-semibold" htmlFor="sort_order">
              Sort :{" "}
            </label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="price_desc">Price high to low</option>
              <option value="price_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-blue-800 text-white p-3 w-full rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 ">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-6 flex flex-wrap gap-10">
          {!loading && listing.length === 0 && (
            <p className="text-slate-800 text-xl">No listing found!</p>
          )}

          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listing &&
            listing.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
        {showMore && (
          <button
            onClick={onShowMoreClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-5  rounded-full"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
