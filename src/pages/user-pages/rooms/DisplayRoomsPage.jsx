import React from 'react';
import Navbar from '../../../components/user-components/partials/header/Navbar';
// import DisplayRooms from '../../../components/user-components/Rooms/DisplayRooms';
import Footer from '../../../components/user-components/partials/footer/Footer';
import HotelList from '../../../components/user-components/Rooms/Test';
// import HotelLists from '../../../components/admin-components/room-components/HotelLists';
// import HotelList from './components/user-components/Rooms/Test';


function DisplayRoomsPage() {
  return (
    <>
      <Navbar />
      <HotelList />
      <Footer />
    </>
  );
}

export default DisplayRoomsPage;
