import { useEffect, useState } from "react";
import { DataItem, getAllProducts } from "../services/Products";
import Button from "../components/Button/Button";
import ModalNewEditProducts from "../components/Product/ModalNewEditProduct";
import ModalDeleteProduct from "../components/Product/ModalDeleteProduct";

import TableProducts from "../components/Product/TableProducts";
import { useAppContext } from "../hooks/UseContext";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const navigate = useNavigate();
  const { products, setProducts } = useAppContext();

  const [isModalOpen, setisModalOpen] = useState(false);
  const [isModalEdit, setisModalEdit] = useState(false);
  const [isModalDelete, setisModalDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DataItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openModal = () => setisModalOpen(true);
  const closeModal = () => {
    setisModalOpen(false);
    setSelectedProduct(null);
  };

  const openModalDelete = (product: DataItem) => {
    setisModalDeleteOpen(true);
    setSelectedProduct(product);
  };
  const closeModalDelete = () => {
    setisModalDeleteOpen(false);
  };

  const openEditModal = (product: DataItem) => {
    setSelectedProduct(product);
    setisModalEdit(true);
    openModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getAllProducts(
          localStorage.getItem("access_token")
        );
        setProducts(allProducts);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
          console.log(errorMessage);
          
          navigate("/");
        } else {
          alert("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div>
        <Button  className="bg-[#fbe155] hover:bg-yellow-400" title="Add new product" onclick={openModal} />
      </div>
      <div className="mt-4">
        {products?.data ? (
          <TableProducts
            data={products.data}
            openEditModal={openEditModal}
            openDeleteModal={openModalDelete}
          />
        ) : (
          <p>No products available</p>
        )}
      </div>

      <ModalNewEditProducts
        isOpen={isModalOpen}
        onClose={closeModal}
        edit={isModalEdit}
        dataItem={selectedProduct}
      />

      <ModalDeleteProduct
        isOpen={isModalDelete}
        onClose={closeModalDelete}
        dataItem={selectedProduct}
      />
    </div>
  );
}

export default ProductsPage;
