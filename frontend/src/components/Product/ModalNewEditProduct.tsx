import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Loading from "../Loading/Loading";
import { createProduct, DataItem, editProduct } from "../../services/Products";
import Button from "../Button/Button";

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home_kitchen", label: "Home and Kitchen" },
  { value: "beauty_personal", label: "Personal Care" },
  { value: "sports_outdoors", label: "Sports" },
  { value: "toys_games", label: "Toys and Games" },
  { value: "automotive", label: "Automotive" },
  { value: "books_media", label: "Books and Media" },
  { value: "health_wellness", label: "Health" },
  { value: "grocery_gourmet", label: "Grocery" },
];

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  edit?: boolean;
  dataItem?: DataItem | null;
}

function ModalNewEditProducts({
  isOpen,
  onClose,
  edit = false,
  dataItem,
}: ModalProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    if (edit && dataItem) {
      setFormData({
        name: dataItem.name,
        description: dataItem.description,
        price: dataItem.price,
        category: dataItem.category,
      });
    }
  }, [edit, dataItem]);

  const handleClose = () => {
    onClose();
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (edit) {
        await editProduct(
          {
            id: dataItem?.id,
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            category: formData.category,
          },
          localStorage.getItem("access_token")
        );
      } else {
        await createProduct(
          {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            category: formData.category,
          },
          localStorage.getItem("access_token")
        );
      }

      handleClose();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      location.reload();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="fixed flex inset-0 items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="flex flex-col w-1/3 bg-[#f6f6f6] rounded-xl p-5">
            <div className="flex justify-between items-center px-2 gap-7 w-auto h-14">
              <p className="text-xl font-semibold">
                {edit && dataItem ? "Edit Product" : "Upload new product"}
              </p>
              <IoClose size={25} onClick={handleClose} />
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-2">
                <input
                  required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Product Name"
                />
                <input
                  required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  placeholder="Description"
                />
                <input
                  required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                  type="number"
                  name="price"
                  min={0.01}
                  step={0.01}
                  onChange={handleChange}
                  value={formData.price}
                  placeholder="Price"
                />
                <select
                  required={true}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                  id="category-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value=""> Choose an option </option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <Button
                  className=" text-white bg-green-700 hover:bg-green-800 w-1/2"
                  title={edit && dataItem ? "Save" : "Add"}
                />

                <Button
                  className=" text-white bg-red-700 hover:bg-red-800 w-1/2"
                  title="Cancel"
                  onclick={handleClose}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalNewEditProducts;
