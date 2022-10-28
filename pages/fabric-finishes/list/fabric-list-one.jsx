import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import FabricGrid from "./fabric-grid";
import FabricModal from "~/components/features/modals/fabric-modal";

function FabricListOne(props) {
  const { loading, products = [], perPage, matId } = props;
  const router = useRouter();
  const query = Object.keys(router.query);

  const [fakeArray, setFakeArray] = useState([]);
  const [gridClass, setGridClass] = useState("col-6");
  const type = "4cols";

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < perPage; i++) {
      temp.push(i);
    }
    setFakeArray(temp);
  }, [perPage]);

  useEffect(() => {
    if (type === "list" || type === "2cols") setGridClass("col-6");
    if (type === "3cols") setGridClass("col-6 col-md-4 col-lg-4");
    if (type === "4cols") setGridClass("col-6 col-md-4 col-lg-4 col-xl-3");
  }, [type]);

  const [isOpen, setIsOpen] = useState(false);

  const [productId, setProductId] = useState(false);

  const finishesArray = products?.child_value?.filter(
    (item) => item?.value?.material_id == matId
  );

  let finishesdata = [];

  finishesArray?.forEach((data) => {
    finishesdata.push(
      data?.child?.filter((item) => item?.value?.material_id == matId)
    );
  });

  finishesdata = finishesdata?.reduce(function (a, b) {
    return a.concat(b);
  }, []);

  let collectionsData = [];
  let uniqueCollectionsTitle;
  if (finishesdata) {
    finishesdata?.forEach((element) => {
      collectionsData.push(element?.value?.title);
    });
    uniqueCollectionsTitle = [...new Set(collectionsData)];
  }

  // colors filter Data
  const colorsArray = products?.child_value?.filter(
    (item) => item?.material_id == matId
  );

  let colorsCollectionData = [];
  let uniqueColorsTitle;
  if (colorsArray) {
    colorsArray?.forEach((element) => {
      colorsCollectionData.push(element?.title);
    });
    uniqueColorsTitle = [...new Set(colorsCollectionData)];
  }

  return (
    <div className="products mb-3">
      {products?.length == 0 && !loading ? (
        <p className="no-results">No products matching your selection.</p>
      ) : (
        <div className="row">
          {loading ? (
            fakeArray?.map((item, index) => (
              <div className={gridClass} key={index}>
                <div className="skel-pro"></div>
              </div>
            ))
          ) : query[0] == "color" ? (
            uniqueColorsTitle?.length > 0 ? (
              uniqueColorsTitle?.map((x, ind) => (
                <>
                  <div className="col-12">
                    <h5
                      style={{
                        marginBottom: "15px",
                        marginTop: "10px",
                      }}
                      key={ind}
                    >
                      {x}
                    </h5>
                  </div>
                  {colorsArray?.length > 0 ? (
                    colorsArray
                      ?.filter((t) => {
                        return t?.title === x;
                      })
                      ?.map((product, index) => (
                        <div className={gridClass} key={index}>
                          <FabricGrid
                            product={product}
                            setProductId={setProductId}
                            setIsOpen={setIsOpen}
                            query={query}
                          />
                        </div>
                      ))
                  ) : (
                    <p className="no-results">
                      No products matching your selection.
                    </p>
                  )}
                </>
              ))
            ) : (
              <p className="no-results">No products matching your selection.</p>
            )
          ) : uniqueCollectionsTitle?.length > 0 ? (
            uniqueCollectionsTitle?.map((x, ind) => (
              <>
                <div className="col-12">
                  <h5
                    style={{
                      marginBottom: "15px",
                      marginTop: "10px",
                    }}
                    key={ind}
                  >
                    {x}
                  </h5>
                </div>
                {finishesdata?.length > 0 ? (
                  finishesdata
                    ?.filter((t) => {
                      return t?.value?.title === x;
                    })
                    ?.map((product, index) => (
                      <div className={gridClass} key={index}>
                        <FabricGrid
                          product={product}
                          setProductId={setProductId}
                          setIsOpen={setIsOpen}
                        />
                      </div>
                    ))
                ) : (
                  <p className="no-results">
                    No products matching your selection.
                  </p>
                )}
              </>
            ))
          ) : (
            <p className="no-results">No products matching your selection.</p>
          )}
        </div>
      )}

      <FabricModal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        productId={productId}
      />
    </div>
  );
}

export default React.memo(FabricListOne);
