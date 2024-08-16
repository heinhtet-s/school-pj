import { handleFileUpload } from "../services/firebaseService/storageUtils";

export const processFileUploads = async (originalFormData, fileMappings, fileName) => {
  const formData = { ...originalFormData };

  for (const mapping of fileMappings) {
    //   const fileDetails = files[mapping.key];
    const key = mapping.key;
    const fileDetails = formData[key];
    const url = key + "_url";

    console.log("File dtl...", typeof fileDetails);

    if (typeof fileDetails === "string") {
      console.log("string");
      //s  formData[mapping.formKey] = formData[url];
    } else if (typeof fileDetails === "object") {
      console.log("type object", fileDetails[0].name);
      const newURL = await handleFileUpload(fileDetails[0], formData[url], fileDetails[0].name, true, mapping.folder);

      formData[mapping.formKey] = newURL || "";
    } else {
      formData[mapping.formKey] = null;
    }
  }
  console.log(formData);
  return formData;
};
