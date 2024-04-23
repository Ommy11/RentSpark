import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

function ListingItem({ listing }) {

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? 'text-yellow-500' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  return (
    <div className='bg-white shadow-md  hover:shadow-lg transition-shadow overflow-hidden rounded-lg sm:w-[330px]' >
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrl[0]}
          alt="listing-cover"
          className='h-[300px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 ease-in'
        />
        <div className='p-2 flex flex-col gap-2 w-full'>
          <p className='truncate text-normal font-semibold text-slate-800'>{listing.title}</p>

          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4  text-green-700' />
            <p className='text-sm text-slate-700 truncate'>{listing.address}</p>
          </div>
          <p className='truncate text-sm text-gray-700 line-clamp-2'>{listing.description}</p>
          <p>Rs.{listing.price} <span> / day</span></p>
          <p className='truncate text-normal font-semibold text-slate-800'>{listing.category} </p>
          <p className='truncate text-normal font-semibold text-slate-800'>{listing.username} </p>

          <div className="flex items-center gap-1">
            {renderStars(listing.rating)}

            
          </div>
        </div>
      </Link>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired

};

export default ListingItem;
