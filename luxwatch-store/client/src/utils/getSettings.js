const defaultSettings = {
  storeName: "LuxWatch",
  storeEmail: "support@luxwatch.pk",
  phone: "+92 300 1234567",
  address: "Lahore, Pakistan",
  currency: "PKR",
  shippingFee: 500,
  freeShippingLimit: 50000,
};

export function getSettings() {
  const savedSettings = localStorage.getItem("luxwatch-settings");

  if (!savedSettings) {
    return defaultSettings;
  }

  try {
    return JSON.parse(savedSettings);
  } catch {
    return defaultSettings;
  }
}