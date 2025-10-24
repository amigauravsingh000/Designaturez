import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const DesignContext = createContext();

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error("useDesign must be used within DesignProvider");
  }
  return context;
};

export const DesignProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [designData, setDesignData] = useState({
    plotSize: { width: 30, length: 60, unit: "feet" },
    direction: "east",
    floors: 2,
    rooms: {
      bedrooms: 3,
      bathrooms: 2,
      kitchen: 1,
      livingRoom: true,
      diningRoom: true,
      poojaRoom: false,
      gym: false,
      studyRoom: false,
      guestRoom: false,
      storeRoom: false,
      utilityRoom: false,
      laundry: false,
      balconies: 1,
      terrace: false,
      parkingSpaces: 1,
      lawn: true,
      garden: false,
      staircase: true, // Always needed for multi-floor houses
    },
    roomDimensions: {},
    roomFloorAssignments: {},
    roomPlacements: {},
    floorPlans: [],
    customizations: {},
  });

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved || "light";
    } catch (e) {
      return "light";
    }
  });

  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    } catch (e) {
      // ignore
    }
  }, [theme]);

  // Save / Load design to localStorage
  const saveDesignToLocal = useCallback(
    (key = "houseDesign") => {
      try {
        localStorage.setItem(key, JSON.stringify(designData));
        return true;
      } catch (e) {
        console.error("Save failed", e);
        return false;
      }
    },
    [designData]
  );

  const loadDesignFromLocal = useCallback((key = "houseDesign") => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      setDesignData(parsed);
      return true;
    } catch (e) {
      console.error("Load failed", e);
      return false;
    }
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  const toggle3D = useCallback(() => setEnable3D((v) => !v), []);

  // Update room floor assignment
  const updateRoomFloorAssignment = useCallback((roomKey, floorNumber) => {
    setDesignData((prev) => ({
      ...prev,
      roomFloorAssignments: {
        ...prev.roomFloorAssignments,
        [roomKey]: parseInt(floorNumber),
      },
    }));
  }, []);

  // Update room placement after drag-and-drop
  const updateRoomPlacement = useCallback((roomKey, placement) => {
    setDesignData((prev) => ({
      ...prev,
      roomPlacements: {
        ...prev.roomPlacements,
        [roomKey]: {
          ...(prev.roomPlacements?.[roomKey] || {}),
          ...placement,
        },
      },
    }));
  }, []);

  const updateRoomPlacementZone = useCallback((roomKey, updates) => {
    setDesignData((prev) => ({
      ...prev,
      roomPlacements: {
        ...prev.roomPlacements,
        [roomKey]: {
          ...(prev.roomPlacements?.[roomKey] || {}),
          ...updates,
        },
      },
    }));
  }, []);

  const updateDesignData = useCallback((field, value) => {
    setDesignData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateRoomData = useCallback((roomType, value) => {
    setDesignData((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [roomType]: value,
      },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const goToStep = useCallback((step) => {
    setCurrentStep(step);
  }, []);

  return (
    <DesignContext.Provider
      value={{
        currentStep,
        designData,
        updateDesignData,
        updateRoomData,
        saveDesignToLocal,
        loadDesignFromLocal,
        theme,
        toggleTheme,
        enable3D,
        toggle3D,
        updateRoomPlacement,
        updateRoomPlacementZone,
        updateRoomFloorAssignment,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};
