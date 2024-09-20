import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Loading from "../Loading/Loading";
import { DataItem, deleteProduct } from "../../services/Products";
import Button from "../Button/Button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataItem: DataItem | null;
}

function ModalDeleteProduct({ isOpen, onClose, dataItem }: ModalProps) {
  const [loading, setloading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setloading(true);

      if (dataItem?.id) {
        await deleteProduct(dataItem?.id, localStorage.getItem("access_token"));
        handleClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setloading(false);
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
          <div className="flex flex-col w-3.4 bg-[#f6f6f6] rounded-xl p-5">
            <div className="flex justify-between items-center gap-7 w-auto h-14">
              <p className="text-xl font-semibold">Delete selected product?</p>
              <IoClose size={25} onClick={onClose} />
            </div>
            <form
              className="flex flex-col  gap-5 flex-1"
              onSubmit={handleFormSubmit}
            >
              <div className="flex flex-col">
                <p className="text-md">
                  <strong>Name:</strong> {dataItem?.name}
                </p>
                <p className="text-md">
                  <strong>Description:</strong> {dataItem?.description}
                </p>
                <p className="text-md">
                  <strong>Price:</strong> {dataItem?.price}
                </p>
                <p className="text-md">
                  <strong>Category:</strong> {dataItem?.category}
                </p>
              </div>

              <div className="flex justify-between">
                <Button
                  className=" text-white bg-green-700 hover:bg-green-800 w-1/2"
                  title="Remove"
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

export default ModalDeleteProduct;
