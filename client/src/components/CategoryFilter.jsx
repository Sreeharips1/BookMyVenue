import {
  Building,
  Building2,
  Landmark,
  Trees,
  UtensilsCrossed,
  Volleyball,
  PartyPopper,
  Theater,
} from "lucide-react";

import CategoryChip from "./CategoryChip";

const categories = [
  {
    label: "All",
    value: "all",
    icon: Building,
  },
  {
    label: "Banquet Hall",
    value: "banquet hall",
    icon: Landmark,
  },
  {
    label: "Conference Hall",
    value: "conference hall",
    icon: Building2,
  },
  {
    label: "Sports",
    value: "sports",
    icon: Volleyball,
  },
  {
    label: "Rooftop",
    value: "rooftop",
    icon: Trees,
  },
  {
    label: "Restaurant",
    value: "restaurant",
    icon: UtensilsCrossed,
  },
  {
    label: "Auditorium",
    value: "auditorium",
    icon: Theater,
  },
  {
    label: "Party Hall",
    value: "party hall",
    icon: PartyPopper,
  },
  {
    label: "Wedding Venue",
    value: "wedding venue",
    icon: Landmark,
  },
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {categories.map((category) => (
        <CategoryChip
          key={category.value}
          Icon={category.icon}
          label={category.label}
          active={selectedCategory === category.value}
          onClick={() => setSelectedCategory(category.value)}
        />
      ))}
    </div>
  );
};

export default CategoryFilter;
