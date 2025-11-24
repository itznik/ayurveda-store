"use client";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { useEffect } from "react";

interface AddressAutocompleteProps {
  onSelect: (address: {
    street: string;
    city: string;
    zip: string;
    country: string;
    state: string;
  }) => void;
  className?: string;
}

export function AddressAutocomplete({ onSelect, className }: AddressAutocompleteProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here if needed, e.g., componentRestrictions: { country: "us" } */
    },
    debounce: 300,
  });

  interface GoogleAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
  }
  
  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const addressComponents = results[0].address_components;

      // Extract details from Google's complex response
      const getComponent = (type: string) => 
  addressComponents.find((c: GoogleAddressComponent) => c.types.includes(type))?.long_name || "";

      onSelect({
        street: `${getComponent("street_number")} ${getComponent("route")}`.trim(),
        city: getComponent("locality") || getComponent("postal_town"),
        state: getComponent("administrative_area_level_1"),
        zip: getComponent("postal_code"),
        country: getComponent("country"),
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className={`relative group z-50 ${className}`}>
      {/* THE INPUT */}
      <input
        disabled={!ready}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Address (Start typing...)"
        className="w-full px-5 py-4 pl-12 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 focus:border-luxury-primary dark:focus:border-emerald-500 transition-all text-luxury-dark dark:text-white placeholder-neutral-400 text-sm font-medium"
      />
      <div className="absolute left-4 top-4 text-neutral-400">
        <MapPin className="h-5 w-5" />
      </div>

      {/* THE DROPDOWN (Luxury Style) */}
      <AnimatePresence>
        {status === "OK" && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute mt-2 w-full bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-[100]"
          >
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                className="px-5 py-3 text-sm cursor-pointer hover:bg-neutral-50 dark:hover:bg-white/5 text-luxury-dark dark:text-neutral-300 transition-colors border-b border-neutral-100 dark:border-white/5 last:border-none flex items-center gap-3"
              >
                <MapPin className="h-4 w-4 text-luxury-primary opacity-50" />
                {description}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
