import { FiActivity, FiClock, FiSettings } from "react-icons/fi";
import { GiDiamondRing, GiCrown, GiPocketWatch } from "react-icons/gi";

const categories = [
  {
    id: 1,
    title: "Luxury",
    subtitle: "Premium Swiss Collection",
    icon: GiDiamondRing,
  },
  {
    id: 2,
    title: "Smart",
    subtitle: "Next Generation",
    icon: FiClock,
  },
  {
    id: 3,
    title: "Classic",
    subtitle: "Timeless Design",
    icon: GiPocketWatch,
  },
  {
    id: 4,
    title: "Automatic",
    subtitle: "Mechanical Excellence",
    icon: FiSettings,
  },
  {
    id: 5,
    title: "Sport",
    subtitle: "Adventure Ready",
    icon: FiActivity,
  },
  {
    id: 6,
    title: "Limited",
    subtitle: "Exclusive Edition",
    icon: GiCrown,
  },
];

export default categories;