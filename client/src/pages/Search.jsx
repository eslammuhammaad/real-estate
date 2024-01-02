import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading]=useState(false);
  const [properties, setProperties]=useState([]);
  const navigate = useNavigate();
  console.log(properties);
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermUrl = urlParams.get("searchTerm");
    const typeUrl = urlParams.get("type");
    const offerUrl = urlParams.get("offer");
    const parkingUrl = urlParams.get("parking");
    const furnishedUrl = urlParams.get("furnished");
    const sortUrl = urlParams.get("sort");
    const orderUrl = urlParams.get("order");

    if (
        searchTermUrl ||
        typeUrl ||
        parkingUrl ||
        furnishedUrl ||
        offerUrl ||
        sortUrl ||
        orderUrl
      ) {
        setSidebarData({
          searchTerm: searchTermUrl || '',
          type: typeUrl || 'all',
          parking: parkingUrl === 'true' ? true : false,
          furnished: furnishedUrl === 'true' ? true : false,
          offer: offerUrl === 'true' ? true : false,
          sort: sortUrl || 'created_at',
          order: orderUrl || 'desc',
        });
      }

      const getProperties=async()=>{
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setProperties(data);
        setLoading(false);
      }

      getProperties();
  },[location.search])
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };
  const handleSearch=(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r md:min-h-screen">
        <form onSubmit={handleSearch} className="flex flex-col gap-8">
          <div className="flex gap-4 items-center">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Search ..."
              className="border p-3 rounded-lg w-full"
              onChange={handleChange}
              value={sidebarData.searchTerm}
            ></input>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5 border rounded-md"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 border rounded-md"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5 border rounded-md"
                onChange={handleChange}
                checked={sidebarData.type === "sell"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 border rounded-md"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 border rounded-md"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 border rounded-md"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="font-semibold whitespace-nowrap">Sort By : </label>
            <select
              id="sort_order"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
              className="p-3 border rounded-lg w-full"
            >
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="p-3 bg-gray-700 text-white rounded-lg hover:opacity-75 uppercase">
            Search
          </button>
        </form>
      </div>
      <div className="p-7">
        <h1 className="text-3xl font-semibold text-gray-700 mt-5 border-b">
          Listing Result:
        </h1>
      </div>
    </div>
  );
}
