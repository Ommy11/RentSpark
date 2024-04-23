import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import ListingItem from '../Components/ListingItem';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css';
import SwiperCore from 'swiper';
import ListingItem from '../Components/ListingItem';
import {
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  Typography,
  // Button,
} from "@material-tailwind/react";
import '../pages/Home.css'


SwiperCore.use([Navigation]);

const Home = () => {
  const [categoryListing, setCategoryListing] = useState([]);
  // const [text, setText] = useState('');
  
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchCategoryListing = async () => {
      try {
        const res = await fetch('/api/listing/get?category&limit=8');
        const data = await res.json();
        setCategoryListing(data);
      } catch (error) {
        console.error( error);
      }
    };

    fetchCategoryListing();
  }, []);

    

  return (
    <div className=''>
      <div className=''>
      {/* top */}
      <div className="flex flex-col gap-2 mx-auto p-28 justify-center h-screen bg-[url('./assets/images/event-home.jpg')] bg-cover bg-center opacity-95  ">
        <h1 className='text-4xl  font-bold text-white  transition-all duration-500 bg-repeat'>Welcome to Rent<span className='text-white'>Spark</span> </h1>
        <h3 className='text-3xl font-semibold text-white'>Your Premier Event Rental Marketplace </h3>

        {/* <div className='text-white text-xs sm:text-sm'>
          Are you planning a memorable event? At RentSpark
          <br />
          we are here to make your event dreams come true. Whether its a wedding, corporate gathering, birthday party, or any special occasion, we have got you covered.
        </div> */}
        <Link className='text-blue-800 text-xs sm:text-sm font-bold hover:underline' to={'/search'}>Lets start now..</Link>
      </div>
      </div>  

     {/* <div className='bg-white'> */}
      <div className='p-10 m-10 max-w-7xl mx-auto '>
        <Link to ={'/search'}><p className='text-3xl p-5 item-center text-center font-semibold text-slate-800'> Featured Categories</p>
        <div className='flex flex-wrap gap-2 '>
        <div className='flex flex-col gap-2'>
        <Card className=" relative grid h-full w-96 mt-5">
      <CardHeader color="transparent" className="relative inset-0 m-0 h-full bg-center  ">
        
        <img
          src="https://plus.unsplash.com/premium_photo-1664530452329-42682d3a73a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2VkZGluZyUyMHZlbnVlfGVufDB8fDB8fHww"
          alt="card-image"
          className='hover:scale-105 transition-scale duration-300 ease-in '
          
          
        />
      </CardHeader>
      <CardBody className="absolute  py-20 p-8 ml-14 md:px-10 text-center">
      <Typography 
        className=' mb-5 font-semibold leading-none text-center'
        variant='h3'
        color='white'
                >Event venue</Typography>
      </CardBody>
    </Card>
    <Card className="relative grid h-full w-96 ">
      
      <CardHeader color="blue-gray" className="relative  inset-0 m-0 h-full bg-center">
        <img 
          src="https://images.unsplash.com/photo-1461784180009-21121b2f204c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGRqJTIwYmFuZHN8ZW58MHx8MHx8fDA%3D"
          alt="card-image"
          className='hover:scale-105 transition-scale duration-300 ease-in'
        />
      
      </CardHeader>
      <CardBody className="absolute  py-20 p-8  md:px-10 text-center">
      <Typography 
        className=' mb-3 font-semibold leading-none text-center'
        variant='h3'
        color='white'
                >DJ & Sound Equipments</Typography>
      </CardBody>
      </Card>
    </div>
    <div className='flex flex-wrap gap-2'>
    
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-[665px]">
        <img
          src="https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D"
          alt="card-image"
          className='hover:scale-105 transition-scale duration-300 ease-in'
        />
      </CardHeader>
      <CardBody className="absolute  py-20 p-8  md:px-10 text-center">
      <Typography 
        className=' mb-3 font-semibold leading-none text-center'
        variant='h3'
        color='white'
                >Films & Photography</Typography>
      </CardBody>
    </Card>
    </div>
    
    <div className='flex flex-col gap-2'>
        <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-full">
        <img
          src="https://images.unsplash.com/photo-1425421598808-4a22ce59cc97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnQlMjB2ZW51ZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="card-image"
          className='hover:scale-105 transition-scale duration-300 ease-in'
        />
      </CardHeader>
      <CardBody className="absolute  py-20 p-8  md:px-10 text-center">
      <Typography 
        className=' mb-3 font-semibold leading-none text-center'
        variant='h3'
        color='white'
                >Tenthouse and Lighting</Typography>
      </CardBody>
    </Card>
    <Card className="mt-2 w-96">
      <CardHeader color="blue-gray" className="relative h-full">
        <img
          src="https://images.unsplash.com/photo-1625076019815-b1a5f7e5ef1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGNhdGVyaW5nfGVufDB8fDB8fHww"
          alt="card-image"
          className='hover:scale-105 transition-scale duration-300 ease-in'
        />
      </CardHeader>
      <CardBody className="absolute  py-20 p-8 ml-14 md:px-10 text-center">
      <Typography 
        className=' mb-5 font-semibold leading-none text-center'
        variant='h3'
        color='white'
                >Catering</Typography>
      </CardBody>
    </Card>
    </div>
    </div>
    
      </Link>
      </div>
      

      {/* listings */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-6 m-10'>
        {
          categoryListing && categoryListing.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-3xl font-semibold text-slate-800'>Featured Services</h2>
                <Link to ={'/search'} 
                className='text-blue-800  text-s sm:text-sm font-bold hover:underline'
                >Show more services</Link>
              </div>
              <div className='flex flex-wrap gap-6'>
              {
                categoryListing.map((listing) =>(
                  <ListingItem key={listing._id} listing={listing} />
                ))
              }
              </div>
            </div>
          )
        }

      </div>

    {/* why choose us */}
    
        <p className='text-3xl font-bold text-slate-800 text mb-10 text-center'>
          Why Choose RentSpark?
        </p>
        <div className='flex flex-wrap gap-1 mx-auto m-10 p-10 '>
          <div className='flex flex-col gap-2 mx-auto items-center'>

      <CardHeader color="blue-gray" className="relative h-full bg-cover ">
        <img
          src="https://cdn-icons-png.flaticon.com/128/1875/1875684.png"
          alt="card-image"
        />
      </CardHeader>
      <p className='text-xl font-semibold '>Quality Assurance</p>
      <p className='mt-3 w-96'>We partner with trusted providers to ensure
         that you receive top-notch products and services for your event.</p>
      </div>
      <div className='flex flex-col gap-3 mx-auto items-center'>
      
      <CardHeader color="blue-gray" className="relative h-full bg-cover items-center ">
        <img
          src="https://cdn-icons-png.flaticon.com/128/8249/8249851.png"
          alt="card-image"
        />
      </CardHeader>
      <p className='text-xl font-semibold'>Convenience</p>
      <p className='mt-3 w-96'>Our platform simplifies the planning process. Explore, book, and manage rentals seamlessly.</p>
      </div>
      <div className='flex flex-col gap-3 mx-auto items-center'>
      <CardHeader color="blue-gray" className="relative h-full bg-cover items-center ">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2101/2101784.png"
          alt="card-image"
        />
      </CardHeader>
      <p className='text-xl font-semibold'>Transparent Pricing</p>
      <p className='mt-3 w-96'>Know what you're paying for upfront. We believe in transparent and fair pricing.</p>
      </div>
      </div>
    
        

    
    </div>
  );
};

export default Home;