import { FaTrash, FaEdit } from "react-icons/fa";
import { DataItem } from "../../services/Products";

interface TableProductsProps {
  data: DataItem[];
  openEditModal: (product: DataItem) => void;
  openDeleteModal: (product: DataItem) => void;
}

function TableProducts({
  data,
  openEditModal,
  openDeleteModal,
}: TableProductsProps) {
  return (
    <div className=" overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-white">
        <thead className="text-xs text-white uppercase bg-[#26272F]">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              className="odd:bg-white odd:text-black  even:bg-gray-50 even:text-black  border-b "
              key={item.id}
            >
              <td className="px-6 py-3 justify-center">{item.name}</td>
              <td className="px-6 py-3">{item.description}</td>
              <td className="px-6 py-3">{item.price}</td>
              <td className="px-6 py-3">{item.category}</td>
              <td>
                <div className="flex gap-3">
                  <FaTrash
                    size={16}
                    onClick={() => {
                      openDeleteModal(item);
                    }}
                  />{" "}
                  <FaEdit
                    size={16}
                    onClick={() => {
                      openEditModal(item);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableProducts;
