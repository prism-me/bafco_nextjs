import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ALink from "~/components/features/alink";
import { API } from "~/http/API";

function HeaderSearch() {
  const router = useRouter("");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.querySelector("body").addEventListener("click", closeSearchForm);

    return () => {
      document
        .querySelector("body")
        .removeEventListener("click", closeSearchForm);
    };
  }, []);

  useEffect(() => {
    if (searchTerm?.length > 2) setLoading(true);
    API.get(`/search?query=${searchTerm}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 || response.status === 201) {
          setLoading(false);
          setProducts(response?.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [searchTerm]);

  useEffect(() => {
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }, [router.pathname]);

  function closeSearchForm(e) {
    document.querySelector(".header .header-search").classList.remove("show");
  }

  function onSearchChange(e) {
    var lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
  }

  function showSearchForm(e) {
    document.querySelector(".header .header-search").classList.add("show");
  }

  return (
    <div className="header-search header-search-extended header-search-visible header-search-no-radius d-none d-lg-block">
      <button className="search-toggle">
        <i className="icon-search"></i>
      </button>
      <form onSubmit={(e) => e.preventDefault()} onClick={showSearchForm}>
        <div className="header-search-wrapper search-wrapper-wide">
          <label htmlFor="q" className="sr-only" value={searchTerm} required>
            Search
          </label>
          <input
            type="text"
            onChange={onSearchChange}
            value={searchTerm}
            className="form-control"
            autoComplete="off"
            name="q"
            placeholder="What are you looking for?"
            required
          />
          <button className="btn btn-primary" type="submit">
            <i className="icon-search"></i>
          </button>
          <div className="live-search-list">
            {searchTerm?.length > 2 && (
              <>
                {loading ? (
                  <div
                    className="loader"
                    style={{
                      borderTopColor: "white",
                      borderRightColor: "white",
                      borderBottomColor: "white",
                      borderLeftColor: "#008482",
                      width: "sm" ? "6em" : "md" ? "10em" : "10em",
                      height: "sm" ? "6em" : "md" ? "10em" : "10em",
                    }}
                  />
                ) : (
                  <div className="autocomplete-suggestions">
                    {products.length > 0 ? (
                      products?.map((product, index) => (
                        <ALink
                          href={`/collections/${product?.category_route?.parent_catetory[0]?.route}/${product?.category_route?.route}/${product?.route}`}
                          className="autocomplete-suggestion"
                          key={`search-result-${index}`}
                        >
                          {product.name}
                        </ALink>
                      ))
                    ) : (
                      <p
                        style={{
                          color: "lightgray",
                          textTransform: "capitalize",
                          padding: "1rem",
                        }}
                      >
                        No Product Found !!!
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default HeaderSearch;
