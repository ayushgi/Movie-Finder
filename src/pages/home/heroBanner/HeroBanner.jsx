import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss"
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";




const Hero = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    const bg =
        url.backdrop +
        data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
}, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
    }
};
  
  return (
    <div className="heroBanner">
    {!loading && (
        <div className="backdrop-img">
            <Img src={background} />
        </div>
    )}

    <div className="opacity-layer"></div>
    <ContentWrapper>
        <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
            Welcome to Movie Finder! We're thrilled you're here
            </span>
            <div className="searchInput">
                <input
                    type="text"
                    placeholder="Search Any Movie or Tv Show"
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                />
                <button>Search</button>
            </div>
        </div>
    </ContentWrapper>
</div>
  
  )
}

export default Hero
