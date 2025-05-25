import { Edit2, Trash2 } from "lucide-react";

export const ItemsList = ({ items, onEdit, onDelete, type }) => {
  return (
    <div className="space-y-4  overflow-y-auto">
      {items.length === 0 ? (
        <p className="text-center text-gray-500">No {type} found</p>
      ) : (
        items.map((item) => (
          <div 
            key={item._id} 
            className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {type === 'projects' ? item.subtitle : item.organization}
                </p>
              </div>
              <div className="flex gap-2">
                <span
                  onClick={() => onEdit(item)}
                  className="p-2 text-blue-500 hover:text-blue-600"
                >
                  <Edit2 size={18} />
                </span>
                <span
                  onClick={() => onDelete(item._id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};