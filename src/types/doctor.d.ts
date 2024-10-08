import { Clinic } from "./clinic";
import { Service } from "./service";

export type Doctor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: number;
  languageProficiency: string | string[];
  speciality: {
    id: number;
    engName: string;
    burmaName: string;
  };
  qualifications: string[];
  dob: string;
  description: string;
  licenseNumber: string;
  gender: string;
  profilePictureUrl: string;
  isPublished: boolean;
  createdAt: string;
  averageRating: number;
  consultationFees: null;
  clinic?: Clinic;
  services?: Service[];
};
