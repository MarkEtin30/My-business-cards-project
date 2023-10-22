const categories = {
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  secondaryTitleRegex: /^.+$/, // Any text allowed
  phoneRegex: /^\d{3}\d{3}\d{4}$/, // Format like 555-123-4567
  titleRegex: /^.+$/, // Any text allowed
  countryRegex: /^[a-zA-Z\s]+$/, // Alphabetic characters only
  streetRegex: /^[a-zA-Z0-9\s]+$/, // Alphanumeric characters and spaces allowed
  descriptionRegex: /^.+$/, // Any text allowed
  cityRegex: /^[a-zA-Z\s]+$/, // Alphabetic characters and spaces allowed
  houseNumberRegex: /^.+$/,
};

function CheckValid(category1, category2, setFormData, formData, e) {
  if (categories[category1].test(e.target.value)) {
    setFormData({ ...formData, [category2 + "Valid"]: true });
  } else {
    setFormData({ ...formData, [category2 + "Valid"]: false });
  }
}

export default CheckValid;
