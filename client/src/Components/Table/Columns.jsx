import { Button } from "../ui/Button";
import { ArrowUpDown, Calendar, MapPinHouse , BedDouble, Bath, Receipt, Ruler} from "lucide-react";

export const columns = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Calendar className="h-4 w-4 mr-1" />
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(row.getValue("date")));
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "address",
    // header: "Address",
    header: ({ column }) => {
      return (
        <div>
          <MapPinHouse className="h-4 w-4 mr-1 inline-block" />
          Address
        </div>
      );
    },
  },
  {
    accessorKey: "bedrooms",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <BedDouble className="h-4 w-4 mr-1 inline-block" />
          Bedrooms
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "bathrooms",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Bath className="h-4 w-4 mr-1 inline-block" />
          Bathrooms
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Receipt className="h-4 w-4 mr-1 inline-block" />
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
        // no cents if whole number
        minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "area_sqft",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <Ruler className="h-4 w-4 mr-1 inline-block" />
          Area (sq.ft.)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("area_sqft"));
      const formatted = new Intl.NumberFormat("en-US").format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
];
