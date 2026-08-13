import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import berriesImg from "../../assets/images/berries.png";
import citrusImg from "../../assets/images/citrus.png";
import exoticImg from "../../assets/images/exotic.png";
import melonesImg from "../../assets/images/melones.png";
import tropicalImg from "../../assets/images/tropical.png";
import stoneImg from "../../assets/images/stone.png";

gsap.registerPlugin(ScrollTrigger);

function CategorySection() {
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const categoryRefs = useRef([]);

  /*
   * =====================================================
   * FRONTEND DISPLAY NAME
   *        ↓
   * BACKEND / MONGODB CATEGORY
   * =====================================================
   *
   * MongoDB:
   *
   * Berry
   * Citrus
   * Tropical
   * Stone
   * Exotic
   *
   */

  const categories = [
    {
      name: "Berries",
      value: "Berry",
      image: berriesImg,
      tagline: "Sweet & Juicy",
    },

    {
      name: "Watermelon",
      value: "Watermelon",
      image: melonesImg,
      tagline: "Fresh & Refreshing",
    },

    {
      name: "Tropical Fruits",
      value: "Tropical",
      image: tropicalImg,
      tagline: "Exotic & Naturally Sweet",
    },

    {
      name: "Citrus Fruits",
      value: "Citrus",
      image: citrusImg,
      tagline: "Fresh & Zesty",
    },

    {
      name: "Stone Fruits",
      value: "Stone",
      image: stoneImg,
      tagline: "Juicy & Flavorful",
    },

    {
      name: "Exotic Fruits",
      value: "Exotic",
      image: exoticImg,
      tagline: "Unique & Premium",
    },
  ];

  /*
   * =====================================================
   * GSAP SCROLL ANIMATION
   * =====================================================
   */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        categoryRefs.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /*
   * =====================================================
   * CATEGORY CLICK
   * =====================================================
   */

  const handleCategoryClick = (categoryValue) => {
    navigate(
      `/product-Page?category=${encodeURIComponent(categoryValue)}`
    );
  };

  /*
   * =====================================================
   * VIEW ALL
   * =====================================================
   */

  const handleViewAll = () => {
    navigate("/product-Page");
  };

  return (
    <section
      ref={sectionRef}
      className="
        w-full
        bg-white
        py-14
        sm:py-16
        lg:py-20
        px-4
        sm:px-6
        border-y
        border-slate-100
      "
    >
      <div className="max-w-[1280px] mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-5
            mb-10
            sm:mb-12
          "
        >
          <div>

            <span
              className="
                inline-block
                text-[11px]
                sm:text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-emerald-700
                mb-2
              "
            >
              Explore Freshness
            </span>

            <h2
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-extrabold
                text-slate-900
                tracking-tight
              "
            >
              Shop By Category
            </h2>

            <p
              className="
                text-slate-500
                text-sm
                sm:text-base
                mt-2
                max-w-xl
                leading-relaxed
              "
            >
              Discover our carefully selected collection of fresh,
              premium fruits for every taste and season.
            </p>

          </div>

          {/* Desktop View All */}

          <button
            type="button"
            onClick={handleViewAll}
            className="
              hidden
              sm:inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-emerald-700
              hover:text-emerald-800
              transition-colors
              cursor-pointer
              group
              whitespace-nowrap
            "
          >
            <span>
              View All Categories
            </span>

            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </button>
        </div>

        {/* =================================================
            CATEGORY GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-6
            gap-x-4
            gap-y-8
            sm:gap-x-6
            sm:gap-y-10
          "
        >
          {categories.map((category, index) => (
            <button
              key={`${category.name}-${category.value}`}
              ref={(element) => {
                categoryRefs.current[index] = element;
              }}
              type="button"
              onClick={() =>
                handleCategoryClick(category.value)
              }
              className="
                group
                flex
                flex-col
                items-center
                text-center
                cursor-pointer
                focus:outline-none
              "
            >

              {/* =================================================
                  IMAGE CIRCLE
              ================================================= */}

              <div
                className="
                  relative
                  w-32
                  h-32
                  sm:w-36
                  sm:h-36
                  lg:w-40
                  lg:h-40
                  rounded-full
                  bg-emerald-50
                  border
                  border-emerald-100
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                  transition-all
                  duration-300
                  group-hover:bg-emerald-100
                  group-hover:border-emerald-200
                  group-hover:shadow-lg
                "
              >

                {/* Inner Circle */}

                <div
                  className="
                    absolute
                    inset-2
                    rounded-full
                    border
                    border-white/80
                  "
                />

                {/* Fruit Image */}

                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    relative
                    z-10
                    w-20
                    h-20
                    sm:w-24
                    sm:h-24
                    lg:w-28
                    lg:h-28
                    object-contain
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:scale-110
                  "
                />

              </div>

              {/* =================================================
                  CATEGORY NAME
              ================================================= */}

              <h3
                className="
                  mt-4
                  text-sm
                  sm:text-base
                  font-bold
                  text-slate-900
                  group-hover:text-emerald-700
                  transition-colors
                  duration-200
                "
              >
                {category.name}
              </h3>

              {/* =================================================
                  TAGLINE
              ================================================= */}

              <p
                className="
                  mt-1
                  text-[11px]
                  sm:text-xs
                  font-medium
                  text-slate-400
                  leading-relaxed
                "
              >
                {category.tagline}
              </p>

            </button>
          ))}
        </div>

        {/* =================================================
            MOBILE VIEW ALL
        ================================================= */}

        <div
          className="
            flex
            sm:hidden
            justify-center
            mt-10
          "
        >
          <button
            type="button"
            onClick={handleViewAll}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-2.5
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50
              text-sm
              font-bold
              text-emerald-700
              hover:bg-emerald-600
              hover:text-white
              hover:border-emerald-600
              transition-all
              duration-200
              cursor-pointer
              group
            "
          >
            <span>
              View All Categories
            </span>

            <ArrowRight
              size={16}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </button>
        </div>

      </div>
    </section>
  );
}

export default CategorySection;