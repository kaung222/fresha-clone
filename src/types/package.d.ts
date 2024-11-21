type Package = {
    targetGender: "male" | "female" | "all"; // Assuming the gender options are limited
    memberIds: string; // This seems to be a JSON string of array format, but it's unclear
    name: string;
    categoryId: number;
    description: string;
    serviceIds: number[];
    discount: number;
    discountType: "fixed" | "percentage"; // Assuming possible values for discountType
};