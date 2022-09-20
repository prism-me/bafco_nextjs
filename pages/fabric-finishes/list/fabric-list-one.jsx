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

  return (
    <div className="products mb-3">
      {products.length == 0 && !loading ? (
        <p className="no-results">No products matching your selection.</p>
      ) : (
        <div className="row">
          {loading ? (
            fakeArray.map((item, index) => (
              <div className={gridClass} key={index}>
                <div className="skel-pro"></div>
              </div>
            ))
          ) : products?.child_value?.length == 0 && !loading ? (
            <p className="no-results">No products matching your selection.</p>
          ) : query[0] == "collection" ? (
            products?.child_value
              ?.filter((item) => item.value.material_id == matId)
              ?.map((product, index) => (
                <div className={gridClass} key={index}>
                  <FabricGrid
                    product={product}
                    setProductId={setProductId}
                    setIsOpen={setIsOpen}
                  />
                </div>
              ))
          ) : query[0] == "color" ? (
            products?.child_value
              ?.filter((item) => item.value.material_id == matId)
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
            products?.child_value[0]?.child
              ?.filter((item) => item.value.material_id == matId)
              ?.map((product, index) => (
                <div className={gridClass} key={index}>
                  <FabricGrid
                    product={product}
                    setProductId={setProductId}
                    setIsOpen={setIsOpen}
                  />
                </div>
              ))
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
