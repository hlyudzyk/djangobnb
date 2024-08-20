'use client'

import useSearchModal, {SearchQuery} from "@/app/hooks/useSearchModal";
import {useEffect, useState} from "react";
import Category from "@/app/components/categories/Category";
import apiService from "@/app/services/apiServices";

export type CategoryType = {
  id:string;
  name: string;
  slug: string;
  image_url: string;
};

interface CategoriesProps {
  onCategorySelect?: (category: CategoryType) => void; // Callback prop to notify parent
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const searchModal = useSearchModal();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType|null>();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const _setCategory = (_category: CategoryType) => {
    setSelectedCategory(_category);
    searchModal.setQuery({ ...searchModal.query, category: _category.slug });

    if (onCategorySelect) {
      onCategorySelect(_category);
    }
  };

  const getCategories = async () => {
    const categories: CategoryType[] = await apiService.get('/api/properties/categories/');
    setCategories(categories);
    _setCategory(categories[0])
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
      <div className="pt-3 pb-6 flex items-center space-x-12">

        {categories.map((category: CategoryType) => (
            <Category
                key={category.id}
                isSelected={selectedCategory === category}
                imageUrl={category.image_url}
                title={category.name}
                onClick={() => _setCategory(category)}
            />
        ))}
      </div>
  );
};

export default Categories;
