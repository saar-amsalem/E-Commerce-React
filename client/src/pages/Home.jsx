import React from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";
import YoutubeEmbed from "../components/Video";


const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <YoutubeEmbed embedId="rokGy0huYEA" />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
